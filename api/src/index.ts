import express from "express";
import { Server } from "http";
import { DB_ENABLED, PORT } from "./config/env";
import { apiRouter } from "./handlers";
import { errorHandlerMiddleware } from "./middleware/handleError";
import { startBackupService } from "./services/backup";
import { initMongoose } from "./services/database";
import cors from "cors";
import { restoreState } from "./services/state";

const start = async () => {
  const app = express();
  const http = new Server(app);

  if (DB_ENABLED) {
    await initMongoose();
    await restoreState();
    startBackupService();
  }

  app.use(cors()); // TODO: more strict origins
  app.use("/static", express.static("static"));
  app.use("/api", apiRouter);
  app.use(errorHandlerMiddleware);

  http.listen(PORT, () => console.log("listening on port", PORT));
};

start();
