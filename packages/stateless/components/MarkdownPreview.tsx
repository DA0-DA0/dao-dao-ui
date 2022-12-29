import { Check, Link } from '@mui/icons-material'
import clsx from 'clsx'
import { createElement, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { HeadingComponent } from 'react-markdown/lib/ast-to-react'
import remarkGfm from 'remark-gfm'

import { IconButton } from './icon_buttons/IconButton'

export interface MarkdownPreviewProps {
  markdown: string
  // Adds buttons to copy anchor URLs to the clipboard.
  addAnchors?: boolean
  className?: string
}

export const MarkdownPreview = ({
  markdown,
  addAnchors,
  className,
}: MarkdownPreviewProps) => (
  <ReactMarkdown
    className={clsx(
      'prose prose-sm overflow-auto break-words dark:prose-invert',
      className
    )}
    components={
      addAnchors
        ? {
            h1: HeadingRenderer,
            h2: HeadingRenderer,
            h3: HeadingRenderer,
            h4: HeadingRenderer,
            h5: HeadingRenderer,
            h6: HeadingRenderer,
          }
        : undefined
    }
    linkTarget="_blank"
    rawSourcePos
    remarkPlugins={[remarkGfm]}
  >
    {markdown}
  </ReactMarkdown>
)

const HeadingRenderer: HeadingComponent = ({
  children,
  level,
  sourcePosition,
}) => {
  const { t } = useTranslation()
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
        toast.success(t('info.copiedLinkToClipboard'))
      },
      className: 'group flex flex-row gap-4 items-center cursor-pointer',
    },
    [
      <span key="children">{children}</span>,
      <IconButton
        key="copy"
        Icon={copied ? Check : Link}
        className="leading-none opacity-0 transition-opacity group-hover:opacity-100"
        size="sm"
        variant="none"
      />,
    ]
  )
}
