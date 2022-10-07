import { useProfile } from '@dao-dao/state'
import { DaoMemberCardProps } from '@dao-dao/tstypes/ui/DaoMemberCard'
import { DaoMemberCard as StatelessDaoMemberCard } from '@dao-dao/ui'

export const DaoMemberCard = (props: Omit<DaoMemberCardProps, 'profile'>) => {
  const { profile } = useProfile({ walletAddress: props.address })

  return <StatelessDaoMemberCard {...props} profile={profile} />
}
