import { Link, useParams } from "react-router";

import type { Chat } from "@river/types";

interface ChatItemProps {
  chat: Chat;
}

export function ChatItem({ chat }: ChatItemProps) {
  const { chatId } = useParams();

  const isActive = chatId === chat._id;

  return (
    <Link
      to={`/chat/${chat._id}`}
      className={[
        "block rounded-lg px-3 py-2 text-sm transition-colors",
        isActive ? "bg-zinc-200 font-medium" : "hover:bg-zinc-100",
      ].join(" ")}
    >
      <p className="truncate">{chat.title}</p>
    </Link>
  );
}
