import { useRecoilValue } from 'recoil'

import {
  DaoMemberCard as StatelessDaoMemberCard,
  useChain,
} from '@dao-dao/stateless'
import { StatefulDaoMemberCardProps } from '@dao-dao/types/stateless/DaoMemberCard'

import { walletProfileDataSelector } from '../../recoil'

export const DaoMemberCard = (props: StatefulDaoMemberCardProps) => {
  const { chain_id: chainId } = useChain()

  const profileData = useRecoilValue(
    walletProfileDataSelector({
      chainId,
      address: props.address,
    })
  )

  return <StatelessDaoMemberCard {...props} profileData={profileData} />
}
