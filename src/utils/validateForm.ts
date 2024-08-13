import * as yup from "yup";

/* eslint-disable @typescript-eslint/no-explicit-any */
const validateForm = async (validationSchema: any, values: any) => {
  try {
    await validationSchema.validate(values, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errors = err.inner.reduce(
        (acc: any, error: yup.ValidationError) => {
          acc[error.path] = error.message;
          return acc;
        },
        {}
      );
      return { isValid: false, errors };
    }
    return { isValid: false, errors: {} };
  }
};

export default validateForm;
