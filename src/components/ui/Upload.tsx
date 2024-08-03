import { ChangeEvent } from "react";
import { MdDelete } from "react-icons/md";

interface IUpload {
  name: string;
  value: string | File | null;
  onChange: (file: File | null) => void;
  handleDelete: () => void;
}

const Upload = ({ value, onChange, handleDelete, name }: IUpload) => {
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    } else {
      onChange(null);
    }
  };

  if (value) {
    return (
      <div className="relative group w-full bg-green-100 h-64 p-3 border-2 border-dotted flex items-center justify-center">
        <img
          src={value as string}
          alt={`${name}`}
          className="w-full h-full object-cover transition duration-300 group-hover:brightness-75"
        />

        <div className="absolute text-slate-50 inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="">{name}</p>
          <MdDelete
            size={28}
            className="cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor={name}
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-green-800 dark:bg-dark_backgorund_color hover:bg-gray-100 dark:border-border_color dark:hover:border-border_color"
      >
        <p>{name}</p>
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id={name}
          type="file"
          className="hidden"
          onChange={onFileChange}
          required
        />
      </label>
    </div>
  );
};

export default Upload;
