import { useEffect, useRef } from "react";

export function useAutoScroll<T>(dependency: T) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [dependency]);

  return containerRef;
}
