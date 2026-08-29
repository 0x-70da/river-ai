import type { Message } from "@river/types";
import { cn } from "@river/ui";

import { MessageContent } from "./MessageContent";
import { MessageFooter } from "./MessageFooter";
import { MessageLoading } from "./MessageLoading";

interface MessageBubbleProps {
  message: Message & {
    isOptimistic?: boolean;
    isError?: boolean;
  };
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  const isLoading = !isUser && message.isOptimistic;

  return (
    <div className={cn("group flex w-full gap-4", isUser && "flex-row-reverse")}>
      <div className="flex max-w-full flex-col gap-2">
        {isLoading ? (
          <MessageLoading />
        ) : (
          <>
            <MessageContent message={message} />
            <MessageFooter message={message} />
          </>
        )}
      </div>
    </div>
  );
}
