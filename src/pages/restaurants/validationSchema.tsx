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
  imageCover: Yup.string()
    .url("Invalid URL for cover image")
    .required("Cover image is required"),
  imageIntro: Yup.string()
    .url("Invalid URL for intro image")
    .required("Intro image is required"),
  workingDays: Yup.array()
    .of(
      Yup.number()
        .required("Each working day is required")
        .typeError("Each working day must be a number")
    )

    .min(1, "At least one working days are required"),
  restaurantTypes: Yup.array()
    .of(
      Yup.number()
        .required("Each restaurant type is required")
        .typeError("Each restaurant type must be a number")
    )
    .required("restaurant types are required")
    .min(1, "At least one restaurant types are required"),
  workingFrom: Yup.string().required("Working hours are required"),
  workingTill: Yup.string().required("Working hours are required"),
});

export default validationSchema;
