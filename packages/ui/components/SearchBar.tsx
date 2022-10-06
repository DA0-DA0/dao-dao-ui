import { Search } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

export interface SearchBarProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'variant'> {
  containerClassName?: string
  hideIcon?: boolean
  variant?: 'sm' | 'lg'
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar(
    { containerClassName, className, hideIcon, variant = 'lg', ...props },
    ref
  ) {
    const { t } = useTranslation()

    return (
      <div
        className={clsx(
          'group flex flex-row gap-1.5 items-center text-tertiary rounded-md ring-1 focus-within:ring-2 ring-border-primary focus-within:ring-border-interactive-focus transition',
          // Sizing.
          {
            'p-1.5': variant === 'sm',
            'p-2': variant === 'lg',
          },
          containerClassName
        )}
      >
        {!hideIcon && (
          <Search className="!w-5 !h-5 text-icon-tertiary group-focus-within:text-icon-primary transition" />
        )}

        <input
          autoFocus
          className={clsx(
            'grow pr-4 leading-4 text-text-tertiary placeholder:text-text-tertiary focus:text-text-body bg-transparent focus:outline-none transition secondary-text',
            className
          )}
          placeholder={t('title.search')}
          ref={ref}
          type="text"
          {...props}
        />
      </div>
    )
  }
)
