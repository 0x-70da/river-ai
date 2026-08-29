import { useState } from "react";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";
import { useModels } from "@/features/models/useModels";
import { ModelSelector } from "@/features/models/components/ModelSelector";

interface PromptInputProps {
  isSendingMessage: boolean;
  sendMessageMutation: (payload: { content: string; modelId: string }) => void;
}

export function PromptInput({ isSendingMessage, sendMessageMutation }: PromptInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useAutoResizeTextarea(value);

  const { models = [], isLoadingModels } = useModels();

  const [modelId, setModelId] = useState(models[0]?.id || "");

  function handleSubmit() {
    const message = value.trim();
    if (!message || !modelId) return;

    sendMessageMutation({ content: message, modelId });
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

        <ModelSelector
          models={models}
          modelId={modelId}
          onChange={setModelId}
          disabled={isLoadingModels || isSendingMessage}
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
