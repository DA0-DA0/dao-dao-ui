import { ArrowForwardIos } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { ModalProps } from '@dao-dao/types'

import { Button } from '../buttons/Button'
import { Modal } from './Modal'

export type NoKeplrAccountModalProps = Pick<ModalProps, 'visible' | 'onClose'>

export const NoKeplrAccountModal = (props: NoKeplrAccountModalProps) => {
  const { t } = useTranslation()

  return (
    <Modal
      {...props}
      footerContent={
        <Button center className="w-full" onClick={props.onClose}>
          {t('button.gotIt')} <ArrowForwardIos className="!h-4 !w-4" />
        </Button>
      }
      header={{
        title: t('title.configureWalletToContinue'),
        subtitle: t('info.configureWalletModalExplanation'),
      }}
      titleClassName="mb-2"
    />
  )
}
