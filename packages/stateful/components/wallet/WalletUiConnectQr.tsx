import { WalletModalProps } from '@cosmos-kit/core'
import QRCode from 'qrcode.react'
import { useTranslation } from 'react-i18next'

import { CopyToClipboard } from '@dao-dao/stateless'

export const WalletUiConnectQr = ({
  walletRepo,
}: Pick<WalletModalProps, 'walletRepo'>) => {
  const { t } = useTranslation()

  if (!walletRepo?.current?.qrUrl?.data) {
    return null
  }

  return (
    <div className="flex flex-col gap-4 -mb-2 items-center">
      <QRCode
        size={500}
        style={{ width: '100%', height: '100%' }}
        value={walletRepo.current.qrUrl.data}
      />

      <CopyToClipboard
        className="text-sm"
        label={t('button.copyToClipboard')}
        value={walletRepo.current.qrUrl.data}
      />
    </div>
  )
}
