import { useLayoutEffect, useRef } from "react";

export function useAutoResizeTextarea(value: string) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";

    const scrollHeight = textarea.scrollHeight;

    textarea.style.height = `${scrollHeight}px`;
  }, [value]);

  return textareaRef;
}
