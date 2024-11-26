import React from 'react';

interface AuthorFormContentProps {
  setAuthorModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthorFormContent: React.FC<AuthorFormContentProps> = ({
  setAuthorModal,
}) => {
  return (
    <div className="grid grid-cols-1 gap-8 relative text-white max-w-xl">
      <div className="w-full">
        <label className="font-semibold block mb-2" htmlFor="name">
          First Name
        </label>
        <input
          type="text"
          className="block px-4 py-2 bg-black text-white border-neutral-lighter rounded-md border w-full placeholder:text-neutral-lighter"
        />
      </div>
      <div className="w-full">
        <label className="font-semibold block mb-2" htmlFor="name">
          Last Name
        </label>
        <input
          type="text"
          className="block px-4 py-2 bg-black text-white border-neutral-lighter rounded-md border w-full placeholder:text-neutral-lighter"
        />
      </div>
      <div className="flex flex-row gap-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            setAuthorModal(false);
          }}
          className="px-4 py-2 bg-black text-white border-neutral-lighter rounded-md border"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-white text-black rounded-md grow"
        >
          Add author
        </button>
      </div>
    </div>
  );
};
