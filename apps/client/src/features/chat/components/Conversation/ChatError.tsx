import { TriangleAlert } from "lucide-react";

import { Button } from "@river/ui";

export function ChatError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <TriangleAlert className="mb-5 size-9 text-destructive" />

      <h2 className="text-lg font-semibold">Something went wrong</h2>

      <p className="mt-2 text-sm text-muted-foreground">Failed to load this conversation.</p>

      <Button className="mt-6" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}
