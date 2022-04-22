import React, { useEffect, useState } from 'react'

import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { QueryClient } from '@dao-dao/state/clients/cw-governance'
import { useThemeContext } from '@dao-dao/ui'
import { cosmWasmClientRouter, CHAIN_RPC_ENDPOINT } from '@dao-dao/utils'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

import { Logo, PageWrapper, PageWrapperProps } from '@/components'
import { DAO_ADDRESS } from '@/util/constants'

ChartJS.register(CategoryScale, LinearScale, BarElement)

const expectedAPRDurations = [
  {
    label: '1 week',
    days: 7,
  },
  {
    label: '2 weeks',
    days: 14,
  },
  {
    label: 'month',
    days: 30,
  },
  {
    label: '6 months',
    days: 182,
  },
  {
    label: '1 year',
    days: 365,
  },
]

const InnerHome: NextPage<PageWrapperProps> = () => {
  const router = useRouter()
  const { theme } = useThemeContext()

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

  // Earnings only, excluding original value.
  const projectedEarnings = expectedAPRDurations.map(
    ({ days }) => yourStake * (1 + aprReward / 100) ** (days / 365) - yourStake
  )

  // Compute dark color based on stylesheet.
  const [barColor, setBarColor] = useState('white')
  useEffect(() => {
    // Do nothing if not on browser.
    if (typeof window === 'undefined') return

    const timeout = setTimeout(() => {
      // Extract '--dark' variable from CSS.
      const style = getComputedStyle(document.body)
      setBarColor(style.getPropertyValue('--dark').trim())
    }, 100)

    return () => clearTimeout(timeout)
    // Update bar color when theme changes since we're reading a
    // dynamically-set CSS variable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, setBarColor])

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

      <div className="grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_1px_auto] rounded-lg border border-default lg:grid-cols-[minmax(0,_2fr)_1px_minmax(0,3fr)] lg:grid-rows-1">
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

        <div className="p-8">
          <p className="mb-4 font-mono text-sm">Hypothetical account value</p>

          <div className="flex flex-row gap-8 items-center">
            <div className="grid grid-cols-[auto_auto] gap-1 items-center gris-rows-2">
              <div className="justify-self-center mr-3 w-3 h-3 bg-toast rounded-full"></div>
              <p className="font-mono text-sm">Staked</p>
              <p className="col-start-2 font-mono text-sm text-tertiary">
                {yourStake.toLocaleString(undefined, {
                  maximumFractionDigits: tokenDecimals,
                })}{' '}
                {tokenName}
              </p>
            </div>

            <div className="grid grid-cols-[auto_auto] gap-1 items-center gris-rows-2">
              <div className="justify-self-center mr-3 w-3 h-3 bg-tertiary rounded-full"></div>
              <p className="font-mono text-sm">1 year projection</p>
              <p className="col-start-2 font-mono text-sm text-tertiary">
                {(projectedEarnings.slice(-1)[0] + yourStake).toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: tokenDecimals,
                  }
                )}{' '}
                {tokenName}
              </p>
            </div>
          </div>

          <Bar
            data={{
              labels: expectedAPRDurations.map(({ label }) => label),
              datasets: [
                // {
                //   data: [...Array(projectedEarnings.length)].map(
                //     () => yourStake
                //   ),
                //   barPercentage: 0.95,
                //   categoryPercentage: 1,
                //   backgroundColor: `rgba(${barColor}, 0.85)`,
                // },
                {
                  data: projectedEarnings,
                  barPercentage: 0.95,
                  categoryPercentage: 1,
                  backgroundColor: `rgba(${barColor}, 0.3)`,
                },
              ],
            }}
            options={{
              aspectRatio: 2.5,
              // Disable all events (hover, tooltip, etc.)
              events: [],
              animation: false,
              scales: {
                x: {
                  display: true,
                  stacked: true,
                  ticks: {
                    color: `rgba(${barColor}, 0.3)`,
                  },
                },
                y: {
                  display: false,
                  stacked: true,
                },
              },
              elements: {
                bar: {
                  backgroundColor: `rgba(${barColor}, 0.3)`,
                },
              },
            }}
          />
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
