import Joi from "joi";

// user create validation
export const userCreateSchema = Joi.object({
  first_name: Joi.string().trim().max(20).required(),
  last_name: Joi.string().trim().max(20),
  email: Joi.string().email().trim().max(100).required(),
  password: Joi.string().trim().max(200).required(),
});

// user login validation
export const userLoginSchema = Joi.object({
  email: Joi.string().email().trim().max(100).required(),
  password: Joi.string().trim().max(200).required(),
});

// todo validation
export const todoCreateSchema = Joi.object({
  title: Joi.string().trim().max(1000).required(),
  description: Joi.string().trim().required(),
});
