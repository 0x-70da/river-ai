import { useParams } from "react-router";
import { useChat } from "./hooks/useChat";
import { useMessage } from "./hooks/useMessage";
import { ChatArea } from "./components/Conversation/ChatArea";

export function ChatPage() {
  const { chatId } = useParams();

  const { chat, isChatLoading, isChatError, refetchChat } = useChat(chatId);

  const { sendMessageMutation, isSendingMessage } = useMessage(chatId || "");

  if (!chatId) {
    return null;
  }

  return (
    <ChatArea
      chat={chat}
      isChatLoading={isChatLoading}
      isChatError={isChatError}
      onRetry={refetchChat}
      isSendingMessage={isSendingMessage}
      sendMessageMutation={sendMessageMutation}
    />
  );
}
