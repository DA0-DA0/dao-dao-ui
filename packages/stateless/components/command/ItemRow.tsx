import clsx from 'clsx'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { CommandModalContextSectionItem } from '@dao-dao/types/command'
import { toAccessibleImageUrl } from '@dao-dao/utils'

import { TooltipInfoIcon } from '../tooltip'

export interface ItemRowProps {
  item: CommandModalContextSectionItem
  selected: boolean
  onClick: () => void
  className?: string
}

export const ItemRow = forwardRef<HTMLDivElement, ItemRowProps>(
  function ItemRow({ item, selected, onClick, className }, ref) {
    const { t } = useTranslation()

    return (
      <div
        className={clsx(
          'group flex h-9 flex-row items-center gap-2 rounded-md bg-transparent p-3 transition',
          !item.disabled &&
            'cursor-pointer hover:bg-background-interactive-hover',
          !item.disabled && selected && 'bg-background-interactive-hover',
          item.loading && 'animate-pulse',
          item.className,
          className
        )}
        onClick={item.disabled ? undefined : onClick}
        ref={ref}
      >
        {'imageUrl' in item ? (
          <div
            aria-label={t('info.daosLogo')}
            className={clsx(
              'h-6 w-6 rounded-full bg-cover bg-center transition',
              item.disabled ? 'opacity-50' : 'opacity-100'
            )}
            role="img"
            style={
              item.imageUrl
                ? {
                    backgroundImage: `url(${toAccessibleImageUrl(
                      item.imageUrl
                    )})`,
                  }
                : undefined
            }
          ></div>
        ) : (
          <item.Icon
            className={clsx(
              '!h-6 !w-6 !transition',
              item.disabled
                ? 'text-icon-interactive-disabled'
                : 'text-icon-primary'
            )}
          />
        )}

        <p
          className={clsx(
            'link-text grow font-medium transition',
            item.disabled ? 'text-text-interactive-disabled' : 'text-text-body'
          )}
        >
          {item.name}
        </p>

        {!!item.tooltip && (
          <TooltipInfoIcon
            key={
              // Re-render when selected changes. This is because the underlying
              // Material UI tooltip uses the initial state of the `open` prop
              // to determine if the component should be controlled by the
              // `open` prop or listen to touch events. We want to be able to
              // force the tooltip open when this item is selected, and also
              // allow hovering to open the tooltip when this item is not
              // selected. Thus, we need to re-render this component when
              // selected changes.
              selected ? 'selected' : 'unselected'
            }
            open={selected || undefined}
            size="xs"
            title={item.tooltip}
          />
        )}
      </div>
    )
  }
)
