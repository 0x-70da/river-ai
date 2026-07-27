import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { InlineCode } from "./InlineCode";
import { CodeBlock } from "./CodeBlock";

interface MarkdownProps {
  children: string;
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children }) {
          const match = /language-(\w+)/.exec(className || "");

          if (!match) {
            return <InlineCode>{children}</InlineCode>;
          }

          return <CodeBlock language={match[1]} code={String(children).replace(/\n$/, "")} />;
        },

        h1: (props) => <h1 className="mb-4 text-3xl font-bold" {...props} />,

        h2: (props) => <h2 className="mb-3 mt-6 text-2xl font-semibold" {...props} />,

        h3: (props) => <h3 className="mb-2 mt-5 text-xl font-semibold" {...props} />,

        p: (props) => <p className="leading-7 [&:not(:first-child)]:mt-4" {...props} />,

        ul: (props) => <ul className="ml-6 list-disc space-y-1" {...props} />,

        ol: (props) => <ol className="ml-6 list-decimal space-y-1" {...props} />,

        blockquote: (props) => (
          <blockquote
            className="my-4 border-l-4 border-zinc-300 pl-4 italic text-muted-foreground"
            {...props}
          />
        ),

        table: (props) => (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" {...props} />
          </div>
        ),

        th: (props) => <th className="border px-3 py-2 text-left font-semibold" {...props} />,

        td: (props) => <td className="border px-3 py-2" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
