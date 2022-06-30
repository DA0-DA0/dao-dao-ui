import { SearchIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { ComponentProps, FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'

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
        'flex items-center border-b border-default px-3 text-tertiary',
        containerClassName
      )}
    >
      <SearchIcon className="w-5" />

      <input
        autoFocus
        className={clsx(
          'primary-text focus:ring-none w-full bg-transparent p-4 focus:outline-none',
          className
        )}
        placeholder={t('title.search')}
        type="text"
        {...props}
      />
    </div>
  )
}
