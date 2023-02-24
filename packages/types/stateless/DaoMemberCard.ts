import { WalletProfileData } from '../profile'
import { LoadingData } from './common'

export type DaoMemberCardProps = {
  address: string
  votingPowerPercent: LoadingData<number>
  profileData: WalletProfileData
}

export type StatefulDaoMemberCardProps = Omit<DaoMemberCardProps, 'profileData'>
