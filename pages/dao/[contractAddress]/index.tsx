import {
  CurrencyDollarIcon,
  KeyIcon,
  LibraryIcon,
  PencilIcon,
  PlusSmIcon,
} from '@heroicons/react/outline'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  daoSelector,
  isMemberSelector,
  proposalCount,
  tokenConfig,
  totalStaked,
} from 'selectors/daos'
import { cw20Balances, nativeBalance } from 'selectors/treasury'
import { convertMicroDenomToDenom } from 'util/conversion'
import {
  walletStakedTokenBalance,
  walletTokenBalance,
} from 'selectors/treasury'
import {
  ContractBalances,
  BalanceCard,
  ContractProposalsDispaly,
  GradientHero,
  HeroContractFooter,
  HeroContractHeader,
} from 'components/ContractView'
import { Breadcrumbs } from 'components/Breadcrumbs'
import { StakingModal, StakingMode } from 'components/StakingModal'

const DaoHome: NextPage = () => {
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

  const [showStaking, setShowStaking] = useState(false)
  const [stakingDefault, setStakingDefault] = useState(StakingMode.Stake)

  const stakedPercent = (
    (100 * stakedTotal) /
    Number(tokenInfo?.total_supply)
  ).toLocaleString(undefined, { maximumSignificantDigits: 3 })

  return (
    <div className="grid grid-cols-6 overflow-auto mb-3">
      <div className="col-span-4 min-h-screen">
        <GradientHero>
          <Breadcrumbs
            crumbs={[
              ['/dao/list', 'DAOs'],
              [router.asPath, daoInfo.config.name],
            ]}
          />

          <HeroContractHeader
            name={daoInfo.config.name}
            description={daoInfo.config.description}
            member={member}
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
              {convertMicroDenomToDenom(daoInfo?.config.proposal_deposit)} $
              {tokenInfo.symbol} proposal deposit
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
      <div className="col-start-5 col-span-2 p-6 min-h-screen h-full">
        <ContractBalances
          contractType="DAO"
          native={nativeBalances}
          cw20={cw20balances}
        />
        <hr className="mt-8 mb-6" />
        <h2 className="font-medium text-md">Your shares</h2>
        <ul className="list-none mt-3">
          <li>
            <BalanceCard
              title="Balance"
              amount={convertMicroDenomToDenom(
                govTokenBalance?.amount
              ).toLocaleString()}
              denom={tokenInfo?.symbol}
              onPlus={() => {
                setShowStaking(true)
                setStakingDefault(StakingMode.Stake)
              }}
              onMinus={() => {
                setShowStaking(true)
                setStakingDefault(StakingMode.Unstake)
              }}
            />
          </li>
          <li>
            <BalanceCard
              title={`Voting power (staked ${tokenInfo?.symbol})`}
              amount={convertMicroDenomToDenom(
                stakedGovTokenBalance.amount
              ).toLocaleString()}
              denom={tokenInfo?.symbol}
              onPlus={() => {
                setShowStaking(true)
                setStakingDefault(StakingMode.Unstake)
              }}
              onMinus={() => {
                setShowStaking(true)
                setStakingDefault(StakingMode.Stake)
              }}
            />
          </li>
        </ul>
        {govTokenBalance?.amount ? (
          <div className="bg-base-300 rounded-lg w-full mt-2 px-6 py-4">
            <h3 className="font-mono text-sm font-semibold mb-3">
              You have{' '}
              {convertMicroDenomToDenom(
                govTokenBalance?.amount
              ).toLocaleString()}{' '}
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
        {showStaking && (
          <StakingModal
            defaultMode={stakingDefault}
            contractAddress={contractAddress}
            tokenSymbol={tokenInfo.symbol}
            onClose={() => setShowStaking(false)}
          />
        )}
      </div>
    </div>
  )
}

export default DaoHome
