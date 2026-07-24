import { useState } from "react";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from "@river/ui";
import { useChat } from "../../hooks/useChat";
import { useParams } from "react-router";

export function RenameChatDialog({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const { chatId } = useParams<{ chatId: string }>();
  const { chat, updateChatTitleMutation, isUpdatingChatTitle } = useChat(chatId);
  const [value, setValue] = useState(chat?.title || "");

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed) return;

    updateChatTitleMutation({ chatId: chatId!, title: trimmed });
    onOpenChange(false);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onOpenChange(false);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename chat</DialogTitle>
        </DialogHeader>

        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={isUpdatingChatTitle} onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
