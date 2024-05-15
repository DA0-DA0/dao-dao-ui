import {
  selectorFamily,
  waitForAll,
  waitForAllSettled,
  waitForAny,
} from 'recoil'

import {
  Account,
  AmountWithTimestamp,
  GenericToken,
  GenericTokenBalance,
  GenericTokenSource,
  GenericTokenWithUsdPrice,
  TokenCardLazyInfo,
  TokenPriceHistoryRange,
  TokenType,
  UnstakingTaskStatus,
  WithChainId,
} from '@dao-dao/types'
import {
  MAINNET,
  convertMicroDenomToDenomWithDecimals,
  getChainForChainId,
  getChainForChainName,
  getFallbackImage,
  getIbcTransferInfoFromChannel,
  getNativeTokenForChainId,
  getTokenForChainIdAndDenom,
  isSecretNetwork,
  isValidTokenFactoryDenom,
  isValidWalletAddress,
} from '@dao-dao/utils'

import { astroportUsdPriceSelector } from './astroport'
import {
  denomMetadataSelector,
  ibcRpcClientForChainSelector,
  nativeBalancesSelector,
  nativeDelegatedBalanceSelector,
  nativeDelegationInfoSelector,
  nativeDenomBalanceSelector,
  nativeUnstakingDurationSecondsSelector,
} from './chain'
import { isDaoSelector, secretContractCodeHashSelector } from './contract'
import {
  Cw20BaseSelectors,
  Cw20StakeSelectors,
  DaoCoreV2Selectors,
  DaoVotingNativeStakedSelectors,
} from './contracts'
import { queryGenericIndexerSelector, querySnapperSelector } from './indexer'
import { osmosisUsdPriceSelector } from './osmosis'
import { skipAssetSelector } from './skip'
import { walletCw20BalancesSelector } from './wallet'
import { whiteWhaleUsdPriceSelector } from './whale'

export const genericTokenSelector = selectorFamily<
  GenericToken,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'genericToken',
  get:
    ({ type, denomOrAddress, chainId }) =>
    ({ get }) => {
      const source = get(
        genericTokenSourceSelector({
          type,
          chainId,
          denomOrAddress,
        })
      )

      // Check if Skip API has the info.
      const skipAsset = get(
        skipAssetSelector({
          chainId,
          type,
          denomOrAddress,
        })
      )

      if (skipAsset) {
        return {
          chainId: skipAsset.chain_id,
          type: skipAsset.is_cw20 ? TokenType.Cw20 : TokenType.Native,
          denomOrAddress:
            (skipAsset.is_cw20 && skipAsset.token_contract) || skipAsset.denom,
          symbol:
            skipAsset.recommended_symbol || skipAsset.symbol || skipAsset.denom,
          decimals: skipAsset.decimals || 0,
          imageUrl: skipAsset.logo_uri || getFallbackImage(denomOrAddress),
          source,
          snip20CodeHash:
            isSecretNetwork(skipAsset.chain_id) &&
            skipAsset.is_cw20 &&
            skipAsset.token_contract
              ? get(
                  secretContractCodeHashSelector({
                    chainId: skipAsset.chain_id,
                    contractAddress: skipAsset.token_contract,
                  })
                )
              : null,
        }
      } else if (source.chainId !== chainId) {
        // If Skip API does not have the info, check if Skip API has the source
        // if it's different. This has happened before when Skip does not have
        // an IBC asset that we were able to reverse engineer the source for.
        const skipSourceAsset = get(skipAssetSelector(source))

        if (skipSourceAsset) {
          return {
            chainId,
            type,
            denomOrAddress,
            symbol:
              skipSourceAsset.recommended_symbol ||
              skipSourceAsset.symbol ||
              skipSourceAsset.denom,
            decimals: skipSourceAsset.decimals || 0,
            imageUrl:
              skipSourceAsset.logo_uri || getFallbackImage(denomOrAddress),
            source,
            snip20CodeHash:
              isSecretNetwork(skipSourceAsset.chain_id) &&
              skipSourceAsset.is_cw20 &&
              skipSourceAsset.token_contract
                ? get(
                    secretContractCodeHashSelector({
                      chainId: skipSourceAsset.chain_id,
                      contractAddress: skipSourceAsset.token_contract,
                    })
                  )
                : null,
          }
        }
      }

      let tokenInfo =
        type === TokenType.Cw20
          ? get(
              Cw20BaseSelectors.tokenInfoSelector({
                contractAddress: denomOrAddress,
                chainId,
                params: [],
              })
            )
          : // Native factory tokens.
          type === TokenType.Native &&
            isValidTokenFactoryDenom(
              denomOrAddress,
              getChainForChainId(chainId).bech32_prefix
            )
          ? get(
              nativeDenomMetadataInfoSelector({
                denom: denomOrAddress,
                chainId,
              })
            )
          : // Native token or invalid type.
            undefined

      // If native non-factory token, try to get the token from the asset list.
      if (!tokenInfo) {
        try {
          return {
            ...getTokenForChainIdAndDenom(chainId, denomOrAddress, false),
            source,
          }
        } catch {
          // If that fails, try to fetch from chain if not IBC asset.
          try {
            tokenInfo = denomOrAddress.startsWith('ibc/')
              ? undefined
              : get(
                  nativeDenomMetadataInfoSelector({
                    denom: denomOrAddress,
                    chainId,
                  })
                )
          } catch (err) {
            // If not an error, rethrow. This may be a promise, which is how
            // recoil waits for the `get` to resolve.
            if (!(err instanceof Error)) {
              throw err
            }
          }

          // If that fails, return placeholder token.
          if (!tokenInfo) {
            return {
              ...getTokenForChainIdAndDenom(chainId, denomOrAddress),
              source,
            }
          }
        }
      }

      const imageUrl =
        type === TokenType.Cw20
          ? get(
              Cw20BaseSelectors.logoUrlSelector({
                contractAddress: denomOrAddress,
                chainId,
              })
            )
          : getFallbackImage(denomOrAddress)

      return {
        chainId,
        type,
        denomOrAddress,
        symbol: tokenInfo.symbol,
        decimals: tokenInfo.decimals,
        imageUrl,
        source,
        snip20CodeHash:
          isSecretNetwork(chainId) && type === TokenType.Cw20
            ? get(
                secretContractCodeHashSelector({
                  chainId,
                  contractAddress: denomOrAddress,
                })
              )
            : null,
      }
    },
})

