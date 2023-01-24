import { NftCardProps, NftCard as StatelessNftCard } from '@dao-dao/stateless'

import { EntityDisplay } from './EntityDisplay'

export const NftCard = (props: Omit<NftCardProps, 'EntityDisplay'>) => (
  <StatelessNftCard {...props} EntityDisplay={EntityDisplay} />
)
