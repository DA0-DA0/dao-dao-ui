import { SensorsOff } from '@mui/icons-material'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonProps } from '@dao-dao/types'

import { Button } from '../buttons'

export interface DisconnectWalletProps
  extends Partial<Omit<ButtonProps, 'onClick' | 'size'>> {
  onDisconnect?: () => void
  className?: string
}

export const DisconnectWallet = forwardRef<
  HTMLButtonElement,
  DisconnectWalletProps
>(function DisconnectWallet({ onDisconnect, ...props }, ref) {
  const { t } = useTranslation()

  return (
    <Button {...props} onClick={onDisconnect} ref={ref} size="lg">
      <SensorsOff className="!h-6 !w-6" />
      <p>{t('button.logOut')}</p>
    </Button>
  )
})
