import { Router } from "express";
import {
  createChat,
  deleteChat,
  getChats,
  updateChatTitle,
} from "../controllers/chat.controller.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";
import { createMessage, getChat } from "../controllers/message.controller.js";

const router = Router();

router.post("/", createChat);
router.get("/", getChats);
router.get("/:chatId", validateObjectId, getChat);
router.post("/:chatId/messages", validateObjectId, createMessage);
router.delete("/:chatId", validateObjectId, deleteChat);
router.patch("/:chatId/title", validateObjectId, updateChatTitle);

export default router;
