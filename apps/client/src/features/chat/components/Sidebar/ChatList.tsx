import { ChatItem } from "./ChatItem/ChatItem";
import { useChat } from "../../hooks/useChat";

export function ChatList() {
  const { chats = [], isChatLoading, isChatError } = useChat();
  if (isChatLoading) {
    return <div className="p-4 text-sm text-zinc-500">Loading...</div>;
  }

  if (isChatError) {
    return <div className="p-4 text-sm text-red-500">Failed to load chats.</div>;
  }

  if (chats.length === 0) {
    return <div className="p-4 text-sm text-zinc-500">No chats yet.</div>;
  }

  return (
    <div className="space-y-1 p-2">
      {chats.map((chat) => (
        <ChatItem key={chat._id} chat={chat} />
      ))}
    </div>
  );
}
