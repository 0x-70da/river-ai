import { ChatList } from "@/features/chat/components/Sidebar/ChatList";
import { NewChatButton } from "@/features/chat/components/Sidebar/NewChatButton";

export function Sidebar() {
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
        <ChatList />
      </div>
    </aside>
  );
}
