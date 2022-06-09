import { ChevronRightIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import i18n from '@dao-dao/i18n'
import { Button, Modal } from '@dao-dao/ui'

interface NoKeplrAccountModalProps {
  onClose: () => void
}

export const NoKeplrAccountModal: FC<NoKeplrAccountModalProps> = ({
  onClose,
}) => {
  const grafs = i18n.t('Configure wallet to continue (long)').split('\n')
  return (
    <Modal onClose={onClose}>
      <h1 className="header-text">{i18n.t('Configure wallet to continue')}</h1>
      {grafs.map((graf) => (
        <p className="mt-6 mb-6 body-text">{graf}</p>
      ))}
      <Button onClick={onClose}>
        Got it <ChevronRightIcon className="w-4" />
      </Button>
    </Modal>
  )
}
