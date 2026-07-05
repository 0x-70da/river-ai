import { Router } from "express";
import {
  createChat,
  deleteChat,
  getChats,
} from "../controllers/chat.controller.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";

const router = Router();

router.post("/", createChat);
router.get("/", getChats);
router.delete("/:chatId", validateObjectId, deleteChat);

export default router;
