import { ReactNode } from 'react'

import { LoadingData } from '../misc'
import { PfpkProfileUpdateFunction, UnifiedProfile } from '../profile'

export type WalletProfileHeaderProps = {
  editable: boolean
  profile: LoadingData<UnifiedProfile>
  updateProfile?: PfpkProfileUpdateFunction
  openProfileNftUpdate?: () => void
  className?: string
  children?: ReactNode
}
