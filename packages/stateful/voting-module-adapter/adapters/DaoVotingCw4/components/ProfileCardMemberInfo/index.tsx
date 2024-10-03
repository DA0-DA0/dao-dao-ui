import { useDao } from '@dao-dao/stateless'
import { BaseProfileCardMemberInfoProps } from '@dao-dao/types'

import { useMembership } from '../../../../../hooks'
import { ProfileCardMemberInfo as StatelessProfileCardMemberInfo } from './ProfileCardMemberInfo'

export const ProfileCardMemberInfo = ({
  maxGovernanceTokenDeposit: _,
  ...props
}: BaseProfileCardMemberInfoProps) => {
  const { name: daoName } = useDao()

  const { walletVotingWeight, totalVotingWeight } = useMembership()

  return (
    <StatelessProfileCardMemberInfo
      {...props}
      daoName={daoName}
      votingPower={
        walletVotingWeight === undefined || totalVotingWeight === undefined
          ? { loading: true }
          : {
              loading: false,
              data: (walletVotingWeight / totalVotingWeight) * 100,
            }
      }
    />
  )
}
