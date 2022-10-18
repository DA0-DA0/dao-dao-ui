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
      <Sensors className="h-5 w-5" />
      <p>{t('button.connectWallet')}</p>
    </Button>
  )
}
