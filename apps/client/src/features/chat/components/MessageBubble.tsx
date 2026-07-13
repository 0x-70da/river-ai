import ReactMarkdown from "react-markdown";

import type { MessageRole } from "@river/shared";

interface MessageBubbleProps {
  role: MessageRole;

  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-3xl
          rounded-xl
          px-4
          py-3

          ${isUser ? "bg-blue-600 text-white" : "bg-zinc-100"}
        `}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
