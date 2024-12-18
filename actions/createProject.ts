'use server';

import { revalidatePath } from 'next/cache';
import path from 'path';
import fs from 'fs';
import extract from 'extract-zip';
import prisma from '@/lib/prisma';
import {
  AddProjectSchema,
  addProjectSchema,
} from '@/lib/validation/addProject';
import { slugify } from '@/lib/utils';
import { ActionState } from '@/types/ActionState';

const DEV_MODE = false;

const WEBSITES_DIR = path.resolve(process.cwd(), 'public', 'websites');

export async function createProject(
  state: ActionState,
  inputData: AddProjectSchema
): Promise<ActionState> {
  DEV_MODE && console.log('Server action initiated.');
  if (process.env.MODE == 'prod') {
    return {
      status: 'error',
      message: 'Project creation is not allowed.',
    };
  }

  //———————————————————————————
  // PARSE FORM DATA
  //———————————————————————————

  const parse = await addProjectSchema.safeParseAsync(inputData);

  if (!parse.success) {
    DEV_MODE && console.log('Form body content: ', inputData);
    return {
      status: 'error',
      message: 'Failed to parse form data:' + parse.error,

      errors: parse.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: `Server validation: ${issue.message}`,
      })),
    };
  }

  const data = parse.data;

  DEV_MODE && console.log('Form data parsed successfully.');

  //———————————————————————————
  // HANDLE FOLDER STRUCTURE
  //———————————————————————————

  let projectFolder: string;
  let slug: string;

  // Makes sure a directory exists
  try {
    const yearFolder = path.resolve(WEBSITES_DIR, String(data.year));
    fs.mkdirSync(yearFolder, { recursive: true });
    DEV_MODE && console.log('Year dir exists.');

    // Generate a unique slug
    const sluggedTitle = slugify(data.title);
    slug = sluggedTitle;
    let i = 1;
    while (fs.existsSync(path.join(yearFolder, slug))) {
      slug = `${sluggedTitle}-${i++}`;
    }

    // Create a new folder for the extracted files
    projectFolder = path.resolve(yearFolder, slug);
    fs.mkdirSync(projectFolder, { recursive: true });
    DEV_MODE && console.log('Extracted dir exists.');
  } catch (error) {
    return {
      status: 'error',
      message: 'Error creating directory:' + error,
      errors: [
        {
          path: 'zipFile',
          message: 'Server error',
        },
      ],
    };
  }

  //———————————————————————————
  // EXTRACT index.html
  //———————————————————————————

  const zipFile = (data.zipFile as Blob) || null;

  if (zipFile) {
    // Create a temporary file to store the uploaded ZIP file
    const tempFilePath = path.join(WEBSITES_DIR, 'temp.zip');

    // Use stream to write the file data
    const readableStream = zipFile.stream();
    const writeStream = fs.createWriteStream(tempFilePath);

    // Get the ReadableStreamDefaultController
    const controller = readableStream.getReader();

    // Read data from the controller and write it to the writeStream
    const readData = async () => {
      try {
        while (true) {
          const { done, value } = await controller.read();
          if (done) {
            break;
          }
          writeStream.write(value);
        }
        writeStream.end();
      } catch (error) {
        console.error('Error reading data:', error);
      }
    };

    readData();

    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    // Try to extract the zipFile
    try {
      // Extract the zipFile to the new folder
      await extract(tempFilePath, { dir: projectFolder });
      DEV_MODE && console.log('Extraction complete');

      // Check for the existence of index.html
      const indexPath = path.join(projectFolder, 'index.html');

      try {
        await fs.promises.access(indexPath, fs.constants.F_OK);
        DEV_MODE && console.log('Index file found');
      } catch (error) {
        DEV_MODE && console.error('Index file not found:', error);

        await fs.promises.rm(projectFolder, { recursive: true });

        return {
          status: 'error',
          message: 'Missing required file: index.html',
          errors: [
            {
              path: 'zipFile',
              message: 'Missing required file: index.html',
            },
          ],
        };
      }
    } catch (error) {
      console.error('Error during extraction or checking index.html:', error);
      // Handle any extraction or access errors gracefully

      return {
        status: 'error',
        message: 'An error occurred during the ZIP file processing.',
        errors: [
          {
            path: 'zipFile',
            message: 'Server error',
          },
        ],
      };
    } finally {
      // Remove the temporary file regardless of success or failure
      await fs.promises.unlink(tempFilePath);
    }
  } else {
    // If the zipFile doesn't exist
    return {
      status: 'error',
      message: "Couldn't find the ZIP file.",
      errors: [
        {
          path: 'zipFile',
          message: 'There was a problem with the ZIP file.',
        },
      ],
    };
  }

  //———————————————————————————
  // CALCULATE WEBSITES LOCAL SIZE
  //———————————————————————————

  let websiteSizeInBytes = 0;

  function calculateWebsiteSize(publicDir: string) {
    let totalSize = 0;

    const walkSync = (dir: string) => {
      fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          walkSync(filePath);
        } else {
          totalSize += stat.size;
        }
      });
    };

    walkSync(publicDir);

    return totalSize;
  }

  try {
    websiteSizeInBytes = calculateWebsiteSize(projectFolder);
    DEV_MODE && console.log(`Website size: ${websiteSizeInBytes} bytes`);
  } catch (error) {
    console.error('An error occurred: ', error);
    // If the zipFile doesn't exist
    return {
      status: 'error',
      message:
        'An error occurred during the calculation of projects local size.',
      errors: [
        {
          path: 'zipFile',
          message: 'There was a problem with the ZIP file.',
        },
      ],
    };
  }

  //———————————————————————————
  // ADD A RECORD TO DATABASE
  //———————————————————————————

  try {
    await prisma.project.create({
      data: {
        title: data.title,
        year: data.year,
        description: data.description,
        path: `/${data.year}/${slug}`,
        authorId: Number(data.author),
        localByteSize: websiteSizeInBytes,
      },
    });

    revalidatePath('/');

    return {
      status: 'success',
      message: `The project ${data.title} was successfully added.`,
    };
  } catch (error) {
    // Handle any database record creation errors
    console.error('Database record creation failed:', error);

    // Delete the extracted folder
    await fs.promises.rm(projectFolder, { recursive: true });

    return {
      status: 'error',
      message: 'An error occurred during database record processing.',
      errors: [
        {
          path: 'zipFile',
          message: 'Database error',
        },
      ],
    };
  }
}
