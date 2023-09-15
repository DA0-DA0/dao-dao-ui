import {
  CategoryScale,
  ChartDataset,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  ScatterDataPoint,
  Title,
  Tooltip,
} from 'chart.js'
import clsx from 'clsx'
import Controller from 'node-pid-controller'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'

import { useNamedThemeColor } from '../theme'
import { VOTING_POWER_DISTRIBUTION_COLORS } from './dao/create/DaoCreateVotingPowerDistribution'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// How to change the price of an asset on each rebalance.
export type RebalancerProjection =
  | {
      type: 'linear'
      slope: number
    }
  | {
      type: 'random'
      disturbance: number
    }

export type RebalancerProjectorAsset = {
  symbol: string
  currentAmount: number
  targetProportion: number
  // $ per 1 unit of asset
  currentPrice: number
  projection: RebalancerProjection
}

export type RebalancerProjectorProps = {
  pid: {
    kp: number
    ki: number
    kd: number
    // Seconds between each rebalance.
    interval: number
  }
  assets: RebalancerProjectorAsset[]
  // How many times to rebalance.
  numRebalances: number
  className?: string
}

const changePrice = (
  currentPrice: number,
  projection: RebalancerProjection
) => {
  switch (projection.type) {
    case 'linear':
      return currentPrice * projection.slope
    case 'random':
      // Randomly increase or decrease the price based on the disturbance.
      return currentPrice * (1 + (Math.random() - 0.5) * projection.disturbance)
  }
}

export const RebalancerProjector = ({
  pid: { kp, ki, kd, interval },
  assets,
  numRebalances,
  className,
}: RebalancerProjectorProps) => {
  const textColor = useNamedThemeColor('text-tertiary')
  const borderColor = useNamedThemeColor('border-primary')

  const controller = useMemo(
    () =>
      new Controller({
        k_p: kp,
        k_i: ki,
        k_d: kd,
        dt: interval,
      }),
    [interval, kd, ki, kp]
  )

  const assetPrices = assets.map(({ currentPrice, projection }) => {
    let latestPrice = currentPrice
    return [
      currentPrice,
      // Change prices at each rebalance.
      ...[...Array(numRebalances)].map(() => {
        latestPrice = changePrice(latestPrice, projection)
        return latestPrice
      }),
    ]
  })

  // Map asset index to latest amount.
  const latestAmounts = assets.reduce(
    (acc, { currentAmount }, index) => ({
      ...acc,
      [index]: currentAmount,
    }),
    {} as Record<number, number>
  )

  const projections: ChartDataset<
    'line',
    (number | ScatterDataPoint | null)[]
    >[] = [...Array(numRebalances)].map(() => {
    
  })

  const getProjections = ({
    symbol,
    currentAmount,
    targetProportion,
    currentPrice,
    projection,
  }: RebalancerProjectorAsset): ChartDataset<
    'line',
    (number | ScatterDataPoint | null)[]
  >[] => {
    controller.setTarget(targetValue)

    // Change prices at each rebalance.
    let latestPrice = currentPrice
    const priceUpdates = [...Array(numRebalances)].map(() => {
      latestPrice = changePrice(latestPrice, projection)
      return latestPrice
    })

    // Change amounts at each rebalance.
    let latestAmount = currentAmount
    const values = [
      currentAmount * currentPrice,
      ...priceUpdates.map((price) => {
        // Rebalance with PID.
        const rebalanceValue = controller.update(latestAmount * price)
        latestAmount += rebalanceValue / price

        // Return projected value.
        return latestAmount * price
      }),
    ]

    return [
      {
        label: `${symbol} Price`,
        data: [currentPrice, ...priceUpdates],
      },
      {
        label: `${symbol} Value`,
        data: values,
      },
    ]
  }

  return (
    <div className={clsx('h-full', className)}>
      <Line
        data={{
          labels: [...Array(numRebalances)].map((_, index) =>
            (index + 1).toLocaleString()
          ),
          datasets: assets.flatMap(getProjections).map((p, index) => ({
            ...p,
            borderColor:
              VOTING_POWER_DISTRIBUTION_COLORS[
                index % VOTING_POWER_DISTRIBUTION_COLORS.length
              ],
          })),
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          // Disable all events (hover, tooltip, etc.)
          events: [],
          animation: false,
          elements: {
            point: {
              radius: 0,
            },
          },
          plugins: {
            title: {
              display: false,
            },
            // legend: {
            //   position: 'bottom',
            // },
          },
          scales: {
            x: {
              display: true,
              ticks: {
                color: textColor,
              },
              grid: {
                color: borderColor,
                tickColor: 'transparent',
              },
            },
            y: {
              display: true,
              title: {
                text: 'Est. USD Value',
                display: true,
                color: textColor,
              },
              ticks: {
                color: textColor,
              },
              grid: {
                color: borderColor,
                tickColor: 'transparent',
              },
            },
          },
        }}
      />
    </div>
  )
}
