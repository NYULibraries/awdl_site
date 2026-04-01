import ReactMarkdown from 'react-markdown';

interface MarkdownBodyProps {
  content: string;
}

export default function MarkdownBody({ content }: MarkdownBodyProps) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => (
          <a href={href} target='_blank' rel='noopener noreferrer'>
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
