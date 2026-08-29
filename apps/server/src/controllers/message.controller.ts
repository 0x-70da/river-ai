import { Request, Response } from "express";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { sendMessage } from "../services/ai.service.js";
import { error, success } from "../utils/response.js";
import { SendMessageInput } from "@river/types";

export async function getChat(req: Request, res: Response) {
  const { chatId } = req.params as { chatId: string };

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return error(res, "Chat not found", 404);
  }

  const messages = await Message.find({
    chatId,
  }).sort({
    createdAt: 1,
  });

  return success(res, {
    ...chat.toObject(),
    messages,
  });
}

export async function createMessage(req: Request, res: Response) {
  const { chatId } = req.params as { chatId: string };
  const { content, modelId } = req.body as SendMessageInput;

  if (!content?.trim()) {
    return error(res, "Message content is required", 400);
  }

  if (!modelId?.trim()) {
    return error(res, "modelId is required", 400);
  }

  const assistantMessage = await sendMessage(chatId, content, modelId);

  return success(res, assistantMessage, 201);
}
