import clsx from 'clsx'
import { useState } from 'react'

import { CollapsibleProps } from '@dao-dao/types/stateless/Collapsible'
import { toAccessibleImageUrl } from '@dao-dao/utils'

import { DropdownIconButton } from './icon_buttons/DropdownIconButton'

const titleClassName =
  'flex grow flex-row items-center gap-2 overflow-hidden py-2 transition-opacity hover:opacity-70 active:opacity-60 cursor-pointer'

export const Collapsible = ({
  label,
  imageUrl,
  link,
  defaultCollapsed = false,
  onExpand,
  indentDropdownSize = 0,
  noContentIndent = false,
  children,
  containerClassName,
  headerClassName,
  contentContainerClassName,
}: CollapsibleProps) => {
  const [expanded, setExpanded] = useState(!defaultCollapsed)
  const toggleExpanded = () => {
    const newExpanded = !expanded
    setExpanded(newExpanded)
    onExpand?.(newExpanded)
  }

  const titleContent = (
    <>
      {!!imageUrl && (
        <div
          className="h-6 w-6 overflow-hidden rounded-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${toAccessibleImageUrl(imageUrl)})`,
          }}
        />
      )}

      <p className="link-text truncate text-text-body">{label}</p>
    </>
  )

  console.log('TK', children)

  return (
    <div className={clsx('flex flex-col gap-4', containerClassName)}>
      <div className={clsx('flex flex-row items-stretch', headerClassName)}>
        {[...Array(indentDropdownSize)].map((_, index) => (
          <div
            key={index}
            // The triangle `IconButton` is w-6 and offset by the container's
            // ml-2, so to center this border beneath the arrow, we need to
            // include the full offset (ml-2) and half the width (w-3), getting
            // w-5.
            className="w-5 shrink-0 border-r border-border-secondary"
          ></div>
        ))}

        <div className="ml-2 flex grow flex-row items-center gap-2 overflow-hidden">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center">
            {children ? (
              <DropdownIconButton
                className="text-icon-primary"
                open={expanded}
                toggle={toggleExpanded}
              />
            ) : (
              <div className="h-1 w-1 rounded-full bg-icon-interactive-disabled"></div>
            )}
          </div>

          {link ? (
            <link.LinkWrapper className={titleClassName} href={link.href}>
              {titleContent}
            </link.LinkWrapper>
          ) : (
            <div className={titleClassName} onClick={toggleExpanded}>
              {titleContent}
            </div>
          )}
        </div>
      </div>

      {children && (
        <div
          className={clsx(
            !expanded && 'hidden',
            !noContentIndent && 'ml-10',
            contentContainerClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}
