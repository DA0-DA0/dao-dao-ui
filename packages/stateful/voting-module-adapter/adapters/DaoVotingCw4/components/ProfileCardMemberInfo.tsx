import { useDaoInfoContext } from '@dao-dao/stateless'
import { BaseProfileCardMemberInfoProps } from '@dao-dao/types'

import { useMembership } from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { ProfileCardMemberInfo as StatelessProfileCardMemberInfo } from '../ui/ProfileCardMemberInfo'

export const ProfileCardMemberInfo = ({
  maxGovernanceTokenDeposit: _,
  ...props
}: BaseProfileCardMemberInfoProps) => {
  const { name: daoName, chainId } = useDaoInfoContext()
  const { coreAddress } = useVotingModuleAdapterOptions()

  const { walletVotingWeight, totalVotingWeight } = useMembership({
    coreAddress,
    chainId,
  })

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