export const coinGeckoUsdPriceSelector = selectorFamily<
  GenericTokenWithUsdPrice | undefined,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'coinGeckoUsdPrice',
  get:
    (params) =>
    async ({ get }) => {
      if (!MAINNET) {
        return undefined
      }

      const token = get(genericTokenSelector(params))

      // Resolve Skip asset to retrieve coingecko ID.
      const asset = get(skipAssetSelector(params))
      if (!asset?.coingecko_id) {
        return
      }
      const usdPrice: number | undefined = get(
        querySnapperSelector({
          query: 'coingecko-price',
          parameters: {
            id: asset.coingecko_id,
          },
        })
      )

      return usdPrice !== undefined
        ? {
            token,
            usdPrice,
            timestamp: new Date(),
          }
        : undefined
    },
})

const priceSelectors = [
  coinGeckoUsdPriceSelector,
  osmosisUsdPriceSelector,
  astroportUsdPriceSelector,
  whiteWhaleUsdPriceSelector,
]

export const usdPriceSelector = selectorFamily<
  GenericTokenWithUsdPrice | undefined,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'usdPrice',
  get:
    (params) =>
    ({ get }) => {
      if (!MAINNET) {
        return
      }

      const selectors = priceSelectors.map((selector) => selector(params))

      // Load in parallel.
      const priceLoadables = get(waitForAny(selectors))
      // Get first loaded price.
      const anyPrice = priceLoadables
        .find((loadable) => loadable.valueMaybe())
        ?.valueMaybe()

      // If any price is loaded right away, use it.
      if (anyPrice) {
        return anyPrice
      }

      // If no price is loaded yet, wait for all to finish before returning
      // undefined from this selector. This forces the above to load which will
      // return the first one that is available.
      get(waitForAllSettled(selectors))
    },
})

export const genericTokenWithUsdPriceSelector = selectorFamily<
  GenericTokenWithUsdPrice,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'genericTokenWithUsdPrice',
  get:
    (params) =>
    async ({ get }) => {
      const token = get(genericTokenSelector(params))

      // Don't calculate price if could not load token decimals correctly.
      const { usdPrice, timestamp } =
        (token.decimals > 0 && get(usdPriceSelector(params))) || {}

      return {
        token,
        usdPrice,
        timestamp,
      }
    },
})

