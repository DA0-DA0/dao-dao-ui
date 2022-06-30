import { ChevronRightIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { Button } from '@dao-dao/ui'

interface BetaWarningModalProps {
  onAccept: () => void
}

export const BetaWarningModal: FC<BetaWarningModalProps> = ({ onAccept }) => {
  const { t } = useTranslation()

  return (
    <div className="fixed z-10 flex h-full w-screen items-center justify-center backdrop-blur-sm backdrop-filter">
      <div className="h-min max-w-md rounded-lg border border-focus bg-white p-6">
        <div className="prose prose-sm mb-6 rounded-md dark:prose-invert">
          <h2>{t('title.beforeYouEnter')}</h2>
          <p>{t('info.tos')}</p>
        </div>
        <Button onClick={onAccept}>
          {t('button.acceptTerms')}
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
