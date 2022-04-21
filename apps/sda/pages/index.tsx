import React from 'react'

import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { QueryClient } from '@dao-dao/state/clients/cw-governance'
import { cosmWasmClientRouter, CHAIN_RPC_ENDPOINT } from '@dao-dao/utils'

import { Logo, PageWrapper, PageWrapperProps } from '@/components'
import { DAO_ADDRESS } from '@/util/constants'

const InnerHome: NextPage<PageWrapperProps> = () => {
  const router = useRouter()

  const tokenName = 'RAW'
  const tokenDecimals = 6

  const rawPrice = 40.2
  const treasuryBalance = 1980000
  const totalStakedBalance = 700000
  const yourStake = 1025
  const votingPower = (yourStake / totalStakedBalance) * 100
  const aprReward = 103

  if (router.isFallback) {
    throw new Error('Failed to load page data.')
  }

  return (
    <div className="p-8 mx-auto max-w-screen-xl">
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

        <div className="flex flex-row justify-evenly items-center mb-6 w-full">
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

          <div className="w-[1px] h-6 bg-dark opacity-10"></div>

          <div className="flex flex-col gap-2 items-center">
            <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
              Your stake
            </p>

            <p className="text-xl">
              {yourStake.toLocaleString(undefined, {
                maximumFractionDigits: tokenDecimals,
              })}{' '}
              {tokenName}
            </p>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
              Voting power
            </p>

            <p className="text-xl">
              {votingPower.toLocaleString(undefined, {
                maximumFractionDigits: 4,
              })}
              %
            </p>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
              APR reward
            </p>

            <p className="text-xl">
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

export const getServerSideProps: GetServerSideProps<
  PageWrapperProps
> = async () => {
  try {
    const client = new QueryClient(
      await cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT),
      DAO_ADDRESS
    )

    const config = await client.config()

    return {
      props: {
        title: config.name,
        description: config.description,
        imageUrl: config.image_url || null,
      },
    }
  } catch (error) {
    console.error(error)
    return { notFound: true }
  }
}
