import Joi from "joi";

const passwordPattern =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phoneNumberPattern = /^[0-9]{10}$/;

export const userRegisterSchema = Joi.object({
  firstName: Joi.string().required().min(3),
  secondName: Joi.string().optional().min(3).allow(null).messages({
    "string.min": "Second name must be at least 3 characters long.",
  }),
  profileImage: Joi.string().optional().allow(null).uri().messages({
    "string.uri": "Profile image must be a valid URL.",
  }),
  email: Joi.string().email().optional().allow(null).messages({
    "string.email": "Email must be a valid email address.",
  }),
  gender: Joi.string()
    .valid("Male", "Female", "Other", "Prefer not to say")
    .required()
    .messages({
      "any.only":
        "Gender must be one of 'Male', 'Female', 'Other', or 'Prefer not to say'.",
    }),
  dob: Joi.date().required().messages({
    "date.iso": "Date of birth must be in ISO format (YYYY-MM-DD).",
  }),
  phoneNumber: Joi.string().pattern(phoneNumberPattern).required().messages({
    "string.pattern.base": "Phone number must be exactly 10 digits.",
  }),
  role: Joi.string()
    .valid("USER", "MANAGER", "ADMIN", "SELLER")
    .required()
    .insensitive()
    .messages({
      "any.only":
        "Role must be one of 'USER', 'MANAGER', 'ADMIN', or 'SELLER'.",
    }),
  password: Joi.string().min(8).pattern(passwordPattern).required().messages({
    "string.pattern.base":
      "Password must include at least one uppercase letter, one number, and one special character.",
    "string.min": "Password must be at least 8 characters long.",
    "any.required": "Password is required.",
  }),
  companyId: Joi.string().uuid().required().messages({
    "string.uuid": "Company ID must be a valid UUID.",
  }),
  isActive: Joi.boolean().default(false),
  lastLogin: Joi.date().optional().allow(null).messages({
    "date.iso": "Last login must be in ISO format (YYYY-MM-DDTHH:mm:ssZ).",
  }),
});
