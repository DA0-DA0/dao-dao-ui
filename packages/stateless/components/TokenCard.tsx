import {
  Add,
  Check,
  CopyAll,
  ExpandCircleDownOutlined,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { TokenCardInfo } from '@dao-dao/types'
import { secondsToWdhms } from '@dao-dao/utils'

import { Button } from './buttons/Button'
import { CopyToClipboard, concatAddressStartEnd } from './CopyToClipboard'
import { SpendEmoji, StakeEmoji } from './emoji'
import { IconButton } from './icon_buttons/IconButton'
import { CrownIcon } from './icons/CrownIcon'
import { ButtonPopup, ButtonPopupSection } from './popup'
import { TokenAmountDisplay } from './TokenAmountDisplay'
import { Tooltip } from './Tooltip'
import { UnstakingModal } from './UnstakingModal'
import { UnstakingTaskStatus } from './UnstakingStatus'

export interface TokenCardProps extends TokenCardInfo {
  onAddToken?: () => void
  onProposeStakeUnstake?: () => void
  onProposeClaim?: () => void
  refreshUnstakingTasks?: () => void
}

export const TokenCard = ({
  crown,
  tokenSymbol,
  tokenDecimals,
  subtitle,
  imageUrl,
  unstakedBalance,
  usdcUnitPrice,
  hasStakingInfo,
  lazyStakingInfo,
  cw20Address,
  onAddToken,
  onProposeStakeUnstake,
  onProposeClaim,
  refreshUnstakingTasks,
}: TokenCardProps) => {
  const { t } = useTranslation()

  const lazyStakes =
    lazyStakingInfo.loading || !lazyStakingInfo.data
      ? []
      : lazyStakingInfo.data.stakes
  const lazyUnstakingTasks =
    lazyStakingInfo.loading || !lazyStakingInfo.data
      ? []
      : lazyStakingInfo.data.unstakingTasks

  const totalStaked =
    lazyStakes.reduce((acc, stake) => acc + stake.amount, 0) ?? 0
  const totalBalance = unstakedBalance + totalStaked
  const pendingRewards =
    lazyStakes?.reduce((acc, stake) => acc + stake.rewards, 0) ?? 0
  const unstakingBalance =
    lazyUnstakingTasks.reduce(
      (acc, task) =>
        acc +
        // Only include balance of unstaking tasks.
        (task.status === UnstakingTaskStatus.Unstaking ? task.amount : 0),
      0
    ) ?? 0

  const [showUnstakingTokens, setShowUnstakingTokens] = useState(false)

  const [copied, setCopied] = useState(false)
  // Debounce clearing copied.
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  const buttonPopupSections: ButtonPopupSection[] = useMemo(
    () => [
      ...(cw20Address || onAddToken
        ? [
            {
              label: t('title.token'),
              buttons: [
                ...(cw20Address
                  ? [
                      {
                        Icon: copied ? Check : CopyAll,
                        label: t('button.copyAddressToClipboard'),
                        onClick: () => {
                          if (!cw20Address) {
                            return
                          }

                          navigator.clipboard.writeText(cw20Address)
                          toast.success(t('info.copiedToClipboard'))
                          setCopied(true)
                        },
                      },
                    ]
                  : []),
                ...(onAddToken
                  ? [
                      {
                        Icon: Add,
                        label: t('button.addToKeplr'),
                        onClick: onAddToken,
                      },
                    ]
                  : []),
              ],
            },
          ]
        : []),
      ...(onProposeStakeUnstake || onProposeClaim
        ? [
            {
              label: t('title.newProposalTo'),
              buttons: [
                ...(onProposeStakeUnstake
                  ? [
                      {
                        Icon: StakeEmoji,
                        label: t('button.stakeOrUnstake'),
                        onClick: onProposeStakeUnstake,
                      },
                    ]
                  : []),
                ...(onProposeClaim
                  ? [
                      {
                        Icon: SpendEmoji,
                        label: t('button.claim'),
                        onClick: onProposeClaim,
                      },
                    ]
                  : []),
              ],
            },
          ]
        : []),
    ],
    [copied, cw20Address, onAddToken, onProposeClaim, onProposeStakeUnstake, t]
  )

  // Truncate IBC denominations to prevent overflow.
  const originalTokenSymbol = tokenSymbol
  const isIbc = tokenSymbol.toLowerCase().startsWith('ibc')
  tokenSymbol = isIbc ? concatAddressStartEnd(tokenSymbol, 3, 2) : tokenSymbol

  const waitingForStakingInfo = hasStakingInfo && lazyStakingInfo.loading

  return (
    <>
      <div className="rounded-lg bg-background-tertiary">
        <div className="relative p-5">
          <div className="flex flex-row gap-4 pr-5">
            <div className="relative">
              {/* Image */}
              <div
                className="h-10 w-10 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                }}
              ></div>

              {/* Crown */}
              {!!crown && (
                <CrownIcon className="absolute -top-4 -left-6 !h-8 !w-8 stroke-2 text-text-secondary" />
              )}
            </div>

            {/* Titles */}
            <div className="flex flex-col gap-1">
              {/* We're dealing with an IBC token we don't know about. Instead of showing a long hash, allow the user to copy it. */}
              {isIbc ? (
                <CopyToClipboard
                  className="title-text"
                  takeStartEnd={{
                    start: 8,
                    end: 4,
                  }}
                  value={originalTokenSymbol}
                />
              ) : (
                <p className="title-text">${tokenSymbol}</p>
              )}
              <p className="caption-text">{subtitle}</p>
            </div>
          </div>

          {(waitingForStakingInfo || buttonPopupSections.length > 0) && (
            <div className="absolute top-3 right-3">
              <ButtonPopup
                Trigger={({ open, ...props }) => (
                  <IconButton
                    Icon={ExpandCircleDownOutlined}
                    className={
                      !waitingForStakingInfo
                        ? '!text-icon-secondary'
                        : undefined
                    }
                    disabled={waitingForStakingInfo}
                    focused={open}
                    variant="ghost"
                    {...props}
                  />
                )}
                popupClassName="w-[16rem]"
                position="left"
                sections={buttonPopupSections}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
          <div className="flex flex-row items-start justify-between gap-8">
            <p className="link-text">{t('info.totalHoldings')}</p>
            {/* leading-5 to match link-text's line-height. */}
            <div className="caption-text flex flex-col items-end gap-1 text-right font-mono">
              {/* leading-5 to match link-text's line-height. */}
              <TokenAmountDisplay
                amount={
                  // If staking info has not finished loading, don't show until
                  // it is loaded so this is accurate.
                  waitingForStakingInfo ? { loading: true } : totalBalance
                }
                className="leading-5 text-text-body"
                decimals={tokenDecimals}
                symbol={tokenSymbol}
              />

              <TokenAmountDisplay
                amount={
                  // If staking info has not finished loading, don't show until
                  // it is loaded so this is accurate.
                  waitingForStakingInfo
                    ? { loading: true }
                    : totalBalance * usdcUnitPrice
                }
                usdc
              />
            </div>
          </div>

          {/* Only display `unstakedBalance` if something is staked, because that means this will differ from `totalBalance` above. */}
          {hasStakingInfo && (
            <div className="flex flex-row items-start justify-between gap-8">
              <p className="link-text">{t('info.availableBalance')}</p>
              <div className="caption-text flex flex-col items-end gap-1 text-right font-mono">
                {/* leading-5 to match link-text's line-height. */}
                <TokenAmountDisplay
                  amount={unstakedBalance}
                  className="leading-5 text-text-body"
                  decimals={tokenDecimals}
                  symbol={tokenSymbol}
                />

                <TokenAmountDisplay
                  amount={unstakedBalance * usdcUnitPrice}
                  usdc
                />
              </div>
            </div>
          )}
        </div>

        {hasStakingInfo && (lazyStakingInfo.loading || lazyStakingInfo.data) && (
          <div className="flex flex-col gap-2 border-t border-border-secondary px-6 pt-4 pb-6">
            <p className="link-text mb-1">{t('info.stakes')}</p>

            <div className="flex flex-row items-center justify-between gap-8">
              <p className="secondary-text">{t('title.staked')}</p>

              <TokenAmountDisplay
                amount={
                  lazyStakingInfo.loading ? { loading: true } : totalStaked
                }
                className="caption-text text-right font-mono text-text-body"
                decimals={tokenDecimals}
                symbol={tokenSymbol}
              />
            </div>

            <div className="flex flex-row items-center justify-between gap-8">
              <p className="secondary-text">{t('title.stakedTo')}</p>

              <p
                className={clsx(
                  'caption-text text-right font-mono text-text-body',
                  lazyStakingInfo.loading && 'animate-pulse'
                )}
              >
                {lazyStakingInfo.loading
                  ? '...'
                  : lazyStakes.length > 0 && (
                      <>
                        {lazyStakes[0].validator.moniker}
                        {lazyStakes.length > 1 && (
                          <>
                            ,{' '}
                            <Tooltip
                              title={
                                <>
                                  {lazyStakes
                                    .slice(1)
                                    .map(({ validator }, index) => (
                                      <p key={index}>{validator.moniker}</p>
                                    ))}
                                </>
                              }
                            >
                              <span className="cursor-pointer underline underline-offset-2">
                                {t('info.andNumMore', {
                                  count: lazyStakes.length - 1,
                                })}
                              </span>
                            </Tooltip>
                          </>
                        )}
                      </>
                    )}
              </p>
            </div>

            <div className="flex flex-row items-center justify-between gap-8">
              <p className="secondary-text">{t('title.unstakingTokens')}</p>

              <Button
                className={clsx(
                  'caption-text text-right font-mono underline-offset-2',
                  unstakingBalance > 0 && 'text-text-body',
                  lazyStakingInfo.loading && 'animate-pulse !text-text-body'
                )}
                disabled={lazyStakingInfo.loading}
                onClick={() => setShowUnstakingTokens(true)}
                variant={lazyStakingInfo.loading ? 'none' : 'underline'}
              >
                {lazyStakingInfo.loading
                  ? '...'
                  : t('format.token', {
                      amount: unstakingBalance.toLocaleString(undefined, {
                        notation: 'compact',
                        maximumFractionDigits: tokenDecimals,
                      }),
                      symbol: tokenSymbol,
                    })}
              </Button>
            </div>

            <div className="flex flex-row items-center justify-between gap-8">
              <p className="secondary-text">{t('info.pendingRewards')}</p>

              <TokenAmountDisplay
                amount={
                  lazyStakingInfo.loading ? { loading: true } : pendingRewards
                }
                className="caption-text text-right font-mono text-text-body"
                decimals={tokenDecimals}
                symbol={tokenSymbol}
              />
            </div>
          </div>
        )}
      </div>

      {!lazyStakingInfo.loading && lazyStakingInfo.data && (
        <UnstakingModal
          onClaim={onProposeClaim}
          onClose={() => setShowUnstakingTokens(false)}
          refresh={refreshUnstakingTasks}
          tasks={lazyStakingInfo.data.unstakingTasks}
          unstakingDuration={
            lazyStakingInfo.data.unstakingDurationSeconds
              ? secondsToWdhms(
                  lazyStakingInfo.data.unstakingDurationSeconds,
                  2,
                  false
                )
              : undefined
          }
          visible={showUnstakingTokens}
        />
      )}
    </>
  )
}
