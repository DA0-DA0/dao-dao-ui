import { DaoMemberCard as StatelessDaoMemberCard } from '@dao-dao/stateless'
import { DaoMemberCardProps } from '@dao-dao/types/stateless/DaoMemberCard'

import { useProfile } from '../../hooks'

export const DaoMemberCard = (props: Omit<DaoMemberCardProps, 'profile'>) => {
  const { profile } = useProfile({ walletAddress: props.address })

  return <StatelessDaoMemberCard {...props} profile={profile} />
}
