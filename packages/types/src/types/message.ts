export type MessageRole = "system" | "user" | "assistant";

export interface Message {
  _id: string;
  chatId: string;

  role: MessageRole;

  content: string;

  model?: string;

  createdAt: string;
  updatedAt: string;
}
