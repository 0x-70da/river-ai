import { generateTitle, generateWithFallback } from "@river/ai";

import type { ModelFallback } from "@river/types";

import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";

export async function sendMessage(chatId: string, content: string, modelId: string) {
  // ---------------------------------
  // 1) Check chat exists
  // ---------------------------------

  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new Error("Chat not found");
  }

  // ---------------------------------
  // 2) Load history
  // ---------------------------------

  const history = await Message.find({
    chatId,
  })
    .sort({
      createdAt: 1,
    })
    .lean();

  // ---------------------------------
  // 3) Build prompt
  // ---------------------------------

  const prompt = [
    ...history.map((message) => `${message.role}: ${message.content}`),
    `user: ${content}`,
  ].join("\n");

  // ---------------------------------
  // 4) Generate assistant response
  // ---------------------------------

  const result = await generateWithFallback({
    modelId,
    prompt,
  });

  const assistantContent = result.text.trim();

  // ---------------------------------
  // 5) Save messages ONLY after success
  // ---------------------------------

  const userMessage = await Message.create({
    chatId,
    role: "user",
    content,
  });

  const assistantMessage = await Message.create({
    chatId,
    role: "assistant",
    content: assistantContent,
    model: result.model.id,
  });

  // ---------------------------------
  // 6) Generate title
  // ---------------------------------

  let title: string | null = null;

  if (chat.title === "New Chat") {
    try {
      title = await generateTitle({
        content,
        modelId: result.model.id,
      });

      if (title) {
        chat.title = title;
        await chat.save();
      }
    } catch (error) {
      console.error("Failed to generate chat title:", error);
    }
  }

  // ---------------------------------
  // 7) Build fallback information
  // ---------------------------------

  const fallback: ModelFallback | null = result.didFallback
    ? {
        didFallback: true,
        requestedModel: result.requestedModel,
        model: result.model,
        fallbackReason: result.fallbackReason,
      }
    : null;

  return {
    userMessage,
    message: assistantMessage,
    model: result.model,
    fallback,
    title,
  };
}
