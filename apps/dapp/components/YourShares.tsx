import { PlusSmIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { FC, useState } from 'react'
import { useRecoilValue } from 'recoil'

import {
  useGovernanceTokenInfo,
  useStakingInfo,
  useWallet,
} from '@dao-dao/state'
import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { BalanceCard, StakingMode } from '@dao-dao/ui'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { ClaimsPendingList } from './ClaimsPendingList'
import ConnectWalletButton from './ConnectWalletButton'
import { Loader } from './Loader'
import { useOrgInfoContext } from './OrgPageWrapper'
import { StakingModal } from './StakingModal'
import { SuspenseLoader } from './SuspenseLoader'
import { stakingLoadingAtom } from '@/atoms/status'

const InnerYourShares: FC = () => {
  const { coreAddress } = useOrgInfoContext()
  const config = useRecoilValue(
    configSelector({ contractAddress: coreAddress })
  )
  const { governanceTokenInfo, walletBalance: unstakedGovTokenBalance } =
    useGovernanceTokenInfo(coreAddress, { fetchWalletBalance: true })
  const {
    walletStaked: stakedGovTokenBalance,
    blockHeight,
    sumClaimsAvailable,
  } = useStakingInfo(coreAddress, {
    fetchWalletStaked: true,
    fetchClaims: true,
  })

  const { connected, refreshBalances } = useWallet()

  // Set to a StakingMode to display modal.
  const [showStakingDefaultMode, setShowStakingDefaultMode] =
    useState<StakingMode>()
  const stakingLoading = useRecoilValue(stakingLoadingAtom)

  if (!config || !governanceTokenInfo || blockHeight === undefined) {
    throw new Error('Failed to load data.')
  }

  if (
    !connected ||
    unstakedGovTokenBalance === undefined ||
    stakedGovTokenBalance === undefined
  ) {
    return <ConnectWalletButton />
  }

  return (
    <>
      <ul className="flex flex-col gap-2 items-stretch list-none">
        <li>
          <BalanceCard
            amount={convertMicroDenomToDenomWithDecimals(
              unstakedGovTokenBalance,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, { maximumFractionDigits: 20 })}
            denom={governanceTokenInfo.symbol}
            loading={stakingLoading}
            onManage={() => setShowStakingDefaultMode(StakingMode.Unstake)}
            title="Balance"
          />
        </li>
        <li>
          <BalanceCard
            amount={convertMicroDenomToDenomWithDecimals(
              stakedGovTokenBalance,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, { maximumFractionDigits: 20 })}
            denom={governanceTokenInfo.symbol}
            loading={stakingLoading}
            onManage={() => setShowStakingDefaultMode(StakingMode.Stake)}
            title={`Voting power (staked ${governanceTokenInfo.symbol})`}
          />
        </li>
        {!!sumClaimsAvailable && (
          <li>
            <BalanceCard
              amount={convertMicroDenomToDenomWithDecimals(
                sumClaimsAvailable,
                governanceTokenInfo.decimals
              ).toLocaleString(undefined, {
                maximumFractionDigits: 20,
              })}
              denom={governanceTokenInfo.symbol}
              loading={stakingLoading}
              onManage={() => setShowStakingDefaultMode(StakingMode.Claim)}
              title={`Pending (unclaimed ${governanceTokenInfo.symbol})`}
            />
          </li>
        )}
      </ul>
      {unstakedGovTokenBalance ? (
        <div className="p-6 mt-2 w-full bg-primary rounded-lg">
          <h3 className="mb-4 link-text">
            You have{' '}
            {convertMicroDenomToDenomWithDecimals(
              unstakedGovTokenBalance,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, { maximumFractionDigits: 20 })}{' '}
            unstaked {governanceTokenInfo.symbol}
          </h3>
          <p className="secondary-text">
            Staking them would bring you{' '}
            {!!stakedGovTokenBalance &&
              `${(
                (unstakedGovTokenBalance / stakedGovTokenBalance) *
                100
              ).toLocaleString(undefined, {
                maximumSignificantDigits: 3,
              })}% `}
            more voting power and help you defend your positions for{' '}
            {config.name}
            {"'"}s direction.
          </p>
          <div className="flex justify-end mt-4">
            <button
              className="flex gap-2 items-center rounded link-text"
              onClick={() => {
                setShowStakingDefaultMode(StakingMode.Stake)
              }}
            >
              Stake tokens
              <PlusSmIcon className="h-5" />
            </button>
          </div>
        </div>
      ) : null}
      <ClaimsPendingList onClaimAvailable={refreshBalances} />
      {showStakingDefaultMode && (
        <StakingModal
          defaultMode={showStakingDefaultMode}
          onClose={() => setShowStakingDefaultMode(undefined)}
        />
      )}
    </>
  )
}

interface YourSharesProps {
  primaryText?: boolean
}

export const YourShares: FC<YourSharesProps> = ({ primaryText }) => (
  <>
    <h2 className={clsx('mb-2', primaryText ? 'primary-text' : 'title-text')}>
      Your shares
    </h2>

    <SuspenseLoader fallback={<Loader className="mt-4 h-min" />}>
      <InnerYourShares />
    </SuspenseLoader>
  </>
)
