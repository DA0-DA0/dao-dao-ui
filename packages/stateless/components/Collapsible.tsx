import clsx from 'clsx'
import { forwardRef, useState } from 'react'

import { CollapsibleProps } from '@dao-dao/types/components/Collapsible'
import { toAccessibleImageUrl } from '@dao-dao/utils'

import { DropdownIconButton } from './icon_buttons/DropdownIconButton'
import { TooltipInfoIcon } from './tooltip'

const _titleClassName =
  'flex grow flex-row items-center gap-2 overflow-hidden py-2 transition-opacity hover:opacity-70 active:opacity-60 cursor-pointer'

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  function Collapsible(
    {
      label,
      tooltip,
      imageUrl,
      link,
      defaultCollapsed = false,
      onExpand,
      indentDropdownSize = 0,
      noContentIndent = false,
      children,
      containerClassName,
      headerClassName,
      labelClassName,
      labelContainerClassName,
      dropdownContainerClassName,
      contentContainerClassName,
    },
    ref
  ) {
    const [expanded, setExpanded] = useState(!defaultCollapsed)
    const toggleExpanded = () => {
      const newExpanded = !expanded
      setExpanded(newExpanded)
      onExpand?.(newExpanded)
    }

    const titleClassName = clsx(_titleClassName, labelContainerClassName)

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

        <p className={clsx('link-text truncate', labelClassName)}>{label}</p>

        {tooltip && <TooltipInfoIcon size="sm" title={tooltip} />}
      </>
    )

    return (
      <div
        className={clsx('flex flex-col gap-4', containerClassName)}
        ref={ref}
      >
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

          <div
            className={clsx(
              'ml-2 flex grow flex-row items-center gap-2 overflow-hidden',
              dropdownContainerClassName
            )}
          >
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
              'animate-fade-in',
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
)
