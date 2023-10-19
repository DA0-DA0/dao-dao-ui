import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValueLoadable, waitForAll } from 'recoil'

import { MsgSendTx } from '@dao-dao/protobuf/codegen/ibc/applications/interchain_accounts/controller/v1/tx'
import {
  CosmosTx,
  InterchainAccountPacketData,
  Type,
} from '@dao-dao/protobuf/codegen/ibc/applications/interchain_accounts/v1/packet'
import { icaRemoteAddressSelector } from '@dao-dao/state/recoil'
import { historicalUsdPriceSelector } from '@dao-dao/state/recoil/selectors/osmosis'
import {
  BalanceEmoji,
  ChainProvider,
  Loader,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  ChainId,
  CosmosMsgFor_Empty,
  TokenType,
  UseDecodedCosmosMsg,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  IBC_TIMEOUT_SECONDS,
  cwMsgToProtobuf,
  decodePolytoneExecuteMsg,
  getIbcTransferInfoBetweenChains,
  getNativeIbcUsdc,
  getNativeTokenForChainId,
  loadableToLoadingData,
  makeStargateMessage,
  makeWasmMessage,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
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
  const {
    address,
    chain: { chain_id: srcChainId },
    context,
  } = useActionOptions()
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
            precision: 'day',
          })
        )
      )
    ),
    undefined
  )

  // Load remote address for x/gov.
  const icaRemoteAddressLoading = useCachedLoadingWithError(
    context.type === ActionContextType.Gov
      ? icaRemoteAddressSelector({
          address,
          srcChainId,
          destChainId: chainId,
        })
      : undefined
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
        <SuspenseLoader
          fallback={<Loader />}
          forceFallback={icaRemoteAddressLoading.loading}
        >
          <StatelessConfigureRebalancerComponent
            {...props}
            options={{
              nativeBalances,
              historicalPrices,
              icaRemoteAddressLoading,
            }}
          />
        </SuspenseLoader>
      </ChainProvider>
    </>
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
}

export const makeConfigureRebalancerAction: ActionMaker<
  ConfigureRebalancerData
> = ({ t, address, context, chain: { chain_id: srcChainId } }) => {
  // If not on Neutron mainnet and does not have a Neutron polytone account,
  // cannot use rebalancer.
  if (
    srcChainId !== ChainId.NeutronMainnet &&
    (context.type !== ActionContextType.Dao ||
      !(ChainId.NeutronMainnet in context.info.polytoneProxies))
  ) {
    return null
  }

  const useTransformToCosmos: UseTransformToCosmos<
    ConfigureRebalancerData
  > = () => {
    return useCallback(
      ({
        chainId: destChainId,
        tokens,
        pid,
        icaRemoteAddress,
      }: ConfigureRebalancerData) => {
        // Get rebalancer address.
        const msg: CosmosMsgFor_Empty = makeWasmMessage({
          wasm: {
            execute: {
              // TODO: Get rebalancer address.
              contract_addr: '',
              funds: [],
              msg: {
                update_config: {},
              },
            },
          },
        })

        if (context.type === ActionContextType.Gov) {
          if (!icaRemoteAddress) {
            throw new Error(t('error.icaAddressNotLoaded'))
          }

          const {
            sourceChain: { connection_id: connectionId },
          } = getIbcTransferInfoBetweenChains(srcChainId, destChainId)

          return makeStargateMessage({
            stargate: {
              typeUrl: MsgSendTx.typeUrl,
              value: MsgSendTx.fromPartial({
                owner: address,
                connectionId,
                packetData: InterchainAccountPacketData.fromPartial({
                  type: Type.TYPE_EXECUTE_TX,
                  data: CosmosTx.toProto({
                    messages: [cwMsgToProtobuf(msg, icaRemoteAddress)],
                  }),
                  memo: '',
                }),
                // Nanoseconds timeout from TX execution.
                relativeTimeout: BigInt(IBC_TIMEOUT_SECONDS * 1e9),
              }),
            },
          })
        }

        return msg
      },
      []
    )
  }

  return {
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
}
