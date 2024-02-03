import { Search } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

export interface SearchBarProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'variant'> {
  hideIcon?: boolean
  variant?: 'sm' | 'lg'
  ghost?: boolean
  onIconClick?: () => void
  iconClassName?: string
  containerClassName?: string
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar(
    {
      className,
      hideIcon,
      variant = 'lg',
      ghost,
      onIconClick,
      iconClassName,
      containerClassName,
      ...props
    },
    ref
  ) {
    const { t } = useTranslation()

    return (
      <div
        className={clsx(
          'group/search flex flex-row items-center gap-1.5 rounded-md',
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
          <Search
            className={clsx(
              'group-focus-within/search:text-icon-primary !h-5 !w-5 text-icon-tertiary transition',
              onIconClick && 'cursor-pointer',
              iconClassName
            )}
            onClick={onIconClick}
          />
        )}

        <input
          className={clsx(
            'secondary-text grow bg-transparent leading-4 text-text-tertiary transition placeholder:text-text-tertiary focus:text-text-body focus:outline-none',
            className
          )}
          placeholder={t('title.search')}
          ref={ref}
          size={1}
          type="text"
          {...props}
        />
      </div>
    )
  }
)
