import { useTranslation } from 'react-i18next'

import { Button } from '../buttons'
import { Modal, ModalProps } from './Modal'

export const BetaWarningModal = ({
  onClose,
  ...props
}: Omit<ModalProps, 'header' | 'children' | 'hideCloseButton'>) => {
  const { t } = useTranslation()

  return (
    <Modal
      // Don't set onClose here, forcing them to click accept button.
      {...props}
      header={{
        title: t('title.beforeYouEnter'),
        subtitle: t('info.tos'),
      }}
      hideCloseButton
    >
      <Button center onClick={onClose} size="lg">
        {t('button.acceptTerms')}
      </Button>
    </Modal>
  )
}
