import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.any(),
  description: Joi.string().optional(),
  categoryId: Joi.string().required(),
  price: Joi.number().positive().required(),
  discount: Joi.number().min(0).optional(),
  inStock: Joi.number().integer().min(0).required(),
  sold: Joi.number().integer().min(0).default(0),
  status: Joi.boolean().optional(),
});
