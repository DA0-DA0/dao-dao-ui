import { ArrowForwardIos } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { ModalProps } from '@dao-dao/types'

import { Button } from '../buttons/Button'
import { Modal } from './Modal'

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
        {t('button.gotIt')} <ArrowForwardIos className="!h-4 !w-4" />
      </Button>
    </Modal>
  )
}
