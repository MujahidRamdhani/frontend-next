import Joi from "joi";
export const registerSchema = Joi.object({
fullName: Joi.string().min(3).required().messages({
"string.min": "Full name must be at least 3 characters long",
"string.empty": "Full name is required",
}),
email: Joi.string()
.email({ tlds: { allow: false } })
.required()
.messages({
"string.email": "Invalid email format",
"string.empty": "Email is required",
}),
password: Joi.string().min(6).required().messages({
"string.min": "Password must be at least 6 characters long",
"string.empty": "Password is required",
}),
confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
"any.only": "Password confirmation does not match",
"string.empty": "Password confirmation is required",
}),
});

export const LoginSchema = Joi.object({
email: Joi.string().email({ tlds: { allow: false } }).required().messages({
"string.email": "Invalid email format",
"string.empty": "Email is required",
}),
password: Joi.string().min(6).required().messages({
"string.min": "Password must be at least 6 characters long",
"string.empty": "Password is required",
}),
});

