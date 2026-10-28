import { Payments } from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { DaoRewardsDistributorClaimCardProps } from '@dao-dao/types'
import { getFallbackImage, sumUsdEstimates } from '@dao-dao/utils'

import { Button } from '../buttons'
import { Collapsible } from '../Collapsible'
import { ErrorPage } from '../error'
import { TokenAmountDisplay, UsdValuationDisplay } from '../token'
import { TooltipInfoIcon } from '../tooltip'

export const DaoRewardsDistributorClaimCard = ({
  className,
  onClaim,
  claiming,
  rewards,
}: DaoRewardsDistributorClaimCardProps) => {
  const { t } = useTranslation()

  const hasRewards =
    !rewards.loading &&
    !rewards.errored &&
    rewards.data.length > 0 &&
    rewards.data.some(({ balance }) => balance > 0)

  const values = !rewards.loading && !rewards.errored ? rewards.data : []
  const total = sumUsdEstimates(
    values
      .filter(({ balance }) => balance > 0)
      .map(({ usdValue, timestamp }) =>
        timestamp && Date.now() - timestamp.getTime() <= 300_000
          ? usdValue
          : undefined
      )
  )
  const timestamps = values.flatMap(({ timestamp, usdValue }) =>
    timestamp && usdValue !== undefined ? [timestamp.getTime()] : []
  )
  const totalTimestamp = timestamps.length ? Math.min(...timestamps) : null

  return (
    <div
      className={clsx(
        'bg-background-tertiary flex flex-col rounded-md p-4 gap-4',
        className
      )}
    >
      <div className="xs:items-center xs:flex-row xs:justify-between flex flex-col gap-2">
        <div className="flex flex-col items-start">
          <div className="flex flex-row gap-3 items-center">
            <Payments
              className={clsx(
                '!h-6 !w-6',
                hasRewards
                  ? '!text-icon-interactive-valid'
                  : '!text-icon-tertiary'
              )}
            />

            <UsdValuationDisplay
              value={
                rewards.loading
                  ? { loading: true }
                  : {
                      amount: total.amount,
                      status:
                        total.amount === null
                          ? 'unavailable'
                          : total.partial
                            ? 'partial'
                            : 'complete',
                      timestamp: totalTimestamp,
                      unpricedTokens: 0,
                      incompleteBalances: total.partial,
                    }
              }
            />
          </div>

          {!rewards.loading && !rewards.errored && (
            <div className="flex flex-row items-center gap-1">
              <p className="body-text text-text-tertiary">
                {t('info.availableForWithdrawal')}
              </p>

              <TooltipInfoIcon
                iconClassName="!text-icon-tertiary"
                size="xs"
                title={t('info.estimatedUsdValueTooltip')}
              />
            </div>
          )}
        </div>

        <Button
          disabled={!hasRewards}
          loading={rewards.loading || claiming}
          onClick={onClaim}
          size="lg"
          variant="brand"
        >
          {t('button.claim')}
        </Button>
      </div>

      {!rewards.loading &&
        (rewards.errored ? (
          <ErrorPage error={rewards.error} />
        ) : (
          rewards.data.length > 0 && (
            <Collapsible
              containerClassName="!gap-1 border-t border-border-secondary pt-2"
              contentContainerClassName="styled-scrollbar flex flex-col pl-[0.625rem] overflow-y-auto max-h-64 -mr-3.5 pr-3.5 -mb-4 pb-4"
              defaultCollapsed
              label={t('title.breakdown')}
              labelClassName="!body-text !text-text-tertiary"
              noContentIndent
              noHeaderIndent
            >
              {rewards.data.map(
                ({ token, balance, usdValue, timestamp }, index) => (
                  <div
                    key={token.denomOrAddress}
                    className={clsx(
                      'border-border-secondary flex flex-row pl-4 items-stretch border-l-2',
                      // padding between above item's bottom border
                      index > 0 && 'pt-2',
                      // padding above first and below last items within
                      // container
                      index === 0 && 'pt-1',
                      index === rewards.data.length - 1 && 'pb-1'
                    )}
                  >
                    <div
                      className={clsx(
                        'flex flex-row grow items-center justify-between min-w-0 gap-8',
                        // bottom border between items, with padding that
                        // matches top padding in the item below it
                        index !== rewards.data.length - 1 &&
                          'border-border-secondary border-dashed border-b pb-2'
                      )}
                    >
                      <TokenAmountDisplay
                        amount={balance}
                        className="text-text-body"
                        decimals={token.decimals}
                        hideSymbol
                        iconUrl={
                          token.imageUrl ||
                          getFallbackImage(token.denomOrAddress)
                        }
                        showAllDecimals
                        showFullAmount
                        suffix={'  $' + token.symbol}
                        suffixClassName="whitespace-pre text-text-tertiary"
                      />

                      <UsdValuationDisplay
                        value={{
                          amount: usdValue ?? null,
                          timestamp: timestamp?.getTime() ?? null,
                          status:
                            usdValue === undefined ? 'unavailable' : 'complete',
                          unpricedTokens: 0,
                          incompleteBalances: false,
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </Collapsible>
          )
        ))}
    </div>
  )
}
