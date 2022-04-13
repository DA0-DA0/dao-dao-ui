import React, { useEffect, useState } from 'react'

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { useRecoilState, useRecoilValue } from 'recoil'

import { LibraryIcon, PlusSmIcon, UsersIcon } from '@heroicons/react/outline'
import { useThemeContext } from 'ui'

import { claimAvaliable, ClaimsPendingList } from '@components/Claims'
import { DaoContractInfo } from '@components/DaoContractInfo'
import SvgMemberCheck from '@components/icons/MemberCheck'
import SvgPencil from '@components/icons/Pencil'
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
import { cosmWasmClientRouter } from 'util/chainClientRouter'
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
  const initialClaimsAvaliable = stuff.claims
    .filter((c) => claimAvaliable(c, blockHeight))
    .reduce((p, n) => p + Number(n.amount), 0)

  // If a claim becomes avaliable while the page is open we need a way to update
  // the number of claims avaliable.
  const [claimsAvaliable, setClaimsAvaliable] = useState(initialClaimsAvaliable)

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
    <div className="grid overflow-auto grid-cols-6 mb-3 min-h-screen">
      <div className="col-span-4 min-h-screen">
        <GradientHero>
          <div className="flex justify-between">
            <Breadcrumbs
              crumbs={[
                ['/starred', 'Home'],
                [router.asPath, daoInfo.config.name],
              ]}
            />
            <div className="flex flex-row gap-4 items-center">
              {member && (
                <div className="flex flex-row gap-2 items-center">
                  <SvgMemberCheck fill="currentColor" width="16px" />
                  <p className="text-sm text-primary">You{"'"}re a member</p>
                </div>
              )}
              <StarButton
                onPin={() => {
                  if (pinned) {
                    setPinnedDaos((p) => p.filter((a) => a !== contractAddress))
                  } else {
                    setPinnedDaos((p) => p.concat([contractAddress]))
                    addToken(daoInfo.gov_token)
                  }
                }}
                pinned={pinned}
              />
            </div>
          </div>

          <HeroContractHeader
            address={contractAddress}
            description={daoInfo.config.description}
            imgUrl={daoInfo.config.image_url}
            name={daoInfo.config.name}
          />

          <div className="mt-2">
            <HeroContractHorizontalInfo>
              <HeroContractHorizontalInfoSection>
                <UsersIcon className="inline w-4" />
                {convertMicroDenomToDenomWithDecimals(
                  tokenInfo.total_supply,
                  tokenInfo.decimals
                ).toLocaleString()}{' '}
                ${tokenInfo?.symbol} total supply
              </HeroContractHorizontalInfoSection>
              <HeroContractHorizontalInfoSection>
                <LibraryIcon className="inline w-4" />
                {stakedPercent}% ${tokenInfo?.symbol} staked
              </HeroContractHorizontalInfoSection>
              <HeroContractHorizontalInfoSection>
                <SvgPencil className="inline" fill="currentColor" />
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
      <div className="col-span-2 col-start-5 p-6 h-full min-h-screen">
        <h2 className="mt-1 mb-[23px] title-text">Your shares</h2>
        <ul className="mt-3 list-none">
          <li>
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
          <li>
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
          {claimsAvaliable ? (
            <li>
              <BalanceCard
                amount={convertMicroDenomToDenomWithDecimals(
                  claimsAvaliable,
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
          incrementClaimsAvaliable={(n) => setClaimsAvaliable((a) => a + n)}
          stakingAddress={daoInfo.staking_contract}
          tokenInfo={tokenInfo}
        />
        {showStaking && (
          <StakingModal
            afterExecute={() => setTokenBalancesLoading(false)}
            beforeExecute={() => setTokenBalancesLoading(true)}
            claimAmount={claimsAvaliable}
            contractAddress={contractAddress}
            defaultMode={StakingMode.Stake}
            onClose={() => setShowStaking(false)}
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

  const { setAccentColor, theme } = useThemeContext()

  // Only set the accent color if we have enough contrast.
  if (accentColor) {
    const rgb = accentColor
      .replace(/^rgba?\(|\s+|\)$/g, '')
      .split(',')
      .map(Number)
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
    if (
      (theme === 'dark' && brightness < 60) ||
      (theme === 'light' && brightness > 255 - 80)
    ) {
      accentColor = undefined
    }
  }

  useEffect(() => {
    if (!isReady || isFallback) return

    setAccentColor(accentColor)
  }, [accentColor, setAccentColor, isReady, isFallback])

  // Trigger Suspense.
  if (!isReady || isFallback) throw new Promise((_resolve) => {})

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

  try {
    const client = await cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT)
    const daoInfo = await client.queryContractSmart(contractAddress, {
      get_config: {},
    })
    if (!daoInfo || !daoInfo.config || !daoInfo.config.image_url) {
      return { props: {} }
    }

    const accentColor = await getFastAverageColor(daoInfo.config.image_url)
    return { props: { accentColor } }
  } catch (err) {
    console.error(err)
  }

  return { props: {} }
}
