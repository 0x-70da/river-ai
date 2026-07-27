import type { Message } from "@river/types";

import { MessageActions } from "./MessageActions";
import { cn } from "@river/ui";

interface Props {
  message: Message;
}

export function MessageFooter({ message }: Props) {
  return (
    <div className={cn("flex items-center gap-1 px-1", message.role === "user" && "self-end")}>
      <span className="text-xs text-muted-foreground">
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>

      <MessageActions message={message} />
    </div>
  );
}
