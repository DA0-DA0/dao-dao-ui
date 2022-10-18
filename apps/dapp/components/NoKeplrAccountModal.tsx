// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ChevronRightIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { Button, Modal, ModalProps } from '@dao-dao/ui'

export type NoKeplrAccountModalProps = Pick<ModalProps, 'visible' | 'onClose'>

export const NoKeplrAccountModal = (props: NoKeplrAccountModalProps) => {
  const { t } = useTranslation()
  const grafs = t('info.configureWalletModalExplanation').split('\n')

  return (
    <Modal {...props}>
      <h1 className="header-text">{t('title.configureWalletToContinue')}</h1>
      {grafs.map((graf) => (
        <p key={graf} className="body-text mt-6 mb-6">
          {graf}
        </p>
      ))}
      <Button onClick={props.onClose}>
        {t('button.gotIt')} <ChevronRightIcon className="w-4" />
      </Button>
    </Modal>
  )
}
