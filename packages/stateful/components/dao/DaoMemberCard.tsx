import { DaoMemberCard as StatelessDaoMemberCard } from '@dao-dao/stateless'
import { StatefulDaoMemberCardProps } from '@dao-dao/types/stateless/DaoMemberCard'

import { useWalletProfile } from '../../hooks'

export const DaoMemberCard = (props: StatefulDaoMemberCardProps) => {
  const { profile } = useWalletProfile({ walletAddress: props.address })

  return <StatelessDaoMemberCard {...props} profile={profile} />
}
