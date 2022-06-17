import clsx from 'clsx'
import { FC, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { ConnectWalletButton, StakingModal } from '@dao-dao/common'
import i18n from '@dao-dao/i18n'
import {
  stakingLoadingAtom,
  useGovernanceTokenInfo,
  useStakingInfo,
  useWallet,
} from '@dao-dao/state'
import {
  ClaimPendingBalanceCard,
  MemberStakeBalanceCard,
  MemberUnstakeBalanceCard,
  NotMemberStakeBalanceCard,
  StakingMode,
  SuspenseLoader,
} from '@dao-dao/ui'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { ClaimsPendingList } from './ClaimsPendingList'
import { useDAOInfoContext } from './DAOPageWrapper'
import { Loader } from './Loader'

const InnerCw20StakedBalanceVotingPowerDisplay: FC = () => {
  const { coreAddress, name } = useDAOInfoContext()
  const {
    governanceTokenInfo,
    governanceTokenMarketingInfo,
    walletBalance: unstakedGovTokenBalance,
  } = useGovernanceTokenInfo(coreAddress, { fetchWalletBalance: true })
  const {
    walletStaked: stakedGovTokenBalance,
    totalStaked,
    blockHeight,
    sumClaimsAvailable,
  } = useStakingInfo(coreAddress, {
    fetchWalletStaked: true,
    fetchTotalStaked: true,
    fetchClaims: true,
  })

  const { connected, refreshBalances } = useWallet()

  // Set to a StakingMode to display modal.
  const [showStakingMode, setShowStakingMode] = useState<StakingMode>()
  const stakingLoading = useRecoilValue(stakingLoadingAtom)

  if (!governanceTokenInfo || blockHeight === undefined) {
    throw new Error('Failed to load data.')
  }

  if (
    !connected ||
    unstakedGovTokenBalance === undefined ||
    stakedGovTokenBalance === undefined ||
    totalStaked === undefined
  ) {
    return <ConnectWalletButton />
  }

  const tokenImageUrl =
    !!governanceTokenMarketingInfo?.logo &&
    governanceTokenMarketingInfo.logo !== 'embedded' &&
    'url' in governanceTokenMarketingInfo.logo
      ? governanceTokenMarketingInfo.logo.url
      : undefined

  return (
    <>
      <div className="flex flex-col gap-2 items-stretch">
        {unstakedGovTokenBalance > 0 && stakedGovTokenBalance === 0 && (
          <NotMemberStakeBalanceCard
            amount={convertMicroDenomToDenomWithDecimals(
              unstakedGovTokenBalance,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: governanceTokenInfo.decimals,
            })}
            daoName={name}
            loading={stakingLoading}
            onClick={() => setShowStakingMode(StakingMode.Stake)}
            tokenSymbol={governanceTokenInfo.symbol}
          />
        )}
        {stakedGovTokenBalance > 0 && (
          <MemberUnstakeBalanceCard
            amount={convertMicroDenomToDenomWithDecimals(
              stakedGovTokenBalance,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: governanceTokenInfo.decimals,
            })}
            daoName={name}
            loading={stakingLoading}
            onClick={() => setShowStakingMode(StakingMode.Unstake)}
            powerPercent={
              totalStaked ? (stakedGovTokenBalance / totalStaked) * 100 : 0
            }
            tokenSymbol={governanceTokenInfo.symbol}
          />
        )}
        {stakedGovTokenBalance > 0 && unstakedGovTokenBalance > 0 && (
          <MemberStakeBalanceCard
            amount={convertMicroDenomToDenomWithDecimals(
              unstakedGovTokenBalance,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: governanceTokenInfo.decimals,
            })}
            daoName={name}
            loading={stakingLoading}
            onClick={() => setShowStakingMode(StakingMode.Stake)}
            tokenSymbol={governanceTokenInfo.symbol}
          />
        )}
        {!!sumClaimsAvailable && (
          <ClaimPendingBalanceCard
            amount={convertMicroDenomToDenomWithDecimals(
              sumClaimsAvailable,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: governanceTokenInfo.decimals,
            })}
            loading={stakingLoading}
            onClick={() => setShowStakingMode(StakingMode.Claim)}
            tokenImageUrl={tokenImageUrl}
            tokenSymbol={governanceTokenInfo.symbol}
          />
        )}
      </div>
      <ClaimsPendingList onClaimAvailable={refreshBalances} />
      {showStakingMode !== undefined && (
        <StakingModal
          connectWalletButton={<ConnectWalletButton />}
          coreAddress={coreAddress}
          loader={<Loader />}
          mode={showStakingMode}
          onClose={() => setShowStakingMode(undefined)}
        />
      )}
    </>
  )
}

interface Cw20StakedBalanceVotingPowerDisplayProps {
  primaryText?: boolean
}

export const Cw20StakedBalanceVotingPowerDisplay: FC<
  Cw20StakedBalanceVotingPowerDisplayProps
> = ({ primaryText }) => (
  <>
    <h2 className={clsx('mb-2', primaryText ? 'primary-text' : 'title-text')}>
      {i18n.t('Your voting power')}
    </h2>

    <SuspenseLoader fallback={<Loader className="mt-4 h-min" />}>
      <InnerCw20StakedBalanceVotingPowerDisplay />
    </SuspenseLoader>
  </>
)
