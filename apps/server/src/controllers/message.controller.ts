import { Request, Response } from "express";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { sendMessage } from "../services/ai.service.js";

export async function getChat(req: Request, res: Response) {
  const { chatId } = req.params as { chatId: string };

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
    });
  }

  const messages = await Message.find({
    chatId,
  }).sort({
    createdAt: 1,
  });

  return res.json({
    ...chat.toObject(),
    messages,
  });
}

export async function createMessage(req: Request, res: Response) {
  const { chatId } = req.params as { chatId: string };
  const { content } = req.body as { content: string };

  if (!content?.trim()) {
    return res.status(400).json({
      message: "Message content is required",
    });
  }

  const assistantMessage = await sendMessage(chatId, content);

  return res.status(201).json(assistantMessage);
}
