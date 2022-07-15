import { useWallet } from '@noahsaso/cosmodal'
import { FC } from 'react'

import { useVotingModule } from '@dao-dao/state'
import {
  MultisigMemberList,
  MultisigMemberListLoader,
  SuspenseLoader,
} from '@dao-dao/ui'

import { BaseMembershipProps } from '../../../types'

interface MembershipProps extends BaseMembershipProps {
  primaryText?: boolean
}

export const Membership = (props: MembershipProps) => (
  <SuspenseLoader
    fallback={
      <MultisigMemberListLoader
        loader={<props.Loader />}
        primaryText={props.primaryText}
      />
    }
  >
    <InnerMembership {...props} />
  </SuspenseLoader>
)

const InnerMembership: FC<MembershipProps> = ({ coreAddress, primaryText }) => {
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
