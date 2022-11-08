import { RequestHandler } from "express";
import { AppError } from "../helpers/AppError";
import { getCurrentState, resetState } from "../services/state";
import Joi from "joi";
import { cleanPictureResponse } from "../helpers/response";

export const resetImageQuery = Joi.object({
  id: Joi.string().required(),
  secret: Joi.string().required(),
});

export const resetImageHandler: RequestHandler = async (req, res, next) => {
  const { id, secret } = req.query;

  const { image, ...rest } = getCurrentState();
  console.log(rest, id, secret);

  const newState = await resetState(id as string, secret as string);
  if (!newState) {
    return next(new AppError(400, "id or secret did not match"));
  }

  return res.status(200).json(cleanPictureResponse(newState));
};
