import { Search } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

export interface SearchBarProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  containerClassName?: string
  hideIcon?: boolean
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar(
    { containerClassName, className, hideIcon, ...props },
    ref
  ) {
    const { t } = useTranslation()

    return (
      <div
        className={clsx(
          'flex flex-row gap-1 items-center p-2 text-tertiary rounded-md border-2 border-border-interactive-focus focus:border-text-interactive-active active:border-text-interactive-active',
          containerClassName
        )}
      >
        {!hideIcon && <Search className="w-6 h-6 text-icon-primary" />}

        <input
          autoFocus
          className={clsx(
            'grow py-1 pr-4 text-text-primary bg-transparent focus:outline-none secondary-text focus:ring-none',
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
