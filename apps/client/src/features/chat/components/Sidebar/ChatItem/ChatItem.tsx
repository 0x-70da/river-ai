import { Link, useParams } from "react-router";

import type { Chat } from "@river/types";
import { ChatItemMenu } from "./ChatItemMenu";
import { cn } from "@river/ui";

interface ChatItemProps {
  chat: Chat;
}

export function ChatItem({ chat }: ChatItemProps) {
  const { chatId } = useParams();

  const isActive = chatId === chat._id;

  return (
    <>
      <Link
        to={`/chat/${chat._id}`}
        className={cn(
          "flex justify-between rounded-lg px-3 py-2 text-sm transition-colors",
          isActive ? "bg-zinc-200 font-medium" : "hover:bg-zinc-100",
        )}
      >
        <p className="truncate">{chat.title}</p>
        <div
          onClick={(e) => e.preventDefault()}
          className={cn(
            "hidden justify-center items-center hover:bg-zinc-300 rounded-lg w-6 h-4",
            isActive && "flex",
          )}
        >
          <ChatItemMenu />
        </div>
      </Link>
    </>
  );
}
