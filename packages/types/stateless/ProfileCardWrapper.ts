import { ReactNode } from 'react'

import { WalletProfileData } from '../profile'

export type ProfileCardWrapperProps = {
  children: ReactNode | ReactNode[]
  walletProfileData: WalletProfileData
  showUpdateProfileNft: () => void
  updateProfileName: (name: string | null) => Promise<void>
  underHeaderComponent: ReactNode
  childContainerClassName?: string
  compact?: boolean
}
