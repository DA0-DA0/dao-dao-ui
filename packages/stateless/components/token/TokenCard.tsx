import {
  Add,
  Check,
  CopyAll,
  ExpandCircleDownOutlined,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { ButtonPopupSection, TokenCardProps, TokenType } from '@dao-dao/types'
import {
  getFallbackImage,
  isJunoIbcUsdc,
  secondsToWdhms,
  toAccessibleImageUrl,
  transformIbcSymbol,
} from '@dao-dao/utils'

import { useAddToken, useDaoInfoContextIfAvailable } from '../../hooks'
import { Button } from '../buttons/Button'
import { CopyToClipboard } from '../CopyToClipboard'
import { CrownIcon } from '../icons/CrownIcon'
import { ButtonPopup } from '../popup'
import { TooltipInfoIcon } from '../tooltip'
import { Tooltip } from '../tooltip/Tooltip'
import { TokenAmountDisplay } from './TokenAmountDisplay'
import { UnstakingModal } from './UnstakingModal'

export const TokenCard = ({
  token,
  isGovernanceToken,
  subtitle,
  unstakedBalance,
  hasStakingInfo: _hasStakingInfo,
  lazyInfo,
  refreshUnstakingTasks,
  onClaim,
  ButtonLink,
  actions,
  EntityDisplay,
}: TokenCardProps) => {
  const { t } = useTranslation()
  // If in a DAO context, don't show the DAOs governed section if the only DAO
  // this token governs is the current DAO. See the comment where this is used
  // for more details.
  const { coreAddress } = useDaoInfoContextIfAvailable() ?? {}

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
                      closeOnClick: false,
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
                      closeOnClick: false,
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

  // This has staking info if we have already determined it has staking info, or
  // if there are any stakes or unstaking tasks once the data is loaded. For
  // efficiency, we don't load unstaking tasks right away because it depends on
  // several queries, but we can quickly check if there is anything staked and
  // preset `hasStakingInfo` if so. This makes sure that unstaking tasks show
  // even when there is nothing staked.
  const hasStakingInfo =
    _hasStakingInfo ||
    (!lazyInfo.loading &&
      (!!lazyInfo.data.stakingInfo?.stakes.length ||
        !!lazyInfo.data.stakingInfo?.unstakingTasks.length))
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
                popupClassName="w-[16rem]"
                position="left"
                sections={buttonPopupSections}
                trigger={{
                  type: 'icon_button',
                  props: {
                    Icon: ExpandCircleDownOutlined,
                    className: !waitingForStakingInfo
                      ? '!text-icon-secondary'
                      : undefined,
                    disabled: waitingForStakingInfo,
                    variant: 'ghost',
                  },
                }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
          {/* Don't show if loading, because `unstakedBalance` will show below while loading instead. It will hide if the total loads and is the same. This prevents weird looking relayouts while also showing some balance while the total is loading. */}
          {!lazyInfo.loading && (
            <div className="flex flex-row items-start justify-between gap-8">
              <p className="link-text">{t('info.totalHoldings')}</p>

              {/* leading-5 to match link-text's line-height. */}
              <div className="caption-text flex flex-col items-end gap-1 text-right font-mono">
                {/* leading-5 to match link-text's line-height. */}
                <TokenAmountDisplay
                  amount={lazyInfo.data.totalBalance}
                  className="leading-5 text-text-body"
                  decimals={token.decimals}
                  symbol={tokenSymbol}
                />

                {!isJunoIbcUsdc(token.denomOrAddress) &&
                  lazyInfo.data.usdUnitPrice && (
                    <div className="flex flex-row items-center gap-1">
                      <TokenAmountDisplay
                        amount={
                          lazyInfo.data.totalBalance *
                          lazyInfo.data.usdUnitPrice.amount
                        }
                        dateFetched={lazyInfo.data.usdUnitPrice!.timestamp}
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

          {/* Only display `unstakedBalance` if total is loading or if different from total. While loading, the total above will hide.  */}
          {(lazyInfo.loading ||
            lazyInfo.data.totalBalance !== unstakedBalance) && (
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

        {hasStakingInfo && (
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

        {!lazyInfo.loading &&
          !!lazyInfo.data.daosGoverned?.length &&
          // Only show DAOs if there are more than 1 or if the only DAO in the
          // list is the current DAO. This prevents the DAO's governance token
          // from listing only the DAO we're currently viewing as a DAO it
          // governs, since that would be unhelpful. When there are multiple
          // DAOs, we show them all, because it would be confusing to not show
          // the current DAO and it helps provide context.
          (!coreAddress ||
            lazyInfo.data.daosGoverned.length > 1 ||
            lazyInfo.data.daosGoverned[0].coreAddress !== coreAddress) && (
            <div className="space-y-3 border-t border-border-secondary py-4 px-6">
              <div className="flex flex-row items-center gap-1">
                <p className="link-text">{t('title.daosGoverned')}</p>

                <TooltipInfoIcon
                  size="xs"
                  title={t('info.daosGovernedTooltip', {
                    tokenSymbol,
                  })}
                />
              </div>

              <div className="space-y-1">
                {lazyInfo.data.daosGoverned.map(
                  ({ coreAddress, stakedBalance }) => (
                    <div
                      key={coreAddress}
                      className="flex flex-row items-center justify-between"
                    >
                      <EntityDisplay address={coreAddress} />

                      {/* Only show staked balance if defined and nonzero. */}
                      {!!stakedBalance && (
                        <TokenAmountDisplay
                          amount={stakedBalance}
                          className="caption-text text-right font-mono"
                          decimals={token.decimals}
                          hideSymbol
                          suffix={' ' + t('info.staked')}
                        />
                      )}
                    </div>
                  )
                )}
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
