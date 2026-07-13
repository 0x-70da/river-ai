import { Loader2, Plus } from "lucide-react";

import { useChat } from "../hooks/useChat";

export function NewChatButton() {
  const { createChatMutation, isChatLoading } = useChat();

  return (
    <button
      onClick={() => createChatMutation()}
      disabled={isChatLoading}
      className="
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-lg
        border
        px-4
        py-3
        transition-colors
        hover:bg-zinc-100
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {isChatLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Plus className="size-4" />
      )}

      <span>New Chat</span>
    </button>
  );
}
