import { useParams } from "react-router";
import { useChat } from "./hooks/useChat";
import { useMessage } from "./hooks/useMessage";
import { ChatArea } from "./components/ChatArea";

export function ChatPage() {
  const { chatId } = useParams();

  const { chat, isChatLoading, isChatError } = useChat(chatId);

  const { sendMessageMutation, isSendingMessage } = useMessage(chatId || "");

  if (!chatId) {
    return null;
  }

  return (
    <ChatArea
      chat={chat}
      isChatLoading={isChatLoading}
      isChatError={isChatError}
      isSendingMessage={isSendingMessage}
      sendMessageMutation={sendMessageMutation}
    />
  );
}
