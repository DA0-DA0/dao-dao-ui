import { FC } from 'react'
import ReactMarkdown from 'react-markdown'

export interface MarkdownPreviewProps {
  markdown: string
}

export const MarkdownPreview: FC<MarkdownPreviewProps> = ({ markdown }) => (
  <ReactMarkdown className="prose prose-sm dark:prose-invert">
    {markdown}
  </ReactMarkdown>
)
