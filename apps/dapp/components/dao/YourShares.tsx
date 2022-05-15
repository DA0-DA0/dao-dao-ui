import { PlusSmIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { FC, useState } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'

import {
  useGovernanceTokenInfo,
  useStakingInfo,
  useWallet,
} from '@dao-dao/state'
import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { BalanceCard, StakingMode } from '@dao-dao/ui'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { ClaimsPendingList } from '../ClaimsPendingList'
import { Loader } from '../Loader'
import { StakingModal } from '../StakingModal'
import { SuspenseLoader } from '../SuspenseLoader'
import {
  walletTokenBalanceLoading,
  walletTokenBalanceUpdateCountAtom,
} from '@/selectors/treasury'

interface InternalYourSharesProps {
  coreAddress: string
}

const InnerYourShares: FC<InternalYourSharesProps> = ({ coreAddress }) => {
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

  const { address: walletAddress } = useWallet()
  const [tokenBalanceLoading, setTokenBalancesLoading] = useRecoilState(
    walletTokenBalanceLoading(walletAddress ?? '')
  )
  const setWalletTokenBalanceUpdateCount = useSetRecoilState(
    walletTokenBalanceUpdateCountAtom(walletAddress ?? '')
  )

  const [showStaking, setShowStaking] = useState(false)

  if (
    !config ||
    !governanceTokenInfo ||
    unstakedGovTokenBalance === undefined ||
    stakedGovTokenBalance === undefined ||
    blockHeight === undefined ||
    sumClaimsAvailable === undefined
  ) {
    throw new Error('Failed to load data.')
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
            loading={tokenBalanceLoading}
            onManage={() => setShowStaking(true)}
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
            loading={tokenBalanceLoading}
            onManage={() => setShowStaking(true)}
            title={`Voting power (staked ${governanceTokenInfo.symbol})`}
          />
        </li>
        {sumClaimsAvailable ? (
          <li>
            <BalanceCard
              amount={convertMicroDenomToDenomWithDecimals(
                sumClaimsAvailable,
                governanceTokenInfo.decimals
              ).toLocaleString(undefined, {
                maximumFractionDigits: 20,
              })}
              denom={governanceTokenInfo.symbol}
              loading={tokenBalanceLoading}
              onManage={() => setShowStaking(true)}
              title={`Pending (unclaimed ${governanceTokenInfo.symbol})`}
            />
          </li>
        ) : null}
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
                setShowStaking(true)
              }}
            >
              Stake tokens
              <PlusSmIcon className="h-5" />
            </button>
          </div>
        </div>
      ) : null}
      <ClaimsPendingList
        coreAddress={coreAddress}
        onClaimAvailable={() => setWalletTokenBalanceUpdateCount((n) => n + 1)}
      />
      {showStaking && (
        <StakingModal
          defaultMode={StakingMode.Stake}
          onClose={() => setShowStaking(false)}
        />
      )}
    </>
  )
}

export interface YourSharesProps extends InternalYourSharesProps {
  coreAddress: string
  primaryText?: boolean
}

export const YourShares: FC<YourSharesProps> = ({ primaryText, ...props }) => (
  <>
    <h2 className={clsx('mb-2', primaryText ? 'primary-text' : 'title-text')}>
      Your shares
    </h2>

    <SuspenseLoader fallback={<Loader className="mt-4 h-min" />}>
      <InnerYourShares {...props} />
    </SuspenseLoader>
  </>
)
