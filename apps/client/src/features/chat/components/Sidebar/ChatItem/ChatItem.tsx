import { Link, useParams } from "react-router";

import type { Chat } from "@river/types";
import { ChatItemMenu } from "./ChatItemMenu";
import { cn } from "@river/ui";
import { useState } from "react";
import { DeleteChatDialog } from "../../Dialogs/DeleteChatDialog";
import { RenameChatDialog } from "../../Dialogs/RenameChatDialog";
import { useChat } from "@/features/chat/hooks/useChat";

interface ChatItemProps {
  chat: Chat;
}

export function ChatItem({ chat }: ChatItemProps) {
  const [renameOpen, setRenameOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const { chatId } = useParams();

  const isActive = chatId === chat._id;

  const { deleteChatMutation, updateChatTitleMutation, isUpdatingChatTitle, isDeletingChat } =
    useChat();

  return (
    <>
      <Link
        to={`/chat/${chat._id}`}
        className={cn(
          "block rounded-lg px-3 py-2 text-sm transition-colors",
          isActive ? "bg-zinc-200 font-medium" : "hover:bg-zinc-100",
        )}
      >
        <p className="truncate">{chat.title}</p>
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "opacity-0 transition-opacity group-hover:opacity-100",
            isActive && "opacity-100",
          )}
        >
          <ChatItemMenu onRename={() => setRenameOpen(true)} onDelete={() => setDeleteOpen(true)} />
        </div>
      </Link>
      <RenameChatDialog
        open={renameOpen}
        title={chat.title}
        isLoading={isUpdatingChatTitle}
        onClose={() => setRenameOpen(false)}
        onSave={(title) =>
          updateChatTitleMutation(
            {
              chatId: chat._id,
              title,
            },
            {
              onSuccess() {
                setRenameOpen(false);
              },
            },
          )
        }
      />

      <DeleteChatDialog
        open={deleteOpen}
        isLoading={isDeletingChat}
        onClose={() => setDeleteOpen(false)}
        onDelete={() =>
          deleteChatMutation(chat._id, {
            onSuccess() {
              setDeleteOpen(false);
            },
          })
        }
      />
    </>
  );
}
