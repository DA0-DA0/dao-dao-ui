// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ArrowForward } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { Button, Modal, ModalProps } from '@dao-dao/ui'

export type InstallKeplrProps = Pick<ModalProps, 'visible' | 'onClose'>

export const InstallKeplr = (props: InstallKeplrProps) => {
  const { t } = useTranslation()
  const grafs = t('info.keplrModalWalletExplanation').split('\n')

  return (
    <Modal {...props}>
      <h1 className="header-text">{t('title.needWalletToContinue')}</h1>
      {grafs.map((graf) => (
        <p key={graf} className="body-text mt-6 mb-6">
          {graf}
        </p>
      ))}
      <a href="https://www.keplr.app/" rel="noreferrer" target="_blank">
        <Button>
          {t('button.installKeplr')} <ArrowForward className="!h-4 !w-4" />
        </Button>
      </a>
    </Modal>
  )
}
