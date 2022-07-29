import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { matchAndLoadCommon } from '@dao-dao/proposal-module-adapter'
import {
  CwCoreV0_1_0Selectors,
  cwCoreProposalModulesSelector,
  nativeBalanceSelector,
  useVotingModule,
} from '@dao-dao/state'
import { Loader, Logo, SuspenseLoader } from '@dao-dao/ui'
import { formatPercentOf100 } from '@dao-dao/utils'

import { usePinnedDAOs } from '@/hooks'

import { ContractCard, LoadingContractCard } from './ContractCard'

interface PinnedDAOCardProps {
  address: string
}

const InnerPinnedDAOCard: FC<PinnedDAOCardProps> = ({ address }) => {
  const { t } = useTranslation()
  const config = useRecoilValue(
    CwCoreV0_1_0Selectors.configSelector({ contractAddress: address })
  )
  const nativeBalance = useRecoilValue(nativeBalanceSelector(address)).amount
  const { walletVotingWeight, totalVotingWeight } = useVotingModule(address, {
    fetchMembership: true,
  })
  const proposalModules = useRecoilValue(cwCoreProposalModulesSelector(address))

  const { isPinned, setPinned, setUnpinned } = usePinnedDAOs()
  const pinned = isPinned(address)

  if (totalVotingWeight === undefined || !proposalModules) {
    throw new Error(t('error.loadingData'))
  }

  const useProposalCountHooks = useMemo(
    () =>
      proposalModules.map(
        (proposalModule) =>
          matchAndLoadCommon(proposalModule, {
            coreAddress: address,
            Loader,
            Logo,
          }).hooks.useProposalCount
      ),
    [address, proposalModules]
  )
  // Always called in the same order, so this is safe.
  const proposalCount = useProposalCountHooks.reduce(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (acc, useProposalCount) => acc + useProposalCount(),
    0
  )

  return (
    <ContractCard
      balance={nativeBalance}
      description={config.description}
      href={`/dao/${address}`}
      imgUrl={config.image_url}
      name={config.name}
      onPin={() => {
        if (pinned) {
          setUnpinned(address)
        } else {
          setPinned(address)
        }
      }}
      pinned={pinned}
      proposals={proposalCount}
      votingPowerPercent={
        walletVotingWeight === undefined
          ? undefined
          : formatPercentOf100(
              totalVotingWeight === 0
                ? 0
                : (walletVotingWeight / totalVotingWeight) * 100
            )
      }
    />
  )
}

export const PinnedDAOCard: FC<PinnedDAOCardProps> = (props) => (
  <SuspenseLoader fallback={<LoadingContractCard />}>
    <InnerPinnedDAOCard {...props} />
  </SuspenseLoader>
)
