import { Check, Link } from '@mui/icons-material'
import clsx from 'clsx'
import {
  ComponentType,
  createElement,
  forwardRef,
  useEffect,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { HeadingComponent } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import { Transformer } from 'unified'
import { Node } from 'unist'
import { visitParents } from 'unist-util-visit-parents'

import { StatefulEntityDisplayProps } from '@dao-dao/types'
import { isValidBech32Address } from '@dao-dao/utils'

import { IconButton } from './icon_buttons/IconButton'

const ENTITY_DISPLAY_NODE_TAG = 'entityDisplay'

type NodeOrElement = Node & {
  value?: string
  tagName?: string
  children?: NodeOrElement[]
  properties?: Record<string, unknown>
}

export type MarkdownRendererProps = {
  markdown: string
  // Adds buttons to copy anchor URLs to the clipboard.
  addAnchors?: boolean
  className?: string
  // If present, will try to render detected addresses as entities.
  EntityDisplay?: ComponentType<StatefulEntityDisplayProps>
}

export const MarkdownRenderer = forwardRef<
  HTMLInputElement,
  MarkdownRendererProps
>(function MarkdownRenderer(
  { markdown, addAnchors, className, EntityDisplay },
  ref
) {
  return (
    <div
      className={clsx(
        'prose prose-sm overflow-auto break-words dark:prose-invert',
        className
      )}
      ref={ref}
    >
      <ReactMarkdown
        components={{
          table: TableRenderer,
          ...(addAnchors
            ? {
                h1: HeadingRenderer,
                h2: HeadingRenderer,
                h3: HeadingRenderer,
                h4: HeadingRenderer,
                h5: HeadingRenderer,
                h6: HeadingRenderer,
              }
            : undefined),
          ...(EntityDisplay
            ? {
                [ENTITY_DISPLAY_NODE_TAG]: EntityDisplay,
              }
            : undefined),
        }}
        linkTarget="_blank"
        rawSourcePos
        rehypePlugins={[
          rehypeSanitize,
          ...(EntityDisplay ? [remarkEntityDisplay] : []),
        ]}
        remarkPlugins={[remarkGfm]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
})

// Scroll tables horizontally if necessary.
const TableRenderer: NormalComponents['table'] = ({
  children,
  className,
  ...props
}) => (
  <div className="styled-scrollbar overflow-x-auto px-2">
    <table {...props} className={clsx('!min-w-max', className)}>
      {children}
    </table>
  </div>
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
      className: 'group/mdlink flex flex-row gap-4 items-center cursor-pointer',
    },
    [
      <span key="children">{children}</span>,
      <IconButton
        key="copy"
        Icon={copied ? Check : Link}
        className="group-hover/mdlink:opacity-100 leading-none opacity-0 transition-opacity"
        size="sm"
        variant="none"
      />,
    ]
  )
}

// Detect valid bech32 addresses in text nodes and replace them with
// EntityDisplay nodes.
const remarkEntityDisplay = () => {
  const transformer: Transformer = (tree) => {
    visitParents(tree, (node, ancestors) => {
      const { value } = node as unknown as { value?: string }
      if (node.type === 'text' && typeof value === 'string') {
        const parent = ancestors[ancestors.length - 1]
        if (!parent) {
          return
        }

        const nodeIndex = (parent as { children: Node[] }).children.indexOf(
          node
        )
        if (nodeIndex < 0) {
          return
        }

        const words = value.split(' ')
        const newNodes = words.reduce((nodes, word) => {
          // Strip non alphanumeric characters, in case address is surrounded by
          // punctuation.
          word = word.replace(/[^a-zA-Z0-9]/gi, '')

          if (isValidBech32Address(word)) {
            // Append entity display node.
            nodes.push({
              type: 'element',
              tagName: ENTITY_DISPLAY_NODE_TAG,
              children: [],
              properties: {
                address: word,
                className: clsx(
                  '!inline-flex',
                  // If surrounded by other words, add some margin and
                  // translation to position it in line with text. If in its own
                  // element, no need for margin and translation.
                  words.length > 1 && 'translate-y-[0.375rem] p-2'
                ),
                copyToClipboardProps: {
                  textClassName: 'm-0',
                },
              },
            })
          } else {
            // Append word to last node if it is a text node, otherwise add a
            // new text node.
            const lastNode = nodes[nodes.length - 1]
            if (lastNode && lastNode.type === 'text') {
              lastNode.value += ' ' + word
            } else {
              nodes.push({
                type: 'text',
                value: word,
              })
            }
          }
          return nodes
        }, [] as NodeOrElement[])

        // If nothing changed, do nothing.
        if (newNodes.length === 1 && newNodes[0].type === 'text') {
          return
        }

        // Otherwise, replace the current node with the new nodes.
        ;(parent as { children: Node[] }).children.splice(
          nodeIndex,
          1,
          ...newNodes
        )
      }
    })
  }

  return transformer
}
