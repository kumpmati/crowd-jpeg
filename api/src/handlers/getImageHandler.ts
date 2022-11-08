import { RequestHandler } from "express";
import { cleanPictureResponse } from "../helpers/response";
import { advanceState } from "../services/state";

export const getImageHandler: RequestHandler = async (req, res, next) => {
  let newState = await advanceState();

  return res.status(200).json(cleanPictureResponse(newState));
};
