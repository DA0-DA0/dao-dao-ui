import { Sensors } from '@mui/icons-material'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { IconButtonProps } from '@dao-dao/types'

import { IconButton } from '../icon_buttons'
import { Tooltip } from '../tooltip'

export interface ConnectWalletIconProps
  extends Partial<Omit<IconButtonProps, 'onClick'>> {
  onConnect?: () => void
  className?: string
}

export const ConnectWalletIcon = forwardRef<
  HTMLButtonElement,
  ConnectWalletIconProps
>(function ConnectWallet({ onConnect, ...props }, ref) {
  const { t } = useTranslation()

  return (
    <Tooltip title={t('button.logIn')}>
      <IconButton
        variant="brand"
        {...props}
        Icon={Sensors}
        onClick={onConnect}
        ref={ref}
      />
    </Tooltip>
  )
})
