import type { Chat } from "@river/types";
import { ChatItem } from "./ChatItem";

interface ChatListProps {
  chats?: Chat[] | undefined;
  isChatLoading: boolean;
  isChatError: boolean;
}

export function ChatList({ chats = [], isChatLoading, isChatError }: ChatListProps) {
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
