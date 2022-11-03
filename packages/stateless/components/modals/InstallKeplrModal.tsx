import { ArrowForwardIos } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { ModalProps } from '@dao-dao/types'

import { Button } from '../buttons/Button'
import { Modal } from './Modal'

export type InstallKeplrModalProps = Pick<ModalProps, 'visible' | 'onClose'>

export const InstallKeplrModal = (props: InstallKeplrModalProps) => {
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
          {t('button.installKeplr')} <ArrowForwardIos className="!h-4 !w-4" />
        </Button>
      </a>
    </Modal>
  )
}
