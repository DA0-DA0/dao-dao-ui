import { useProfile } from '@dao-dao/state'
import { ProfileDisplayProps } from '@dao-dao/tstypes'
import { ProfileDisplay as StatelessProfileDisplay } from '@dao-dao/ui'

export const ProfileDisplay = (
  props: Omit<ProfileDisplayProps, 'loadingProfile'>
) => {
  const { profile } = useProfile({
    walletAddress: props.address,
  })

  return <StatelessProfileDisplay {...props} loadingProfile={profile} />
}
