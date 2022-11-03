import { parseCoins } from '@cosmjs/proto-signing'
import { IndexedTx } from '@cosmjs/stargate'
import { selectorFamily, waitForAll } from 'recoil'

import {
  CwdCoreV2Selectors,
  blockHeightTimestampSafeSelector,
  cosmWasmClientForChainSelector,
  nativeBalancesSelector,
  nativeDelegatedBalanceSelector,
  nativeStakingInfoSelector,
  nativeUnstakingDurationSecondsSelector,
  usdcPerMacroTokenSelector,
} from '@dao-dao/state'
import {
  TokenCardInfo,
  TokenCardLazyInfo,
  UnstakingTaskStatus,
  WithChainId,
} from '@dao-dao/types'
import {
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
  getFallbackImage,
  nativeTokenDecimals,
  nativeTokenLabel,
} from '@dao-dao/utils'

export const treasuryTokenCardInfosSelector = selectorFamily<
  TokenCardInfo[],
  WithChainId<{
    coreAddress: string
    cw20GovernanceTokenAddress?: string
    nativeGovernanceTokenDenom?: string
  }>
>({
  key: 'treasuryTokenCardInfos',
  get:
    ({
      coreAddress,
      cw20GovernanceTokenAddress,
      nativeGovernanceTokenDenom,
      chainId,
    }) =>
    ({ get }) => {
      const nativeBalances = get(
        nativeBalancesSelector({ address: coreAddress, chainId })
      )
      const cw20s = get(
        CwdCoreV2Selectors.cw20BalancesInfoSelector({
          contractAddress: coreAddress,
          chainId,
          governanceTokenAddress: cw20GovernanceTokenAddress,
        })
      )

      const infos: TokenCardInfo[] = [
        ...nativeBalances.map(
          ({ denom, amount, decimals, label, imageUrl }) => {
            const unstakedBalance = convertMicroDenomToDenomWithDecimals(
              amount,
              decimals
            )

            // For now, stakingInfo only exists for native token, until ICA.
            const hasStakingInfo =
              denom === NATIVE_DENOM &&
              // Check if anything staked.
              Number(
                get(
                  nativeDelegatedBalanceSelector({
                    address: coreAddress,
                    chainId,
                  })
                ).amount
              ) > 0

            const info: TokenCardInfo = {
              // True if native token DAO and using this denom.
              crown: nativeGovernanceTokenDenom === denom,
              tokenSymbol: label,
              tokenDenom: denom,
              tokenDecimals: decimals,
              // TODO(v2): Retrieve subtitle.
              // subtitle: '',
              imageUrl: imageUrl || getFallbackImage(denom),
              unstakedBalance,
              hasStakingInfo,

              lazyInfo: { loading: true },
            }

            return info
          }
        ),
        ...cw20s.map(
          ({
            symbol,
            denom,
            amount,
            decimals,
            imageUrl,
            isGovernanceToken,
          }) => {
            const unstakedBalance = convertMicroDenomToDenomWithDecimals(
              amount,
              decimals
            )

            const info: TokenCardInfo = {
              crown: isGovernanceToken,
              tokenSymbol: symbol,
              tokenDenom: denom,
              tokenDecimals: decimals,
              // TODO(v2): Choose subtitle.
              // subtitle: '',
              imageUrl: imageUrl || getFallbackImage(denom),
              unstakedBalance,
              cw20Address: denom,
              // No unstaking info for CW20.
              hasStakingInfo: false,

              lazyInfo: { loading: true },
            }

            return info
          }
        ),
      ]

      return infos
    },
})

export const tokenCardLazyInfoSelector = selectorFamily<
  TokenCardLazyInfo,
  WithChainId<{
    walletAddress: string
    denom: string
    tokenDecimals: number
    tokenSymbol: string
  }>
