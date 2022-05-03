import React, { useEffect, useState } from 'react'

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { MemberCheck, Pencil } from '@dao-dao/icons'
import {
  useThemeContext,
  StakingMode,
  GradientHero,
  HorizontalInfo,
  ContractHeader,
  StarButton,
  HorizontalInfoSection,
  BalanceCard,
  Breadcrumbs,
} from '@dao-dao/ui'
import {
  convertMicroDenomToDenomWithDecimals,
  claimAvaliable,
} from '@dao-dao/utils'
import { LibraryIcon, PlusSmIcon, UsersIcon } from '@heroicons/react/outline'

import { ClaimsPendingList } from '@components/Claims'
import { DaoContractInfo } from '@components/DaoContractInfo'
import { pinnedDaosAtom } from 'atoms/pinned'
import { ContractProposalsDispaly } from 'components/ContractView'
import ErrorBoundary from 'components/ErrorBoundary'
import { StakingModal } from 'components/StakingModal'
import { contractInstantiateTime } from 'selectors/contracts'
import { CHAIN_RPC_ENDPOINT, isMemberSelector } from 'selectors/cosm'
import {
  daoSelector,
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
  walletTokenBalanceUpdateCountAtom,
} from 'selectors/treasury'
import { addToken } from 'util/addToken'
import { cosmWasmClientRouter } from 'util/chainClientRouter'
import { getFastAverageColor } from 'util/colors'

function YourShares() {
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
  const claimsAvaliable = stuff.claims
    .filter((c) => claimAvaliable(c, blockHeight))
    .reduce((p, n) => p + Number(n.amount), 0)

  const wallet = useRecoilValue(walletAddress)
  const [tokenBalanceLoading, setTokenBalancesLoading] = useRecoilState(
    walletTokenBalanceLoading(wallet)
  )
  const setWalletTokenBalanceUpdateCount = useSetRecoilState(
    walletTokenBalanceUpdateCountAtom(wallet)
  )

  const [showStaking, setShowStaking] = useState(false)
  return (
    <>
      <h2 className="mb-2 title-text">Your shares</h2>
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
        {claimsAvaliable ? (
          <li className="basis-0 grow min-w-max">
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
        incrementClaimsAvaliable={(_) =>
          setWalletTokenBalanceUpdateCount((n) => n + 1)
        }
        stakingAddress={daoInfo.staking_contract}
        tokenInfo={tokenInfo}
      />
      {showStaking && (
        <StakingModal
          afterExecute={() => setTokenBalancesLoading(false)}
          beforeExecute={() => setTokenBalancesLoading(true)}
          claimableTokens={claimsAvaliable}
          contractAddress={contractAddress}
          defaultMode={StakingMode.Stake}
          onClose={() => setShowStaking(false)}
        />
      )}
    </>
  )
}

function DaoHome() {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const daoInfo = useRecoilValue(daoSelector(contractAddress))
  const tokenInfo = useRecoilValue(tokenConfig(daoInfo?.gov_token))
  const establishedDate = useRecoilValue(
    contractInstantiateTime(contractAddress)
  )
  const stakedTotal = useRecoilValue(totalStaked(daoInfo?.staking_contract))
  const proposalsTotal = useRecoilValue(proposalCount(contractAddress))
  const { member } = useRecoilValue(isMemberSelector(contractAddress))

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
    <div className="flex overflow-auto flex-row grid-cols-6 justify-around mb-3 min-h-screen">
      <div className="min-h-screen">
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
                  <MemberCheck fill="currentColor" width="16px" />
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

          <ContractHeader
            description={daoInfo.config.description}
            established={establishedDate}
            imgUrl={daoInfo.config.image_url || undefined}
            name={daoInfo.config.name}
          />

          <div className="mt-2">
            <HorizontalInfo>
              <HorizontalInfoSection>
                <UsersIcon className="inline w-4" />
                {convertMicroDenomToDenomWithDecimals(
                  tokenInfo.total_supply,
                  tokenInfo.decimals
                ).toLocaleString()}{' '}
                ${tokenInfo?.symbol} total supply
              </HorizontalInfoSection>
              <HorizontalInfoSection>
                <LibraryIcon className="inline w-4" />
                {stakedPercent}% ${tokenInfo?.symbol} staked
              </HorizontalInfoSection>
              <HorizontalInfoSection>
                <Pencil className="inline" fill="currentColor" />
                {proposalsTotal} proposals created
              </HorizontalInfoSection>
            </HorizontalInfo>
          </div>
          <div className="block mt-4 md:hidden">
            <YourShares />
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
      <div className="hidden p-6 max-w-sm h-full min-h-screen md:block">
        <YourShares />
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
