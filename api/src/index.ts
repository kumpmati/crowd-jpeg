import express from "express";
import { Server } from "http";
import { PORT } from "./config/env";
import { apiRouter } from "./handlers";
import { errorHandlerMiddleware } from "./middleware/handleError";
import { startBackupService } from "./services/backup";
import { initMongoose } from "./services/database";
import cors from "cors";

const start = async () => {
  const app = express();
  const http = new Server(app);

  await initMongoose();

  startBackupService();

  app.use(cors()); // TODO: more strict origins
  app.use("/static", express.static("static"));
  app.use("/api", apiRouter);
  app.use(errorHandlerMiddleware);

  http.listen(PORT, () => console.log("listening on port", PORT));
};

start();
