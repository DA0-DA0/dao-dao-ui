import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
  TooltipModel,
} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import clsx from 'clsx'
import { enUS } from 'date-fns/locale'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import useDeepCompareEffect from 'use-deep-compare-effect'

import { OsmosisHistoricalPriceChartPrecision } from '@dao-dao/state/recoil'
import {
  SegmentedControls,
  WarningCard,
  useCachedLoadingWithError,
  useNamedThemeColor,
} from '@dao-dao/stateless'
import { AccountType, TreasuryHistoryGraphProps } from '@dao-dao/types'
import {
  DISTRIBUTION_COLORS,
  formatDateTimeTz,
  formatPercentOf100,
  serializeTokenSource,
  transformIbcSymbol,
} from '@dao-dao/utils'

import { treasuryValueHistorySelector } from '../recoil'

import 'chartjs-adapter-date-fns'

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
)

// TODO: add way to set base price denom to use instead of USD
export const TreasuryHistoryGraph = ({
  chainId,
  address,
  account,
  showRebalancer = false,
  className,
  graphClassName,
  registerTokenColors,
  header,
}: TreasuryHistoryGraphProps) => {
  const { t } = useTranslation()

  const textColor = useNamedThemeColor('text-tertiary')
  const borderColor = useNamedThemeColor('border-primary')
  const brandColor = useNamedThemeColor('text-brand')

  const [precision, setPrecision] =
    useState<OsmosisHistoricalPriceChartPrecision>('hour')

  const treasuryValueHistory = useCachedLoadingWithError(
    treasuryValueHistorySelector({
      chainId,
      address,
      precision,
      filter: account && {
        account: {
          type: account.type,
          chainId: account.chainId,
          address: account.address,
        },
        // Filter by rebalancer tokens.
        tokens:
          showRebalancer && account.type === AccountType.Valence
            ? account.config.rebalancer?.targets.map(({ source }) => source)
            : undefined,
      },
    })
  )

  // Map serialized token source to color.
  const tokenColors =
    treasuryValueHistory.loading || treasuryValueHistory.errored
      ? {}
      : treasuryValueHistory.data.tokens.reduce(
          (acc, { token }, index) => ({
            ...acc,
            [serializeTokenSource(token)]:
              DISTRIBUTION_COLORS[index % DISTRIBUTION_COLORS.length],
          }),
          {} as Record<string, string>
        )

  // Register token colors.
  useDeepCompareEffect(() => {
    registerTokenColors?.(tokenColors)
  }, [tokenColors])

  const tokenValues =
    treasuryValueHistory.loading || treasuryValueHistory.errored
      ? []
      : treasuryValueHistory.data.tokens.flatMap(
          ({ token, values, currentValue }) => {
            // If all values are null/0, do not include this token.
            if (!values.every((d) => !d) && !currentValue) {
              return []
            }

            return {
              token,
              order: 2,
              label:
                '$' +
                transformIbcSymbol(token.symbol).tokenSymbol +
                ' ' +
                t('title.value'),
              data: [...values, currentValue],
              borderColor: tokenColors[serializeTokenSource(token)],
              backgroundColor: tokenColors[serializeTokenSource(token)],
              borderWidth: 2.5,
            }
          }
        )

  const showTargets =
    !!account &&
    account.type === AccountType.Valence &&
    !!account.config.rebalancer?.targets.length &&
    showRebalancer &&
    !treasuryValueHistory.loading &&
    !treasuryValueHistory.errored

  // Show targets if rebalancer configured account.
  const targetValues = !showTargets
    ? []
    : (account.config.rebalancer?.targets || []).flatMap(
        ({ source, targets }) => {
          if (targets.length === 0) {
            return []
          }

          const data = treasuryValueHistory.data.timestamps.map(
            (_timestamp, timestampIndex) => {
              // Find first target that is after this timestamp so we can
              // choose the most recent target before it.
              let nextTargetIndex = targets.findIndex(
                (target) => target.timestamp > _timestamp.getTime()
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

              const { percentage } = targets[targetIndex]

              // The target at this point is based on the total value.
              return totalValue * Number(percentage)
            }
          )

          // Add current target.
          const currentTarget =
            treasuryValueHistory.data.total.currentValue *
            Number(targets[targets.length - 1].percentage)
          data.push(currentTarget)

          const tokenIndex = treasuryValueHistory.data.tokens.findIndex(
            ({ token }) =>
              serializeTokenSource(token.source) ===
              serializeTokenSource(source)
          )
          if (tokenIndex === -1) {
            return []
          }

          const { token } = treasuryValueHistory.data.tokens[tokenIndex]

          return {
            token,
            order: 3,
            label:
              '$' +
              transformIbcSymbol(token.symbol).tokenSymbol +
              ' ' +
              t('title.target'),
            data,
            borderDash: [2.5, 2.5],
            borderColor: tokenColors[serializeTokenSource(token)],
            backgroundColor: tokenColors[serializeTokenSource(token)],
            pointRadius: 0,
            pointHitRadius: 0,
            borderWidth: 2.5,
          }
        }
      )

  const totalValues =
    treasuryValueHistory.loading || treasuryValueHistory.errored
      ? []
      : [
          {
            token: undefined,
            order: 1,
            label: t('title.totalValue'),
            data: [
              ...treasuryValueHistory.data.total.values,
              treasuryValueHistory.data.total.currentValue,
            ],
            borderColor: brandColor,
            backgroundColor: brandColor,
            borderWidth: 5,
          },
        ]

  const datasets = [...tokenValues, ...targetValues, ...totalValues].map(
    (data) => ({
      ...data,

      pointRadius:
        ('pointRadius' in data
          ? Number((data as any).pointRadius)
          : undefined) ??
        // If there is only one data point (current value), show a point since
        // there is no line. Otherwise, if there is a line, hide the points.
        (data.data.length === 1 ? 1 : 0),
      pointHitRadius:
        ('pointHitRadius' in data
          ? Number((data as any).pointHitRadius)
          : undefined) ?? 10,
    })
  )

  const [tooltipData, setTooltipData] = useState<TooltipModel<'line'>>()
  // Contains information on the data point that is currently hovered. Can be
  // used to retrieve the timestamp value (`.parsed.x`) and index in the dataset
  // (`.dataIndex`).
  const tooltipFirstDataPoint = tooltipData?.dataPoints[0]
  const tooltipTotalValue =
    tooltipData &&
    (tooltipData.dataPoints.find(
      ({ datasetIndex }) => datasetIndex === datasets.length - 1
    )?.raw as number | undefined)

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      {header}

      <div className={clsx('relative flex flex-col gap-4', graphClassName)}>
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
                      timestamp.getTime()
                    ),
                    Date.now(),
                  ],
            datasets,
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
              title: {
                display: false,
              },
              legend: {
                position: 'top',
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
                    tooltip.opacity === 0 ? undefined : ({ ...tooltip } as any)
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
                  source:
                    treasuryValueHistory.loading ||
                    treasuryValueHistory.errored ||
                    treasuryValueHistory.data.timestamps.length === 0
                      ? 'labels'
                      : 'auto',
                },
                grid: {
                  color: borderColor,
                  tickColor: 'transparent',
                },
                type: 'time',
                adapters: {
                  date: {
                    locale: enUS,
                  },
                },
                time: {
                  minUnit: 'day',
                },
              },
              y: {
                display: true,
                title: {
                  text: t('title.estUsdValue'),
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

        {tooltipData && tooltipFirstDataPoint !== undefined && (
          <div
            className="pointer-events-none absolute z-10 flex animate-fade-in flex-col gap-2 rounded-md border border-border-component-primary bg-component-tooltip py-2 px-3 text-text-component-primary"
            style={{
              left: tooltipData.x,
              top: tooltipData.y,
            }}
          >
            <p className="!primary-text mb-1">
              {
                // This should always be defined if the tooltip is shown, but
                // fallback to title just in case.
                tooltipFirstDataPoint
                  ? formatDateTimeTz(new Date(tooltipFirstDataPoint.parsed.x))
                  : tooltipData.title
              }
            </p>

            {[
              totalValues[0],
              ...tokenValues.sort(
                (a, b) =>
                  Number(b.data[tooltipFirstDataPoint.dataIndex]) -
                  Number(a.data[tooltipFirstDataPoint.dataIndex])
              ),
            ].flatMap(
              (
                {
                  token,
                  data,
                  label,
                  borderWidth,
                  borderColor,
                  backgroundColor,
                },
                index
              ) => {
                const value = data[tooltipFirstDataPoint.dataIndex]
                if (value === null) {
                  return
                }

                const targetValue =
                  token &&
                  targetValues.find(({ token: t }) => t === token)?.data[
                    tooltipFirstDataPoint.dataIndex
                  ]

                return (
                  <div
                    key={index}
                    className={clsx(
                      'flex flex-row items-start justify-between gap-6',
                      index === 0 && 'mb-4'
                    )}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <div
                        className="h-4 w-10"
                        style={{
                          borderWidth,
                          borderColor,
                          backgroundColor,
                        }}
                      />
                      <p className="secondary-text">{label}:</p>
                    </div>

                    <div className="flex flex-col items-end gap-1 text-right font-mono">
                      <p className="primary-text leading-4">
                        $
                        {value.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>

                      {index > 0 && !!tooltipTotalValue && showTargets && (
                        <>
                          <p className="caption-text">
                            {formatPercentOf100(
                              (value / tooltipTotalValue) * 100
                            )}

                            {` (${
                              typeof targetValue === 'number'
                                ? `${t('info.target')}: ${formatPercentOf100(
                                    (targetValue / tooltipTotalValue) * 100
                                  )}`
                                : t('info.noTarget')
                            })`}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )
              }
            )}
          </div>
        )}
      </div>

      <SegmentedControls<OsmosisHistoricalPriceChartPrecision>
        className="self-end"
        onSelect={(value) => setPrecision(value)}
        selected={precision}
        tabs={[
          {
            label: 'M',
            value: 'fiveminutes',
            tooltip: t('info.priceHistoryPrecision', {
              context: 'fiveminutes',
            }),
          },
          {
            label: 'H',
            value: 'hour',
            tooltip: t('info.priceHistoryPrecision', {
              context: 'hour',
            }),
          },
          {
            label: 'D',
            value: 'day',
            tooltip: t('info.priceHistoryPrecision', {
              context: 'day',
            }),
          },
        ]}
      />
    </div>
  )
}
