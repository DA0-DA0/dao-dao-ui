import {
  CheckCircleIcon,
  KeyIcon,
  LibraryIcon,
  PencilIcon,
  PlusSmIcon,
  XCircleIcon,
} from '@heroicons/react/outline'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  daoSelector,
  isMemberSelector,
  proposalCount,
  tokenConfig,
  totalStaked,
} from 'selectors/daos'
import {
  cw20Balances,
  getBlockHeight,
  nativeBalance,
  walletAddress,
  walletClaims,
  walletStakedTokenBalance,
  walletTokenBalance,
  walletTokenBalanceLoading,
} from 'selectors/treasury'
import { convertMicroDenomToDenomWithDecimals } from 'util/conversion'
import {
  ContractBalances,
  BalanceCard,
  ContractProposalsDispaly,
  GradientHero,
  HeroContractFooter,
  HeroContractHeader,
  StarButton,
} from 'components/ContractView'
import { Breadcrumbs } from 'components/Breadcrumbs'
import { StakingModal, StakingMode } from 'components/StakingModal'
import { pinnedDaosAtom } from 'atoms/pinned'
import { claimAvaliable, ClaimsPendingList } from '@components/Claims'
import ErrorBoundary from 'components/ErrorBoundary'
import { addToken } from 'util/addToken'
import { sidebarExpandedAtom } from 'atoms/sidebar'
import { Sidebar } from 'components/Sidebar'

