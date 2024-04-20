import { SensorsOff } from '@mui/icons-material'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { DisconnectWalletProps } from '@dao-dao/types'

import { Button } from '../buttons'

export const DisconnectWallet = forwardRef<
  HTMLButtonElement,
  DisconnectWalletProps
>(function DisconnectWallet({ onDisconnect, size = 'lg', ...props }, ref) {
  const { t } = useTranslation()

  return (
    <Button {...props} onClick={onDisconnect} ref={ref} size={size}>
      <SensorsOff
        className={clsx({
          '!h-4 !w-4': size === 'sm',
          '!h-5 !w-5': size === 'md',
          '!h-6 !w-6': size === 'lg',
        })}
      />
      <p>{t('button.logOut')}</p>
    </Button>
  )
})
