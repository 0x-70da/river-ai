import { ai } from "../config/ai.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";

const MODEL = "llama-3.3-70b-versatile";

export async function sendMessage(chatId: string, content: string) {
  // ---------------------------------
  // 1) Check chat exists
  // ---------------------------------

  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new Error("Chat not found");
  }

  // ---------------------------------
  // 2) Save user message
  // ---------------------------------

  await Message.create({
    chatId,
    role: "user",
    content,
  });

  // ---------------------------------
  // 3) Load history
  // ---------------------------------

  const history = await Message.find({
    chatId,
  })
    .sort({
      createdAt: 1,
    })
    .lean();

  // ---------------------------------
  // 4) Convert Mongo -> LLM Messages
  // ---------------------------------

  const messages = history.map((message) => ({
    role: message.role,
    content: message.content,
  }));

  // ---------------------------------
  // 5) Call Groq
  // ---------------------------------

  const completion = await ai.chat.completions.create({
    model: MODEL,
    messages,
    temperature: 0.7,
  });

  const assistantContent = completion.choices[0]?.message?.content ?? "";

  // ---------------------------------
  // 6) Save assistant message
  // ---------------------------------

  const assistantMessage = await Message.create({
    chatId,
    role: "assistant",
    content: assistantContent,
    model: MODEL,
  });

  // ---------------------------------
  // 7) Generate title
  // ---------------------------------

  if (chat.title === "New Chat") {
    const titleCompletion = await ai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: "Generate a short chat title (maximum 5 words). Return only the title.",
        },
        {
          role: "user",
          content,
        },
      ],
      temperature: 0.2,
    });

    const title = titleCompletion.choices[0]?.message?.content?.trim();

    if (title) {
      chat.title = title;
      await chat.save();
    }
  }

  return assistantMessage;
}
