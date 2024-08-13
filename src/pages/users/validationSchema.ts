import * as Yup from "yup";

const userValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is requiried"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .required("password is required")
    .min(8, "Passowrd must be at least 8 characters long")
    .max(16, "Password must not be longer then 16 chaacters"),
});

export default userValidationSchema;
