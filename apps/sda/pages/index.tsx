/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Pie } from '@dao-dao/icons'
import { useWallet } from '@dao-dao/state'
import { Claim } from '@dao-dao/state/clients/stake-cw20'
import { Button, ClaimsListItem, StakingMode } from '@dao-dao/ui'

import {
  Logo,
  PageWrapper,
  PageWrapperProps,
  StakingModal,
  makeGetServerSideProps,
} from '@/components'

interface Pool {
  asset1: {
    name: string
    iconURI: string
  }
  asset2: {
    name: string
    iconURI: string
  }
  liquidity: number
  staked: number
  rewardURIs: string[]
  apr: number
}

const InnerHome = () => {
  const router = useRouter()
  const { connected } = useWallet()
  // Set to default mode to display, and undefined to hide.
  const [showStakingDefaultMode, setShowStakingDefaultMode] =
    useState<StakingMode>()

  const tokenName = 'RAW'
  const tokenDecimals = 6

  const rawPrice = 40.2
  const treasuryBalance = 1980000
  const totalStakedBalance = 700000
  const unstakedBalance = 2500.1234
  const stakedBalance = 1025.4321
  const votingPower = (stakedBalance / totalStakedBalance) * 100
  const aprReward = 103

  const unstakingDuration = { time: 3600 * 24 * 7 }
  const blockHeight = 1231234
  const tokenInfo = {
    decimals: 6,
    name: 'RAW',
    symbol: 'RAW',
    total_supply: '1000000000',
  }

  const convertToUSD = (token: number) => token * rawPrice

  const claims: Claim[] = [
    {
      amount: '100000000',
      release_at: {
        at_time: ((new Date().getTime() + 100000) * 1000000).toString(),
      },
    },
    {
      amount: '2050000000',
      release_at: {
        at_time: ((new Date().getTime() + 3200000) * 1000000).toString(),
      },
    },
    {
      amount: '20500009000',
      release_at: {
        at_time: ((new Date().getTime() + 32005000) * 1000000).toString(),
      },
    },
  ]

  if (router.isFallback) {
    throw new Error('Failed to load page data.')
  }

  return (
    <>
      <div className="p-8 mx-auto space-y-8 max-w-screen-xl">
        <div className="flex relative flex-col items-center mt-10 bg-primary rounded-b-lg">
          <div className="absolute -top-8 bg-light rounded-full border border-default">
            <Logo height={60} width={60} />
          </div>

          <p className="p-4 mt-16 mb-10 text-3xl text-center">
            1 RAW = $
            {rawPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{' '}
            USD
          </p>

          <div className="flex flex-row justify-around items-center mb-6 w-full text-center md:gap-12 md:justify-center">
            <div className="flex flex-col gap-2 items-center p-2">
              <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
                DAO Treasury
              </p>

              <p className="text-base lg:text-xl">
                {treasuryBalance.toLocaleString(undefined, {
                  maximumFractionDigits: tokenDecimals,
                })}{' '}
                {tokenName}
              </p>
            </div>

            <div className="w-[1px] h-6 bg-dark opacity-10"></div>

            <div className="flex flex-col gap-2 items-center p-2">
              <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
                Total staked
              </p>

              <p className="text-base lg:text-xl">
                {totalStakedBalance.toLocaleString(undefined, {
                  maximumFractionDigits: tokenDecimals,
                })}{' '}
                {tokenName}
              </p>
            </div>

            <div className="w-[1px] h-6 bg-dark opacity-10"></div>

            <div className="flex flex-col gap-2 items-center p-2">
              <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
                APR Reward
              </p>

              <p className="text-base lg:text-xl">
                +
                {aprReward.toLocaleString(undefined, {
                  maximumFractionDigits: 4,
                })}
                % APR
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 items-center text-lg">
          <Pie color="rgb(var(--dark))" height={22} width={22} />
          <p>Your Tokens</p>
        </div>

        <div className="flex flex-col gap-4 justify-start items-stretch !mt-4 lg:flex-row">
          <div className="flex-1 p-6 bg-very-light rounded-lg border border-default">
            <p className="mb-2 font-mono text-sm text-tertiary">
              Balance (unstaked {tokenName})
            </p>

            <div className="flex flex-row gap-2 items-center mb-4">
              <Logo height={20} width={20} />
              <p className="text-base">
                {unstakedBalance.toLocaleString(undefined, {
                  maximumFractionDigits: tokenDecimals,
                })}{' '}
                {tokenName}
              </p>
            </div>

            <div className="flex flex-row justify-between items-center">
              <p className="text-lg font-medium">
                ${' '}
                {convertToUSD(unstakedBalance).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{' '}
                USD
              </p>

              <Button
                disabled={!connected}
                onClick={() => setShowStakingDefaultMode(StakingMode.Stake)}
                variant="secondary"
              >
                Manage
              </Button>
            </div>
          </div>

          <div className="flex-1 p-6 bg-very-light rounded-lg border border-default">
            <p className="mb-2 font-mono text-sm text-tertiary">
              Voting power (staked {tokenName})
            </p>

            <div className="flex flex-row justify-between items-center mb-4">
              <div className="flex flex-row gap-2 items-center">
                <Logo height={20} width={20} />
                <p className="text-base">
                  {stakedBalance.toLocaleString(undefined, {
                    maximumFractionDigits: tokenDecimals,
                  })}{' '}
                  {tokenName}
                </p>
              </div>

              <p className="text-base text-secondary">
                {votingPower.toLocaleString(undefined, {
                  maximumFractionDigits: 4,
                })}
                %{' '}
                <span className="text-xs text-tertiary">
                  of all voting power
                </span>
              </p>
            </div>

            <div className="flex flex-row justify-between items-center">
              <p className="text-lg font-medium">
                ${' '}
                {convertToUSD(stakedBalance).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{' '}
                USD
              </p>

              <Button
                disabled={!connected}
                onClick={() => setShowStakingDefaultMode(StakingMode.Unstake)}
                variant="secondary"
              >
                Manage
              </Button>
            </div>
          </div>
        </div>

        <p className="text-lg">Unstaking {tokenName} tokens</p>

        <div className="flex flex-col items-stretch !mt-4">
          {claims.map((claim, idx) => (
            <ClaimsListItem
              key={idx}
              blockHeight={blockHeight}
              claim={claim}
              iconURI="/juno.svg"
              incrementClaimsAvailable={console.log}
              tokenInfo={tokenInfo}
              unstakingDuration={unstakingDuration}
            />
          ))}
        </div>
      </div>

      {showStakingDefaultMode !== undefined && (
        <StakingModal
          defaultMode={showStakingDefaultMode}
          onClose={() => setShowStakingDefaultMode(undefined)}
        />
      )}
    </>
  )
}

const HomePage: NextPage<PageWrapperProps> = ({ children: _, ...props }) => (
  <PageWrapper {...props}>
    <InnerHome />
  </PageWrapper>
)

export default HomePage

export const getServerSideProps = makeGetServerSideProps()
