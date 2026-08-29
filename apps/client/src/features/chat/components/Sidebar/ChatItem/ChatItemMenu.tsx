import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button, DropdownMenuGroup } from "@river/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@river/ui";
import { DeleteChatDialog } from "../../Dialogs/DeleteChatDialog";
import { RenameChatDialog } from "../../Dialogs/RenameChatDialog";
import { useState } from "react";

export function ChatItemMenu({ chatId, chatTitle }: { chatId: string; chatTitle: string }) {
  const [isRenamingChatTitle, setIsRenamingChatTitle] = useState(false);
  const [isDeletingChat, setIsDeletingChat] = useState(false);

  return (
    <>
      <RenameChatDialog
        isOpen={isRenamingChatTitle}
        onOpenChange={setIsRenamingChatTitle}
        chatId={chatId}
        initialTitle={chatTitle}
      />
      <DeleteChatDialog isOpen={isDeletingChat} onOpenChange={setIsDeletingChat} chatId={chatId} />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button type="button" variant="ghost" size="icon" className="size-6" />}
        >
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-zinc-100 rounded-2xl shadow-md">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="w-full cursor-pointer rounded-lg outline-none hover:border-zinc-300 hover:bg-zinc-200"
              onClick={() => {
                setIsRenamingChatTitle(true);
              }}
            >
              <span className="flex items-center gap-2 w-full cursor-pointer rounded-lg px-2 py-1 text-sm outline-none hover:border-zinc-300 hover:bg-zinc-200">
                <Pencil className="mr-2 size-4" />
                Rename
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="w-full cursor-pointer rounded-lg text-destructive outline-none hover:border-zinc-300 hover:bg-zinc-200"
              onClick={() => {
                setIsDeletingChat(true);
              }}
            >
              <span className="flex items-center gap-2 w-full cursor-pointer rounded-lg px-2 py-1 text-sm outline-none hover:border-zinc-300 hover:bg-zinc-200">
                <Trash2 className="mr-2 size-4" />
                Delete
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
