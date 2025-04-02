import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  emailOrPhone: yup
    .string()
    .required("Email or phone is required")
    .test(
      "emailOrPhone",
      "Must be a valid email or phone number",
      (value) =>
        !!value &&
        (yup.string().email().isValidSync(value) ||
          yup
            .string()
            .matches(/^\d+$/, "Invalid phone number")
            .isValidSync(value))
    ),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .required("Password is required"),
});
