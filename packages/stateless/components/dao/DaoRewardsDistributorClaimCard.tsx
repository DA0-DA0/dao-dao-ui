import { ArrowDropDown, Payments } from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { DaoRewardsDistributorClaimCardProps } from '@dao-dao/types'
import { getFallbackImage } from '@dao-dao/utils'

import { Button } from '../buttons'
import { ErrorPage } from '../error'
import { TokenAmountDisplay } from '../token'
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

  const totalUsdValue = hasRewards
    ? rewards.data.reduce((acc, { usdValue }) => acc + usdValue, 0)
    : 0
  // Just use the first timestamp.
  const totalTimestamp = hasRewards ? rewards.data[0].timestamp : undefined

  return (
    <div
      className={clsx(
        'bg-background-tertiary flex flex-col rounded-md p-4 gap-4',
        className
      )}
    >
      <div className="xs:items-center xs:flex-row flex flex-col gap-2 xs:justify-between">
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

            <TokenAmountDisplay
              amount={rewards.loading ? { loading: true } : totalUsdValue}
              className={clsx(
                'font-medium !text-lg',
                hasRewards
                  ? '!text-text-interactive-valid'
                  : '!text-text-tertiary'
              )}
              dateFetched={totalTimestamp}
              decimals={2}
              hideSymbol
              minAmount={hasRewards ? 0.01 : undefined}
              prefix="$"
              showAllDecimals
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
            <div className="flex flex-col gap-3 border-t border-border-secondary pt-4">
              <div className="flex flex-row items-center gap-2">
                <ArrowDropDown className="!h-5 !w-5 text-icon-tertiary" />
                <p className="body-text text-text-tertiary">
                  {t('title.breakdown')}
                </p>
              </div>

              <div className="flex flex-col pl-[0.5625rem]">
                {rewards.data.map(
                  ({ token, balance, usdValue, timestamp }, index) => (
                    <div
                      key={token.denomOrAddress}
                      className={clsx(
                        'flex flex-row pl-4 items-stretch border-border-secondary border-l-2',
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
                          'flex flex-row grow items-center justify-between',
                          // bottom border between items, with padding that
                          // matches top padding in the item below it
                          index !== rewards.data.length - 1 &&
                            'border-dashed border-b border-border-secondary pb-2'
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

                        <TokenAmountDisplay
                          amount={usdValue}
                          className={clsx(
                            '!text-sm',
                            usdValue > 0
                              ? '!text-text-interactive-valid'
                              : '!text-text-tertiary'
                          )}
                          dateFetched={timestamp}
                          decimals={2}
                          hideSymbol
                          minAmount={usdValue > 0 ? 0.01 : undefined}
                          prefix="$"
                          showAllDecimals
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )
        ))}
    </div>
  )
}
