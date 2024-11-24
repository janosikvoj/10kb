import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useFormStatus } from 'react-dom';
import { ErrorMessage } from '@hookform/error-message';
import { cn } from '@/lib/utils';
import { Author } from '@prisma/client';
import CornerStrokeEffect from '@/components/common/CornerStrokeEffect';
import { AddProjectSchema } from '@/lib/validation/addProject';

interface ProjectFormContentProps {
  register: UseFormRegister<AddProjectSchema>;
  isValid: boolean;
  errors: FieldErrors<AddProjectSchema>;
  data: { authors: Author[] };
  setAuthorModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectFormContent: React.FC<ProjectFormContentProps> = ({
  register,
  isValid,
  errors,
  data,
  setAuthorModal,
}) => {
  const { pending } = useFormStatus();

  return (
    <div className="grid grid-cols-1 gap-8 relative text-text max-w-xl">
      {/* --- Title input --- */}
      <div className="w-full">
        <label className="font-semibold block mb-4" htmlFor="title">
          Title
        </label>
        <div className="relative">
          <CornerStrokeEffect stroke="stroke-white" />
          <input
            className="block px-4 py-2 bg-background text-text w-full placeholder:text-surface outline-offset-2"
            {...register('title')}
            placeholder="10kb web"
            type="text"
            autoFocus
          />
        </div>
        <p className="text-error text-sm mt-2">
          <ErrorMessage name="title" errors={errors} />
        </p>
      </div>
      {/* --- Year input --- */}
      <div className="w-full">
        <label className="font-semibold block mb-2" htmlFor="year">
          Year
        </label>
        <div className="relative">
          <CornerStrokeEffect stroke="stroke-white" />
          <input
            className={cn(
              'block px-4 py-2 bg-background text-text w-full placeholder:text-surface',
              '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            )}
            {...register('year')}
            placeholder="2024"
            type="number"
            defaultValue={new Date().getFullYear()}
          />
        </div>
        <span className="text-error text-sm">
          <ErrorMessage name="year" errors={errors} />
        </span>
      </div>
      {/* --- Description input --- */}
      <div className="w-full">
        <label className="font-semibold block mb-2" htmlFor="description">
          Description
        </label>
        <div className="relative">
          <CornerStrokeEffect stroke="stroke-white" />
          <textarea
            className="block px-4 py-2 bg-background text-text w-full placeholder:text-surface"
            {...register('description')}
            placeholder="Lorem ipsum dolor sit amet…"
          />
        </div>
        <span className="text-error text-sm">
          <ErrorMessage name="description" errors={errors} />
        </span>
      </div>
      {/* --- Author input --- */}
      <div className="w-full">
        <label className="font-semibold block mb-2" htmlFor="author">
          Author
        </label>
        <div className="flex flex-row gap-2">
          <select
            className="block px-4 py-2 bg-background text-text border-surface rounded-md border w-full placeholder:text-surface"
            {...register('author')}
          >
            {data.authors.map((author) => (
              <option value={author.id} key={author.id}>
                {author.fname} {author.sname}
              </option>
            ))}
          </select>
          <button
            id="new-author"
            onClick={(e) => {
              e.preventDefault();
              setAuthorModal(true);
            }}
            className="px-4 py-2 bg-background text-text border-surface rounded-md border"
          >
            New
          </button>
        </div>
        <span className="text-error text-sm">
          <ErrorMessage name="author" errors={errors} />
        </span>
      </div>
      {/* --- ZIP file input --- */}
      <div className="w-full">
        <label className="font-semibold block mb-2" htmlFor="zipFile">
          ZIP file
        </label>
        <input
          className="block px-4 py-2 bg-background text-text border-surface rounded-md border w-full placeholder:text-surface file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground"
          {...register('zipFile')}
          type="file"
        />
        <span className="text-error text-sm">
          <ErrorMessage name="zipFile" errors={errors} />
        </span>
      </div>
      <button
        type="submit"
        disabled={pending || !isValid}
        className={cn(
          'px-4 py-2 bg-text text-background border-surface rounded-md border w-full',
          (pending || !isValid) && 'bg-surface'
        )}
      >
        Send
      </button>
      {pending && <span>Loading...</span>}
    </div>
  );
};
