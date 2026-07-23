import type { Message } from "@river/types";

import { MessageBubble } from "./MessageBubble";

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-1 space-y-6 overflow-y-auto p-6">
      {messages.map((message) => (
        <MessageBubble key={message._id} role={message.role} content={message.content} />
      ))}
    </div>
  );
}
