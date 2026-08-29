import type { Message } from "./message.js";

export interface Chat {
  _id: string;

  title: string;

  createdAt: string;
  updatedAt: string;
}

export interface ChatDetails extends Chat {
  messages: Message[];
}