// Return all native and cw20 tokens for a given address. If this is a DAO, pass
// the core address and native chain ID and use the `account` filter to ensure
// cw20s are loaded.
export const genericTokenBalancesSelector = selectorFamily<
  GenericTokenBalance[],
  WithChainId<{
    address: string
    nativeGovernanceTokenDenom?: string
    cw20GovernanceTokenAddress?: string
    filter?: {
      // Only get balances for this token type.
      tokenType?: TokenType
      // Choose which account to get balances for.
      account?: Pick<Account, 'chainId' | 'address'>
    }
  }>
>({
  key: 'genericTokenBalances',
  get:
    ({
      chainId: mainChainId,
      address: mainAddress,
      nativeGovernanceTokenDenom,
      cw20GovernanceTokenAddress,
      filter,
    }) =>
    async ({ get }) => {
      const chainId = filter?.account?.chainId || mainChainId
      const address = filter?.account?.address || mainAddress

      const nativeTokenBalances =
        !filter?.tokenType || filter.tokenType === TokenType.Native
          ? get(
              nativeBalancesSelector({
                address,
                chainId,
              })
            )
          : []

      const cw20TokenBalances = (
        !filter?.tokenType || filter.tokenType === TokenType.Cw20
          ? get(
              // Neutron's modified DAOs do not support cw20s, so this may
              // error. Ignore if so.
              waitForAllSettled(
                // If is a DAO contract.
                get(
                  isDaoSelector({
                    address: mainAddress,
                    chainId: mainChainId,
                  })
                )
                  ? // Get native cw20s.
                    chainId === mainChainId && address === mainAddress
                    ? [
                        DaoCoreV2Selectors.nativeCw20TokensWithBalancesSelector(
                          {
                            chainId: mainChainId,
                            contractAddress: mainAddress,
                            governanceTokenAddress: cw20GovernanceTokenAddress,
                          }
                        ),
                      ]
                    : // Get polytone cw20s if they exist.
                    chainId !== mainChainId
                    ? [
                        DaoCoreV2Selectors.polytoneCw20TokensWithBalancesSelector(
                          {
                            chainId: mainChainId,
                            contractAddress: mainAddress,
                            polytoneChainId: chainId,
                          }
                        ),
                      ]
                    : []
                  : isValidWalletAddress(
                      address,
                      getChainForChainId(chainId).bech32_prefix
                    )
                  ? [
                      walletCw20BalancesSelector({
                        walletAddress: address,
                        chainId,
                      }),
                    ]
                  : []
              )
            )
          : []
      )[0]

      return [
        ...nativeTokenBalances.map((native) => ({
          ...native,
          isGovernanceToken:
            nativeGovernanceTokenDenom === native.token.denomOrAddress,
        })),
        ...(cw20TokenBalances?.state === 'hasValue'
          ? cw20TokenBalances.contents
          : []),
      ]
    },
})

export const genericTokenBalanceSelector = selectorFamily<
  GenericTokenBalance,
  Parameters<typeof genericTokenSelector>[0] & {
    address: string
  }
>({
  key: 'genericTokenBalance',
  get:
    ({ address, ...params }) =>
    async ({ get }) => {
      const token = get(genericTokenSelector(params))

      let balance = '0'
      if (token.type === TokenType.Native) {
        balance = get(
          nativeDenomBalanceSelector({
            chainId: params.chainId,
            walletAddress: address,
            denom: params.denomOrAddress,
          })
        ).amount
      } else if (token.type === TokenType.Cw20) {
        balance = get(
          Cw20BaseSelectors.balanceSelector({
            contractAddress: params.denomOrAddress,
            chainId: params.chainId,
            params: [
              {
                address,
              },
            ],
          })
        ).balance
      }

      return {
        token,
        balance,
      }
    },
})

export const genericTokenDelegatedBalanceSelector = selectorFamily<
  GenericTokenBalance,
  WithChainId<{
    address: string
  }>
>({
  key: 'genericTokenDelegatedBalance',
  get:
    ({ address, chainId }) =>
    async ({ get }) => {
      const { denom, amount: balance } = get(
        nativeDelegatedBalanceSelector({
          chainId,
          address,
        })
      )
      const token = get(
        genericTokenSelector({
          type: TokenType.Native,
          denomOrAddress: denom,
          chainId,
        })
      )

      return {
        token,
        balance,
        staked: true,
      }
    },
})

export const genericTokenUndelegatingBalancesSelector = selectorFamily<
  GenericTokenBalance[],
  WithChainId<{
    address: string
  }>