function DaoHome() {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const daoInfo = useRecoilValue(daoSelector(contractAddress))
  const tokenInfo = useRecoilValue(tokenConfig(daoInfo?.gov_token))
  const stakedTotal = useRecoilValue(totalStaked(daoInfo?.staking_contract))
  const proposalsTotal = useRecoilValue(proposalCount(contractAddress))
  const { member } = useRecoilValue(isMemberSelector(contractAddress))

  // Balances for the DAO
  const nativeBalances = useRecoilValue(nativeBalance(contractAddress))
  const cw20balances = useRecoilValue(cw20Balances(contractAddress))

  // Balances for the visitor
  const govTokenBalance = useRecoilValue(walletTokenBalance(daoInfo?.gov_token))
  const stakedGovTokenBalance = useRecoilValue(
    walletStakedTokenBalance(daoInfo?.staking_contract)
  )
  const blockHeight = useRecoilValue(getBlockHeight)
  const stuff = useRecoilValue(walletClaims(daoInfo.staking_contract))
  const claimsAvaliable = stuff.claims
    .filter((c) => claimAvaliable(c, blockHeight))
    .reduce((p, n) => p + Number(n.amount), 0)

  const wallet = useRecoilValue(walletAddress)
  const [tokenBalanceLoading, setTokenBalancesLoading] = useRecoilState(
    walletTokenBalanceLoading(wallet)
  )

  const [showStaking, setShowStaking] = useState(false)
  const [stakingDefault, setStakingDefault] = useState(StakingMode.Stake)

  const [pinnedDaos, setPinnedDaos] = useRecoilState(pinnedDaosAtom)
  const pinned = pinnedDaos.includes(contractAddress)

  const expanded = useRecoilValue(sidebarExpandedAtom)

  const stakedPercent = (
    (100 * stakedTotal) /
    Number(tokenInfo?.total_supply)
  ).toLocaleString(undefined, { maximumSignificantDigits: 3 })

  const shouldAddToken = router.query.add_token
  useEffect(() => {
    if (shouldAddToken) {
      addToken(daoInfo.gov_token)
    }
  }, [shouldAddToken, daoInfo.gov_token])

  const gridClassName = `grid grid-cols-${
    expanded ? 6 : 1
  } overflow-auto mb-3 min-h-screen`

  const buttonClassName = expanded ? '' : 'mr-6'

  return (
    <div className={gridClassName}>
      <div className="col-span-4 min-h-screen">
        <GradientHero>
          <div className="flex justify-between items-center">
            <Breadcrumbs
              crumbs={[
                ['/starred', 'Home'],
                [router.asPath, daoInfo.config.name],
              ]}
            />
            <div className={buttonClassName}>
              <StarButton
                pinned={pinned}
                onPin={() => {
                  if (pinned) {
                    setPinnedDaos((p) => p.filter((a) => a !== contractAddress))
                  } else {
                    setPinnedDaos((p) => p.concat([contractAddress]))
                    addToken(daoInfo.gov_token)
                  }
                }}
              />
            </div>
          </div>

          <HeroContractHeader
            name={daoInfo.config.name}
            member={member}
            address={contractAddress}
            imgUrl={daoInfo.config.image_url}
          />

          <ContractBalances
            description={daoInfo.config.description}
            gov_token={daoInfo.gov_token}
            staking_contract={daoInfo.staking_contract}
            native={nativeBalances}
            cw20={cw20balances}
          />

          <HeroContractFooter>
            <div>
              <LibraryIcon className="w-5 h-5 mb-1 mr-1 inline" />
              {stakedPercent}% ${tokenInfo?.symbol} staked
            </div>
            <div>
              <PencilIcon className="w-5 h-5 mb-1 mr-1 inline" />
              {proposalsTotal} proposals
            </div>
            <div>
              <KeyIcon className="w-5 h-5 mb-1 mr-1 inline" />
              {convertMicroDenomToDenomWithDecimals(
                daoInfo?.config.proposal_deposit,
                tokenInfo.decimals
              )}
              ${tokenInfo.symbol} proposal deposit
            </div>
            <div
              className="tooltip"
              data-tip="Deposits to failed proposals are refunded."
            >
              {daoInfo.config.refund_failed_proposals ? (
                <CheckCircleIcon className="w-5 inline mr-1 mb-1" />
              ) : (
                <XCircleIcon className="w-5 inline mr-1 mb-1" />
              )}
              Proposal deposit refunds{' '}
              {daoInfo.config.refund_failed_proposals ? 'on' : 'off'}
            </div>
          </HeroContractFooter>
        </GradientHero>
        <div className="px-6">
          <ContractProposalsDispaly
            contractAddress={contractAddress}
            proposalCreateLink={`/dao/${contractAddress}/proposals/create`}
          />
        </div>
      </div>
      <Sidebar>
        <div className="col-start-5 col-span-2 p-6 min-h-screen h-full border-l border-base-300">
          <h2 className="font-medium text-md">Your shares</h2>
          <ul className="list-none mt-3">
            <li>
              <BalanceCard
                title="Balance"
                amount={convertMicroDenomToDenomWithDecimals(
                  govTokenBalance?.amount,
                  tokenInfo.decimals
                ).toLocaleString(undefined, { maximumFractionDigits: 20 })}
                denom={tokenInfo?.symbol}
                onManage={() => {
                  setShowStaking(true)
                  setStakingDefault(StakingMode.Unstake)
                }}
                loading={tokenBalanceLoading}
              />
            </li>
            <li>
              <BalanceCard
                title={`Voting power (staked ${tokenInfo?.symbol})`}
                amount={convertMicroDenomToDenomWithDecimals(
                  stakedGovTokenBalance.amount,
                  tokenInfo.decimals
                ).toLocaleString(undefined, { maximumFractionDigits: 20 })}
                denom={tokenInfo?.symbol}
                onManage={() => {
                  setShowStaking(true)
                  setStakingDefault(StakingMode.Stake)
                }}
                loading={tokenBalanceLoading}
              />
            </li>
            {claimsAvaliable ? (
              <li>
                <BalanceCard
                  title={`Pending (unclaimed ${tokenInfo?.symbol})`}
                  amount={convertMicroDenomToDenomWithDecimals(
                    claimsAvaliable,
                    tokenInfo.decimals
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 20,
                  })}
                  denom={tokenInfo?.symbol}
                  onManage={() => {
                    setShowStaking(true)
                    setStakingDefault(StakingMode.Claim)
                  }}
                  loading={tokenBalanceLoading}
                />
              </li>
            ) : null}
          </ul>
          {govTokenBalance?.amount ? (
            <div className="bg-base-300 rounded-lg w-full mt-2 px-6 py-4">
              <h3 className="font-mono text-sm font-semibold mb-3">
                You have{' '}
                {convertMicroDenomToDenomWithDecimals(
                  govTokenBalance?.amount,
                  tokenInfo.decimals
                ).toLocaleString(undefined, { maximumFractionDigits: 20 })}{' '}
                unstaked {tokenInfo.symbol}
              </h3>
              <p className="text-sm">
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
              <div className="text-right mt-3">
                <button
                  className="btn btn-sm btn-ghost normal-case font-normal"
                  onClick={() => {
                    setShowStaking(true)
                    setStakingDefault(StakingMode.Stake)
                  }}
                >
                  Stake tokens
                  <PlusSmIcon className="inline w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          ) : null}
          <ClaimsPendingList
            stakingAddress={daoInfo.staking_contract}
            tokenInfo={tokenInfo}
          />
          {showStaking && (
            <StakingModal
              defaultMode={stakingDefault}
              contractAddress={contractAddress}
              tokenSymbol={tokenInfo.symbol}
              claimAmount={claimsAvaliable}
              onClose={() => setShowStaking(false)}
              beforeExecute={() => setTokenBalancesLoading(true)}
              afterExecute={() => setTokenBalancesLoading(false)}
            />
          )}
        </div>
      </Sidebar>
    </div>
  )
}

const DaoHomePage: NextPage = () => (
  <ErrorBoundary title="DAO Not Found">
    <DaoHome />
  </ErrorBoundary>
)

export default DaoHomePage
