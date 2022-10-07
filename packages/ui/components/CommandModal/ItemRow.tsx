import clsx from 'clsx'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { CommandModalContextSectionItem } from '@dao-dao/tstypes/command'

import { Loader } from '../Loader'

export interface ItemRowProps {
  item: CommandModalContextSectionItem
  selected: boolean
  onClick: () => void
  loading: boolean
  className?: string
}

export const ItemRow = forwardRef<HTMLDivElement, ItemRowProps>(
  function ItemRow({ item, selected, onClick, loading, className }, ref) {
    const { t } = useTranslation()

    return (
      <div
        className={clsx(
          'group flex flex-row gap-2 items-center p-3 h-9 bg-transparent rounded-md transition',
          !item.disabled &&
            'hover:bg-background-interactive-hover cursor-pointer',
          !item.disabled && selected && 'bg-background-interactive-hover',
          className
        )}
        onClick={item.disabled ? undefined : onClick}
        ref={ref}
      >
        {'imageUrl' in item ? (
          <div
            aria-label={t('info.daosLogo')}
            className={clsx(
              'w-6 h-6 bg-center bg-cover rounded-full',
              item.disabled && 'opacity-50'
            )}
            role="img"
            style={{
              backgroundImage: `url(${item.imageUrl})`,
            }}
          ></div>
        ) : (
          <item.Icon
            className={clsx(
              '!w-6 !h-6',
              item.disabled
                ? 'text-icon-interactive-disabled'
                : 'text-icon-primary'
            )}
          />
        )}

        <p
          className={clsx(
            'font-medium link-text',
            item.disabled ? 'text-text-interactive-disabled' : 'text-text-body'
          )}
        >
          {item.name}
        </p>

        {loading && (
          <div className="flex flex-row grow justify-end items-center">
            <Loader fill={false} size={20} />
          </div>
        )}
      </div>
    )
  }
)
