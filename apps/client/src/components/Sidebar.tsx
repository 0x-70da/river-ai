import { ChatList } from "@/features/chat/components/ChatList";
import { NewChatButton } from "@/features/chat/components/NewChatButton";
import { useChat } from "@/features/chat/hooks/useChat";

export function Sidebar() {
  const { chats, isChatLoading, isChatError } = useChat();

  return (
    <aside
      className="
        flex
        h-screen
        w-72
        flex-col
        border-r
      "
    >
      <div className="border-b p-4">
        <NewChatButton />
      </div>

      <div className="flex-1 overflow-y-auto">
        <ChatList chats={chats} isChatLoading={isChatLoading} isChatError={isChatError} />
      </div>
    </aside>
  );
}
