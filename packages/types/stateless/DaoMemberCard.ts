import { WalletProfile } from '../profile'
import { LoadingData } from './common'

export interface DaoMemberCardProps {
  address: string
  votingPowerPercent: number
  profile: LoadingData<WalletProfile>
}
