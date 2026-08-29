import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@river/ui";
import { useChat } from "../../hooks/useChat";

export function DeleteChatDialog({
  isOpen,
  onOpenChange,
  chatId,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  chatId: string;
}) {
  const { deleteChatMutation, isDeletingChat } = useChat();

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete chat?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant="destructive" size="sm">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            size="sm"
            disabled={isDeletingChat}
            onClick={() => {
              if (!chatId) return;
              deleteChatMutation(chatId!);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
