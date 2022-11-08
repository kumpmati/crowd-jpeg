import express from "express";
import { Server } from "http";
import { PORT } from "./config/env";
import { apiRouter } from "./handlers";
import { errorHandlerMiddleware } from "./middleware/handleError";

const start = async () => {
  const app = express();
  const http = new Server(app);

  app.use("/static", express.static("static"));
  app.use("/api", apiRouter);
  app.use(errorHandlerMiddleware);

  http.listen(PORT, () => console.log("listening on port", PORT));
};

start();
