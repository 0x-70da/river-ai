import type { Message } from "@river/types";

import { cn } from "@river/ui";

import { MessageContent } from "./MessageContent";
import { MessageFooter } from "./MessageFooter";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { role } = message;
  const isUser = role === "user";

  return (
    <div className={cn("group flex w-full gap-4", isUser && "flex-row-reverse")}>
      <div className="flex max-w-full flex-col gap-2">
        <MessageContent message={message} />

        <MessageFooter message={message} />
      </div>
    </div>
  );
}
