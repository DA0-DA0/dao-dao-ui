import { State, WalletModalProps } from '@cosmos-kit/core'
import QRCode from 'qrcode.react'

export const WalletUiConnectQr = ({ walletRepo }: WalletModalProps) => {
  if (
    !walletRepo?.current ||
    !walletRepo.isWalletConnecting ||
    walletRepo.current?.qrUrl.state !== State.Done ||
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
