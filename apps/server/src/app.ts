import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

app.use("/api/chats", chatRoutes);

app.use(errorHandler);

export default app;
