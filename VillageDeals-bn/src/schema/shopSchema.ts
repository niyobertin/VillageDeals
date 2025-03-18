import Joi from "joi";

export const registerShopSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().allow(null, "").optional(),
  avatar: Joi.string().allow(null, "").optional(),
  email: Joi.string().email().allow(null, "").optional(),
  phone: Joi.string().min(10).max(20).required(),
  address: Joi.string().allow(null, "").optional(),
  isActive: Joi.boolean().required(),
});
export const signUpShopSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
});

export const updateShopSchema = Joi.object({
  name: Joi.string().min(2).max(255).optional(),
  description: Joi.string().allow(null, "").optional(),
  avatar: Joi.string().uri().allow(null, "").optional(),
  email: Joi.string().email().allow(null, "").optional(),
  phone: Joi.string().min(10).max(20).optional(),
  address: Joi.string().allow(null, "").optional(),
  isActive: Joi.boolean().optional(),
  updatedAt: Joi.date().default(() => new Date()),
});