>({
  key: 'genericTokenUndelegatingBalances',
  get:
    (params) =>
    async ({ get }) => {
      const { unbondingDelegations } = get(nativeDelegationInfoSelector(params))

      const tokens = get(
        waitForAll(
          unbondingDelegations.map(({ balance }) =>
            genericTokenSelector({
              type: TokenType.Native,
              denomOrAddress: balance.denom,
              chainId: params.chainId,
            })
          )
        )
      )

      const tokenBalances = tokens.map(
        (token, index): GenericTokenBalance => ({
          token,
          balance: unbondingDelegations[index].balance.amount,
        })
      )

      const uniqueTokens = tokenBalances.reduce((acc, { token, balance }) => {
        let existing = acc.find(
          (t) => t.token.denomOrAddress === token.denomOrAddress
        )
        if (!existing) {
          existing = {
            token,
            balance,
            unstaking: true,
          }
          acc.push(existing)
        }
        existing.balance = (
          BigInt(existing.balance) + BigInt(balance)
        ).toString()

        return acc
      }, [] as GenericTokenBalance[])

      return uniqueTokens
    },
})

export const nativeDenomMetadataInfoSelector = selectorFamily<
  | {
      symbol: string
      decimals: number
    }
  | undefined,
  WithChainId<{ denom: string }>
>({
  key: 'nativeDenomMetadataInfo',
  get:
    (params) =>
    async ({ get }) => {
      const metadata = get(denomMetadataSelector(params))
      if (!metadata) {
        return
      }

      const { base, denomUnits, symbol, display } = metadata

      // If display is equal to the base, use the symbol denom unit if
      // available. This fixes the case where display was not updated even
      // though a nonzero exponent was created.
      const searchDenom = display === base ? symbol : display

      const displayDenom =
        denomUnits.find(({ denom }) => denom === searchDenom) ??
        denomUnits.find(({ denom }) => denom === display) ??
        denomUnits.find(({ exponent }) => exponent > 0) ??
        denomUnits[0]

      if (!displayDenom) {
        throw new Error('No denom unit found for token factory denom')
      }

      return {
        // If factory denom, extract symbol at the end.
        symbol: displayDenom.denom.startsWith('factory/')
          ? displayDenom.denom.split('/').pop()!
          : displayDenom.denom,
        decimals: displayDenom.exponent,
      }
    },
})

// Resolve a denom on a chain to its source chain and base denom. If an IBC
// asset, tries to reverse engineer IBC denom. Otherwise returns the arguments.
export const genericTokenSourceSelector = selectorFamily<
  GenericTokenSource,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'genericTokenSource',
  get:
    ({ chainId, type, denomOrAddress }) =>
    async ({ get }) => {
      // Check if Skip API has the info.
      const skipAsset = get(
        skipAssetSelector({
          chainId,
          type,
          denomOrAddress,
        })
      )

      if (skipAsset) {
        const sourceType = skipAsset.origin_denom.startsWith('cw20:')
          ? TokenType.Cw20
          : TokenType.Native
        return {
          chainId: skipAsset.origin_chain_id,
          type: sourceType,
          denomOrAddress:
            sourceType === TokenType.Cw20
              ? skipAsset.origin_denom.replace(/^cw20:/, '')
              : skipAsset.origin_denom,
        }
      }

      let sourceChainId = chainId
      let sourceDenom =
        (type === TokenType.Cw20 ? 'cw20:' : '') + denomOrAddress

      // Try to reverse engineer IBC denom.
      if (denomOrAddress.startsWith('ibc/')) {
        const ibc = get(ibcRpcClientForChainSelector(chainId))

        try {
          const { denomTrace } = await ibc.applications.transfer.v1.denomTrace({
            hash: denomOrAddress,
          })

          // If trace exists, resolve IBC denom.
          if (denomTrace) {
            let channels = denomTrace.path.split('transfer/').slice(1)
            // Trim trailing slash from all but last channel.
            channels = channels.map((channel, index) =>
              index === channels.length - 1 ? channel : channel.slice(0, -1)
            )
            if (channels.length) {
              // Retrace channel paths to find source chain of denom.
              sourceChainId = channels.reduce(
                (currentChainId, channel) =>
                  getChainForChainName(
                    getIbcTransferInfoFromChannel(currentChainId, channel)
                      .destinationChain.chain_name
                  ).chain_id,
                chainId
              )

              sourceDenom = denomTrace.baseDenom
            }
          }
        } catch (err) {
          console.error(err)
          // Ignore resolution error.
        }
      }

      const sourceType = sourceDenom.startsWith('cw20:')
        ? TokenType.Cw20
        : TokenType.Native

      return {
        chainId: sourceChainId,
        type: sourceType,
        denomOrAddress:
          sourceType === TokenType.Cw20
            ? sourceDenom.replace(/^cw20:/, '')
            : sourceDenom,
      }
    },
})

