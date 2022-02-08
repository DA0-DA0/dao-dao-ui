import { useThemeContext } from 'contexts/theme'
import ReactMarkdown from 'react-markdown'

export function MarkdownPreview({ markdown }: { markdown: string }) {
  const theme = useThemeContext()
  return (
    <ReactMarkdown
      className={`prose ${theme.theme === 'junoDark' && ' prose-invert'}`}
    >
      {markdown}
    </ReactMarkdown>
  )
}
