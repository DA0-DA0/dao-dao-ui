import {
  AccountBalance,
  Add,
  Check,
  CopyAll,
  ExpandCircleDownOutlined,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { TokenCardInfo } from '@dao-dao/types'
import {
  isJunoIbcUsdc,
  secondsToWdhms,
  toAccessibleImageUrl,
} from '@dao-dao/utils'

import { ButtonLinkProps } from '../buttons'
import { Button } from '../buttons/Button'
import { CopyToClipboard, concatAddressStartEnd } from '../CopyToClipboard'
import { DepositEmoji, MoneyEmoji } from '../emoji'
import { IconButton } from '../icon_buttons/IconButton'
import { CrownIcon } from '../icons/CrownIcon'
import { ButtonPopup, ButtonPopupSection } from '../popup'
import { Tooltip } from '../tooltip/Tooltip'
import { TokenAmountDisplay } from './TokenAmountDisplay'
import { UnstakingModal } from './UnstakingModal'
import { UnstakingTaskStatus } from './UnstakingStatus'

export interface TokenCardProps extends TokenCardInfo {
  onAddToken?: () => void
  proposeStakeUnstakeHref?: string
  proposeClaimHref?: string
  refreshUnstakingTasks?: () => void
  onClaim?: () => void
  showDeposit?: () => void
  ButtonLink: ComponentType<ButtonLinkProps>
}

export const TokenCard = ({
  crown,
  tokenSymbol,
  tokenDenom,
  tokenDecimals,
  subtitle,
  imageUrl,
  unstakedBalance,
  hasStakingInfo,
  lazyInfo,
  cw20Address,
  onAddToken,
  proposeStakeUnstakeHref,
  proposeClaimHref,
  refreshUnstakingTasks,
  onClaim,
  showDeposit,
  ButtonLink,
}: TokenCardProps) => {
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
      ...(cw20Address || onAddToken || showDeposit
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
                ...(showDeposit
                  ? [
                      {
                        Icon: AccountBalance,
                        label: t('button.deposit'),
                        onClick: showDeposit,
                      },
                    ]
                  : []),
              ],
            },
          ]
        : []),
      ...(proposeStakeUnstakeHref || proposeClaimHref
        ? [
            {
              label: t('title.newProposalTo'),
              buttons: [
                ...(proposeStakeUnstakeHref
                  ? [
                      {
                        Icon: DepositEmoji,
                        label: t('button.stakeOrUnstake'),
                        href: proposeStakeUnstakeHref,
                      },
                    ]
                  : []),
                ...(proposeClaimHref
                  ? [
                      {
                        Icon: MoneyEmoji,
                        label: t('button.claim'),
                        href: proposeClaimHref,
                      },
                    ]
                  : []),
              ],
            },
          ]
        : []),
    ],
    [
      copied,
      cw20Address,
      onAddToken,
      proposeClaimHref,
      proposeStakeUnstakeHref,
      showDeposit,
      t,
    ]
  )

  // Truncate IBC denominations to prevent overflow.
  const originalTokenSymbol = tokenSymbol
  const isIbc = tokenSymbol.toLowerCase().startsWith('ibc')
  tokenSymbol = isIbc ? concatAddressStartEnd(tokenSymbol, 3, 2) : tokenSymbol

  const waitingForStakingInfo = hasStakingInfo && lazyInfo.loading

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
                  backgroundImage: `url(${toAccessibleImageUrl(imageUrl)})`,
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
                ButtonLink={ButtonLink}
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

              {!isJunoIbcUsdc(tokenDenom) &&
                (lazyInfo.loading || lazyInfo.data.usdcUnitPrice) && (
                  <TokenAmountDisplay
                    amount={
                      // If staking info has not finished loading, don't show
                      // until it is loaded so this is accurate.
                      waitingForStakingInfo || lazyInfo.loading
                        ? { loading: true }
                        : totalBalance * lazyInfo.data.usdcUnitPrice!.amount
                    }
                    dateFetched={
                      lazyInfo.loading
                        ? undefined
                        : lazyInfo.data.usdcUnitPrice!.timestamp
                    }
                    usdcConversion
                  />
                )}
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

                {!isJunoIbcUsdc(tokenDenom) && (
                  <TokenAmountDisplay
                    amount={
                      lazyInfo.loading || !lazyInfo.data.usdcUnitPrice
                        ? { loading: true }
                        : unstakedBalance * lazyInfo.data.usdcUnitPrice.amount
                    }
                    dateFetched={
                      lazyInfo.loading || !lazyInfo.data.usdcUnitPrice
                        ? undefined
                        : lazyInfo.data.usdcUnitPrice.timestamp
                    }
                    usdcConversion
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {hasStakingInfo && (lazyInfo.loading || lazyInfo.data) && (
          <div className="flex flex-col gap-2 border-t border-border-secondary px-6 pt-4 pb-6">
            <p className="link-text mb-1">{t('info.stakes')}</p>

            <div className="flex flex-row items-center justify-between gap-8">
              <p className="secondary-text">{t('title.staked')}</p>

              <TokenAmountDisplay
                amount={lazyInfo.loading ? { loading: true } : totalStaked}
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
                  decimals={tokenDecimals}
                  symbol={tokenSymbol}
                />
              </Button>
            </div>

            <div className="flex flex-row items-center justify-between gap-8">
              <p className="secondary-text">{t('info.pendingRewards')}</p>

              <TokenAmountDisplay
                amount={lazyInfo.loading ? { loading: true } : pendingRewards}
                className="caption-text text-right font-mono text-text-body"
                decimals={tokenDecimals}
                symbol={tokenSymbol}
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
                  lazyInfo.data.stakingInfo.unstakingDurationSeconds,
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
