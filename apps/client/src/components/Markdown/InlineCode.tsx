import type { ComponentProps } from "react";

export function InlineCode(props: ComponentProps<"code">) {
  return (
    <code
      {...props}
      className="
        rounded-md
        bg-zinc-200/70
        px-1.5
        py-0.5
        font-mono
        text-[0.9em]
        text-inherit
      "
    />
  );
}
