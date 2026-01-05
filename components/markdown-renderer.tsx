"use client"

import { useTheme } from 'next-themes';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { theme } = useTheme();

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1({node, children, ...props}) {
          // Create anchor ID from heading text
          const anchorId = String(children)
            .toLowerCase()
            .replace(/[^a-z0-9а-яё]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

          return (
            <h1 id={anchorId} {...props}>
              <a href={`#${anchorId}`} className="no-underline hover:underline">
                {children}
              </a>
            </h1>
          );
        },
        h2({node, children, ...props}) {
          // Create anchor ID from heading text
          const anchorId = String(children)
            .toLowerCase()
            .replace(/[^a-z0-9а-яё]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

          return (
            <h2 id={anchorId} {...props}>
              <a href={`#${anchorId}`} className="no-underline hover:underline">
                {children}
              </a>
            </h2>
          );
        },
        code({node, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter
              style={atomDark}
              language={match[1]}
              PreTag="div"
              className="not-prose"
              customStyle={{
                margin: '0em',
                padding: '0em',
                background: 'transparent',
                border: 'none',
                overflow: 'auto'
              }}
              codeTagProps={{
                style: {
                  lineHeight: '24px'
                }
              }}
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
}