import { useProfile } from '@dao-dao/state'
import { ProfileDisplayProps } from '@dao-dao/types'
import { ProfileDisplay as StatelessProfileDisplay } from '@dao-dao/stateless'

export const ProfileDisplay = (
  props: Omit<ProfileDisplayProps, 'loadingProfile'>
) => {
  const { profile } = useProfile({
    walletAddress: props.address,
  })

  return <StatelessProfileDisplay {...props} loadingProfile={profile} />
}
