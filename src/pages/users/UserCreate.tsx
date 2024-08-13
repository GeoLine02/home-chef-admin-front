import { FormEvent, useEffect, useState } from "react";
import DropDown from "../../components/ui/DropDown";
import { userTypeOptions } from "../../lib/constants";
import UserForm from "./UserForm";
import { IUserFormValues } from "../../types/user";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { createUser } from "../../store/features/userSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validateForm from "../../utils/validateForm";
import userValidationSchema from "./validationSchema";

const UserCreate = () => {
  const [selectedUserType, setSelectedUserType] = useState("user");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userFormValues, setUserFormValues] = useState<IUserFormValues>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [userFormErrors, setUserFormErrors] = useState<IUserFormValues>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userCreationStatus = useSelector(
    (state: RootState) => state.userReducer.userCreationStatus
  );
  const createdUser = useSelector(
    (state: RootState) => state.userReducer.createdUser
  );
  const handleSelectUserType = (userType: string) => {
    setSelectedUserType(userType);
  };
  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const { isValid, errors } = await validateForm(
        userValidationSchema,
        userFormValues
      );
      if (isValid) {
        const userValues = {
          ...userFormValues,
          role: selectedUserType,
        };
        dispatch(createUser(userValues));
      } else {
        setUserFormErrors(errors);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userCreationToast = () => toast("User created successfuly");
    if (userCreationStatus === "successful") {
      userCreationToast();
    }
    if (
      userCreationStatus === "successful" &&
      selectedUserType === "restaurant_owner"
    ) {
      navigate("/restaurants/create", {
        state: { ownerID: createdUser?.id },
      });
    }
  }, [createdUser?.id, navigate, selectedUserType, userCreationStatus]);

  return (
    <div className="p-4">
      <div className="max-w-[150px]">
        <DropDown
          options={userTypeOptions}
          selected={selectedUserType}
          setSelected={handleSelectUserType}
          multiSelect={false}
        />
      </div>
      <UserForm
        isLoading={isLoading}
        onSubmit={onFormSubmit}
        setUserFormValues={setUserFormValues}
        userFormValues={userFormValues}
        userFormErrors={userFormErrors}
      />
      <ToastContainer
        position="top-left"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default UserCreate;
