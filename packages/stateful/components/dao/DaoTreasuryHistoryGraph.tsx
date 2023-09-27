import {
  CategoryScale,
  ChartDataset,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  TooltipModel,
} from 'chart.js'
import clsx from 'clsx'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

import { OsmosisHistoricalPriceChartPrecision } from '@dao-dao/state/recoil'
import {
  WarningCard,
  useCachedLoadingWithError,
  useDaoInfoContext,
  useNamedThemeColor,
} from '@dao-dao/stateless'
import { DaoTreasuryHistoryGraphProps } from '@dao-dao/types'
import {
  DISTRIBUTION_COLORS,
  formatDate,
  formatDateTime,
  formatPercentOf100,
  transformIbcSymbol,
} from '@dao-dao/utils'

import { daoTreasuryValueHistorySelector } from '../../recoil'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const DaoTreasuryHistoryGraph = ({
  filter,
  targets,
  className,
}: DaoTreasuryHistoryGraphProps) => {
  const { t } = useTranslation()
  const { chainId, coreAddress } = useDaoInfoContext()

  const textColor = useNamedThemeColor('text-tertiary')
  const borderColor = useNamedThemeColor('border-primary')
  const brandColor = useNamedThemeColor('text-brand')

  // TODO(treasury-history): make configurable
  // Default to 1 year ago.
  const [startSecondsAgo, setStartSecondsAgo] = useState(365 * 24 * 60 * 60)
  // Only `day` precision has prices as far back as a year.
  const [precision, setPrecision] =
    useState<OsmosisHistoricalPriceChartPrecision>('hour')

  const treasuryValueHistory = useCachedLoadingWithError(
    daoTreasuryValueHistorySelector({
      chainId,
      coreAddress,
      precision,
      filter,
      startSecondsAgo,
    })
  )

  const datasets: ChartDataset<'line', (number | null)[]>[] =
    treasuryValueHistory.loading || treasuryValueHistory.errored
      ? []
      : [
          ...treasuryValueHistory.data.tokens.flatMap(
            ({ symbol, values, currentValue }, index) => {
              // If all values are null/0, do not include this token.
              if (!values.every((d) => !d) && !currentValue) {
                return []
              }

              return {
                order: 2,
                label: '$' + transformIbcSymbol(symbol).tokenSymbol + ' Value',
                data: [...values, currentValue],
                borderColor:
                  DISTRIBUTION_COLORS[index % DISTRIBUTION_COLORS.length],
              }
            }
          ),
          ...(targets || []).flatMap(({ symbol, targets }) => {
            if (targets.length === 0) {
              return []
            }

            const data = treasuryValueHistory.data.timestamps.map(
              (_timestamp, timestampIndex) => {
                // Find first target that is after this timestamp so we can
                // choose the most recent target before it.
                let nextTargetIndex = targets.findIndex(
                  (target) => target.timestamp > _timestamp
                )
                const targetIndex =
                  nextTargetIndex === -1
                    ? // If all targets are before, use last one.
                      targets.length - 1
                    : // If all targets are after, no target for this timestamp.
                    nextTargetIndex === 0
                    ? undefined
                    : // Otherwise use the previous one.
                      nextTargetIndex - 1
                if (targetIndex === undefined) {
                  return null
                }

                // Get total value at this point in time.
                const totalValue =
                  treasuryValueHistory.data.total.values[timestampIndex]
                if (totalValue === null) {
                  return null
                }

                const { target } = targets[targetIndex]

                // The target at this point is based on the total value.
                return totalValue * target
              }
            )

            // Add current target.
            const currentTarget =
              treasuryValueHistory.data.total.currentValue *
              targets[targets.length - 1].target
            data.push(currentTarget)

            const borderColor =
              DISTRIBUTION_COLORS[
                treasuryValueHistory.data.tokens.findIndex(
                  (token) => token.symbol === symbol
                ) % DISTRIBUTION_COLORS.length
              ]

            return {
              order: 2,
              label: '$' + transformIbcSymbol(symbol).tokenSymbol + ' Target',
              data,
              borderDash: [2.5, 2.5],
              borderColor,
            }
          }),
          // Total value.
          {
            order: 1,
            label: t('title.totalValue'),
            data: [
              ...treasuryValueHistory.data.total.values,
              treasuryValueHistory.data.total.currentValue,
            ],
            borderColor: brandColor,
          },
        ].map((data) => ({
          ...data,

          pointRadius: 1,
          pointHitRadius: 10,

          // Accentuate the total.
          borderWidth: data.order === 1 ? 5 : 2.5,
        }))

  const [tooltipData, setTooltipData] = useState<TooltipModel<'line'>>()
  const tooltipTotalValue =
    tooltipData &&
    (tooltipData.dataPoints.find(
      ({ datasetIndex }) => datasetIndex === datasets.length - 1
    )?.raw as number | undefined)

  return (
    <div className={clsx('relative flex flex-col gap-4', className)}>
      <Line
        className={clsx(
          (treasuryValueHistory.loading || treasuryValueHistory.updating) &&
            'animate-pulse'
        )}
        data={{
          labels:
            treasuryValueHistory.loading || treasuryValueHistory.errored
              ? []
              : [
                  ...treasuryValueHistory.data.timestamps.map((timestamp) =>
                    (precision === 'day' ? formatDate : formatDateTime)(
                      timestamp
                    )
                  ),
                  t('title.now'),
                ],
          datasets,
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          // animation: false,
          plugins: {
            title: {
              display: false,
            },
            legend: {
              position: 'right',
              labels: {
                filter: (item) => item.text.endsWith(' Value'),
              },
            },
            tooltip: {
              // Show all x-axis values in one tooltip.
              mode: 'index',
              enabled: false,
              external: ({ tooltip }) =>
                setTooltipData(
                  tooltip.opacity === 0 ? undefined : { ...tooltip }
                ),
              callbacks: {
                label: (item) =>
                  `${item.dataset.label}: $${Number(item.raw).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}`,
              },
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

      {treasuryValueHistory.errored && (
        <div className="absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center">
          <WarningCard
            className="bg-background-primary"
            content={
              treasuryValueHistory.error instanceof Error
                ? treasuryValueHistory.error.message
                : `${treasuryValueHistory.error}`
            }
          />
        </div>
      )}

      {tooltipData && (
        <div
          className="pointer-events-none absolute flex animate-fade-in flex-col gap-2 rounded-md border border-border-component-primary bg-component-tooltip py-2 px-3 text-text-component-primary"
          style={{
            left: tooltipData.x,
            top: tooltipData.y,
          }}
        >
          <p className="!primary-text mb-1">{tooltipData.title}</p>

          {[...tooltipData.dataPoints]
            .filter((point) => point.dataset.label?.endsWith(' Value'))
            .sort((a, b) => Number(b.raw) - Number(a.raw))
            .map((point, index) => (
              <div
                key={index}
                className={clsx(
                  'flex flex-row items-start justify-between gap-6',
                  index === 0 && 'mb-4'
                )}
              >
                <div className="flex flex-row items-center gap-2">
                  <div
                    className="h-4 w-6"
                    style={{
                      borderWidth: point.dataset.borderWidth as number,
                      borderColor: point.dataset.borderColor as string,
                      backgroundColor: point.dataset.backgroundColor as string,
                    }}
                  />
                  <p className="secondary-text">{point.dataset.label}:</p>
                </div>

                <div className="flex flex-col items-end gap-1 text-right font-mono">
                  <p className="primary-text leading-4">
                    $
                    {Number(point.raw).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  {point.datasetIndex !== datasets.length - 1 &&
                    !!tooltipTotalValue && (
                      <p className="caption-text">
                        (
                        {formatPercentOf100(
                          (Number(point.raw) / tooltipTotalValue) * 100
                        )}
                        )
                      </p>
                    )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
