import { TriangleAlert } from "lucide-react";

import { Button } from "@river/ui";
import { useChat } from "../../hooks/useChat";
import { useParams } from "react-router";

export function ChatError() {
  const { chatId } = useParams<{ chatId: string }>();
  const { refetchChat } = useChat(chatId);
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <TriangleAlert className="mb-5 size-9 text-destructive" />

      <h2 className="text-lg font-semibold">Something went wrong</h2>

      <p className="mt-2 text-sm text-muted-foreground">Failed to load this conversation.</p>

      <Button className="mt-6" onClick={() => refetchChat()}>
        Retry
      </Button>
    </div>
  );
}
