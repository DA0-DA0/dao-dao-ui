import { useWallet } from '@noahsaso/cosmodal'
import { useTranslation } from 'react-i18next'

import { ConnectWalletButton, SuspenseLoader } from '@dao-dao/common'
import { useVotingModule } from '@dao-dao/state'
import { MultisigMemberList, MultisigMemberListLoader } from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useVotingModule as useCw4VotingModule } from '../hooks/useVotingModule'

export const SdaMembershipPage = () => {
  const { t } = useTranslation()

  const { coreAddress, Loader } = useVotingModuleAdapterOptions()
  const { connected, address: walletAddress } = useWallet()
  const { walletVotingWeight, totalVotingWeight } = useVotingModule(
    coreAddress,
    {
      fetchMembership: true,
    }
  )
  const { members } = useCw4VotingModule(coreAddress, { fetchMembers: true })

  if (!members || totalVotingWeight === undefined) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <div className="space-y-8">
      {!connected && <ConnectWalletButton />}

      <SuspenseLoader fallback={<MultisigMemberListLoader Loader={Loader} />}>
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
