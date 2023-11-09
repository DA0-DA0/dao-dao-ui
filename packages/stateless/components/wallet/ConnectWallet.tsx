import { Sensors } from '@mui/icons-material'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonProps } from '@dao-dao/types'

import { Button } from '../buttons'

export interface ConnectWalletProps
  extends Partial<Omit<ButtonProps, 'onClick'>> {
  onConnect?: () => void
  className?: string
}

export const ConnectWallet = forwardRef<HTMLButtonElement, ConnectWalletProps>(
  function ConnectWallet({ onConnect, size = 'lg', ...props }, ref) {
    const { t } = useTranslation()

    return (
      <Button {...props} onClick={onConnect} ref={ref} size={size}>
        <Sensors
          className={clsx({
            '!h-4 !w-4': size === 'sm',
            '!h-5 !w-5': size === 'md',
            '!h-6 !w-6': size === 'lg',
          })}
        />
        <p>{t('button.logIn')}</p>
      </Button>
    )
  }
)
