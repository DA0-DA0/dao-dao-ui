import { ProfileDaos as StatelessProfileDaos } from '@dao-dao/stateless'

import { WalletDaos } from '../wallet'
import { ProfileFeed } from './ProfileFeed'

export const ProfileDaos = () => (
  <StatelessProfileDaos ProfileFeed={ProfileFeed} WalletDaos={WalletDaos} />
)
