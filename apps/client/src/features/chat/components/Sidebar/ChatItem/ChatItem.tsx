import { Link, useParams } from "react-router";

import type { Chat } from "@river/types";
import { cn } from "@river/ui";

import { ChatItemMenu } from "./ChatItemMenu";

interface ChatItemProps {
  chat: Chat;
}

export function ChatItem({ chat }: ChatItemProps) {
  const { chatId } = useParams();

  const isActive = chatId === chat._id;

  return (
    <Link
      to={`/chat/${chat._id}`}
      className={cn(
        "group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
        isActive ? "bg-zinc-200 font-medium" : "hover:bg-zinc-100",
      )}
    >
      <p className="min-w-0 truncate">{chat.title}</p>

      <div
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        className={cn(
          "ml-2 flex size-6 shrink-0 items-center justify-center rounded-lg transition-opacity",
          "opacity-0 hover:bg-zinc-300",
          "group-hover:opacity-100",
          isActive && "opacity-100",
        )}
      >
        <ChatItemMenu chatId={chat._id} chatTitle={chat.title} />
      </div>
    </Link>
  );
}
