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

export function RenameChatDialog({
  isOpen,
  onOpenChange,
  chatId,
  initialTitle,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  chatId: string;
  initialTitle: string;
}) {
  const { updateChatTitleMutation, isUpdatingChatTitle } = useChat();
  const [value, setValue] = useState(initialTitle);

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed || !chatId) return;

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
