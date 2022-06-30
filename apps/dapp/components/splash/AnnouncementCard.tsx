import { ArrowRightIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'

export const AnouncementCard: FC = () => {
  const { t } = useTranslation()

  return (
    <div
      className="mx-2 flex max-w-[780px] flex-row flex-wrap justify-between gap-2 rounded py-7 px-8"
      style={{
        backgroundImage:
          'linear-gradient(rgba(var(--brand), 0.1), rgba(var(--brand), 0.1)), linear-gradient(rgba(var(--light), 0.7), rgba(var(--light), 0.7))',
      }}
    >
      <div className="flex flex-col gap-1">
        <h3 className="primary-text">{t('splash.whatIsADao')}</h3>
        <p className="body-text">{t('splash.whatIsADaoExplanation')}</p>
      </div>
      <a
        className="secondary-text flex flex-row items-center gap-1"
        href="https://nickmerrill.substack.com/p/what-are-daos"
        rel="noopener noreferrer"
        target="_blank"
      >
        <p>{t('splash.readMore')}</p>
        <ArrowRightIcon className="h-3 w-4" />
      </a>
    </div>
  )
}
