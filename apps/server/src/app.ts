import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  }),
);

app.use(express.json());

app.use("/api/chats", chatRoutes);

app.use(errorHandler);

export default app;
