import { ArrowRightIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'

export const AnouncementCard: FC = () => {
  const { t } = useTranslation('splash')

  return (
    <div
      className="flex flex-row flex-wrap gap-2 justify-between py-7 px-8 mx-2 max-w-[780px] rounded"
      style={{
        backgroundImage:
          'linear-gradient(rgba(var(--brand), 0.1), rgba(var(--brand), 0.1)), linear-gradient(rgba(var(--light), 0.7), rgba(var(--light), 0.7))',
      }}
    >
      <div className="flex flex-col gap-1">
        <h3 className="primary-text">{t('whatIsADao')}</h3>
        <p className="body-text">{t('whatIsADaoExplanation')}</p>
      </div>
      <a
        className="flex flex-row gap-1 items-center secondary-text"
        href="https://nickmerrill.substack.com/p/what-are-daos"
        rel="noopener noreferrer"
        target="_blank"
      >
        <p>{t('readMore')}</p>
        <ArrowRightIcon className="w-4 h-3" />
      </a>
    </div>
  )
}
