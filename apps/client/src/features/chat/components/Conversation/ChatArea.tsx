import type { ChatDetails } from "@river/types";

import { ChatMessages } from "./ChatMessages";
import { PromptInput } from "../Input/PromptInput";
import { ChatLoading } from "./ChatLoading";
import { ChatError } from "./ChatError";
import { ChatWelcome } from "./ChatWelcome";

interface ChatAreaProps {
  chat?: ChatDetails | undefined;
  isChatLoading: boolean;
  isChatError: boolean;
  onRetry: () => void;
  isSendingMessage: boolean;
  sendMessageMutation: (content: string) => void;
}

export function ChatArea({
  chat,
  isChatLoading,
  isChatError,
  onRetry,
  isSendingMessage,
  sendMessageMutation,
}: ChatAreaProps) {
  if (isChatLoading) {
    return <ChatLoading />;
  }

  if (isChatError || !chat) {
    return <ChatError onRetry={onRetry} />;
  }

  return (
    <div className="flex h-screen flex-col">
      {!chat.messages.length ? <ChatWelcome /> : <ChatMessages messages={chat.messages} />}

      <PromptInput sendMessageMutation={sendMessageMutation} isSendingMessage={isSendingMessage} />
    </div>
  );
}
