import {
  Add,
  Check,
  CopyAll,
  ExpandCircleDownOutlined,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  ButtonLinkProps,
  ButtonPopupSection,
  ButtonPopupSectionButton,
  StatefulEntityDisplayProps,
  TokenCardInfo,
  TokenType,
} from '@dao-dao/types'
import {
  getFallbackImage,
  isJunoIbcUsdc,
  secondsToWdhms,
  toAccessibleImageUrl,
  transformIbcSymbol,
} from '@dao-dao/utils'

import { useAddToken } from '../../hooks'
import { Button } from '../buttons/Button'
import { CopyToClipboard } from '../CopyToClipboard'
import { IconButton } from '../icon_buttons/IconButton'
import { CrownIcon } from '../icons/CrownIcon'
import { ButtonPopup } from '../popup'
import { TooltipInfoIcon } from '../tooltip'
import { Tooltip } from '../tooltip/Tooltip'
import { TokenAmountDisplay } from './TokenAmountDisplay'
import { UnstakingModal } from './UnstakingModal'
import { UnstakingTaskStatus } from './UnstakingStatus'

export interface TokenCardProps extends TokenCardInfo {
  refreshUnstakingTasks?: () => void
  onClaim?: () => void
  ButtonLink: ComponentType<ButtonLinkProps>
  // Actions to display in the button popup.
  actions?: {
    // Actions to add in the token section. By default, this will include copy
    // address and add to wallet, if a cw20 token.
    token?: ButtonPopupSectionButton[]
    // Extra sections to add to the action popup.
    extraSections?: ButtonPopupSection[]
  }
  // Display DAOs that the token is used as governance in.
  daosGoverned?: string[]
  EntityDisplay?: ComponentType<StatefulEntityDisplayProps>
}

export const TokenCard = ({
  token,
  isGovernanceToken,
  subtitle,
  unstakedBalance,
  hasStakingInfo,
  lazyInfo,
  refreshUnstakingTasks,
  onClaim,
  ButtonLink,
  actions,
  daosGoverned,
  EntityDisplay,
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

  const totalBalance = unstakedBalance + totalStaked + unstakingBalance

  const [showUnstakingTokens, setShowUnstakingTokens] = useState(false)

  const [copied, setCopied] = useState(false)
  // Debounce clearing copied.
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  const { isIbc, tokenSymbol, originalTokenSymbol } = transformIbcSymbol(
    token.symbol
  )

  const addToken = useAddToken()
  const addCw20Token =
    addToken && token.type === TokenType.Cw20
      ? () => addToken(token.denomOrAddress)
      : undefined

  // Setup actions for popup. Prefill with cw20 related actions.
  const buttonPopupSections: ButtonPopupSection[] = [
    ...(token.type === TokenType.Cw20 || !!actions?.token?.length
      ? [
          {
            label: t('title.token'),
            buttons: [
              ...(token.type === TokenType.Cw20
                ? [
                    {
                      Icon: copied ? Check : CopyAll,
                      label: t('button.copyAddressToClipboard'),
                      onClick: () => {
                        navigator.clipboard.writeText(token.denomOrAddress)
                        toast.success(t('info.copiedToClipboard'))
                        setCopied(true)
                      },
                    },
                  ]
                : []),
              ...(addCw20Token
                ? [
                    {
                      Icon: Add,
                      label: t('button.addToKeplr'),
                      onClick: addCw20Token,
                    },
                  ]
                : []),
              ...(actions?.token ?? []),
            ],
          },
        ]
      : []),
    ...(actions?.extraSections ?? []),
  ]

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
                  backgroundImage: `url(${toAccessibleImageUrl(
                    token.imageUrl || getFallbackImage(token.denomOrAddress)
                  )})`,
                }}
              ></div>

              {/* Crown */}
              {isGovernanceToken && (
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
                    start: 7,
                    end: 3,
                  }}
                  value={originalTokenSymbol}
                />
              ) : (
                <p className="title-text">${tokenSymbol}</p>
              )}

              {!!subtitle && <p className="caption-text">{subtitle}</p>}
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
                dontCloseOnClick
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
                decimals={token.decimals}
                symbol={tokenSymbol}
              />

              {!isJunoIbcUsdc(token.denomOrAddress) &&
                (lazyInfo.loading || lazyInfo.data.usdUnitPrice) && (
                  <div className="flex flex-row items-center gap-1">
                    <TokenAmountDisplay
                      amount={
                        // If staking info has not finished loading, don't show
                        // until it is loaded so this is accurate.
                        waitingForStakingInfo || lazyInfo.loading
                          ? { loading: true }
                          : totalBalance * lazyInfo.data.usdUnitPrice!.amount
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

          {/* Only display `unstakedBalance` if something is staked, because that means this will differ from `totalBalance` above. */}
          {hasStakingInfo && (
            <div className="flex flex-row items-start justify-between gap-8">
              <p className="link-text">{t('info.availableBalance')}</p>
              <div className="caption-text flex flex-col items-end gap-1 text-right font-mono">
                {/* leading-5 to match link-text's line-height. */}
                <TokenAmountDisplay
                  amount={unstakedBalance}
                  className="leading-5 text-text-body"
                  decimals={token.decimals}
                  symbol={tokenSymbol}
                />

                {!isJunoIbcUsdc(token.denomOrAddress) &&
                  (lazyInfo.loading || lazyInfo.data.usdUnitPrice) && (
                    <div className="flex flex-row items-center gap-1">
                      <TokenAmountDisplay
                        amount={
                          lazyInfo.loading
                            ? { loading: true }
                            : unstakedBalance *
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
        </div>

        {hasStakingInfo && (lazyInfo.loading || lazyInfo.data) && (
          <div className="flex flex-col gap-2 border-t border-border-secondary px-6 pt-4 pb-6">
            <p className="link-text mb-1">{t('info.stakes')}</p>

            <div className="flex flex-row items-center justify-between gap-8">
              <p className="secondary-text">{t('title.staked')}</p>

              <TokenAmountDisplay
                amount={lazyInfo.loading ? { loading: true } : totalStaked}
                className="caption-text text-right font-mono text-text-body"
                decimals={token.decimals}
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
              <p className="secondary-text">{t('title.unstaking')}</p>

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
                  symbol={tokenSymbol}
                />
              </Button>
            </div>

            <div className="flex flex-row items-center justify-between gap-8">
              <p className="secondary-text">{t('info.pendingRewards')}</p>

              <TokenAmountDisplay
                amount={lazyInfo.loading ? { loading: true } : pendingRewards}
                className="caption-text text-right font-mono text-text-body"
                decimals={token.decimals}
                symbol={tokenSymbol}
              />
            </div>
          </div>
        )}

        {EntityDisplay && daosGoverned && daosGoverned.length > 0 && (
          <div className="space-y-2 border-t border-border-secondary py-4 px-6">
            <p className="link-text">{t('title.daos')}</p>

            <div className="space-y-1">
              {daosGoverned.map((dao) => (
                <EntityDisplay key={dao} address={dao} />
              ))}
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
