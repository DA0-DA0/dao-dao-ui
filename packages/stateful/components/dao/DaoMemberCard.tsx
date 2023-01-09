import { DaoMemberCard as StatelessDaoMemberCard } from '@dao-dao/stateless'
import { DaoMemberCardProps } from '@dao-dao/types/stateless/DaoMemberCard'

import { useWalletProfile } from '../../hooks'

export const DaoMemberCard = (props: Omit<DaoMemberCardProps, 'profile'>) => {
  const { profile } = useWalletProfile({ walletAddress: props.address })

  return <StatelessDaoMemberCard {...props} profile={profile} />
}
