import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { useTranslation } from '@dao-dao/i18n'
import {
  CwCoreSelectors,
  nativeBalanceSelector,
  useGovernanceTokenInfo,
  useProposalModule,
  useVotingModule,
} from '@dao-dao/state'
import { SuspenseLoader } from '@dao-dao/ui'
import {
  VotingModuleType,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

import { ContractCard, LoadingContractCard } from './ContractCard'
import { usePinnedDAOs } from '@/hooks'
import { addToken } from '@/util'

interface PinnedDAOCardProps {
  address: string
}

const InnerPinnedDAOCard: FC<PinnedDAOCardProps> = ({ address }) => {
  const { t } = useTranslation()
  const config = useRecoilValue(
    CwCoreSelectors.configSelector({ contractAddress: address })
  )
  const nativeBalance = useRecoilValue(nativeBalanceSelector(address))?.amount
  const { governanceTokenAddress, governanceTokenInfo } =
    useGovernanceTokenInfo(address)
  const { walletVotingWeight, votingModuleType } = useVotingModule(address)
  const { proposalCount } = useProposalModule(address, {
    fetchProposalCount: true,
  })

  const { isPinned, setPinned, setUnpinned } = usePinnedDAOs()
  const pinned = isPinned(address)

  if (!config || nativeBalance === undefined || proposalCount === undefined) {
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
          governanceTokenAddress && addToken(governanceTokenAddress)
        }
      }}
      pinned={pinned}
      proposals={proposalCount}
      weight={
        walletVotingWeight === undefined
          ? undefined
          : votingModuleType === VotingModuleType.Cw4Voting
          ? walletVotingWeight.toLocaleString()
          : votingModuleType === VotingModuleType.Cw20StakedBalanceVoting &&
            governanceTokenInfo
          ? convertMicroDenomToDenomWithDecimals(
              walletVotingWeight,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: governanceTokenInfo.decimals,
            })
          : undefined
      }
    />
  )
}

export const PinnedDAOCard: FC<PinnedDAOCardProps> = (props) => (
  <SuspenseLoader fallback={<LoadingContractCard />}>
    <InnerPinnedDAOCard {...props} />
  </SuspenseLoader>
)
