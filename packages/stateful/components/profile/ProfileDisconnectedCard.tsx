import {
  ProfileDisconnectedCardProps,
  ProfileDisconnectedCard as StatelessProfileDisconnectedCard,
} from '@dao-dao/stateless'

import { ConnectWallet } from '../ConnectWallet'

export type StatefulProfileDisconnectedCardProps = Omit<
  ProfileDisconnectedCardProps,
  'connectWallet'
>

export const ProfileDisconnectedCard = (
  props: StatefulProfileDisconnectedCardProps
) => (
  <StatelessProfileDisconnectedCard
    connectWallet={<ConnectWallet />}
    {...props}
  />
)
