import { parseCoins } from '@cosmjs/proto-signing'
import { IndexedTx } from '@cosmjs/stargate'
import { selectorFamily, waitForAll } from 'recoil'

import {
  TokenCardInfo,
  TokenCardLazyStakingInfo,
  WithChainId,
} from '@dao-dao/types'
import { UnstakingTaskStatus } from '@dao-dao/ui'
import {
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
  getFallbackImage,
  nativeTokenDecimals,
  nativeTokenLabel,
} from '@dao-dao/utils'
import {
  CwdVotingNativeStakedAdapter,
  matchAdapter,
} from '@dao-dao/voting-module-adapter'

import {
  blockHeightTimestampSafeSelector,
  cosmWasmClientForChainSelector,
  nativeBalancesSelector,
  nativeDelegatedBalanceSelector,
  nativeStakingInfoSelector,
  nativeUnstakingDurationSecondsSelector,
} from '../chain'
import { CwdCoreV2Selectors, CwdVotingNativeStakedSelectors } from '../clients'
import { usdcPerMacroTokenSelector } from '../price'

export const treasuryTokenCardInfosSelector = selectorFamily<
  TokenCardInfo[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'treasuryTokenCardInfos',
  get:
    ({ coreAddress, chainId }) =>
    ({ get }) => {
      const nativeBalances = get(
        nativeBalancesSelector({ address: coreAddress, chainId })
      )
      const cw20s = get(
        CwdCoreV2Selectors.cw20BalancesInfoSelector({
          contractAddress: coreAddress,
          chainId,
        })
      )

      //! Check if has native governance token, and set crown accordingly.
      const votingModuleAddress = get(
        CwdCoreV2Selectors.votingModuleSelector({
          contractAddress: coreAddress,
          chainId,
          params: [],
        })
      )
      // All `info` queries are the same, so just use core's info query.
      const votingModuleInfo = get(
        CwdCoreV2Selectors.infoSelector({
          contractAddress: votingModuleAddress,
          chainId,
          params: [],
        })
      )
      let nativeGovernanceTokenDenom: string | undefined
      try {
        if (
          matchAdapter(votingModuleInfo.info.contract)?.id ===
          CwdVotingNativeStakedAdapter.id
        ) {
          nativeGovernanceTokenDenom = get(
            CwdVotingNativeStakedSelectors.getConfigSelector({
              contractAddress: votingModuleAddress,
              chainId,
              params: [],
            })
          ).denom
        }
      } catch (err) {
        console.error(err)
      }

      const infos: TokenCardInfo[] = [
        ...nativeBalances.map(
          ({ denom, amount, decimals, label, imageUrl }) => {
            const unstakedBalance = convertMicroDenomToDenomWithDecimals(
              amount,
              decimals
            )
            const usdcUnitPrice =
              get(usdcPerMacroTokenSelector({ denom, decimals })) ?? 0

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
              usdcUnitPrice,

              hasStakingInfo,
              lazyStakingInfo: hasStakingInfo
                ? { loading: true }
                : { loading: false, data: undefined },
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
            const usdcUnitPrice =
              get(usdcPerMacroTokenSelector({ denom, decimals })) ?? 0

            const info: TokenCardInfo = {
              crown: isGovernanceToken,
              tokenSymbol: symbol,
              tokenDenom: denom,
              tokenDecimals: decimals,
              // TODO(v2): Choose subtitle.
              // subtitle: '',
              imageUrl: imageUrl || getFallbackImage(denom),
              unstakedBalance,
              usdcUnitPrice,
              cw20Address: denom,
              // No unstaking info for CW20.
              hasStakingInfo: false,
              lazyStakingInfo: { loading: false, data: undefined },
            }

            return info
          }
        ),
      ]

      return infos
    },
})

export const tokenCardLazyStakingInfoSelector = selectorFamily<
  TokenCardLazyStakingInfo | undefined,
  WithChainId<{
    walletAddress: string
    denom: string
    tokenDecimals: number
    tokenSymbol: string
  }>
>({
  key: 'tokenCardLazyStakingInfo',
  get:
    ({ walletAddress, denom, tokenDecimals, tokenSymbol, chainId }) =>
    ({ get }) => {
      // For now, stakingInfo only exists for native token, until ICA.
      if (denom !== NATIVE_DENOM) {
        return
      }

      const nativeStakingInfo = get(
        nativeStakingInfoSelector({ address: walletAddress, chainId })
      )
      if (!nativeStakingInfo) {
        return
      }

      const unstakingDurationSeconds = get(
        nativeUnstakingDurationSecondsSelector({})
      )

      return {
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
          // found but label is not for some reason (which should never happen)
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
