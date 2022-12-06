import { ProfileDisplay as StatelessProfileDisplay } from '@dao-dao/stateless'
import { ProfileDisplayProps } from '@dao-dao/types'

import { useProfile } from '../hooks'

export const ProfileDisplay = (
  props: Omit<ProfileDisplayProps, 'loadingProfile'>
) => {
  // Public key is faster because it's already loaded. Use it if present.
  const { profile } = useProfile(
    props.hexPublicKey
      ? {
          hexPublicKey: props.hexPublicKey,
        }
      : {
          walletAddress: props.address,
        }
  )

  return <StatelessProfileDisplay {...props} loadingProfile={profile} />
}
