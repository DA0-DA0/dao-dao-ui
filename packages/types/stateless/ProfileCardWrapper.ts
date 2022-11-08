import { ReactNode } from 'react'

import { WalletProfile } from '../wallet'
import { LoadingData } from './common'

export type ProfileCardWrapperProps = {
  children: ReactNode | ReactNode[]
  walletProfile: LoadingData<WalletProfile>
  showUpdateProfileNft: () => void
  updateProfileName: (name: string | null) => Promise<void>
  underHeaderComponent: ReactNode
  childContainerClassName?: string
} & (
  | {
      established?: Date
      compact?: false
    }
  | {
      established?: never
      compact: true
    }
)
