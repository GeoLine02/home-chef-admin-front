import { ChangeEvent } from "react";

interface InputProps {
  name: string;
  required: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string; // Changed to string to ensure consistency
}

const Input = ({ name, required, onChange, value }: InputProps) => (
  <>
    <label htmlFor={name}>{name}</label>
    <input
      className="w-full border-2 border-border_color rounded-xl py-2 my-1 outline-none px-4"
      id={name}
      name={name}
      value={value} // Ensure value is used here
      placeholder={`Enter your ${name}`}
      onChange={onChange}
      required={required}
    />
  </>
);

export default Input;
