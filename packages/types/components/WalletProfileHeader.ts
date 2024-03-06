import { ReactNode } from 'react'

import { LoadingData } from '../misc'
import { PfpkProfileUpdateFunction, UnifiedProfile } from '../profile'

export type WalletProfileHeaderProps = {
  /**
   * Whether or not to show edit buttons for the profile name and NFT.
   */
  editable: boolean
  /**
   * The profile being displayed.
   */
  profile: LoadingData<UnifiedProfile>
  /**
   * If set, show a tooltip that explains there are multiple profiles attached
   * to the current wallet and prompt to merge them. The type determines the
   * text to show based on the context.
   */
  mergeProfileType?: 'add' | 'merge'
  /**
   * Function to open merge profiles modal. This is only used if editable is
   * true and mergeProfileType is defined.
   */
  openMergeProfilesModal?: () => void
  /**
   * Function to update the profile. This is only used if editable is true.
   */
  updateProfile?: PfpkProfileUpdateFunction
  /**
   * Function to open the profile NFT update modal. This is only used if
   * editable is true.
   */
  openProfileNftUpdate?: () => void
  /**
   * Optional container class name.
   */
  className?: string
  /**
   * Optionally add more components below the header.
   */
  children?: ReactNode
}