>({
  key: 'tokenCardLazyInfo',
  get:
    ({ walletAddress, denom, tokenDecimals, tokenSymbol, chainId }) =>
    ({ get }) => {
      let stakingInfo: TokenCardLazyInfo['stakingInfo'] = undefined

      const usdcUnitPrice = get(
        usdcPerMacroTokenSelector({ denom, decimals: tokenDecimals })
      )

      // For now, stakingInfo only exists for native token, until ICA.
      if (denom === NATIVE_DENOM) {
        const nativeStakingInfo = get(
          nativeStakingInfoSelector({ address: walletAddress, chainId })
        )

        if (nativeStakingInfo) {
          const unstakingDurationSeconds = get(
            nativeUnstakingDurationSecondsSelector({})
          )

          stakingInfo = {
            unstakingTasks: nativeStakingInfo.unbondingDelegations.map(
              ({ balance, finishesAt }) => ({
                status: UnstakingTaskStatus.Unstaking,
                amount: convertMicroDenomToDenomWithDecimals(
                  balance.amount,
                  tokenDecimals
                ),
                tokenSymbol,
                tokenDecimals: tokenDecimals,
                date: finishesAt,
              })
            ),
            unstakingDurationSeconds,
            stakes: nativeStakingInfo.delegations.map(
              ({ validator, delegated, pendingReward }) => ({
                validator,
                amount: convertMicroDenomToDenomWithDecimals(
                  delegated.amount,
                  tokenDecimals
                ),
                rewards: convertMicroDenomToDenomWithDecimals(
                  pendingReward.amount,
                  tokenDecimals
                ),
              })
            ),
          }
        }
      }

      return {
        usdcUnitPrice,
        stakingInfo,
      }
    },
})

type TreasuryTransactionsParams = WithChainId<{
  address: string
  minHeight?: number
  maxHeight?: number
}>

interface TreasuryTransaction {
  tx: IndexedTx
  timestamp: Date | undefined
  events: {
    type: string
    attributes: {
      key: string
      value: string
    }[]
  }[]
}

export const treasuryTransactionsSelector = selectorFamily<
  TreasuryTransaction[],
  TreasuryTransactionsParams
>({
  key: 'treasuryTransactions',
  get:
    ({ address, minHeight, maxHeight, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))

      const txs = await client.searchTx(
        {
          sentFromOrTo: address,
        },
        {
          minHeight,
          maxHeight,
        }
      )

      const txDates = get(
        waitForAll(
          txs.map(({ height }) =>
            blockHeightTimestampSafeSelector({
              blockHeight: height,
              chainId,
            })
          )
        )
      )

      return (
        txs
          .map((tx, index) => {
            let events
            try {
              events = JSON.parse(tx.rawLog)[0].events
            } catch {
              return
            }

            return {
              tx,
              timestamp: txDates[index],
              events,
            }
          })
          .filter(Boolean) as TreasuryTransaction[]
      ).sort((a, b) =>
        // Sort descending by timestamp, putting undefined timestamps last.
        b.timestamp && a.timestamp
          ? b.timestamp.getTime() - a.timestamp.getTime()
          : !a.timestamp
          ? 1
          : !b.timestamp
          ? -1
          : b.tx.height - a.tx.height
      )
    },
})

export interface TransformedTreasuryTransaction {
  hash: string
  height: number
  timestamp: Date | undefined
  sender: string
  recipient: string
  amount: number
  denomLabel: string
  outgoing: boolean
}

export const transformedTreasuryTransactionsSelector = selectorFamily<
  TransformedTreasuryTransaction[],
  TreasuryTransactionsParams
>({
  key: 'transformedTreasuryTransactions',
  get:
    (params) =>
    async ({ get }) => {
      const txs = get(treasuryTransactionsSelector(params))

      return txs
        .map(({ tx: { hash, height }, timestamp, events }) => {
          const transferEvent = events.find(({ type }) => type === 'transfer')
          if (!transferEvent) {
            return
          }

          let sender = transferEvent.attributes.find(
            ({ key }) => key === 'sender'
          )?.value
          let recipient = transferEvent.attributes.find(
            ({ key }) => key === 'recipient'
          )?.value
          const amount = transferEvent.attributes.find(
            ({ key }) => key === 'amount'
          )?.value

          if (!sender || !recipient || !amount) {
            return
          }

          const coin = parseCoins(amount)[0]
          if (!coin) {
            return
          }

          const tokenDecimals = nativeTokenDecimals(coin.denom)
          const tokenLabel = nativeTokenLabel(coin.denom)

          // Only convert value and denom at the same time. If decimals are
          // or vice versa, display value in non-converted decimals with
          // non-converted denom.
          const amountValue =
            tokenDecimals !== undefined && tokenLabel !== undefined
              ? convertMicroDenomToDenomWithDecimals(coin.amount, tokenDecimals)
              : Number(coin.amount)
          const denomLabel =
            tokenDecimals !== undefined && tokenLabel !== undefined
              ? tokenLabel
              : coin.denom

          return {
            hash,
            height,
            timestamp,
            sender,
            recipient,
            amount: amountValue,
            denomLabel,
            outgoing: sender === params.address,
          }
        })
        .filter(Boolean) as TransformedTreasuryTransaction[]
    },
})
