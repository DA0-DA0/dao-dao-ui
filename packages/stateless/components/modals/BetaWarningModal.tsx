import { useTranslation } from 'react-i18next'

import { ModalProps } from '@dao-dao/types'

import { Button } from '../buttons'
import { Modal } from './Modal'

export type BetaWarningModalProps = Pick<ModalProps, 'visible' | 'onClose'>

export const BetaWarningModal = ({
  visible,
  // Don't forward onClose to Modal to force user to use the accept button.
  onClose,
}: BetaWarningModalProps) => {
  const { t } = useTranslation()

  return (
    <Modal
      footerContent={
        <Button center className="w-full" onClick={onClose} size="lg">
          {t('button.acceptTerms')}
        </Button>
      }
      header={{
        title: t('title.beforeYouEnter'),
        subtitle: t('info.tos'),
      }}
      visible={visible}
    />
  )
}
