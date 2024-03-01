import { ReactNode } from 'react'

import { WalletProfileData } from '../profile'

export type ProfileCardWrapperProps = {
  children?: ReactNode | ReactNode[]
  walletProfileData: WalletProfileData
  underHeaderComponent: ReactNode
  childContainerClassName?: string
  compact?: boolean
  className?: string
}
