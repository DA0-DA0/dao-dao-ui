import { Sensors } from '@mui/icons-material'
import { isMobile } from '@walletconnect/browser-utils'
import { useTranslation } from 'react-i18next'

import { MAINNET } from '@dao-dao/utils'

import { Button, ButtonProps } from '../buttons'
import { NoMobileWallet } from './NoMobileWallet'

export interface ConnectWalletProps
  extends Partial<Omit<ButtonProps, 'onClick' | 'size'>> {
  onConnect: () => void
  className?: string
}

export const ConnectWallet = ({ onConnect, ...props }: ConnectWalletProps) => {
  const { t } = useTranslation()

  // WalletConnect does not work on testnet.
  if (isMobile() && !MAINNET) {
    return <NoMobileWallet {...props} />
  }

  return (
    <Button {...props} onClick={onConnect} size="lg">
      <Sensors className="!h-6 !w-6" />
      <p>{t('button.connectWallet')}</p>
    </Button>
  )
}
