import { ReactNode } from 'react'

import { WalletProfileData } from '../profile'

export type WalletProfileHeaderProps = {
  editable: boolean
  profileData: WalletProfileData
  updateProfileName?: (name: string | null) => Promise<void>
  openProfileNftUpdate?: () => void
  className?: string
  children?: ReactNode
}
