import { useWallet } from '@noahsaso/cosmodal'

import { useVotingModule } from '@dao-dao/state'
import {
  Loader,
  MultisigMemberList,
  MultisigMemberListLoader,
  SuspenseLoader,
} from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'

interface MembershipProps {
  primaryText?: boolean
}

export const Membership = (props: MembershipProps) => (
  <SuspenseLoader
    fallback={
      <MultisigMemberListLoader
        loader={<Loader />}
        primaryText={props.primaryText}
      />
    }
  >
    <InnerMembership {...props} />
  </SuspenseLoader>
)

const InnerMembership = ({ primaryText }: MembershipProps) => {
  const { address: walletAddress } = useWallet()
  const { coreAddress } = useVotingModuleAdapterOptions()
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
