import { UseFormRegister, Path } from "react-hook-form";
import { IFormValues } from "../../pages/restaurants/RestaurantNew";

interface InputProps {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
}

const Input = ({ label, register, required }: InputProps) => (
  <>
    <label>{label}</label>
    <input
      className="w-full border-2 border-border_color rounded-xl py-2 my-1 outline-none px-4"
      {...register(label, { required })}
    />
  </>
);
export default Input;
