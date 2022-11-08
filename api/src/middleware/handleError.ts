import { ErrorRequestHandler, Response } from "express";
import { AppError } from "../helpers/AppError";

export const handleError = (err: AppError, res: Response) => {
  console.error("error handler", err.message);

  if (!err.isOperational) {
    process.exit(1);
  }

  return res
    .status(err?.statusCode ?? 500)
    .json({ status: err?.statusCode ?? 500, message: err.message });
};

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  return handleError(err, res);
};
