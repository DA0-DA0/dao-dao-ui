import { SearchIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { ComponentProps, FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface SearchBarProps extends Omit<ComponentProps<'input'>, 'type'> {
  containerClassName?: string
}

export const SearchBar: FC<SearchBarProps> = ({
  containerClassName,
  className,
  ...props
}) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        'flex items-center px-3 text-tertiary border-b border-default',
        containerClassName
      )}
    >
      <SearchIcon className="w-5" />

      <input
        autoFocus
        className={clsx(
          'p-4 w-full bg-transparent focus:outline-none primary-text focus:ring-none',
          className
        )}
        placeholder={t('title.search')}
        type="text"
        {...props}
      />
    </div>
  )
}
