import { WalletProfileData } from '../profile'
import { LoadingData } from './common'

export interface DaoMemberCardProps {
  address: string
  votingPowerPercent: LoadingData<number>
  profileData: WalletProfileData
}
