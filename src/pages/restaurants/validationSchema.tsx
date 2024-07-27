import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Restaurant name is required")
    .min(3, "Restaurant must be at least 3 characters")
    .max(20, "Restaurant name must not exced 20 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string().required("Phone number is required"),
  file: Yup.mixed().required("restaurant photo is required"),
  workingDays: Yup.array().of(
    Yup.string().required("workingDays are required")
  ),
  restaurantTypes: Yup.array().of(
    Yup.string().required("Restaurant types are required")
  ),
  workingFrom: Yup.string().required("Working hours are required"),
  workingTill: Yup.string().required("Working hours are required"),
});

export default validationSchema;
