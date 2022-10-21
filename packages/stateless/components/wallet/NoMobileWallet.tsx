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
        header={{
          title: t('info.preReleaseExplanation', { chain: CHAIN_NAME }),
          subtitle: t('info.walletConnectMobileLimitations', {
            chain: CHAIN_NAME,
          }),
        }}
        onClose={() => setShowInfo(false)}
        titleClassName="mb-2"
        visible={showInfo}
      />
    </>
  )
}
