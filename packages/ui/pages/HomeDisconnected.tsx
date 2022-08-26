import { useTranslation } from 'react-i18next'

import { FeaturedDao, FeaturedDaos } from '../components'

export interface HomeDisconnectedProps {
  featuredDaos: FeaturedDao[]
}

export const HomeDisconnected = ({ featuredDaos }: HomeDisconnectedProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-8 items-stretch">
      <p className="px-24 mt-12 header-text">{t('title.home')}</p>

      <div className="mx-24 h-[1px] bg-border-secondary"></div>

      <p className="px-24 title-text">{t('title.featuredDaos')}</p>

      <div className="relative px-[1px]">
        {/* Left shadow. */}
        <div
          className="absolute top-0 bottom-0 left-0 z-10 w-24"
          style={{
            background:
              'linear-gradient(to left, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 100%)',
          }}
        ></div>

        <FeaturedDaos featuredDaos={featuredDaos} />

        {/* Right shadow. */}
        <div
          className="absolute top-0 right-0 bottom-0 z-10 w-24"
          style={{
            background:
              'linear-gradient(to right, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 100%)',
          }}
        ></div>
      </div>
    </div>
  )
}
