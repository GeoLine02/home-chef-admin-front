import { FormEvent, useEffect, useState } from "react";
import { IUserFormValues } from "../../types/user";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchUserByID, updateUser } from "../../store/features/userSlice";
import UserForm from "./UserForm";
import { toast, ToastContainer } from "react-toastify";
import validateForm from "../../utils/validateForm";
import userValidationSchema from "./validationSchema";

const UserEdit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const userEditStatus = useSelector(
    (state: RootState) => state.userReducer.userEditStatus
  );
  useEffect(() => {
    dispatch(fetchUserByID(Number(params.id)));
  }, [params, dispatch]);
  const userByID = useSelector(
    (state: RootState) => state.userReducer.userByID
  );

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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userByID) {
      setUserFormValues({
        firstName: userByID.firstName,
        lastName: userByID.lastName,
        phoneNumber: userByID.phoneNumber,
        email: userByID.email,
        password: userByID.password,
      });
    }
  }, [params, userByID]);

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { isValid, errors } = await validateForm(
        userValidationSchema,
        userFormValues
      );

      if (isValid) {
        dispatch(
          updateUser({
            id: Number(params.id) as number,
            updatedUserValues: userFormValues,
          })
        );
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
    const userUpdateToast = () => toast("User updated successfuly!");
    if (userEditStatus === "successful") {
      userUpdateToast();
    }
  }, [userEditStatus]);

  return (
    <div>
      <UserForm
        isLoading={isLoading}
        onSubmit={onFormSubmit}
        setUserFormValues={setUserFormValues}
        userFormValues={userFormValues}
        userFormErrors={userFormErrors}
      />
      <ToastContainer
        position="top-left"
        autoClose={5000}
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

export default UserEdit;
