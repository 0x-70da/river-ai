import { api } from "@/utils/api";

import type { ApiResponse, Chat, ChatDetails, Message } from "@river/types";

export async function getChats() {
  const response = await api.get<ApiResponse<Chat[]>>("/chats");

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}

export async function getChat(chatId: string) {
  const response = await api.get<ApiResponse<ChatDetails>>(`/chats/${chatId}`);

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}

export async function createChat() {
  const response = await api.post<ApiResponse<Chat>>("/chats");

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}

export async function sendMessage(chatId: string, content: string) {
  const response = await api.post<ApiResponse<Message>>(
    `/chats/${chatId}/messages`,
    {
      content,
    },
  );

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}

export async function deleteChat(chatId: string) {
  const response = await api.delete(`/chats/${chatId}`);
  if (!(response.status === 204)) {
    throw new Error("Failed to delete chat");
  }
}

export async function updateChatTitle({
  chatId,
  title,
}: {
  chatId: string;
  title: string;
}) {
  const response = await api.patch<ApiResponse<Pick<Chat, "title">>>(
    `/chats/${chatId}/title`,
    {
      title,
    },
  );

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}
