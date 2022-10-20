import { XIcon } from '@heroicons/react/outline'
import { InfoOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CHAIN_NAME } from '@dao-dao/utils'

import { Button, ButtonProps } from '../buttons/Button'
import { Modal } from '../modals/Modal'

export const NoMobileWallet = (
  props: Partial<Omit<ButtonProps, 'onClick' | 'size' | 'variant'>>
) => {
  const { t } = useTranslation()
  const [showInfo, setShowInfo] = useState(false)

  return (
    <>
      <Button
        {...props}
        onClick={() => setShowInfo(true)}
        size="lg"
        variant="ghost"
      >
        <p className="link-text text-xs italic">{t('info.testnet')}</p>
        <InfoOutlined className="!h-3 !w-3" />
      </Button>

      <Modal
        hideCloseButton
        onClose={() => setShowInfo(false)}
        visible={showInfo}
      >
        <div className="flex items-start gap-2">
          <p className="primary-text">
            {t('info.preReleaseExplanation', { chain: CHAIN_NAME })}
          </p>

          <button
            className="rounded-full transition hover:bg-background-secondary"
            onClick={() => setShowInfo(false)}
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <p className="body-text mt-6">
          {t('info.walletConnectMobileLimitations', { chain: CHAIN_NAME })}
        </p>
      </Modal>
    </>
  )
}
