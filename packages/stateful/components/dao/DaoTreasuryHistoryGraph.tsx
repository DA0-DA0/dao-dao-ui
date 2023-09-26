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
} from 'chart.js'
import clsx from 'clsx'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import { waitForAll } from 'recoil'

import {
  historicalNativeBalancesByDenomSelector,
  historicalNativeBalancesSelector,
  historicalUsdPriceSelector,
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

  const historicalUsdPrices = useCachedLoadingWithError(
    balancesByDenom.loading || balancesByDenom.errored
      ? undefined
      : waitForAll(
          balancesByDenom.data.map(({ token }) =>
            historicalUsdPriceSelector({
              chainId,
              denom: token.denomOrAddress,
            })
          )
        )
  )

  const error =
    (balancesByTimestamp.errored && balancesByTimestamp.error) ||
    (balancesByDenom.errored && balancesByDenom.error) ||
    (nativeBalances.errored && nativeBalances.error) ||
    (historicalUsdPrices.errored && historicalUsdPrices.error) ||
    undefined

  const valuesByDenom =
    balancesByTimestamp.loading ||
    balancesByTimestamp.errored ||
    balancesByDenom.loading ||
    balancesByDenom.errored ||
    nativeBalances.loading ||
    nativeBalances.errored ||
    historicalUsdPrices.loading ||
    historicalUsdPrices.errored
      ? []
      : balancesByDenom.data.map(({ token, balances }, index) => {
          // If token decimals not loaded, cannot compute price.
          if (!token.decimals) {
            return
          }

          const historicalPrices = historicalUsdPrices.data[index] || []
          // If no prices, do not include this denom.
          if (!historicalPrices.length) {
            return
          }

          const current =
            nativeBalances.data.find(
              (native) => native.token.denomOrAddress === token.denomOrAddress
            )?.balance || 0

          const data = [
            ...balancesByTimestamp.data.map(({ timestamp }) => {
              // Find the first price after this timestamp.
              const firstPriceAfterIndex = historicalPrices.findIndex(
                (historical) => historical.timestamp > timestamp
              )
              // If price is not found or is the first element, no value for
              // this timestamp.
              if (firstPriceAfterIndex <= 0) {
                return null
              }

              // Get the closest price for this timestamp by choosing the
              // closer price of the two surrounding it.
              const priceBefore = historicalPrices[firstPriceAfterIndex - 1]
              const priceAfter = historicalPrices[firstPriceAfterIndex]
              const usdPrice = (
                Math.abs(
                  priceBefore.timestamp.getTime() - timestamp.getTime()
                ) <
                Math.abs(priceAfter.timestamp.getTime() - timestamp.getTime())
                  ? priceBefore
                  : priceAfter
              ).amount

              const { balance } =
                balances.find(
                  (balance) =>
                    balance.timestamp.getTime() === timestamp.getTime() &&
                    balance.balance
                ) ?? {}

              return balance
                ? usdPrice *
                    convertMicroDenomToDenomWithDecimals(
                      balance,
                      token.decimals
                    )
                : null
            }),
            // Add in current balance.
            historicalPrices[historicalPrices.length - 1].amount *
              convertMicroDenomToDenomWithDecimals(
                current || 0,
                token.decimals
              ),
          ]

          return data
        })

  const datasets: ChartDataset<'line', (number | null)[]>[] =
    balancesByTimestamp.loading ||
    balancesByTimestamp.errored ||
    balancesByDenom.loading ||
    balancesByDenom.errored ||
    nativeBalances.loading ||
    nativeBalances.errored ||
    historicalUsdPrices.loading ||
    historicalUsdPrices.errored
      ? []
      : [
          ...balancesByDenom.data.flatMap(({ token }, index) => {
            const data = valuesByDenom[index]
            // If could not load value or all are null/0, do not include this
            // denom.
            if (!data || data.every((d) => !d)) {
              return []
            }

            return {
              label:
                '$' + transformIbcSymbol(token.symbol).tokenSymbol + ' Value',
              data,
            }
          }),
          // Total value.
          {
            label: t('title.total'),
            data: [...Array(balancesByTimestamp.data.length + 1)].map(
              (_, index) =>
                valuesByDenom.reduce(
                  (acc, denomData) => acc + (denomData?.[index] || 0),
                  0
                )
            ),
          },
        ].map((data, index) => ({
          ...data,
          borderColor:
            VOTING_POWER_DISTRIBUTION_COLORS[
              index % VOTING_POWER_DISTRIBUTION_COLORS.length
            ],
          pointRadius: 2,

          // Accentuate the total.
          ...(data.label === t('title.total') && {
            pointRadius: 4,
            backgroundColor:
              VOTING_POWER_DISTRIBUTION_COLORS[
                index % VOTING_POWER_DISTRIBUTION_COLORS.length
              ],
          }),
        }))

  return (
    <div className={clsx('flex max-h-[20rem] flex-col gap-4', className)}>
      {balancesByTimestamp.loading ||
      balancesByDenom.loading ||
      nativeBalances.loading ||
      historicalUsdPrices.loading ? (
        <Loader />
      ) : balancesByTimestamp.errored ||
        balancesByDenom.errored ||
        nativeBalances.errored ||
        historicalUsdPrices.errored ? (
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
      )}
    </div>
  )
}
