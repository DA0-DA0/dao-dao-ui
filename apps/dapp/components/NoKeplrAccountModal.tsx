import { ChevronRightIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { Button, Modal } from '@dao-dao/ui'

interface NoKeplrAccountModalProps {
  onClose: () => void
}

export const NoKeplrAccountModal: FC<NoKeplrAccountModalProps> = ({
  onClose,
}) => {
  const { t } = useTranslation()
  const grafs = t('Configure wallet to continue (long)').split('\n')

  return (
    <Modal onClose={onClose}>
      <h1 className="header-text">{t('Configure wallet to continue')}</h1>
      {grafs.map((graf) => (
        <p key={graf} className="mt-6 mb-6 body-text">
          {graf}
        </p>
      ))}
      <Button onClick={onClose}>
        {t('gotIt')} <ChevronRightIcon className="w-4" />
      </Button>
    </Modal>
  )
}
