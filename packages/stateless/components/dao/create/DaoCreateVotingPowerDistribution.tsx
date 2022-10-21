import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from 'chart.js'
import clsx from 'clsx'
import { Bar, Pie } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

import { useNamedThemeColor } from '../../../theme'
import { CopyToClipboard } from '../../CopyToClipboard'

declare module 'chart.js' {
  interface TooltipPositionerMap {
    center: TooltipPositionerFunction<ChartType>
  }
}

Tooltip.positioners.center = function (elements, eventPosition) {
  const pos = Tooltip.positioners.average.bind(this)(elements, eventPosition)

  return (
    pos && {
      x: pos.x / 2,
      y: pos.y,
      xAlign: 'center',
      yAlign: 'bottom',
    }
  )
}

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip)

export interface ChartDataEntry {
  name?: string
  value: number
  color: string
}

export interface TierDataEntry {
  name: string
  color?: string
  readableValue?: string
  members?: {
    color?: string
    address: string
    readableValue: string
  }[]
}

export interface DaoCreateVotingPowerDistributionReviewCardProps {
  pieData: ChartDataEntry[]
  tierData: TierDataEntry[]
  distributionPrefix?: string
}

export const DaoCreateVotingPowerDistributionReviewCard = ({
  pieData,
  tierData,
  distributionPrefix,
}: DaoCreateVotingPowerDistributionReviewCardProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-stretch rounded-lg bg-background-tertiary sm:flex-row">
      <div className="flex shrink-0 flex-col items-center gap-8 border-b border-border-secondary p-6 sm:border-r sm:border-b-0">
        <p className="primary-text self-stretch text-text-body">
          {t('title.votingPower')}
        </p>

        <PieChart className="mx-10" data={pieData} />
      </div>

      <div className="flex grow flex-col gap-6 overflow-hidden p-6">
        <p className="primary-text mb-2 text-text-body">
          {distributionPrefix}
          {t('title.distribution')}
        </p>

        {tierData.map(({ name, color, readableValue, members }, index) => (
          <div
            key={index}
            className={clsx('flex flex-col gap-1', !members?.length && '-mb-2')}
          >
            <div className="mb-2 flex flex-row items-center justify-between gap-2">
              <div className="flex flex-row items-center gap-3">
                {color && (
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                )}
                <p className="link-text text-text-secondary">{name}</p>
              </div>

              <p className="caption-text text-right font-mono text-text-tertiary">
                {readableValue}
              </p>
            </div>

            {members?.map(({ address, readableValue, color }, index) => (
              <div
                key={index}
                className="ml-1 flex flex-row items-center justify-between gap-6"
              >
                <div className="flex flex-row items-center gap-3 overflow-hidden">
                  {color && (
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                  )}
                  <CopyToClipboard
                    takeStartEnd={{ start: address.length, end: 0 }}
                    value={address}
                  />
                </div>

                <p className="caption-text text-right font-mono text-text-tertiary">
                  {readableValue}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export interface ChartProps {
  data: ChartDataEntry[]
  className?: string
}

const PieChart = ({ data, className }: ChartProps) => (
  <Pie
    className={clsx(
      '!h-32 !w-32 justify-self-center md:!h-40 md:!w-40',
      className
    )}
    data={{
      datasets: [
        {
          data: data.map(({ value }) => value),
          backgroundColor: data.map(({ color }) => color),
          borderWidth: 0,
        },
      ],
    }}
    options={{
      // Disable all events (hover, tooltip, etc.)
      events: [],
      animation: false,
    }}
  />
)

export const DaoCreateVotingPowerDistributionBarChart = ({
  data,
}: ChartProps) => {
  const darkRgb = useNamedThemeColor('dark')

  return (
    <Bar
      data={{
        labels: data.map(({ name }) => name),
        datasets: [
          {
            data: data.map(({ value }) => value),
            backgroundColor: data.map(({ color }) => color),
            borderWidth: 0,
            barThickness: 40,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              title: (items) => items[0].label,
              label: () => '',
            },
            titleMarginBottom: 0,
            position: 'center',
          },
        },
        // Horizontal bar chart
        indexAxis: 'y',
        responsive: true,
        scales: {
          x: {
            display: true,
            ticks: {
              color: `rgba(${darkRgb}, 0.2)`,
            },
            grid: {
              borderColor: `rgba(${darkRgb}, 0.1)`,
              color: `rgba(${darkRgb}, 0.1)`,
            },
          },
          y: {
            display: false,
          },
        },
      }}
    />
  )
}

// 1-10 linear from purple to orange/yellow. Intersperse colors so similar
// colors are not adjacent.
export const VOTING_POWER_DISTRIBUTION_COLORS = [
  '#5B58E2', // 1
  '#954FE7', // 4
  '#FC81A4', // 7
  '#F1B671', // 10
  '#4744AC', // 2
  '#BA73DD', // 5
  '#EE7969', // 8
  '#6642CE', // 3
  '#DE73C0', // 6
  '#F4925A', // 9
]