export const historicalUsdPriceSelector = selectorFamily<
  AmountWithTimestamp[] | undefined,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'> & {
    range: TokenPriceHistoryRange
  }
>({
  key: 'historicalUsdPrice',
  get:
    ({ chainId, type, denomOrAddress, range }) =>
    async ({ get }) => {
      if (!MAINNET) {
        return undefined
      }

      // Resolve Skip asset to retrieve coingecko ID.
      const asset = get(
        skipAssetSelector({
          type,
          chainId,
          denomOrAddress,
        })
      )

      if (!asset?.coingecko_id) {
        return
      }

      try {
        const prices: [number, number][] = get(
          querySnapperSelector({
            query: 'coingecko-price-history',
            parameters: {
              id: asset.coingecko_id,
              range,
            },
          })
        )

        return prices.map(([timestamp, amount]) => ({
          timestamp: new Date(timestamp),
          amount,
        }))
      } catch (err) {
        // recoil's `get` throws a promise while loading
        if (err instanceof Promise) {
          throw err
        }

        return undefined
      }
    },
})

export const tokenCardLazyInfoSelector = selectorFamily<
  TokenCardLazyInfo,
  {
    owner: string
    token: GenericToken
    // For calculating totalBalance.
    unstakedBalance: number
  }
>({
  key: 'tokenCardLazyInfo',
  get:
    ({ owner, token, unstakedBalance }) =>
    ({ get }) => {
      const { chainId, type } = token

      let stakingInfo: TokenCardLazyInfo['stakingInfo'] = undefined
      let daosGoverned: TokenCardLazyInfo['daosGoverned'] = undefined

      const usdUnitPrice = get(
        usdPriceSelector({
          type,
          chainId,
          denomOrAddress: token.denomOrAddress,
        })
      )

      // Staking info only exists for native token.
      if (
        token.denomOrAddress ===
        getNativeTokenForChainId(chainId).denomOrAddress
      ) {
        // Neutron does not have staking so this may error. Ignore if so.
        const nativeDelegationInfoLoadable = get(
          waitForAllSettled([
            nativeDelegationInfoSelector({
              address: owner,
              chainId,
            }),
          ])
        )[0]
        const nativeDelegationInfo =
          nativeDelegationInfoLoadable.state === 'hasValue'
            ? nativeDelegationInfoLoadable.contents
            : undefined

        if (nativeDelegationInfo) {
          const unstakingDurationSeconds = get(
            nativeUnstakingDurationSecondsSelector({
              chainId,
            })
          )

          const unstakingTasks = nativeDelegationInfo.unbondingDelegations.map(
            ({ balance, finishesAt }) => ({
              token,
              status: UnstakingTaskStatus.Unstaking,
              amount: convertMicroDenomToDenomWithDecimals(
                balance.amount,
                token.decimals
              ),
              date: finishesAt,
            })
          )

          const stakes = nativeDelegationInfo.delegations.map(
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
          )

          const totalStaked =
            stakes.reduce((acc, stake) => acc + stake.amount, 0) ?? 0
          const totalPendingRewards =
            stakes?.reduce((acc, stake) => acc + stake.rewards, 0) ?? 0
          const totalUnstaking =
            unstakingTasks.reduce(
              (acc, task) =>
                acc +
                // Only include balance of unstaking tasks.
                (task.status === UnstakingTaskStatus.Unstaking
                  ? task.amount
                  : 0),
              0
            ) ?? 0

          stakingInfo = {
            unstakingTasks,
            unstakingDurationSeconds,
            stakes,
            totalStaked,
            totalPendingRewards,
            totalUnstaking,
          }
        }
      }

      if (owner) {
        daosGoverned = get(
          tokenDaosWithStakedBalanceSelector({
            chainId,
            type: token.type,
            denomOrAddress: token.denomOrAddress,
            walletAddress: owner,
          })
        )
          // Only include DAOs this owner has staked with.
          .filter(({ stakedBalance }) => stakedBalance > 0)
          .map(({ stakedBalance, ...rest }) => ({
            ...rest,
            // Convert to expected denom.
            stakedBalance: convertMicroDenomToDenomWithDecimals(
              stakedBalance,
              token.decimals
            ),
          }))
      }

      const totalBalance =
        unstakedBalance +
        // Add staked and unstaking balances.
        (stakingInfo
          ? stakingInfo.totalStaked + stakingInfo.totalUnstaking
          : 0) +
        // Add balances staked in DAOs, grouped by their
        // `stakingContractAddress` so we don't double-count tokens staked with
        // the same staking contract if that staking contract is used in
        // different DAOs in the list.
        Object.values(
          daosGoverned?.reduce(
            (acc, { stakingContractAddress, stakedBalance = 0 }) => ({
              ...acc,
              // If the staking contract address is already in the accumulator,
              // overwrite so we don't double-count. All staked balances for the
              // same staking contract should be the same, so overwriting should
              // do nothing.
              [stakingContractAddress]: stakedBalance,
            }),
            {} as Record<string, number>
          ) || {}
        ).reduce((acc, stakedBalance) => acc + stakedBalance, 0)

      return {
        usdUnitPrice,
        stakingInfo,
        totalBalance,
        daosGoverned,
      }
    },
})

