import { PlusSmIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'

import { useWallet } from '@dao-dao/state'
import { BalanceCard, StakingMode } from '@dao-dao/ui'
import {
  claimAvailable,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

import { ClaimsPendingList } from '../Claims'
import { Loader } from '../Loader'
import { StakingModal } from '../StakingModal'
import { SuspenseLoader } from '../SuspenseLoader'
import { daoSelector, tokenConfig } from '@/selectors/daos'
import {
  walletTokenBalance,
  walletStakedTokenBalance,
  getBlockHeight,
  walletClaims,
  walletTokenBalanceLoading,
  walletTokenBalanceUpdateCountAtom,
} from '@/selectors/treasury'

const InnerYourShares: FC = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const daoInfo = useRecoilValue(daoSelector(contractAddress))
  const tokenInfo = useRecoilValue(tokenConfig(daoInfo?.gov_token))

  // Balances for the visitor
  const govTokenBalance = useRecoilValue(walletTokenBalance(daoInfo?.gov_token))
  const stakedGovTokenBalance = useRecoilValue(
    walletStakedTokenBalance(daoInfo?.staking_contract)
  )
  const blockHeight = useRecoilValue(getBlockHeight)
  const stuff = useRecoilValue(walletClaims(daoInfo.staking_contract))
  const claimsAvailable = stuff.claims
    .filter((c) => claimAvailable(c, blockHeight))
    .reduce((p, n) => p + Number(n.amount), 0)

  const { address: walletAddress } = useWallet()
  const [tokenBalanceLoading, setTokenBalancesLoading] = useRecoilState(
    walletTokenBalanceLoading(walletAddress ?? '')
  )
  const setWalletTokenBalanceUpdateCount = useSetRecoilState(
    walletTokenBalanceUpdateCountAtom(walletAddress ?? '')
  )

  const [showStaking, setShowStaking] = useState(false)

  return (
    <>
      <ul className="flex flex-row flex-wrap gap-2 list-none">
        <li className="basis-0 grow min-w-max">
          <BalanceCard
            amount={convertMicroDenomToDenomWithDecimals(
              govTokenBalance?.amount,
              tokenInfo.decimals
            ).toLocaleString(undefined, { maximumFractionDigits: 20 })}
            denom={tokenInfo?.symbol}
            loading={tokenBalanceLoading}
            onManage={() => {
              setShowStaking(true)
            }}
            title="Balance"
          />
        </li>
        <li className="basis-0 grow min-w-max">
          <BalanceCard
            amount={convertMicroDenomToDenomWithDecimals(
              stakedGovTokenBalance.amount,
              tokenInfo.decimals
            ).toLocaleString(undefined, { maximumFractionDigits: 20 })}
            denom={tokenInfo?.symbol}
            loading={tokenBalanceLoading}
            onManage={() => {
              setShowStaking(true)
            }}
            title={`Voting power (staked ${tokenInfo?.symbol})`}
          />
        </li>
        {claimsAvailable ? (
          <li className="basis-0 grow min-w-max">
            <BalanceCard
              amount={convertMicroDenomToDenomWithDecimals(
                claimsAvailable,
                tokenInfo.decimals
              ).toLocaleString(undefined, {
                maximumFractionDigits: 20,
              })}
              denom={tokenInfo?.symbol}
              loading={tokenBalanceLoading}
              onManage={() => {
                setShowStaking(true)
              }}
              title={`Pending (unclaimed ${tokenInfo?.symbol})`}
            />
          </li>
        ) : null}
      </ul>
      {govTokenBalance?.amount ? (
        <div className="p-6 mt-2 w-full bg-primary rounded-lg">
          <h3 className="mb-4 link-text">
            You have{' '}
            {convertMicroDenomToDenomWithDecimals(
              govTokenBalance?.amount,
              tokenInfo.decimals
            ).toLocaleString(undefined, { maximumFractionDigits: 20 })}{' '}
            unstaked {tokenInfo.symbol}
          </h3>
          <p className="secondary-text">
            Staking them would bring you{' '}
            {stakedGovTokenBalance &&
              `${(
                (govTokenBalance.amount / stakedGovTokenBalance.amount) *
                100
              ).toLocaleString(undefined, {
                maximumSignificantDigits: 3,
              })}%`}{' '}
            more voting power and help you defend your positions for{' '}
            {daoInfo.config.name}
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
        onClaimAvailable={() => setWalletTokenBalanceUpdateCount((n) => n + 1)}
        stakingAddress={daoInfo.staking_contract}
        tokenInfo={tokenInfo}
      />
      {showStaking && (
        <StakingModal
          afterExecute={() => setTokenBalancesLoading(false)}
          beforeExecute={() => setTokenBalancesLoading(true)}
          claimableTokens={claimsAvailable}
          contractAddress={contractAddress}
          defaultMode={StakingMode.Stake}
          onClose={() => setShowStaking(false)}
        />
      )}
    </>
  )
}

export const YourShares: FC = () => (
  <>
    <h2 className="mb-2 title-text">Your shares</h2>

    <SuspenseLoader fallback={<Loader className="mt-4 h-min" />}>
      <InnerYourShares />
    </SuspenseLoader>
  </>
)
