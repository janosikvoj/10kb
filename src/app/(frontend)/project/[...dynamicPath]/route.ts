import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import mime from 'mime-types';

const dynamicHtmlDirectory = path.join(process.cwd(), 'projects');

export async function GET(
  request: Request,
  { params }: { params: Promise<{ dynamicPath: string[] }> }
) {
  try {
    const { dynamicPath } = await params;
    let fullPath = path.join(dynamicHtmlDirectory, ...dynamicPath);

    fullPath = path.resolve(fullPath);
    if (!fullPath.startsWith(path.resolve(dynamicHtmlDirectory))) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    try {
      const fileBuffer = await fs.readFile(fullPath);

      const mimeType = mime.lookup(fullPath);
      if (!mimeType) {
        return new NextResponse('Unsupported file type', { status: 400 });
      }

      return new NextResponse(new Uint8Array(fileBuffer), {
        headers: {
          'Content-Type': mimeType,
        },
      });
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'ENOENT'
      ) {
        return new NextResponse('Not Found', { status: 404 });
      } else {
        console.error('Error reading file:', error);
        return new NextResponse('Error loading file', { status: 500 });
      }
    }
  } catch (paramsError) {
    console.error('Error getting params:', paramsError);
    return new NextResponse('Error loading file', { status: 500 });
  }
}
