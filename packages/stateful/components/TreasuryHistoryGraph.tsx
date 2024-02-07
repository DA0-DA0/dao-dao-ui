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
import { useRef, useState } from 'react'
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
import { TokenType, TreasuryHistoryGraphProps } from '@dao-dao/types'
import {
  DISTRIBUTION_COLORS,
  formatDateTimeTz,
  serializeTokenSource,
  shortenTokenSymbol,
} from '@dao-dao/utils'

import { treasuryValueHistorySelector } from '../recoil'
import { useVotingModuleAdapterContextIfAvailable } from '../voting-module-adapter/react/context'

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
  className,
  graphClassName,
  registerTokenColors,
  header,
}: TreasuryHistoryGraphProps) => {
  const { t } = useTranslation()

  const textColor = useNamedThemeColor('text-tertiary')
  const borderColor = useNamedThemeColor('border-primary')
  const brandColor = useNamedThemeColor('text-brand')
  const verticalLineColor = useNamedThemeColor('component-badge-valid')

  const [precision, setPrecision] =
    useState<OsmosisHistoricalPriceChartPrecision>('hour')

  // If in a DAO, this should load the DAO's governance token info. Undefined if
  // not in a DAO or fails to load for some reason.
  const governanceTokenInfo =
    useVotingModuleAdapterContextIfAvailable()?.adapter.hooks.useCommonGovernanceTokenInfo?.()

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
      },
      // Provide governance tokens if in a DAO, to ensure they are loaded.
      nativeGovernanceTokenDenom:
        governanceTokenInfo?.type === TokenType.Native
          ? governanceTokenInfo.denomOrAddress
          : undefined,
      cw20GovernanceTokenAddress:
        governanceTokenInfo?.type === TokenType.Cw20
          ? governanceTokenInfo.denomOrAddress
          : undefined,
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
                shortenTokenSymbol(token.symbol).tokenSymbol +
                ' ' +
                t('title.value'),
              data: [...values, currentValue],
              borderColor: tokenColors[serializeTokenSource(token)],
              backgroundColor: tokenColors[serializeTokenSource(token)],
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

  const datasets = [...tokenValues, ...totalValues].map((data) => ({
    ...data,

    pointRadius:
      ('pointRadius' in data ? Number((data as any).pointRadius) : undefined) ??
      // If there is only one data point (current value), show a point since
      // there is no line. Otherwise, if there is a line, hide the points.
      (data.data.length === 1 ? 1 : 0),
    pointHitRadius:
      ('pointHitRadius' in data
        ? Number((data as any).pointHitRadius)
        : undefined) ?? 10,
  }))

  const [tooltipData, setTooltipData] = useState<TooltipModel<'line'>>()
  // Contains information on the data point that is currently hovered. Can be
  // used to retrieve the timestamp value (`.parsed.x`) and index in the dataset
  // (`.dataIndex`).
  const tooltipFirstDataPoint = tooltipData?.dataPoints[0]

  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        (treasuryValueHistory.loading || treasuryValueHistory.updating) &&
          'animate-pulse',
        className
      )}
    >
      {header}

      <div
        className={clsx('relative flex flex-col gap-4', graphClassName)}
        ref={containerRef}
      >
        <Line
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
                // Show when hover on any part of the graph, not just a point.
                intersect: false,
                external: ({ tooltip }) => {
                  const shouldHide =
                    !tooltip.opacity || tooltip.dataPoints.length === 0
                  // Only update if we need to hide or the data point .
                  if (
                    // Needs to hide.
                    (shouldHide && !!tooltipData) ||
                    // Needs to show.
                    (!shouldHide &&
                      // Either nothing set or the data point is different.
                      (!tooltipFirstDataPoint ||
                        tooltip.dataPoints[0].dataIndex !==
                          tooltipFirstDataPoint.dataIndex))
                  ) {
                    setTooltipData(
                      tooltip.opacity === 0 || !tooltip.dataPoints[0]
                        ? undefined
                        : ({ ...tooltip } as any)
                    )
                  }
                },
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
              // Show vertical line when hovering over a timestamp and showing
              // the tooltip.
              annotation: tooltipFirstDataPoint && {
                annotations: {
                  verticalLine: {
                    type: 'line',
                    borderColor: verticalLineColor,
                    borderWidth: 2,
                    scaleID: 'x',
                    value: tooltipFirstDataPoint.parsed.x,
                  },
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
            className="pointer-events-none absolute z-10 flex w-max animate-fade-in flex-col gap-4 rounded-md border border-border-secondary bg-component-tooltip-glass p-4 text-text-component-primary backdrop-blur-sm sm:gap-2"
            ref={tooltipRef}
            style={{
              // Bias the x coordinate towards the center of the screen.
              left:
                !containerRef.current || !tooltipRef.current
                  ? tooltipData.x
                  : containerRef.current.clientWidth / 2 -
                    tooltipRef.current.clientWidth *
                      (1 -
                        tooltipFirstDataPoint.dataIndex /
                          tooltipFirstDataPoint.dataset.data.length),
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
                { data, label, borderWidth, borderColor, backgroundColor },
                index
              ) => {
                const value = data[tooltipFirstDataPoint.dataIndex]
                if (value === null) {
                  return
                }

                return (
                  <div
                    key={index}
                    className={clsx(
                      'flex flex-col items-start justify-between gap-x-6 gap-y-1 sm:flex-row',
                      index === 0 && 'mb-2 sm:mb-4'
                    )}
                  >
                    <div className="flex shrink-0 flex-row items-center gap-2">
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

                    <div className="flex shrink-0 flex-col items-end gap-1 text-right font-mono">
                      <p className="primary-text leading-4">
                        $
                        {value.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
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
