import { Sensors } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { ButtonProps } from '@dao-dao/types'

import { Button } from '../buttons'

export interface ConnectWalletProps
  extends Partial<Omit<ButtonProps, 'onClick' | 'size'>> {
  onConnect: () => void
  className?: string
}

export const ConnectWallet = ({ onConnect, ...props }: ConnectWalletProps) => {
  const { t } = useTranslation()

  return (
    <Button {...props} onClick={onConnect} size="lg">
      <Sensors className="!h-6 !w-6" />
      <p>{t('button.connectWallet')}</p>
    </Button>
  )
}
