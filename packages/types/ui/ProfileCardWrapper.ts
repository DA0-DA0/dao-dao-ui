import { ReactNode } from 'react'

import { WalletProfile } from '../wallet'
import { LoadingData } from './common'

export type ProfileCardWrapperProps = {
  children: ReactNode | ReactNode[]
  walletAddress: string
  walletProfile: LoadingData<WalletProfile>
  showUpdateProfile: () => void
  underHeaderComponent: ReactNode
  childContainerClassName?: string
} & (
  | {
      established: Date
      compact?: false
    }
  | {
      established?: never
      compact: true
    }
)
