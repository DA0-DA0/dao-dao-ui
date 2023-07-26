import { WalletModalProps } from '@cosmos-kit/core'
import QRCode from 'qrcode.react'

import { useWallet } from '../../hooks'

export const WalletUiConnectQr = ({
  walletRepo,
}: Pick<WalletModalProps, 'walletRepo'>) => {
  const { isWalletConnecting } = useWallet()
  if (
    !walletRepo?.current ||
    !isWalletConnecting ||
    !walletRepo.current.qrUrl.data
  ) {
    return null
  }

  return (
    <QRCode
      size={500}
      style={{ width: '100%', height: '100%' }}
      value={walletRepo.current.qrUrl.data}
    />
  )
}
