import { EntityDisplay as StatelessEntityDisplay } from '@dao-dao/stateless'
import { StatefulEntityDisplayProps } from '@dao-dao/types'

import { useEntity } from '../hooks'

export const EntityDisplay = (props: StatefulEntityDisplayProps) => {
  const profile = useEntity({
    address: props.address,
    walletHexPublicKey: props.walletHexPublicKey,
  })

  return <StatelessEntityDisplay {...props} loadingEntity={profile} />
}
