import { useState } from "react";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";

interface PromptInputProps {
  isSendingMessage: boolean;

  sendMessageMutation: (content: string) => void;
}

export function PromptInput({ isSendingMessage, sendMessageMutation }: PromptInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useAutoResizeTextarea(value);

  function handleSubmit() {
    const message = value.trim();

    if (!message) return;

    sendMessageMutation(message);

    setValue("");
  }

  return (
    <div className="border-t p-4">
      <div className="flex gap-3">
        <textarea
          ref={textareaRef}
          disabled={isSendingMessage}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          className="flex-1 resize-none rounded-lg border p-3"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />

        <button
          disabled={isSendingMessage || value.trim().length === 0}
          onClick={handleSubmit}
          className="rounded-lg bg-black px-6 text-white disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
