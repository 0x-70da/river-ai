import { Request, Response } from "express";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { success } from "../utils/response.js";

export async function createChat(req: Request, res: Response) {
  const chat = await Chat.create({
    title: "New Chat",
  });

  return success(res, chat, 201);
}

export async function getChats(req: Request, res: Response) {
  const chats = await Chat.find().sort({
    updatedAt: -1,
  });

  return success(res, chats);
}

export async function deleteChat(req: Request, res: Response) {
  const { chatId } = req.params as { chatId: string };

  const chat = await Chat.findByIdAndDelete(chatId);

  if (!chat) {
    return success(res, { message: "Chat not found" }, 404);
  }

  await Message.deleteMany({ chatId });

  return res.sendStatus(204);
}
