import { useWallet } from '@noahsaso/cosmodal'

import { useCw4VotingModule, useVotingModule } from '@dao-dao/state'
import {
  MultisigMemberList,
  MultisigMemberListLoader,
  SuspenseLoader,
} from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'

interface MembershipProps {
  primaryText?: boolean
}

export const Membership = (props: MembershipProps) => {
  const { Loader } = useVotingModuleAdapterOptions()

  return (
    <SuspenseLoader
      fallback={
        <MultisigMemberListLoader
          Loader={Loader}
          primaryText={props.primaryText}
        />
      }
    >
      <InnerMembership {...props} />
    </SuspenseLoader>
  )
}

const InnerMembership = ({ primaryText }: MembershipProps) => {
  const { address: walletAddress } = useWallet()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { walletVotingWeight, totalVotingWeight } = useVotingModule(
    coreAddress,
    {
      fetchMembership: true,
    }
  )
  const { members } = useCw4VotingModule(coreAddress, { fetchMembers: true })

  if (totalVotingWeight === undefined || !members) {
    throw new Error('Failed to load data.')
  }

  return (
    <MultisigMemberList
      members={members}
      primaryText={primaryText}
      totalWeight={totalVotingWeight}
      walletAddress={walletAddress}
      walletWeight={walletVotingWeight}
    />
  )
}
