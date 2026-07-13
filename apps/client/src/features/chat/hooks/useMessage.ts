import { useMutation } from "@tanstack/react-query";

import { sendMessage } from "../chat.api";

import { queryClient } from "@/query-client";

export function useMessage(chatId: string) {
  const {
    mutate: sendMessageMutation,
    isPending: isSendingMessage,
    isError: isSendMessagesError,
  } = useMutation({
    mutationFn: (content: string) => sendMessage(chatId, content),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["chat", chatId],
      });
    },
  });

  return {
    sendMessageMutation,
    isSendingMessage,
    isSendMessagesError,
  };
}
