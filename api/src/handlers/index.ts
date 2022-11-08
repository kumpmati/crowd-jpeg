import { Router } from "express";
import { validateQuery } from "../middleware/validateQuery";
import { getImageHandler } from "./getImageHandler";
import { resetImageHandler, resetImageQuery } from "./resetImageHandler";

export const apiRouter = Router();

apiRouter.get("/", getImageHandler);
apiRouter.get("/reset", validateQuery(resetImageQuery), resetImageHandler);
