import Joi from "joi";

// user create validation
export const userCreateSchema = Joi.object({
  first_name: Joi.string().max(20).required(),
  last_name: Joi.string().max(20),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(200).required(),
});

// user login validation
export const userLoginSchema = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(200).required(),
});
