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
    className={clsx('prose prose-sm break-words dark:prose-invert', className)}
    linkTarget="_blank"
  >
    {markdown}
  </ReactMarkdown>
)
