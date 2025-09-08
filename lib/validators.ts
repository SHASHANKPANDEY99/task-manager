import Joi from 'joi'

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const createTaskSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().allow(''),
  status: Joi.string().valid('pending', 'done').default('pending'),
})

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(1),
  description: Joi.string().allow(''),
  status: Joi.string().valid('pending', 'done'),
})
