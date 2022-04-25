import { FC } from 'react'

import clsx from 'clsx'
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
    className={clsx('prose prose-sm dark:prose-invert', className)}
  >
    {markdown}
  </ReactMarkdown>
)
