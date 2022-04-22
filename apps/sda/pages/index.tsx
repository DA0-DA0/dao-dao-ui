import React from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import {
  Logo,
  PageWrapper,
  PageWrapperProps,
  TokenomicsIcon,
  makeDAOGetServerSideProps,
} from '@/components'

const InnerHome: NextPage<PageWrapperProps> = () => {
  const router = useRouter()

  const tokenName = 'RAW'
  const tokenDecimals = 6

  const rawPrice = 40.2
  const treasuryBalance = 1980000
  const totalStakedBalance = 700000
  const yourStake = 1025.4321
  const votingPower = (yourStake / totalStakedBalance) * 100
  const aprReward = 103

  // Extract decimals only from stake so we can change font size.
  const yourStakeDecimalsOnly = yourStake
    .toLocaleString(undefined, {
      maximumFractionDigits: tokenDecimals,
    })
    .split('.')[1]

  if (router.isFallback) {
    throw new Error('Failed to load page data.')
  }

  return (
    <div className="p-8 mx-auto space-y-8 max-w-screen-xl">
      <div className="flex relative flex-col items-center mt-10 bg-primary rounded-b-lg">
        <div className="absolute -top-8 bg-light rounded-full border border-default">
          <Logo height={60} width={60} />
        </div>

        <p className="mt-16 mb-10 text-3xl text-center">
          1 RAW = $
          {rawPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          USD
        </p>

        <div className="flex flex-row gap-12 justify-center items-center mb-6 w-full">
          <div className="flex flex-col gap-2 items-center">
            <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
              DAO Treasury
            </p>

            <p className="text-xl">
              {treasuryBalance.toLocaleString(undefined, {
                maximumFractionDigits: tokenDecimals,
              })}{' '}
              {tokenName}
            </p>
          </div>

          <div className="w-[1px] h-6 bg-dark opacity-10"></div>

          <div className="flex flex-col gap-2 items-center">
            <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
              Total staked
            </p>

            <p className="text-xl">
              {totalStakedBalance.toLocaleString(undefined, {
                maximumFractionDigits: tokenDecimals,
              })}{' '}
              {tokenName}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_1px_auto] rounded-lg border border-default lg:grid-cols-[minmax(0,_2fr)_1px_minmax(0,1fr)] lg:grid-rows-1">
        <div className="p-8">
          <p className="mb-4 font-mono text-sm">
            Staked tokens (=voting power)
          </p>

          <p className="text-2xl">
            {yourStake.toFixed(0)}
            <span className="text-xl">
              {yourStakeDecimalsOnly && `.${yourStakeDecimalsOnly}`} {tokenName}
            </span>
          </p>
        </div>

        <div className="w-full h-full bg-light"></div>

        <div className="flex flex-col gap-6 items-center p-8">
          <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-row gap-2 items-center">
              <TokenomicsIcon color="rgb(var(--dark))" height={18} width={18} />
              <p className="text-sm">Your Stake</p>
            </div>

            <p className="text-lg">
              {yourStake.toLocaleString(undefined, {
                maximumFractionDigits: tokenDecimals,
              })}{' '}
              {tokenName}
            </p>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <p className="font-mono text-sm text-tertiary">Voting power</p>

            <p className="text-lg">
              {votingPower.toLocaleString(undefined, {
                maximumFractionDigits: 4,
              })}
              %
            </p>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <p className="font-mono text-sm text-tertiary">APR reward</p>

            <p className="text-lg">
              +
              {aprReward.toLocaleString(undefined, {
                maximumFractionDigits: 4,
              })}
              % APR
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const Home: NextPage<PageWrapperProps> = ({ children: _, ...props }) => (
  <PageWrapper {...props}>
    <InnerHome {...props} />
  </PageWrapper>
)

export default Home

export const getServerSideProps = makeDAOGetServerSideProps()
