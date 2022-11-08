import { RequestHandler } from "express";
import { cleanPictureResponse } from "../helpers/response";
import { advanceState } from "../services/state";

export const getImageHandler: RequestHandler = async (req, res, next) => {
  const newState = await advanceState();

  const cleanResponse = cleanPictureResponse(newState);

  return res.status(200).json(cleanResponse);
};
