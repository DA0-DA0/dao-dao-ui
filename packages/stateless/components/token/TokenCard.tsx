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
  convertMicroDenomToDenomWithDecimals,
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
  // Display DAOs that the token is used as governance in, and optionally an
  // amount of staked tokens. This is used to display how much a wallet has
  // staked.
  daosGoverned?: {
    coreAddress: string
    stakedBalance?: number
  }[]
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

  const totalStaked =
    lazyInfo.loading || !lazyInfo.data.stakingInfo
      ? 0
      : lazyInfo.data.stakingInfo.totalStaked
  const totalPendingRewards =
    lazyInfo.loading || !lazyInfo.data.stakingInfo
      ? 0
      : lazyInfo.data.stakingInfo.totalPendingRewards
  const totalUnstaking =
    lazyInfo.loading || !lazyInfo.data.stakingInfo
      ? 0
      : lazyInfo.data.stakingInfo.totalUnstaking

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
                  lazyInfo.loading
                    ? { loading: true }
                    : lazyInfo.data.totalBalance
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
                        lazyInfo.loading || !lazyInfo.data.usdUnitPrice
                          ? { loading: true }
                          : lazyInfo.data.totalBalance *
                            lazyInfo.data.usdUnitPrice.amount
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
                  totalUnstaking > 0 && 'text-text-body',
                  lazyInfo.loading && 'animate-pulse !text-text-body'
                )}
                disabled={lazyInfo.loading}
                onClick={() => setShowUnstakingTokens(true)}
                variant={
                  lazyInfo.loading || totalUnstaking === 0
                    ? 'none'
                    : 'underline'
                }
              >
                <TokenAmountDisplay
                  amount={lazyInfo.loading ? { loading: true } : totalUnstaking}
                  decimals={token.decimals}
                  symbol={tokenSymbol}
                />
              </Button>
            </div>

            <div className="flex flex-row items-center justify-between gap-8">
              <p className="secondary-text">{t('info.pendingRewards')}</p>

              <TokenAmountDisplay
                amount={
                  lazyInfo.loading ? { loading: true } : totalPendingRewards
                }
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
              {daosGoverned.map(({ coreAddress, stakedBalance }) => (
                <div
                  key={coreAddress}
                  className="flex flex-row items-center justify-between"
                >
                  <EntityDisplay address={coreAddress} />

                  {stakedBalance !== undefined && (
                    <TokenAmountDisplay
                      amount={convertMicroDenomToDenomWithDecimals(
                        stakedBalance,
                        token.decimals
                      )}
                      className="text-right font-mono"
                      decimals={token.decimals}
                      hideSymbol
                      suffix={' ' + t('info.staked')}
                    />
                  )}
                </div>
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
