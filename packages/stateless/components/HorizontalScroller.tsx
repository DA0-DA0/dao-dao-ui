import { CheckBoxOutlineBlankRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData } from '@dao-dao/types'

import { Loader } from './logo'
import { NoContent } from './NoContent'

export interface HorizontalScrollerProps<P extends {}> {
  Component: ComponentType<P>
  items: LoadingData<P[]>
  itemClassName?: string
  containerClassName?: string
  shadowClassName?: string
}

export const HorizontalScroller = <P extends {}>({
  Component,
  items,
  itemClassName,
  containerClassName,
  shadowClassName,
}: HorizontalScrollerProps<P>) => {
  const { t } = useTranslation()

  return (
    <div className={clsx('relative', containerClassName)}>
      {/* Left shadow */}
      {!items.loading && items.data.length > 0 && (
        <div
          className={clsx(
            'absolute top-0 bottom-0 left-0 z-10 animate-fade-in',
            shadowClassName
          )}
          style={{
            background:
              'linear-gradient(to left, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 100%)',
          }}
        ></div>
      )}

      {items.loading ? (
        <Loader />
      ) : items.data.length === 0 ? (
        <NoContent
          Icon={CheckBoxOutlineBlankRounded}
          body={t('info.nothingFound')}
        />
      ) : (
        <div className="no-scrollbar w-full overflow-scroll">
          <div className="flex w-max flex-row gap-2 py-1 sm:gap-3 lg:gap-4">
            {items.data.map((item, index) => (
              <div key={index} className={itemClassName}>
                <Component {...item} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Right shadow */}
      {!items.loading && items.data.length > 0 && (
        <div
          className={clsx(
            'absolute top-0 right-0 bottom-0 z-10 animate-fade-in',
            shadowClassName
          )}
          style={{
            background:
              'linear-gradient(to right, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 100%)',
          }}
        ></div>
      )}
    </div>
  )
}
