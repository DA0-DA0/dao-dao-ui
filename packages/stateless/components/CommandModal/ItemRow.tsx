import clsx from 'clsx'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { CommandModalContextSectionItem } from '@dao-dao/types/command'

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
            style={{
              backgroundImage: `url(${item.imageUrl})`,
            }}
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
            'link-text font-medium transition',
            item.disabled ? 'text-text-interactive-disabled' : 'text-text-body'
          )}
        >
          {item.name}
        </p>
      </div>
    )
  }
)
