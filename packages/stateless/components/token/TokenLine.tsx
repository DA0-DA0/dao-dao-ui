import clsx from 'clsx'
import { useState } from 'react'

import { Modal, TokenAmountDisplay } from '@dao-dao/stateless'
import {
  TokenCardInfo,
  TokenLineProps,
  UnstakingTaskStatus,
} from '@dao-dao/types'
import {
  getFallbackImage,
  isJunoIbcUsdc,
  toAccessibleImageUrl,
  transformIbcSymbol,
} from '@dao-dao/utils'

export const TokenLine = <T extends TokenCardInfo>(
  props: TokenLineProps<T>
) => {
  const {
    TokenCard,
    token,
    unstakedBalance,
    hasStakingInfo,
    transparentBackground,
    lazyInfo,
  } = props

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
  // const pendingRewards =
  //   lazyStakes?.reduce((acc, stake) => acc + stake.rewards, 0) ?? 0
  const unstakingBalance =
    lazyUnstakingTasks.reduce(
      (acc, task) =>
        acc +
        // Only include balance of unstaking tasks.
        (task.status === UnstakingTaskStatus.Unstaking ? task.amount : 0),
      0
    ) ?? 0

  const totalBalance = unstakedBalance + totalStaked + unstakingBalance
  const waitingForStakingInfo = hasStakingInfo && lazyInfo.loading

  const { tokenSymbol } = transformIbcSymbol(token.symbol)

  const [cardVisible, setCardVisible] = useState(false)

  return (
    <>
      <div
        className={clsx(
          'cursor-pointerg box-content grid h-8 grid-cols-2 items-center gap-4 rounded-lg py-3 px-4 transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed sm:grid-cols-[2fr_1fr_1fr]',
          !transparentBackground && 'bg-background-tertiary'
        )}
        onClick={() => setCardVisible(true)}
      >
        <div className="flex flex-row items-center gap-2">
          <div
            className="h-6 w-6 rounded-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${toAccessibleImageUrl(
                token.imageUrl || getFallbackImage(token.denomOrAddress)
              )})`,
            }}
          ></div>

          <p className="title-text">${tokenSymbol}</p>
        </div>

        <TokenAmountDisplay
          amount={waitingForStakingInfo ? { loading: true } : totalBalance}
          className="body-text truncate text-right font-mono"
          decimals={token.decimals}
          hideSymbol
          showFullAmount
        />

        {/* Only show on larger screen. */}
        {!isJunoIbcUsdc(token.denomOrAddress) &&
        (lazyInfo.loading || lazyInfo.data.usdUnitPrice) ? (
          <div className="hidden flex-row items-center justify-end sm:flex">
            <TokenAmountDisplay
              amount={
                // If staking info has not finished loading, don't show until it
                // is loaded so this is accurate.
                waitingForStakingInfo || lazyInfo.loading
                  ? { loading: true }
                  : totalBalance * lazyInfo.data.usdUnitPrice!.amount
              }
              className="caption-text font-mono"
              dateFetched={
                lazyInfo.loading
                  ? undefined
                  : lazyInfo.data.usdUnitPrice!.timestamp
              }
              estimatedUsdValue
              hideSymbol
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <Modal
        containerClassName="border-border-primary w-full"
        contentContainerClassName="!p-0"
        hideCloseButton
        onClose={() => setCardVisible(false)}
        visible={cardVisible}
      >
        <TokenCard {...props} />
      </Modal>
    </>
  )
}
