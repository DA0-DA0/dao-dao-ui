import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { DaoCardInfo, FeaturedDaos } from '../components'

export interface HomeDisconnectedProps {
  featuredDaos: DaoCardInfo[]
}

const maxWidth = 'mx-auto w-full max-w-5xl'
// Max width of 5xl = 64rem, container padding of 6 = 1.5rem
const widthOfSidePadding = 'w-[max((100%-64rem)/2,1.5rem)]'

export const HomeDisconnected = ({ featuredDaos }: HomeDisconnectedProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-8 items-center px-6">
      <p
        className={clsx(
          'h-20 leading-[5rem] border-b border-border-secondary header-text',
          maxWidth
        )}
      >
        {t('title.home')}
      </p>

      <p className={clsx('title-text', maxWidth)}>{t('title.featuredDaos')}</p>

      {/* Featured DAOs container */}
      {/* Margin offsets container padding. */}
      <div className="relative self-stretch px-[1px] -mx-6">
        {/* Left shadow. */}
        <div
          className={clsx(
            'absolute top-0 bottom-0 left-0 z-10',
            widthOfSidePadding
          )}
          style={{
            background:
              'linear-gradient(to left, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 100%)',
          }}
        ></div>

        <FeaturedDaos
          featuredDaos={featuredDaos}
          isDaoPinned={() => false}
          onPin={() => {}}
        />

        {/* Right shadow. */}
        <div
          className={clsx(
            'absolute top-0 right-0 bottom-0 z-10',
            widthOfSidePadding
          )}
          style={{
            background:
              'linear-gradient(to right, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 100%)',
          }}
        ></div>
      </div>
    </div>
  )
}
