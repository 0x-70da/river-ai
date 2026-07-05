import { Request, Response } from "express";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";

export async function createChat(req: Request, res: Response) {
  const chat = await Chat.create({
    title: "New Chat",
  });

  res.status(201).json(chat);
}

export async function getChats(req: Request, res: Response) {
  const chats = await Chat.find().sort({
    updatedAt: -1,
  });

  res.json(chats ?? []);
}

export async function deleteChat(req: Request, res: Response) {
  const { chatId } = req.params;

  const chat = await Chat.findByIdAndDelete(chatId);

  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  await Message.deleteMany({ chatId });

  res.status(204).json({ message: "Chat deleted successfully" });
}
