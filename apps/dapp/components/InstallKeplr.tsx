// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ChevronRightIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Modal } from '@dao-dao/ui'

interface InstallKeplrProps {
  onClose: () => void
}

export const InstallKeplr: FC<InstallKeplrProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const grafs = t('info.keplrModalWalletExplanation').split('\n')

  return (
    <Modal onClose={onClose}>
      <h1 className="header-text">{t('title.needWalletToContinue')}</h1>
      {grafs.map((graf) => (
        <p key={graf} className="mt-6 mb-6 body-text">
          {graf}
        </p>
      ))}
      <a href="https://www.keplr.app/" rel="noreferrer" target="_blank">
        <Button>
          {t('button.installKeplr')} <ChevronRightIcon className="w-4" />
        </Button>
      </a>
    </Modal>
  )
}
