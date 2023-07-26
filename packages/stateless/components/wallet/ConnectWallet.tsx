import { Sensors } from '@mui/icons-material'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonProps } from '@dao-dao/types'

import { Button } from '../buttons'

export interface ConnectWalletProps
  extends Partial<Omit<ButtonProps, 'onClick' | 'size'>> {
  onConnect?: () => void
  className?: string
}

export const ConnectWallet = forwardRef<HTMLButtonElement, ConnectWalletProps>(
  function ConnectWallet({ onConnect, ...props }, ref) {
    const { t } = useTranslation()

    return (
      <Button {...props} onClick={onConnect} ref={ref} size="lg">
        <Sensors className="!h-6 !w-6" />
        <p>{t('button.logIn')}</p>
      </Button>
    )
  }
)
