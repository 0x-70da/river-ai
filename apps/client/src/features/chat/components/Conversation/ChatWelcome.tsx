import { MessageSquareDashed } from "lucide-react";

export function ChatWelcome() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 rounded-full bg-zinc-100 p-4">
        <MessageSquareDashed className="size-8 text-zinc-700" />
      </div>

      <h2 className="text-2xl font-semibold">Welcome to River AI</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Start a conversation by asking anything.
      </p>
    </div>
  );
}
