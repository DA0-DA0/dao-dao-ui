import { ProfileDisplay as StatelessProfileDisplay } from '@dao-dao/stateless'
import { ProfileDisplayProps } from '@dao-dao/types'

import { useProfile } from '../hooks'

export const ProfileDisplay = (
  props: Omit<ProfileDisplayProps, 'loadingProfile'>
) => {
  const profile = useProfile({
    address: props.address,
  })

  return <StatelessProfileDisplay {...props} loadingProfile={profile} />
}
