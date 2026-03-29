'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="w-full h-full overflow-auto bg-zinc-950 p-8">
      <article className="prose prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: (props: any) => (
              <h1 className="text-3xl font-bold mt-6 mb-4 text-zinc-100" {...props} />
            ),
            h2: (props: any) => (
              <h2 className="text-2xl font-bold mt-5 mb-3 text-zinc-100" {...props} />
            ),
            h3: (props: any) => (
              <h3 className="text-xl font-bold mt-4 mb-2 text-zinc-100" {...props} />
            ),
            p: (props: any) => (
              <p className="my-3 text-zinc-300 leading-relaxed" {...props} />
            ),
            pre: (props: any) => (
              <pre className="bg-zinc-900 border border-zinc-800 rounded p-4 my-4 overflow-x-auto" {...props} />
            ),
            code: ({ inline, ...props }: any) =>
              inline ? (
                <code className="bg-zinc-900 px-2 py-1 rounded text-sm text-zinc-100" {...props} />
              ) : (
                <code className="text-zinc-100" {...props} />
              ),
            a: (props: any) => (
              <a className="text-blue-400 hover:text-blue-300 underline" {...props} />
            ),
            blockquote: (props: any) => (
              <blockquote className="border-l-4 border-zinc-700 pl-4 italic text-zinc-400 my-4" {...props} />
            ),
            table: (props: any) => (
              <table className="border-collapse border border-zinc-700 w-full my-4" {...props} />
            ),
            th: (props: any) => (
              <th className="border border-zinc-700 bg-zinc-900 px-4 py-2 text-left" {...props} />
            ),
            td: (props: any) => (
              <td className="border border-zinc-700 px-4 py-2" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
