import type { ChatDetails } from "@river/shared";

import { ChatMessages } from "./ChatMessages";
import { PromptInput } from "./PromptInput";

interface ChatAreaProps {
  chat?: ChatDetails;

  isChatLoading: boolean;

  isChatError: boolean;

  isSendingMessage: boolean;

  sendMessageMutation: (content: string) => void;
}

export function ChatArea({
  chat,
  isChatLoading,
  isChatError,
  isSendingMessage,
  sendMessageMutation,
}: ChatAreaProps) {
  if (isChatLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isChatError || !chat) {
    return (
      <div className="flex h-screen items-center justify-center">
        Failed to load chat.
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <ChatMessages messages={chat.messages} />

      <PromptInput
        sendMessageMutation={sendMessageMutation}
        isSendingMessage={isSendingMessage}
      />
    </div>
  );
}
