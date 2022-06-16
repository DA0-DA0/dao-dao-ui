import { FC } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import i18n from '@dao-dao/i18n'
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

import { ContractCard, LoadingContractCard } from '../ContractCard'
import { pinnedAddressesAtom } from '@/atoms'
import { addToken } from '@/util'

interface PinnedDAOCardProps {
  address: string
}

const InnerPinnedDAOCard: FC<PinnedDAOCardProps> = ({ address }) => {
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

  const [pinnedAddresses, setPinnedAddresses] =
    useRecoilState(pinnedAddressesAtom)
  const pinned = pinnedAddresses.includes(address)

  if (!config || nativeBalance === undefined || proposalCount === undefined) {
    throw new Error(i18n.t('error.loadingData'))
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
          setPinnedAddresses((p) => p.filter((a) => a !== address))
        } else {
          setPinnedAddresses((p) => p.concat([address]))
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
