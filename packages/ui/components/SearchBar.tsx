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
            'ring-1 ring-border-primary transition focus-within:ring-2 focus-within:ring-border-interactive-focus',
          // Sizing.
          !ghost && {
            'p-1.5': variant === 'sm',
            'p-2': variant === 'lg',
          },
          containerClassName
        )}
      >
        {!hideIcon && (
          <Search className="!h-5 !w-5 text-icon-tertiary transition group-focus-within:text-icon-primary" />
        )}

        <input
          className={clsx(
            'secondary-text grow bg-transparent pr-4 leading-4 text-text-tertiary transition placeholder:text-text-tertiary focus:text-text-body focus:outline-none',
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
