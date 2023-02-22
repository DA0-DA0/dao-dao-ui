import { EntityDisplay as StatelessEntityDisplay } from '@dao-dao/stateless'
import { StatefulEntityDisplayProps } from '@dao-dao/types'

import { useEntity } from '../hooks'

export const EntityDisplay = (props: StatefulEntityDisplayProps) => {
  const loadingEntity = useEntity({
    address: props.address,
  })

  return <StatelessEntityDisplay {...props} loadingEntity={loadingEntity} />
}
