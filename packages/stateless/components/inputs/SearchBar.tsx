import { Search } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

export interface SearchBarProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'variant'> {
  containerClassName?: string
  hideIcon?: boolean
  variant?: 'sm' | 'lg'
  ghost?: boolean
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar(
    {
      containerClassName,
      className,
      hideIcon,
      variant = 'lg',
      ghost,
      ...props
    },
    ref
  ) {
    const { t } = useTranslation()

    return (
      <div
        className={clsx(
          'group flex flex-row items-center gap-1.5 rounded-md',
          // Border.
          !ghost &&
            'ring-border-primary focus-within:ring-border-interactive-focus ring-1 transition focus-within:ring-2',
          // Sizing.
          !ghost && {
            'p-1.5': variant === 'sm',
            'p-2': variant === 'lg',
          },
          containerClassName
        )}
      >
        {!hideIcon && (
          <Search className="text-icon-tertiary group-focus-within:text-icon-primary !h-5 !w-5 transition" />
        )}

        <input
          className={clsx(
            'secondary-text text-text-tertiary placeholder:text-text-tertiary focus:text-text-body grow bg-transparent leading-4 transition focus:outline-none',
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
