import type { Message } from "@river/types";

import { cn } from "@river/ui";

import { Markdown } from "@/components/Markdown/Markdown";

interface Props {
  message: Message;
}

export function MessageContent({ message }: Props) {
  const { role, content } = message;
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "rounded-3xl px-5 py-3",

        isUser ? "bg-primary text-primary-foreground" : "bg-transparent p-0",
      )}
    >
      <Markdown>{content}</Markdown>
    </div>
  );
}
