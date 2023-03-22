import { useRecoilValue } from 'recoil'

import { DaoMemberCard as StatelessDaoMemberCard } from '@dao-dao/stateless'
import { StatefulDaoMemberCardProps } from '@dao-dao/types/stateless/DaoMemberCard'

import { walletProfileDataSelector } from '../../recoil'

export const DaoMemberCard = (props: StatefulDaoMemberCardProps) => {
  const profileData = useRecoilValue(
    walletProfileDataSelector({ address: props.address })
  )

  return <StatelessDaoMemberCard {...props} profileData={profileData} />
}
