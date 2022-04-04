import React, { useEffect, useState } from 'react'

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { useRecoilState, useRecoilValue } from 'recoil'

import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { LibraryIcon, PlusSmIcon, UsersIcon } from '@heroicons/react/outline'
import { useThemeContext } from 'ui'

import { claimAvaliable, ClaimsPendingList } from '@components/Claims'
import { DaoContractInfo } from '@components/DaoContractInfo'
import SvgMemberCheck from '@components/icons/MemberCheck'
import SvgPencil from '@components/icons/Pencil'
import LoadingScreen from '@components/LoadingScreen'
import { pinnedDaosAtom } from 'atoms/pinned'
import { Breadcrumbs } from 'components/Breadcrumbs'
import {
  BalanceCard,
  ContractProposalsDispaly,
  GradientHero,
  HeroContractHorizontalInfo,
  HeroContractHeader,
  StarButton,
  HeroContractHorizontalInfoSection,
} from 'components/ContractView'
import ErrorBoundary from 'components/ErrorBoundary'
import { StakingModal, StakingMode } from 'components/StakingModal'
import { CHAIN_RPC_ENDPOINT } from 'selectors/cosm'
import {
  daoSelector,
  isMemberSelector,
  proposalCount,
  tokenConfig,
  totalStaked,
} from 'selectors/daos'
import {
  getBlockHeight,
  walletAddress,
  walletClaims,
  walletStakedTokenBalance,
  walletTokenBalance,
  walletTokenBalanceLoading,
} from 'selectors/treasury'
import { addToken } from 'util/addToken'
import { getFastAverageColor } from 'util/colors'
import { convertMicroDenomToDenomWithDecimals } from 'util/conversion'

function DaoHome() {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const daoInfo = useRecoilValue(daoSelector(contractAddress))
  const tokenInfo = useRecoilValue(tokenConfig(daoInfo?.gov_token))
  const stakedTotal = useRecoilValue(totalStaked(daoInfo?.staking_contract))
  const proposalsTotal = useRecoilValue(proposalCount(contractAddress))
  const { member } = useRecoilValue(isMemberSelector(contractAddress))

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

  const [pinnedDaos, setPinnedDaos] = useRecoilState(pinnedDaosAtom)
  const pinned = pinnedDaos.includes(contractAddress)

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

  return (
    <div className="grid grid-cols-6 overflow-auto mb-3 min-h-screen">
      <div className="col-span-4 min-h-screen">
        <GradientHero>
          <div className="flex justify-between items-center">
            <Breadcrumbs
              crumbs={[
                ['/starred', 'Home'],
                [router.asPath, daoInfo.config.name],
              ]}
            />
            <div className="flex flex-row items-center gap-4">
              {member && (
                <div className="flex flex-row items-center gap-2">
                  <SvgMemberCheck fill="currentColor" width="16px" />
                  <p className="text-sm text-primary">You{"'"}re a member</p>
                </div>
              )}
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
            address={contractAddress}
            description={daoInfo.config.description}
            imgUrl={daoInfo.config.image_url}
          />

          <div className="mt-2">
            <HeroContractHorizontalInfo>
              <HeroContractHorizontalInfoSection>
                <UsersIcon className="w-4 inline" />
                {convertMicroDenomToDenomWithDecimals(
                  tokenInfo.total_supply,
                  tokenInfo.decimals
                ).toLocaleString()}{' '}
                ${tokenInfo?.symbol} total supply
              </HeroContractHorizontalInfoSection>
              <HeroContractHorizontalInfoSection>
                <LibraryIcon className="w-4 inline" />
                {stakedPercent}% ${tokenInfo?.symbol} staked
              </HeroContractHorizontalInfoSection>
              <HeroContractHorizontalInfoSection>
                <SvgPencil fill="currentColor" className="inline" />
                {proposalsTotal} proposals created
              </HeroContractHorizontalInfoSection>
            </HeroContractHorizontalInfo>
          </div>

          <DaoContractInfo address={contractAddress} />
        </GradientHero>
        <div className="px-6">
          <ContractProposalsDispaly
            contractAddress={contractAddress}
            proposalCreateLink={`/dao/${contractAddress}/proposals/create`}
          />
        </div>
      </div>
      <div className="col-start-5 col-span-2 p-6 min-h-screen h-full">
        <h2 className="title-text mb-[23px] mt-1">Your shares</h2>
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
                }}
                loading={tokenBalanceLoading}
              />
            </li>
          ) : null}
        </ul>
        {govTokenBalance?.amount ? (
          <div className="bg-primary rounded-lg w-full mt-2 p-6">
            <h3 className="link-text mb-4">
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
            <div className="mt-4 flex justify-end">
              <button
                className="link-text flex items-center gap-2 rounded"
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
          stakingAddress={daoInfo.staking_contract}
          tokenInfo={tokenInfo}
        />
        {showStaking && (
          <StakingModal
            defaultMode={StakingMode.Stake}
            contractAddress={contractAddress}
            claimAmount={claimsAvaliable}
            onClose={() => setShowStaking(false)}
            beforeExecute={() => setTokenBalancesLoading(true)}
            afterExecute={() => setTokenBalancesLoading(false)}
          />
        )}
      </div>
    </div>
  )
}

interface StaticProps {
  accentColor?: string
}

const DaoHomePage: NextPage<StaticProps> = ({ accentColor }) => {
  const { isReady, isFallback } = useRouter()

  const { setAccentColor } = useThemeContext()
  useEffect(() => {
    if (!isReady || isFallback) return

    setAccentColor(accentColor)
  }, [accentColor, setAccentColor, isReady, isFallback])

  // Trigger Suspense.
  if (!isReady || isFallback) throw new Promise((resolve) => {})

  return (
    <ErrorBoundary title="DAO Not Found">
      <DaoHome />
    </ErrorBoundary>
  )
}

export default DaoHomePage

// Fallback to loading screen if page has not yet been statically generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params: { contractAddress } = { contractAddress: undefined },
}) => {
  if (typeof contractAddress !== 'string' || !contractAddress) {
    return { props: {} }
  }

  const client = await CosmWasmClient.connect(CHAIN_RPC_ENDPOINT)
  const daoInfo = await client.queryContractSmart(contractAddress, {
    get_config: {},
  })
  if (!daoInfo || !daoInfo.config || !daoInfo.config.image_url) {
    return { props: {} }
  }

  try {
    const accentColor = await getFastAverageColor(daoInfo.config.image_url)
    return { props: { accentColor } }
  } catch (err) {
    console.error(err)
  }

  return { props: {} }
}
