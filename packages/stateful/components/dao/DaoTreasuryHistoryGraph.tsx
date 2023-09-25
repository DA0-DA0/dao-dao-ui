import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import clsx from 'clsx'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

import {
  historicalNativeBalancesByDenomSelector,
  historicalNativeBalancesSelector,
  nativeBalancesSelector,
} from '@dao-dao/state'
import {
  Loader,
  VOTING_POWER_DISTRIBUTION_COLORS,
  WarningCard,
  useCachedLoadingWithError,
  useDaoInfoContext,
  useNamedThemeColor,
} from '@dao-dao/stateless'
import {
  convertMicroDenomToDenomWithDecimals,
  formatDate,
  transformIbcSymbol,
} from '@dao-dao/utils'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export type DaoTreasuryHistoryGraphProps = {
  chainId: string
  className?: string
}

export const DaoTreasuryHistoryGraph = ({
  chainId,
  className,
}: DaoTreasuryHistoryGraphProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()

  const textColor = useNamedThemeColor('text-tertiary')
  const borderColor = useNamedThemeColor('border-primary')

  // TODO(treasury-history): make these configurable
  // Initialize to 30 days ago.
  const [startTimeUnixMs, _setStartTimeUnixMs] = useState(
    () => -30 * 24 * 60 * 60 * 1000
  )
  // Initialize to 4 hours.
  const [intervalMs, _setIntervalMs] = useState(() => 4 * 60 * 60 * 1000)

  const options = {
    chainId,
    address: coreAddress,
    startTimeUnixMs,
    intervalMs,
  }
  const balancesByTimestamp = useCachedLoadingWithError(
    historicalNativeBalancesSelector(options)
  )
  const balancesByDenom = useCachedLoadingWithError(
    historicalNativeBalancesByDenomSelector(options)
  )
  const nativeBalances = useCachedLoadingWithError(
    nativeBalancesSelector({
      chainId,
      address: coreAddress,
    })
  )

  const error =
    (balancesByTimestamp.errored && balancesByTimestamp.error) ||
    (balancesByDenom.errored && balancesByDenom.error) ||
    (nativeBalances.errored && nativeBalances.error) ||
    undefined

  return (
    <div className={clsx('flex max-h-[20rem] flex-col gap-4', className)}>
      {balancesByTimestamp.loading ||
      balancesByDenom.loading ||
      nativeBalances.loading ? (
        <Loader />
      ) : balancesByTimestamp.errored ||
        balancesByDenom.errored ||
        nativeBalances.errored ? (
        <WarningCard
          content={error instanceof Error ? error.message : `${error}`}
        />
      ) : (
        <Line
          data={{
            labels: [
              ...balancesByTimestamp.data.map(({ timestamp }) =>
                formatDate(timestamp)
              ),
              t('title.now'),
            ],
            datasets: balancesByDenom.data
              .flatMap(({ token, balances }) => {
                const current =
                  nativeBalances.data.find(
                    (native) =>
                      native.token.denomOrAddress === token.denomOrAddress
                  )?.balance || 0

                const data = [
                  ...balancesByTimestamp.data.map(({ timestamp }) => {
                    const { balance } =
                      balances.find(
                        (balance) =>
                          balance.timestamp.getTime() === timestamp.getTime() &&
                          balance.balance
                      ) ?? {}

                    return balance
                      ? convertMicroDenomToDenomWithDecimals(
                          balance,
                          token.decimals
                        )
                      : null
                  }),
                  // Add in current balance.
                  convertMicroDenomToDenomWithDecimals(
                    current || 0,
                    token.decimals
                  ),
                ]

                // If all values are null or 0, do not include this denom.
                if (data.every((d) => !d)) {
                  return []
                }

                return {
                  label: '$' + transformIbcSymbol(token.symbol).tokenSymbol,
                  data,
                }
              })
              .map((data, index) => ({
                ...data,
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
                // radius: 0,
              },
            },
            plugins: {
              title: {
                display: false,
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
                // title: {
                //   text: 'Est. USD Value',
                //   display: true,
                //   color: textColor,
                // },
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
      )}
    </div>
  )
}
