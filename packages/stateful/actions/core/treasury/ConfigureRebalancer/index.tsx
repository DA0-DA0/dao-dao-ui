import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValueLoadable, waitForAll } from 'recoil'

import { historicalUsdPriceSelector } from '@dao-dao/state/recoil/selectors/osmosis'
import { BalanceEmoji, ChainProvider } from '@dao-dao/stateless'
import { ChainId, TokenType, UseDecodedCosmosMsg } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  decodePolytoneExecuteMsg,
  getNativeIbcUsdc,
  getNativeTokenForChainId,
  loadableToLoadingData,
} from '@dao-dao/utils'

import { useTokenBalances } from '../../../hooks/useTokenBalances'
import { useActionOptions } from '../../../react'
import {
  ConfigureRebalancerData,
  REBALANCER_BASE_TOKEN_ALLOWLIST,
  ConfigureRebalancerComponent as StatelessConfigureRebalancerComponent,
} from './Component'

const useDefaults: UseDefaults<ConfigureRebalancerData> = () => {
  const {
    chain: { chain_id: chainId },
  } = useActionOptions()

  const nativeDenom = getNativeTokenForChainId(chainId).denomOrAddress
  const usdcDenom = getNativeIbcUsdc(chainId)?.denomOrAddress

  return {
    chainId,
    baseDenom:
      REBALANCER_BASE_TOKEN_ALLOWLIST[chainId as ChainId]?.[0] ?? nativeDenom,
    tokens: [
      {
        denom: nativeDenom,
        percent: 50,
      },
      ...(usdcDenom
        ? [
            {
              denom: usdcDenom,
              percent: 50,
            },
          ]
        : []),
    ],
    pid: {
      kp: 0.1,
      ki: 0.1,
      kd: 0.1,
    },
  }
}

const Component: ActionComponent<undefined, ConfigureRebalancerData> = (
  props
) => {
  const { watch } = useFormContext<ConfigureRebalancerData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const selectedTokens = watch((props.fieldNamePrefix + 'tokens') as 'tokens')

  const loadingTokens = useTokenBalances({
    allChains: true,
    filter: TokenType.Native,
  })

  const nativeBalances = loadingTokens.loading
    ? loadingTokens
    : {
        loading: false,
        updating: loadingTokens.updating,
        data: loadingTokens.data.filter(
          ({ token }) => token.chainId === chainId
        ),
      }

  const historicalPricesLoading = loadableToLoadingData(
    useRecoilValueLoadable(
      waitForAll(
        selectedTokens.map(({ denom }) =>
          historicalUsdPriceSelector({
            chainId,
            denom,
          })
        )
      )
    ),
    undefined
  )

  // Get overlapping timestamps across all tokens.
  const overlappingTimestamps =
    historicalPricesLoading.loading || !historicalPricesLoading.data
      ? []
      : Object.entries(
          // Map timestamp to number of tokens for which it appears in its
          // historical price list.
          historicalPricesLoading.data.reduce((acc, prices) => {
            if (!prices) {
              return acc
            }

            // Increment timestamp counter for each price.
            prices.forEach(({ timestamp }) => {
              const time = timestamp.getTime().toString()
              acc[time] = (acc[time] ?? 0) + 1
            })

            return acc
          }, {} as Record<string, number>)
        )
          // Keep only timestamp keys that exist in each token's historical
          // price list.
          .filter(([, value]) => value === historicalPricesLoading.data?.length)
          .map(([timestamp]) => Number(timestamp))

  const historicalPrices = historicalPricesLoading.loading
    ? historicalPricesLoading
    : {
        loading: false,
        data: selectedTokens.flatMap(({ denom }, index) =>
          historicalPricesLoading.data?.[index]
            ? {
                denom,
                // Keep only prices that overlap with all tokens.
                prices: historicalPricesLoading
                  .data![index]!.filter(({ timestamp }) =>
                    overlappingTimestamps.includes(timestamp.getTime())
                  )
                  .sort(
                    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
                  ),
              }
            : []
        ),
      }

  return (
    <>
      {/* TODO(rebalancer-cross-chain) */}
      {/* {context.type === ActionContextType.Dao && (
        <ChainPickerInput
          className="mb-4"
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
          includeChainIds={
            // Only include chains that have at least one allowed token.
            Object.entries(REBALANCER_TOKEN_ALLOWLIST)
              .filter(([, tokens]) => tokens.length > 0)
              .map(([chainId]) => chainId)
          }
        />
      )} */}

      <ChainProvider chainId={chainId}>
        <StatelessConfigureRebalancerComponent
          {...props}
          options={{
            nativeBalances,
            historicalPrices,
          }}
        />
      </ChainProvider>
    </>
  )
}

const useTransformToCosmos: UseTransformToCosmos<
  ConfigureRebalancerData
