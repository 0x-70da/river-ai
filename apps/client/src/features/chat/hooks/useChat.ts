import { useMutation, useQuery } from "@tanstack/react-query";

import { createChat, deleteChat, getChat, getChats, updateChatTitle } from "../chat.api";
import { useNavigate } from "react-router";
import { queryClient } from "@/query-client";

export function useChat(chatId?: string) {
  const navigate = useNavigate();

  const {
    data: chats,
    isLoading: areChatsLoading,
    isError: isChatsError,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
    enabled: !chatId,
  });

  const {
    data: chat,
    isLoading: isChatLoading,
    isError: isChatError,
  } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => getChat(chatId!),
    enabled: !!chatId,
  });

  const {
    mutate: createChatMutation,
    isPending: isCreatingChat,
    isError: isCreateChatError,
  } = useMutation({
    mutationFn: createChat,

    onSuccess: (chat) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      navigate(`/chat/${chat._id}`);
    },
  });

  const {
    mutate: deleteChatMutation,
    isPending: isDeletingChat,
    isError: isDeleteChatError,
  } = useMutation({
    mutationFn: deleteChat,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  const {
    mutate: updateChatTitleMutation,
    isPending: isUpdatingChatTitle,
    isError: isUpdateChatTitleError,
  } = useMutation({
    mutationFn: ({ chatId, title }: { chatId: string; title: string }) =>
      updateChatTitle({ chatId, title }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
    },
  });

  return {
    chats,
    areChatsLoading,
    isChatsError,
    chat,
    isChatLoading,
    isChatError,
    createChatMutation,
    isCreatingChat,
    isCreateChatError,
    deleteChatMutation,
    isDeletingChat,
    isDeleteChatError,
    updateChatTitleMutation,
    isUpdatingChatTitle,
    isUpdateChatTitleError,
  };
}
