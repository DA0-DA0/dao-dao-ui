import { WalletProfile } from '../profile'
import { LoadingData } from './common'

export type DaoMemberCardProps = {
  address: string
  votingPowerPercent: LoadingData<number>
  profile: LoadingData<WalletProfile>
}

export type StatefulDaoMemberCardProps = Omit<DaoMemberCardProps, 'profile'>
