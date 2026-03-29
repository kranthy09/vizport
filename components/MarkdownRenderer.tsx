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
    <div className="w-full h-full overflow-auto animate-fadeIn" style={{ backgroundColor: 'var(--bg-base)' }}>
      <article className="prose prose-invert mx-auto px-8 py-8 max-w-3xl">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ node, ...props }: any) => (
              <h1
                className="text-4xl font-bold mt-8 mb-4 scroll-mt-16"
                style={{ color: 'var(--text-primary)' }}
                {...props}
              />
            ),
            h2: ({ node, ...props }: any) => (
              <h2
                className="text-3xl font-bold mt-7 mb-3 scroll-mt-16"
                style={{ color: 'var(--text-primary)' }}
                {...props}
              />
            ),
            h3: ({ node, ...props }: any) => (
              <h3
                className="text-2xl font-bold mt-6 mb-2 scroll-mt-16"
                style={{ color: 'var(--text-primary)' }}
                {...props}
              />
            ),
            h4: ({ node, ...props }: any) => (
              <h4
                className="text-xl font-bold mt-5 mb-2"
                style={{ color: 'var(--text-primary)' }}
                {...props}
              />
            ),
            p: ({ node, ...props }: any) => (
              <p
                className="my-4 leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
                {...props}
              />
            ),
            ul: ({ node, ...props }: any) => (
              <ul className="list-disc list-inside my-4 space-y-2" {...props} />
            ),
            ol: ({ node, ...props }: any) => (
              <ol className="list-decimal list-inside my-4 space-y-2" {...props} />
            ),
            li: ({ node, ...props }: any) => (
              <li style={{ color: 'var(--text-secondary)' }} {...props} />
            ),
            pre: ({ node, ...props }: any) => (
              <pre
                className="rounded-lg p-4 my-4 overflow-x-auto border transition-colors duration-150"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border)',
                }}
                {...props}
              />
            ),
            code: ({ node, className, children, ...props }: any) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code
                    className="px-2 py-1 rounded text-sm font-mono transition-colors"
                    style={{
                      backgroundColor: 'rgba(99, 102, 241, 0.1)',
                      color: 'var(--accent-light)',
                    }}
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
              return (
                <code
                  className={`font-mono text-sm ${className ?? ''}`}
                  style={{ color: 'var(--text-primary)' }}
                  {...props}
                >
                  {children}
                </code>
              );
            },
            a: ({ node, ...props }: any) => (
              <a
                className="transition-colors duration-150 underline"
                style={{
                  color: 'var(--accent-light)',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = 'var(--accent-light)';
                }}
                {...props}
              />
            ),
            blockquote: ({ node, ...props }: any) => (
              <blockquote
                className="border-l-4 pl-4 my-4 italic"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--text-muted)',
                }}
                {...props}
              />
            ),
            table: ({ node, ...props }: any) => (
              <div className="overflow-x-auto my-4">
                <table
                  className="border-collapse w-full"
                  style={{
                    borderColor: 'var(--border)',
                  }}
                  {...props}
                />
              </div>
            ),
            thead: ({ node, ...props }: any) => (
              <thead
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border)',
                }}
                {...props}
              />
            ),
            th: ({ node, ...props }: any) => (
              <th
                className="border px-4 py-2 text-left font-semibold"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                {...props}
              />
            ),
            td: ({ node, ...props }: any) => (
              <td
                className="border px-4 py-2"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--text-secondary)',
                }}
                {...props}
              />
            ),
            hr: ({ node, ...props }: any) => (
              <hr
                className="my-6"
                style={{ borderColor: 'var(--border)' }}
                {...props}
              />
            ),
            img: ({ node, ...props }: any) => (
              <img
                className="rounded-lg my-4 max-w-full glow"
                style={{
                  borderColor: 'var(--border)',
                }}
                {...props}
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
