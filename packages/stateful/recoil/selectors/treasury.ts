import { parseCoins } from '@cosmjs/proto-signing'
import { IndexedTx } from '@cosmjs/stargate'
import { selectorFamily, waitForAll } from 'recoil'

import {
  DaoCoreV2Selectors,
  blockHeightTimestampSafeSelector,
  cosmWasmClientForChainSelector,
  nativeBalancesSelector,
  nativeDelegatedBalanceSelector,
  nativeDelegationInfoSelector,
  nativeUnstakingDurationSecondsSelector,
  usdcPerMacroTokenSelector,
} from '@dao-dao/state'
import {
  GenericToken,
  TokenCardInfo,
  TokenCardLazyInfo,
  UnstakingTaskStatus,
  WithChainId,
} from '@dao-dao/types'
import {
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
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
        DaoCoreV2Selectors.allCw20TokensWithBalancesSelector({
          contractAddress: coreAddress,
          chainId,
          governanceTokenAddress: cw20GovernanceTokenAddress,
        })
      )

      const infos: TokenCardInfo[] = [
        ...nativeBalances.map(({ token, balance }) => {
          const unstakedBalance = convertMicroDenomToDenomWithDecimals(
            balance,
            token.decimals
          )

          // For now, stakingInfo only exists for native token, until ICA.
          const hasStakingInfo =
            token.denomOrAddress === NATIVE_DENOM &&
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
            token,
            // True if native token DAO and using this denom.
            isGovernanceToken:
              nativeGovernanceTokenDenom === token.denomOrAddress,
            unstakedBalance,
            hasStakingInfo,

            lazyInfo: { loading: true },
          }

          return info
        }),
        ...cw20s.map(({ token, balance, isGovernanceToken }) => {
          const unstakedBalance = convertMicroDenomToDenomWithDecimals(
            balance,
            token.decimals
          )

          const info: TokenCardInfo = {
            token,
            isGovernanceToken: isGovernanceToken ?? false,
            unstakedBalance,
            // No unstaking info for CW20.
            hasStakingInfo: false,

            lazyInfo: { loading: true },
          }

          return info
        }),
      ]

      return infos
    },
})

export const tokenCardLazyInfoSelector = selectorFamily<
  TokenCardLazyInfo,
  WithChainId<{
    walletAddress: string
    token: GenericToken
  }>
>({
  key: 'tokenCardLazyInfo',
  get:
    ({ walletAddress, token, chainId }) =>
    ({ get }) => {
      let stakingInfo: TokenCardLazyInfo['stakingInfo'] = undefined

      const usdcUnitPrice = get(
        usdcPerMacroTokenSelector({
          denom: token.denomOrAddress,
          decimals: token.decimals,
        })
      )

      // For now, stakingInfo only exists for native token, until ICA.
      if (token.denomOrAddress === NATIVE_DENOM) {
        const nativeDelegationInfo = get(
          nativeDelegationInfoSelector({ address: walletAddress, chainId })
        )

        if (nativeDelegationInfo) {
          const unstakingDurationSeconds = get(
            nativeUnstakingDurationSecondsSelector({
              chainId,
            })
          )

          stakingInfo = {
            unstakingTasks: nativeDelegationInfo.unbondingDelegations.map(
              ({ balance, finishesAt }) => ({
                token,
                status: UnstakingTaskStatus.Unstaking,
                amount: convertMicroDenomToDenomWithDecimals(
                  balance.amount,
                  token.decimals
                ),
                date: finishesAt,
              })
            ),
            unstakingDurationSeconds,
            stakes: nativeDelegationInfo.delegations.map(
              ({ validator, delegated, pendingReward }) => ({
                token,
                validator,
                amount: convertMicroDenomToDenomWithDecimals(
                  delegated.amount,
                  token.decimals
                ),
                rewards: convertMicroDenomToDenomWithDecimals(
                  pendingReward.amount,
                  token.decimals
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
