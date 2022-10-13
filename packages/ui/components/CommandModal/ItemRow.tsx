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
          'group flex h-9 flex-row items-center gap-2 rounded-md bg-transparent p-3 transition',
          !item.disabled &&
            'cursor-pointer hover:bg-background-interactive-hover',
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
              'h-6 w-6 rounded-full bg-cover bg-center',
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
              '!h-6 !w-6',
              item.disabled
                ? 'text-icon-interactive-disabled'
                : 'text-icon-primary'
            )}
          />
        )}

        <p
          className={clsx(
            'link-text font-medium',
            item.disabled ? 'text-text-interactive-disabled' : 'text-text-body'
          )}
        >
          {item.name}
        </p>

        {loading && (
          <div className="flex grow flex-row items-center justify-end">
            <Loader fill={false} size={20} />
          </div>
        )}
      </div>
    )
  }
)
