import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import type { ChatDetails, Message } from "@river/types";

import { queryClient } from "@/query-client";
import { sendMessage } from "../chat.api";

interface SendMessageVariables {
  content: string;
  modelId: string;
}

interface OptimisticMessage extends Message {
  isOptimistic?: boolean;
  isError?: boolean;
}

export function useMessage(chatId: string) {
  const {
    mutate: sendMessageMutation,
    isPending: isSendingMessage,
    isError: isSendMessagesError,
  } = useMutation({
    mutationFn: ({ content, modelId }: SendMessageVariables) =>
      sendMessage(chatId, content, modelId),

    onMutate: async ({ content, modelId }) => {
      await queryClient.cancelQueries({
        queryKey: ["chat", chatId],
      });

      const previousChat = queryClient.getQueryData<ChatDetails>(["chat", chatId]);

      if (!previousChat) {
        return { previousChat };
      }

      const optimisticUserMessage: OptimisticMessage = {
        _id: crypto.randomUUID(),
        chatId,
        role: "user",
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        model: modelId,
        isOptimistic: true,
      };

      const optimisticAssistantMessage: OptimisticMessage = {
        _id: crypto.randomUUID(),
        chatId,
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        model: modelId,
        isOptimistic: true,
      };

      queryClient.setQueryData<ChatDetails>(["chat", chatId], {
        ...previousChat,
        messages: [...previousChat.messages, optimisticUserMessage, optimisticAssistantMessage],
      });

      return { previousChat, optimisticAssistantId: optimisticAssistantMessage._id };
    },

    onSuccess(data, _variables, context) {
      queryClient.setQueryData<ChatDetails>(["chat", chatId], (currentChat) => {
        if (!currentChat || !context?.optimisticAssistantId) {
          return currentChat;
        }

        return {
          ...currentChat,
          messages: currentChat.messages.map((message) =>
            message._id === context.optimisticAssistantId ? data.message : message,
          ),
        };
      });

      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });

      if (data.fallback) {
        toast.info("Model switched", {
          description: `${data.fallback.requestedModel.name} was unavailable, so River switched to ${data.fallback.model.name}.`,
        });
      }
    },

    onError: (_error, _variables, context) => {
      if (context?.previousChat) {
        queryClient.setQueryData(["chat", chatId], context.previousChat);
      }

      toast.error("Failed to send message", {
        description: "Something went wrong. Please try again.",
      });
    },
  });

  return {
    sendMessageMutation,
    isSendingMessage,
    isSendMessagesError,
  };
}
