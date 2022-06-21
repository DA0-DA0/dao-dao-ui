import { ChevronRightIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { Button, Modal } from '@dao-dao/ui'

interface InstallKeplrProps {
  onClose: () => void
}

export const InstallKeplr: FC<InstallKeplrProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const grafs = t('Need wallet to continue (long)').split('\n')

  return (
    <Modal onClose={onClose}>
      <h1 className="header-text">{t('Need wallet to continue')}</h1>
      {grafs.map((graf) => (
        <p key={graf} className="mt-6 mb-6 body-text">
          {graf}
        </p>
      ))}
      <a href="https://www.keplr.app/" rel="noreferrer" target="_blank">
        <Button>
          {t('Install Keplr')} <ChevronRightIcon className="w-4" />
        </Button>
      </a>
    </Modal>
  )
}
