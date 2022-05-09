import clsx from 'clsx'
import { FC } from 'react'
import ReactMarkdown from 'react-markdown'

export interface MarkdownPreviewProps {
  markdown: string
  className?: string
}

export const MarkdownPreview: FC<MarkdownPreviewProps> = ({
  markdown,
  className,
}) => (
  <ReactMarkdown
    className={clsx('break-all prose prose-sm dark:prose-invert', className)}
    linkTarget="_blank"
  >
    {markdown}
  </ReactMarkdown>
)
