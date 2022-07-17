import { useWallet } from '@noahsaso/cosmodal'

import { ConnectWalletButton } from '@dao-dao/common'
import { useCw4VotingModule, useVotingModule } from '@dao-dao/state'
import {
  Loader,
  MultisigMemberList,
  MultisigMemberListLoader,
  SuspenseLoader,
} from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const SdaMembershipPage = () => {
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { connected, address: walletAddress } = useWallet()
  const { walletVotingWeight, totalVotingWeight } = useVotingModule(
    coreAddress,
    {
      fetchMembership: true,
    }
  )
  const { members } = useCw4VotingModule(coreAddress, { fetchMembers: true })

  if (!members || totalVotingWeight === undefined) {
    throw new Error('Failed to load page data.')
  }

  return (
    <div className="space-y-8">
      {!connected && <ConnectWalletButton />}

      <SuspenseLoader fallback={<MultisigMemberListLoader loader={Loader} />}>
        <MultisigMemberList
          members={members}
          totalWeight={totalVotingWeight}
          walletAddress={walletAddress}
          walletWeight={walletVotingWeight}
        />
      </SuspenseLoader>
    </div>
  )
}
