import { Check, Copy } from "lucide-react";

import { Button } from "@river/ui";

import { useState } from "react";

import type { Message } from "@river/types";

interface Props {
  message: Message;
}

export function MessageActions({ message }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(message.content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="opacity-0 transition-opacity group-hover:opacity-100">
      <Button variant="ghost" size="icon" onClick={handleCopy}>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
    </div>
  );
}
