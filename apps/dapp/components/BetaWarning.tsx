// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ChevronRightIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { Button } from '@dao-dao/ui'

interface BetaWarningModalProps {
  onAccept: () => void
}

export const BetaWarningModal = ({ onAccept }: BetaWarningModalProps) => {
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