// Get DAOs that use this native token as their governance token from the
// indexer, and load their dao-voting-native-staked contracts.
export const daosWithNativeVotingContractSelector = selectorFamily<
  {
    coreAddress: string
    votingModuleAddress: string
  }[],
  WithChainId<{
    denom: string
  }>
>({
  key: 'daosWithNativeVotingContract',
  get:
    ({ denom, chainId }) =>
    ({ get }) => {
      const daos: string[] =
        get(
          queryGenericIndexerSelector({
            chainId,
            formula: 'token/daos',
            args: {
              denom,
            },
            noFallback: true,
          })
        ) ?? []
      const votingModuleAddresses = get(
        waitForAll(
          daos.map((contractAddress) =>
            DaoCoreV2Selectors.votingModuleSelector({
              contractAddress,
              chainId,
              params: [],
            })
          )
        )
      )

      return daos.map((coreAddress, index) => ({
        coreAddress,
        votingModuleAddress: votingModuleAddresses[index],
      }))
    },
})

// Returns a list of DAOs that use the given cw20 token as their governance
// token with the staked balance of the given wallet address for each.
export const tokenDaosWithStakedBalanceSelector = selectorFamily<
  {
    coreAddress: string
    stakingContractAddress: string
    stakedBalance: number
  }[],
  WithChainId<{
    type: TokenType
    denomOrAddress: string
    walletAddress: string
  }>
>({
  key: 'tokenDaosWithStakedBalance',
  get:
    ({ type, denomOrAddress, walletAddress, chainId }) =>
    ({ get }) => {
      const daos =
        type === TokenType.Cw20
          ? get(
              Cw20BaseSelectors.daosWithVotingAndStakingContractSelector({
                contractAddress: denomOrAddress,
                chainId,
              })
            )
          : get(
              daosWithNativeVotingContractSelector({
                denom: denomOrAddress,
                chainId,
              })
            ).map((daoWithContracts) => ({
              ...daoWithContracts,
              stakingContractAddress: daoWithContracts.votingModuleAddress,
            }))

      const daosWalletStakedTokens = get(
        waitForAll(
          daos.map(({ stakingContractAddress }) =>
            type === TokenType.Cw20
              ? Cw20StakeSelectors.stakedValueSelector({
                  contractAddress: stakingContractAddress,
                  chainId,
                  params: [
                    {
                      address: walletAddress,
                    },
                  ],
                })
              : DaoVotingNativeStakedSelectors.votingPowerAtHeightSelector({
                  contractAddress: stakingContractAddress,
                  chainId,
                  params: [
                    {
                      address: walletAddress,
                    },
                  ],
                })
          )
        )
      ).map((staked) => ('value' in staked ? staked.value : staked.power))

      const daosWithBalances = daos
        .map(({ coreAddress, stakingContractAddress }, index) => ({
          coreAddress,
          stakingContractAddress,
          stakedBalance: Number(daosWalletStakedTokens[index]),
        }))
        // Sort descending by staked tokens.
        .sort((a, b) => b.stakedBalance - a.stakedBalance)

      return daosWithBalances
    },
})
