import { FC } from 'react'

import { useVotingModule, useWallet } from '@dao-dao/state'
import {
  MultisigMemberList,
  MultisigMemberListLoader,
  SuspenseLoader,
} from '@dao-dao/ui'

import { Loader } from './Loader'
import { useOrgInfoContext } from './OrgPageWrapper'

interface Cw4VotingMemberListProps {
  primaryText?: boolean
}

const InnerCw4VotingMemberList: FC<Cw4VotingMemberListProps> = ({
  primaryText,
}) => {
  const { coreAddress } = useOrgInfoContext()

  const { address: walletAddress } = useWallet()
  const { walletVotingWeight, totalVotingWeight, cw4VotingMembers } =
    useVotingModule(coreAddress, { fetchCw4VotingMembers: true })

  if (totalVotingWeight === undefined || !cw4VotingMembers) {
    throw new Error('Failed to load data.')
  }

  return (
    <MultisigMemberList
      members={cw4VotingMembers}
      primaryText={primaryText}
      totalWeight={totalVotingWeight}
      walletAddress={walletAddress}
      walletWeight={walletVotingWeight}
    />
  )
}

export const Cw4VotingMemberList: FC<Cw4VotingMemberListProps> = ({
  primaryText,
}) => (
  <SuspenseLoader
    fallback={
      <MultisigMemberListLoader loader={<Loader />} primaryText={primaryText} />
    }
  >
    <InnerCw4VotingMemberList primaryText={primaryText} />
  </SuspenseLoader>
)
