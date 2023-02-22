import {
  Add,
  Check,
  CopyAll,
  ExpandCircleDownOutlined,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import {
  Button,
  ButtonLinkProps,
  ButtonPopup,
  ButtonPopupSection,
  ChartEmoji,
  DepositEmoji,
  EntityDisplay,
  IconButton,
  Loader,
  MarkdownRenderer,
  MoneyEmoji,
  ProfileImage,
  TokenAmountDisplay,
  Tooltip,
  TooltipInfoIcon,
  UnstakingModal,
  useTranslatedTimeDeltaFormatter,
} from '@dao-dao/stateless'
import {
  Entity,
  GenericToken,
  LoadingData,
  TokenCardLazyInfo,
  UnstakingTaskStatus,
} from '@dao-dao/types'
import {
  concatAddressStartEnd,
  formatDateTimeTz,
  isJunoIbcUsdc,
  secondsToWdhms,
} from '@dao-dao/utils'

export interface VestingPaymentCardProps {
  recipient: string
  recipientEntity: LoadingData<Entity>
  // If current wallet connected is the recipient.
  recipientIsWallet: boolean

  ButtonLink: ComponentType<ButtonLinkProps>
  lazyInfo: LoadingData<TokenCardLazyInfo>
  token: GenericToken

  title: string | undefined | null
  description: string | undefined | null
  remainingBalanceVesting: number
  withdrawableAmount: number
  claimedAmount: number
  startDate?: Date
  endDate?: Date

  // Defined if using a Cw20 token.
  cw20Address?: string

  onWithdraw: () => void
  withdrawing: boolean

  onClaim?: () => void
  claiming?: boolean

  onManageStake?: () => void

  onAddToken?: () => void
  refreshUnstakingTasks?: () => void
}

export const VestingPaymentCard = ({
  recipient,
  recipientEntity,
  recipientIsWallet,
  ButtonLink,
  lazyInfo,
  token,
  title,
  description,
  remainingBalanceVesting,
  withdrawableAmount,
  claimedAmount,
  startDate,
  endDate,
  cw20Address,
  onWithdraw,
  withdrawing,
  onClaim,
  claiming,
  onManageStake,
  onAddToken,
  refreshUnstakingTasks,
}: VestingPaymentCardProps) => {
  const { t } = useTranslation()

  const lazyStakes =
    lazyInfo.loading || !lazyInfo.data.stakingInfo
      ? []
      : lazyInfo.data.stakingInfo.stakes
  const lazyUnstakingTasks =
    lazyInfo.loading || !lazyInfo.data.stakingInfo
      ? []
      : lazyInfo.data.stakingInfo.unstakingTasks

  const totalStaked =
    lazyStakes.reduce((acc, stake) => acc + stake.amount, 0) ?? 0
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
      // Only show payout actions if recipient is the currently connected
      // wallet.
      ...(recipientIsWallet
        ? [
            {
              label: t('title.manage'),
              buttons: [
                {
                  Icon: MoneyEmoji,
                  label: t('button.withdrawAvailableBalance'),
                  onClick: onWithdraw,
                  loading: withdrawing,
                },
                ...(onManageStake
                  ? [
                      {
                        Icon: ChartEmoji,
                        label: t('button.stakeOrUnstake'),
                        onClick: onManageStake,
                      },
                    ]
                  : []),
                ...(onClaim
                  ? [
                      {
                        Icon: DepositEmoji,
                        label: t('button.claimStakingRewards'),
                        onClick: onClaim,
                        loading: claiming,
                      },
                    ]
                  : []),
              ],
            },
          ]
        : []),
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
    ],
    [
      recipientIsWallet,
      t,
      onWithdraw,
      withdrawing,
      onManageStake,
      onClaim,
      claiming,
      cw20Address,
      onAddToken,
      copied,
    ]
  )

  // Truncate IBC denominations to prevent overflow.
  if (token.symbol.toLowerCase().startsWith('ibc')) {
    token = {
      ...token,
      symbol: concatAddressStartEnd(token.symbol, 3, 2),
    }
  }

  const [descriptionCollapsible, setDescriptionCollapsible] = useState(false)
  const [descriptionCollapsed, setDescriptionCollapsed] = useState(true)

  const now = new Date()

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ suffix: true })

  return (
    <>
      <div className="rounded-lg bg-background-tertiary">
        <div className="relative p-6">
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Image */}
            {recipientEntity.loading ? (
              <Loader fill={false} size={40} />
            ) : (
              <ProfileImage
                imageUrl={recipientEntity.data.imageUrl}
                rounded
                size="sm"
              />
            )}

            {/* Titles */}
            <div className="flex flex-col items-center gap-1">
              <EntityDisplay
                address={recipient}
                // Image shown to the left.
                hideImage
                loadingEntity={recipientEntity}
              />

              {!!title && <p className="secondary-text">{title}</p>}
            </div>
          </div>

          {buttonPopupSections.length > 0 && (
            <div className="absolute top-1 right-1">
              <ButtonPopup
                ButtonLink={ButtonLink}
                Trigger={({ open, ...props }) => (
                  <IconButton
                    Icon={ExpandCircleDownOutlined}
                    className="!text-icon-secondary"
                    focused={open}
                    variant="ghost"
                    {...props}
                  />
                )}
                dontCloseOnClick
                popupClassName="w-[16rem]"
                position="left"
                sections={buttonPopupSections}
              />
            </div>
          )}
        </div>

        {!!description && (
          <div
            className="flex flex-col gap-2 border-t border-border-secondary py-4 px-6"
            ref={
              // Decide if description should be collapsible based on if text is
              // being truncated or not.
              (ref) => {
                if (!ref || descriptionCollapsible) {
                  return
                }

                const descriptionPTag = ref?.children[1]?.children[0]
                const descriptionOverflowing =
                  !!descriptionPTag &&
                  descriptionPTag.scrollHeight > descriptionPTag.clientHeight

                setDescriptionCollapsible(descriptionOverflowing)
              }
            }
          >
            <p className="link-text">{t('title.description')}</p>

            <MarkdownRenderer
              className={
                descriptionCollapsed ? 'break-words line-clamp-2' : undefined
              }
              markdown={description}
            />

            {(descriptionCollapsible || !descriptionCollapsed) && (
              <Button
                className="text-text-secondary"
                onClick={() => setDescriptionCollapsed((c) => !c)}
                variant="underline"
              >
                {descriptionCollapsed
                  ? t('button.readMore')
                  : t('button.readLess')}
              </Button>
            )}
          </div>
        )}

        {(startDate || endDate) && (
          <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
            {startDate && (
              <div className="flex flex-row items-start justify-between gap-8">
                <p className="link-text">
                  {startDate > now ? t('info.startsAt') : t('info.startedAt')}
                </p>

                {/* leading-5 to match link-text's line-height. */}
                {endDate && endDate <= now ? (
                  <p className="caption-text leading-5 text-text-body">
                    {formatDateTimeTz(startDate)}
                  </p>
                ) : (
                  <Tooltip title={formatDateTimeTz(startDate)}>
                    <p className="caption-text leading-5 text-text-body">
                      <TimeAgo date={startDate} formatter={timeAgoFormatter} />
                    </p>
                  </Tooltip>
                )}
              </div>
            )}

            {endDate && (
              <div className="flex flex-row items-start justify-between gap-8">
                <p className="link-text">
                  {endDate > now ? t('info.finishesAt') : t('info.finishedAt')}
                </p>

                {/* leading-5 to match link-text's line-height. */}
                {endDate > now ? (
                  <Tooltip title={formatDateTimeTz(endDate)}>
                    <p className="caption-text leading-5 text-text-body">
                      <TimeAgo date={endDate} formatter={timeAgoFormatter} />
                    </p>
                  </Tooltip>
                ) : (
                  <p className="caption-text leading-5 text-text-body">
                    {formatDateTimeTz(endDate)}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
          {withdrawableAmount > 0 && (
            <div className="flex flex-row items-start justify-between gap-8">
              <p className="link-text">{t('info.availableBalance')}</p>

              {/* leading-5 to match link-text's line-height. */}
              <div className="caption-text flex flex-col items-end gap-1 text-right font-mono">
                {/* leading-5 to match link-text's line-height. */}
                <TokenAmountDisplay
                  amount={withdrawableAmount}
                  className="leading-5 text-text-body"
                  decimals={token.decimals}
                  symbol={token.symbol}
                />

                {!isJunoIbcUsdc(token.denomOrAddress) &&
                  (lazyInfo.loading || lazyInfo.data.usdUnitPrice) && (
                    <div className="flex flex-row items-center gap-1">
                      <TokenAmountDisplay
                        amount={
                          lazyInfo.loading
                            ? { loading: true }
                            : withdrawableAmount *
                              lazyInfo.data.usdUnitPrice!.amount
                        }
                        dateFetched={
                          lazyInfo.loading
                            ? undefined
                            : lazyInfo.data.usdUnitPrice!.timestamp
                        }
                        estimatedUsdValue
                      />

                      <TooltipInfoIcon
                        size="xs"
                        title={t('info.estimatedUsdValueTooltip')}
                      />
                    </div>
                  )}
              </div>
            </div>
          )}

          {remainingBalanceVesting > 0 && (
            <div className="flex flex-row items-start justify-between gap-8">
              <p className="link-text">{t('info.remainingBalanceVesting')}</p>

              {/* leading-5 to match link-text's line-height. */}
              <div className="caption-text flex flex-col items-end gap-1 text-right font-mono">
                {/* leading-5 to match link-text's line-height. */}
                <TokenAmountDisplay
                  amount={remainingBalanceVesting}
                  className="leading-5 text-text-body"
                  decimals={token.decimals}
                  symbol={token.symbol}
                />

                {!isJunoIbcUsdc(token.denomOrAddress) &&
                  (lazyInfo.loading || lazyInfo.data.usdUnitPrice) && (
                    <div className="flex flex-row items-center gap-1">
                      <TokenAmountDisplay
                        amount={
                          lazyInfo.loading
                            ? { loading: true }
                            : remainingBalanceVesting *
                              lazyInfo.data.usdUnitPrice!.amount
                        }
                        dateFetched={
                          lazyInfo.loading
                            ? undefined
                            : lazyInfo.data.usdUnitPrice!.timestamp
                        }
                        estimatedUsdValue
                      />

                      <TooltipInfoIcon
                        size="xs"
                        title={t('info.estimatedUsdValueTooltip')}
                      />
                    </div>
                  )}
              </div>
            </div>
          )}

          <div className="flex flex-row items-start justify-between gap-8">
            <p className="link-text">{t('title.claimedBalance')}</p>

            {/* leading-5 to match link-text's line-height. */}
            <div className="caption-text flex flex-col items-end gap-1 text-right font-mono">
              {/* leading-5 to match link-text's line-height. */}
              <TokenAmountDisplay
                amount={claimedAmount}
                className="leading-5 text-text-body"
                decimals={token.decimals}
                symbol={token.symbol}
              />

              {!isJunoIbcUsdc(token.denomOrAddress) &&
                (lazyInfo.loading || lazyInfo.data.usdUnitPrice) && (
                  <div className="flex flex-row items-center gap-1">
                    <TokenAmountDisplay
                      amount={
                        lazyInfo.loading
                          ? { loading: true }
                          : claimedAmount * lazyInfo.data.usdUnitPrice!.amount
                      }
                      dateFetched={
                        lazyInfo.loading
                          ? undefined
                          : lazyInfo.data.usdUnitPrice!.timestamp
                      }
                      estimatedUsdValue
                    />

                    <TooltipInfoIcon
                      size="xs"
                      title={t('info.estimatedUsdValueTooltip')}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>

        {!lazyInfo.loading && !!lazyInfo.data.stakingInfo?.stakes?.length && (
          <div className="flex flex-col gap-2 border-t border-border-secondary px-6 pt-4 pb-6">
            <p className="link-text mb-1">{t('info.stakes')}</p>

            <div className="flex flex-row items-center justify-between gap-8">
              <p className="secondary-text">{t('title.staked')}</p>

              <TokenAmountDisplay
                amount={lazyInfo.loading ? { loading: true } : totalStaked}
                className="caption-text text-right font-mono text-text-body"
                decimals={token.decimals}
                symbol={token.symbol}
              />
            </div>

            <div className="flex flex-row items-center justify-between gap-8">
              <p className="secondary-text">{t('title.stakedTo')}</p>

              <p
                className={clsx(
                  'caption-text text-right font-mono text-text-body',
                  lazyInfo.loading && 'animate-pulse'
                )}
              >
                {lazyInfo.loading
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
                  lazyInfo.loading && 'animate-pulse !text-text-body'
                )}
                disabled={lazyInfo.loading}
                onClick={() => setShowUnstakingTokens(true)}
                variant={
                  lazyInfo.loading || unstakingBalance === 0
                    ? 'none'
                    : 'underline'
                }
              >
                <TokenAmountDisplay
                  amount={
                    lazyInfo.loading ? { loading: true } : unstakingBalance
                  }
                  decimals={token.decimals}
                  symbol={token.symbol}
                />
              </Button>
            </div>

            <div className="flex flex-row items-center justify-between gap-8">
              <p className="secondary-text">{t('info.pendingRewards')}</p>

              <TokenAmountDisplay
                amount={lazyInfo.loading ? { loading: true } : pendingRewards}
                className="caption-text text-right font-mono text-text-body"
                decimals={token.decimals}
                symbol={token.symbol}
              />
            </div>
          </div>
        )}
      </div>

      {!lazyInfo.loading && lazyInfo.data.stakingInfo && (
        <UnstakingModal
          onClaim={onClaim}
          onClose={() => setShowUnstakingTokens(false)}
          refresh={refreshUnstakingTasks}
          tasks={lazyInfo.data.stakingInfo.unstakingTasks}
          unstakingDuration={
            lazyInfo.data.stakingInfo.unstakingDurationSeconds
              ? secondsToWdhms(
                  lazyInfo.data.stakingInfo.unstakingDurationSeconds
                )
              : undefined
          }
          visible={showUnstakingTokens}
        />
      )}
    </>
  )
}
