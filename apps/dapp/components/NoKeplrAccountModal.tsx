// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ChevronRightIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { Button, Modal } from '@dao-dao/ui'

interface NoKeplrAccountModalProps {
  onClose: () => void
}

export const NoKeplrAccountModal = ({ onClose }: NoKeplrAccountModalProps) => {
  const { t } = useTranslation()
  const grafs = t('info.configureWalletModalExplanation').split('\n')

  return (
    <Modal onClose={onClose}>
      <h1 className="header-text">{t('title.configureWalletToContinue')}</h1>
      {grafs.map((graf) => (
        <p key={graf} className="mt-6 mb-6 body-text">
          {graf}
        </p>
      ))}
      <Button onClick={onClose}>
        {t('button.gotIt')} <ChevronRightIcon className="w-4" />
      </Button>
    </Modal>
  )
}
