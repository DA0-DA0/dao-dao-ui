import { useTranslation } from 'react-i18next'

import { Sensors } from '@dao-dao/icons'

import { Button, ButtonProps } from '../Button'

export interface ConnectWalletProps extends Partial<ButtonProps> {
  onConnect: () => void
  className?: string
}

export const ConnectWallet = ({ onConnect, ...props }: ConnectWalletProps) => {
  const { t } = useTranslation()

  return (
    <Button onClick={onConnect} size="lg" {...props}>
      <Sensors className="w-5 h-5" />
      <p>{t('button.connectWallet')}</p>
    </Button>
  )
}
