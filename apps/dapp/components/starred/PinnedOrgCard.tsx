import { FC } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'

import {
  nativeBalanceSelector,
  useGovernanceTokenInfo,
  useProposalModule,
  useVotingModule,
} from '@dao-dao/state'
import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { SuspenseLoader } from '@dao-dao/ui'
import {
  convertMicroDenomToDenomWithDecimals,
  VotingModuleType,
} from '@dao-dao/utils'

import { ContractCard, LoadingContractCard } from '../ContractCard'
import { useOrgInfoContext } from '../OrgPageWrapper'
import { pinnedAddressesAtom } from '@/atoms/pinned'
import { addToken } from '@/util/addToken'

interface PinnedOrgCardProps {
  address: string
}

const InnerPinnedOrgCard: FC<PinnedOrgCardProps> = ({ address }) => {
  const { votingModuleType } = useOrgInfoContext()

  const config = useRecoilValue(configSelector({ contractAddress: address }))
  const nativeBalance = useRecoilValue(nativeBalanceSelector(address))?.amount
  const { governanceTokenAddress, governanceTokenInfo } =
    useGovernanceTokenInfo(address)
  const { walletVotingWeight } = useVotingModule(address)
  const { proposalCount } = useProposalModule(address, {
    fetchProposalCount: true,
  })

  const [pinnedAddresses, setPinnedAddresses] =
    useRecoilState(pinnedAddressesAtom)
  const pinned = pinnedAddresses.includes(address)

  if (
    !config ||
    nativeBalance === undefined ||
    walletVotingWeight === undefined ||
    proposalCount === undefined
  ) {
    throw new Error('Failed to load data.')
  }

  return (
    <ContractCard
      balance={nativeBalance}
      description={config.description}
      href={`/org/${address}`}
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
          ? walletVotingWeight
          : votingModuleType === VotingModuleType.Cw20StakedBalanceVoting &&
            governanceTokenInfo
          ? convertMicroDenomToDenomWithDecimals(
              walletVotingWeight,
              governanceTokenInfo.decimals
            )
          : undefined
      }
    />
  )
}

export const PinnedOrgCard: FC<PinnedOrgCardProps> = (props) => (
  <SuspenseLoader fallback={<LoadingContractCard />}>
    <InnerPinnedOrgCard {...props} />
  </SuspenseLoader>
)
