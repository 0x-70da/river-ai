import { Skeleton } from "@river/ui";

export function MessageLoading() {
  return (
    <div className="flex items-center gap-1 py-2">
      <Skeleton className="size-2 rounded-full" />
      <Skeleton className="size-2 rounded-full" />
      <Skeleton className="size-2 rounded-full" />
    </div>
  );
}
