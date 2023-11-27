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
import { useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'
import useDeepCompareEffect from 'use-deep-compare-effect'

import { DISTRIBUTION_COLORS, formatDate } from '@dao-dao/utils'

import { useNamedThemeColor } from '../theme'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export type RebalancerProjectorAsset = {
  symbol: string
  initialAmount: number
  targetProportion: number
  // $ per 1 unit of asset. Each item is the price at each point in time when a
  // rebalance occurs. The length should be `rebalanceTimestamps.length + 1` so
  // that this includes the initial balance.
  prices: number[]
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
  // When to rebalance. There should be one fewer rebalance timestamps than
  // prices for each asset, since the initial price is included.
  rebalanceTimestamps: Date[]
  className?: string
}

export const RebalancerProjector = ({
  pid: { kp, ki, kd, interval },
  assets,
  rebalanceTimestamps,
  className,
}: RebalancerProjectorProps) => {
  const textColor = useNamedThemeColor('text-tertiary')
  const borderColor = useNamedThemeColor('border-primary')

  const [datasets, setDatasets] = useState<
    ChartDataset<'line', (number | ScatterDataPoint | null)[]>[]
  >([])

  const numRebalances = rebalanceTimestamps.length
  const makeProjections = () => {
    // The PID controller for each asset.
    const controllers = [...Array(assets.length)].map(
      () =>
        new Controller({
          k_p: kp,
          k_i: ki,
          k_d: kd,
          dt: interval,
        })
    )

    // Each projection is a list of all assets' amount and price after each
    // rebalance.
    const projections = [...Array(numRebalances)].reduce(
      (
        acc: {
          amount: number
          price: number
        }[][],
        _,
        rebalanceIndex
      ) => {
        const lastProjection = acc[acc.length - 1]

        // Update the price for each asset.
        const newProjection = assets.map(({ prices }, index) => ({
          amount: lastProjection[index].amount,
          price: prices[rebalanceIndex + 1],
        }))

        // Get total value of assets based on new prices.
        const totalValue = newProjection.reduce(
          (acc, { amount, price }) => acc + amount * price,
          0
        )

        // TODO: Contrain buy amounts to only how much we are able to sell of
        // other assets. Just like the sell amount is bounded by 0 on the
        // bottom, we need to bound the buy amount by the total value not
        // already sold of other assets.

        // Use PID controller with new values to rebalance amounts.
        assets.forEach(({ targetProportion }, index) => {
          const controller = controllers[index]
          const { amount: lastAmount, price } = newProjection[index]

          const targetValue = targetProportion * totalValue
          controller.setTarget(targetValue)

          const currentValue = lastAmount * price
          // Rebalance with PID.
          const rebalanceValue = controller.update(currentValue)
          // Cannot sell more than we have.
          const newAmount = Math.max(0, lastAmount + rebalanceValue / price)

          // Update projection amount.
          newProjection[index].amount = newAmount
        })

        return [...acc, newProjection]
      },
      [
        // Start with initial amount and price for each asset.
        assets.map(({ initialAmount, prices }) => ({
          amount: initialAmount,
          price: prices[0],
        })),
      ]
    )

    setDatasets(
      [
        ...assets.map(
          (
            { symbol },
            assetIndex
          ): ChartDataset<'line', (number | ScatterDataPoint | null)[]> => ({
            label: `${symbol} Value`,
            data: projections.map(
              (projection) =>
                projection[assetIndex].amount * projection[assetIndex].price
            ),
          })
        ),
        // Total
        {
          label: 'Total Value',
          data: projections.map((projection) =>
            projection.reduce(
              (acc, { amount, price }) => acc + amount * price,
              0
            )
          ),
        },
      ].map((p, index) => ({
        ...p,
        borderColor: DISTRIBUTION_COLORS[index % DISTRIBUTION_COLORS.length],
        backgroundColor:
          DISTRIBUTION_COLORS[index % DISTRIBUTION_COLORS.length],
      }))
    )
  }
  const makeProjectionsRef = useRef(makeProjections)
  makeProjectionsRef.current = makeProjections

  // When any projection info changes...
  useDeepCompareEffect(() => {
    makeProjectionsRef.current()
  }, [kp, ki, kd, interval, assets, numRebalances])

  return (
    <div className={clsx('h-full', className)}>
      <Line
        data={{
          labels: ['Initial', ...rebalanceTimestamps.map((t) => formatDate(t))],
          datasets,
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
            tooltip: {
              // Show all x-axis values in one tooltip.
              mode: 'index',
            },
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
