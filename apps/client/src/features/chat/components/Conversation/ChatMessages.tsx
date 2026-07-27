import type { Message } from "@river/types";

import { MessageBubble } from "./MessageBubble/MessageBubble";
import { useAutoScroll } from "@/hooks/useAutoScroll";

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const containerRef = useAutoScroll(messages);
  return (
    <div ref={containerRef} className="flex-1 space-y-6 overflow-y-auto p-6">
      {messages.map((message) => (
        <MessageBubble key={message._id} message={message} />
      ))}
    </div>
  );
}
