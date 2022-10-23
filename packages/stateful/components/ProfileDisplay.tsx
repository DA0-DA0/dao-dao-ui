import { useProfile } from '@dao-dao/state'
import { ProfileDisplay as StatelessProfileDisplay } from '@dao-dao/stateless'
import { ProfileDisplayProps } from '@dao-dao/types'

export const ProfileDisplay = (
  props: Omit<ProfileDisplayProps, 'loadingProfile'>
) => {
  const { profile } = useProfile({
    walletAddress: props.address,
  })

  return <StatelessProfileDisplay {...props} loadingProfile={profile} />
}
