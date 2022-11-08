import { RequestHandler } from "express";
import Joi, { Schema } from "joi";
import { AppError } from "../helpers/AppError";

export const validateQuery = (schema: Schema): RequestHandler => {
  return async (req, res, next) => {
    const { value, error } = Joi.compile(schema).validate(req.query);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");

      return next(new AppError(400, errorMessage));
    }

    Object.assign(req.query, value);
    next();
  };
};
