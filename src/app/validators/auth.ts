import Joi from "joi";
export const registerSchema = Joi.object({
  fullName: Joi.string().min(3).required().messages({
    "string.min": "Nama lengkap minimal 3 karakter",
    "string.empty": "Nama lengkap harus diisi",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email tidak valid",
      "string.empty": "Email harus diisi",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password minimal 6 karakter",
    "string.empty": "Password harus diisi",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Konfirmasi password tidak cocok",
    "string.empty": "Konfirmasi password harus diisi",
  }),
});

export const LoginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.email": "Email tidak valid",
    "string.empty": "Email harus diisi",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password minimal 6 karakter",
    "string.empty": "Password harus diisi",
  }),
});