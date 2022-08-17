import { CheckCircleIcon } from '@heroicons/react/outline'
import { LinkIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { createElement, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { HeadingComponent } from 'react-markdown/lib/ast-to-react'

export interface MarkdownPreviewProps {
  markdown: string
  className?: string
}

export const MarkdownPreview = ({
  markdown,
  className,
}: MarkdownPreviewProps) => (
  <ReactMarkdown
    className={clsx('break-words prose prose-sm dark:prose-invert', className)}
    components={{
      h1: HeadingRenderer,
      h2: HeadingRenderer,
      h3: HeadingRenderer,
      h4: HeadingRenderer,
      h5: HeadingRenderer,
      h6: HeadingRenderer,
    }}
    linkTarget="_blank"
    rawSourcePos
  >
    {markdown}
  </ReactMarkdown>
)

const HeadingRenderer: HeadingComponent = ({
  children,
  level,
  sourcePosition,
}) => {
  const [copied, setCopied] = useState(false)
  // Unset copied after 2 seconds.
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 2000)
    // Cleanup on unmount.
    return () => clearTimeout(timeout)
  }, [copied])

  const id = `L${sourcePosition!.start.line}`

  return createElement(
    'h' + level,
    {
      id,
      onClick: () => {
        const url = new URL(window.location.href)
        url.hash = '#' + id
        navigator.clipboard.writeText(url.href)
        setCopied(true)
      },
      className: 'group flex flex-row gap-4 items-center cursor-pointer',
    },
    [
      <span key="children">{children}</span>,
      <button
        key="copy"
        className="leading-none opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <CheckCircleIcon className="w-4" />
        ) : (
          <LinkIcon className="w-4" />
        )}
      </button>,
    ]
  )
}
