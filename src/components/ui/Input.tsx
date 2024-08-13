import { ChangeEvent } from "react";

interface InputProps {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string; // Changed to string to ensure consistency
  error?: string;
}

const Input = ({ name, onChange, value, error }: InputProps) => (
  <>
    <label htmlFor={name}>{name}</label>
    <input
      className="w-full border-2 border-border_color rounded-xl py-2 my-1 outline-none px-4"
      id={name}
      name={name}
      value={value} // Ensure value is used here
      placeholder={`Enter your ${name}`}
      onChange={onChange}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
  </>
);

export default Input;
