import { ChangeEvent, FormEvent } from "react";
import Input from "../../components/ui/Input";
import { MoonLoader } from "react-spinners";
import { IUserFormValues } from "../../types/user";

interface IUserFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  setUserFormValues: React.Dispatch<React.SetStateAction<IUserFormValues>>;
  userFormValues: IUserFormValues;
  userFormErrors: IUserFormValues;
}

const UserForm = ({
  onSubmit,
  isLoading,
  userFormValues,
  setUserFormValues,
  userFormErrors,
}: IUserFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <form onSubmit={onSubmit} className="p-4">
      <Input
        name="firstName"
        onChange={handleChange}
        value={userFormValues.firstName}
        error={userFormErrors.firstName}
      />
      <Input
        name="lastName"
        onChange={handleChange}
        value={userFormValues.lastName}
        error={userFormErrors.lastName}
      />
      <Input
        name="phoneNumber"
        onChange={handleChange}
        value={userFormValues.phoneNumber}
        error={userFormErrors.phoneNumber}
      />
      <Input
        name="email"
        onChange={handleChange}
        value={userFormValues.email}
        error={userFormErrors.email}
      />
      <Input
        name="password"
        onChange={handleChange}
        value={userFormValues.password}
        error={userFormErrors.password}
      />

      <div className="w-full py-4 mt-11 bg-dark_backgorund_color">
        <div className="flex items-center justify-end gap-6 px-14 text-white">
          <button type="reset" className="rounded-md bg-red-500 px-3 py-1">
            Discard
          </button>
          <div className="flex items-center gap-2 rounded-md bg-green-500 px-3 py-1">
            <button type="submit">Submit</button>
            {isLoading && (
              <MoonLoader
                size={15}
                color="rgba(0, 128, 0, 1)"
                speedMultiplier={0.4}
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
