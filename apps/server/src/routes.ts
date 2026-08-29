import { Router } from "express";
import chatRouter from "./routes/chat.routes.js";
import modelRouter from "./routes/model.routes.js";

const router: Router = Router();

router.use("/chats", chatRouter);
router.use("/models", modelRouter);

export default router;
