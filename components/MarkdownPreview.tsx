import ReactMarkdown from 'react-markdown'

import { useThemeContext } from 'contexts/theme'

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
