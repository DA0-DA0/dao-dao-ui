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
   * Whether or not other profiles are attached to the current wallet. Only
   * relevant when editable is true. This is used to prompt the user to merge
   * their profiles, and it prevents editing until that is done.
   */
  otherProfilesExist?: boolean
  /**
   * Function to open merge profiles modal. This is only used if
   * editable is true and otherProfilesExist is true.
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
