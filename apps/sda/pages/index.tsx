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

const InnerHome: NextPage<PageWrapperProps> = () => {
  const router = useRouter()
  const { theme } = useThemeContext()

  const tokenName = 'RAW'
  const tokenDecimals = 6

  const rawPrice = 40.2
  const treasuryBalance = 1980000
  const totalStakedBalance = 700000
  const yourStake = 1025
  const votingPower = (yourStake / totalStakedBalance) * 100
  const aprReward = 103

  // Earnings only, excluding original value.
  const projectedEarnings = [...Array(5)].map(
    (_, i) => yourStake * (1 + aprReward / 100) ** i - yourStake
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
    <div className="p-8 mx-auto space-y-16 max-w-screen-xl">
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

      <div className="absolute">
        <Bar
          data={{
            labels: projectedEarnings.map((_, i) =>
              i === 0 ? 'now' : `year ${i}`
            ),
            datasets: [
              {
                data: [...Array(projectedEarnings.length)].map(() => yourStake),
                barPercentage: 0.95,
                categoryPercentage: 1,
                backgroundColor: `rgba(${barColor}, 0.7)`,
              },
              {
                data: projectedEarnings,
                barPercentage: 0.95,
                categoryPercentage: 1,
                backgroundColor: `rgba(${barColor}, 0.3)`,
              },
            ],
          }}
          options={{
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
