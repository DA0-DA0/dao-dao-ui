import { ProfileDisplay as StatelessProfileDisplay } from '@dao-dao/stateless'
import { StatefulProfileDisplayProps } from '@dao-dao/types'

import { useProfile } from '../hooks'

export const ProfileDisplay = (props: StatefulProfileDisplayProps) => {
  const profile = useProfile({
    address: props.address,
  })

  return <StatelessProfileDisplay {...props} loadingProfile={profile} />
}
