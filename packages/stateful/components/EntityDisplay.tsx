import { EntityDisplay as StatelessEntityDisplay } from '@dao-dao/stateless'
import { StatefulEntityDisplayProps } from '@dao-dao/types'

import { useEntity } from '../hooks'

// TODO: Extract chain ID from bech32 address prefix, since any addresses can
// now be rendered in markdown.
export const EntityDisplay = (props: StatefulEntityDisplayProps) => {
  const loadingEntity = useEntity({
    address: props.address,
    chainId: props.chainId,
  })

  return <StatelessEntityDisplay {...props} loadingEntity={loadingEntity} />
}
