import { FC } from 'react'

import { useVotingModule, useWallet } from '@dao-dao/state'
import {
  MultisigMemberList as StatelessMultisigMemberList,
  MultisigMemberListLoader,
} from '@dao-dao/ui'

import { Loader } from './Loader'
import { useOrgInfoContext } from './OrgPageWrapper'
import { SuspenseLoader } from './SuspenseLoader'

interface MultisigMemberListProps {
  primaryText?: boolean
}

const InnerMultisigMemberList: FC<MultisigMemberListProps> = ({
  primaryText,
}) => {
  const { coreAddress, cw4GroupAddress } = useOrgInfoContext()
  if (!cw4GroupAddress) {
    throw new Error('Failed to load data.')
  }

  const { address: walletAddress } = useWallet()
  const { walletVotingWeight, totalVotingWeight, cw4VotingMembers } =
    useVotingModule(coreAddress, { cw4VotingGroupAddress: cw4GroupAddress })

  if (totalVotingWeight === undefined || !cw4VotingMembers) {
    throw new Error('Failed to load data.')
  }

  return (
    <StatelessMultisigMemberList
      members={cw4VotingMembers}
      primaryText={primaryText}
      totalWeight={totalVotingWeight}
      walletAddress={walletAddress}
      walletWeight={walletVotingWeight}
    />
  )
}

export const MultisigMemberList: FC<MultisigMemberListProps> = ({
  primaryText,
}) => (
  <SuspenseLoader
    fallback={
      <MultisigMemberListLoader loader={<Loader />} primaryText={primaryText} />
    }
  >
    <InnerMultisigMemberList primaryText={primaryText} />
  </SuspenseLoader>
)
