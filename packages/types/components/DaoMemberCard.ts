import { LoadingData } from '../misc'
import { WalletProfileData } from '../profile'

export type DaoMemberCardProps = {
  address: string
  balance: {
    label: string
    unit?: string
    value: LoadingData<string>
  }
  votingPowerPercent: LoadingData<number>
  profileData: WalletProfileData
}

export type StatefulDaoMemberCardProps = Omit<DaoMemberCardProps, 'profileData'>