> = () => {
  const {
    address,
    context,
    chain: { chain_id: currentChainId },
  } = useActionOptions()

  const loadingTokenBalances = useTokenBalances({
    allChains: true,
    filter: TokenType.Native,
  })

  return useCallback(
    ({ chainId, tokens, pid }: ConfigureRebalancerData) => {
      return undefined
      // if (loadingTokenBalances.loading) {
      //   return
      // }

      // const token = loadingTokenBalances.data.find(
      //   ({ token }) =>
      //     token.chainId === fromChainId && token.denomOrAddress === denom
      // )?.token
      // if (!token) {
      //   throw new Error(`Unknown token: ${denom}`)
      // }

      // const amount = BigInt(
      //   convertDenomToMicroDenomWithDecimals(_amount, token.decimals)
      // ).toString()

      // let msg: CosmosMsgForEmpty | undefined
      // if (toChainId !== fromChainId) {
      //   const { sourceChannel } = getIbcTransferInfoBetweenChains(
      //     fromChainId,
      //     toChainId
      //   )
      //   const sender =
      //     fromChainId === currentChainId
      //       ? address
      //       : context.type === ActionContextType.Dao
      //       ? context.info.polytoneProxies[fromChainId]
      //       : transformBech32Address(address, fromChainId)
      //   msg = makeStargateMessage({
      //     stargate: {
      //       typeUrl: MsgTransfer.typeUrl,
      //       value: {
      //         sourcePort: 'transfer',
      //         sourceChannel,
      //         token: coin(amount, denom),
      //         sender,
      //         receiver: to,
      //         // Timeout after 1 year. Needs to survive voting period and
      //         // execution delay.
      //         timeoutTimestamp: BigInt(
      //           // Nanoseconds.
      //           (Date.now() + 1000 * 60 * 60 * 24 * 365) * 1e6
      //         ),
      //         memo: '',
      //       } as MsgTransfer,
      //     },
      //   })
      // } else if (token.type === TokenType.Native) {
      //   msg = {
      //     bank: makeBankMessage(amount, to, denom),
      //   }
      // } else if (token.type === TokenType.Cw20) {
      //   msg = makeWasmMessage({
      //     wasm: {
      //       execute: {
      //         contract_addr: denom,
      //         funds: [],
      //         msg: {
      //           transfer: {
      //             recipient: to,
      //             amount,
      //           },
      //         },
      //       },
      //     },
      //   })
      // }

      // if (!msg) {
      //   throw new Error(`Unknown token type: ${token.type}`)
      // }

      // if (chainId === currentChainId) {
      //   return msg
      // } else {
      //   return makePolytoneExecuteMessage(currentChainId, chainId, msg)
      // }
    },
    [address, context, currentChainId, loadingTokenBalances]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<ConfigureRebalancerData> = (
  msg: Record<string, any>
) => {
  let chainId = useActionOptions().chain.chain_id
  const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
  if (decodedPolytone.match) {
    chainId = decodedPolytone.chainId
    msg = decodedPolytone.msg
  }

  return {
    match: false,
  }

  // const isNative =
  //   objectMatchesStructure(msg, {
  //     bank: {
  //       send: {
  //         amount: {},
  //         to_address: {},
  //       },
  //     },
  //   }) &&
  //   msg.bank.send.amount.length === 1 &&
  //   objectMatchesStructure(msg.bank.send.amount[0], {
  //     amount: {},
  //     denom: {},
  //   })

  // const token = useRecoilValue(
  //   isNative
  //     ? genericTokenSelector({
  //         chainId,
  //         type: TokenType.Native,
  //         denomOrAddress: msg.bank.send.amount[0].denom,
  //       })
  //     : constSelector(undefined)
  // )

  // if (!token) {
  //   return {
  //     match: false,
  //   }
  // }

  // return {
  //   match: true,
  //   data: {
  //     fromChainId: chainId,
  //     toChainId: chainId,
  //     to: msg.bank.send.to_address,
  //     amount: convertMicroDenomToDenomWithDecimals(
  //       msg.bank.send.amount[0].amount,
  //       token.decimals
  //     ),
  //     denom: token.denomOrAddress,
  //   },
  // }
}

export const makeConfigureRebalancerAction: ActionMaker<
  ConfigureRebalancerData
> = ({ t, context, chain: { chain_id: chainId } }) =>
  chainId === ChainId.NeutronMainnet ||
  // If not on Neutron mainnet but has a polytone account, can use rebalancer.
  (context.type === ActionContextType.Dao &&
    ChainId.NeutronMainnet in context.info.polytoneProxies)
    ? {
        key: ActionKey.ConfigureRebalancer,
        Icon: BalanceEmoji,
        label: t('title.configureRebalancer'),
        description: t('info.configureRebalancerDescription', {
          context: context.type,
        }),
        notReusable: true,
        Component,
        useDefaults,
        useTransformToCosmos,
        useDecodedCosmosMsg,
      }
    : null
