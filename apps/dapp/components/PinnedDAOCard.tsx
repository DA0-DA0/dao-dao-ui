import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import {
  CwCoreV0_1_0Selectors,
  nativeBalanceSelector,
  useGovernanceTokenInfo,
  useProposalModule,
  useVotingModule,
} from '@dao-dao/state'
import { SuspenseLoader } from '@dao-dao/ui'
import { formatPercentOf100 } from '@dao-dao/utils'

import { usePinnedDAOs } from '@/hooks'
import { useAddToken } from '@/util'

import { ContractCard, LoadingContractCard } from './ContractCard'

interface PinnedDAOCardProps {
  address: string
}

const InnerPinnedDAOCard: FC<PinnedDAOCardProps> = ({ address }) => {
  const { t } = useTranslation()
  const config = useRecoilValue(
    CwCoreV0_1_0Selectors.configSelector({ contractAddress: address })
  )
  const nativeBalance = useRecoilValue(nativeBalanceSelector(address))?.amount
  const { governanceTokenAddress } = useGovernanceTokenInfo(address)
  const { walletVotingWeight, totalVotingWeight } = useVotingModule(address)
  const { proposalCount } = useProposalModule(address, {
    fetchProposalCount: true,
  })
  const addToken = useAddToken()

  const { isPinned, setPinned, setUnpinned } = usePinnedDAOs()
  const pinned = isPinned(address)

  if (
    !config ||
    nativeBalance === undefined ||
    proposalCount === undefined ||
    totalVotingWeight === undefined
  ) {
    throw new Error(t('error.loadingData'))
  }

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
          governanceTokenAddress && addToken?.(governanceTokenAddress)
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
