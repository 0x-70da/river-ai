import { Skeleton } from "@river/ui";

export function ChatLoading() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <Skeleton className="h-14 w-2/3 rounded-2xl" />

      <Skeleton className="ml-auto h-14 w-1/2 rounded-2xl" />

      <Skeleton className="h-24 w-3/4 rounded-2xl" />

      <Skeleton className="ml-auto h-12 w-1/3 rounded-2xl" />
    </div>
  );
}
