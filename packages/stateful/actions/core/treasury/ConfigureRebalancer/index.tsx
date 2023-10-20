import { fromBase64, fromUtf8 } from '@cosmjs/encoding'
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
  makeWasmMessage,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
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
    // TODO: pick default
    pid: {
      kp: 0.1,
      ki: 0.1,
      kd: 0.1,
    },
    // TODO: pick default
    // 5%
    maxLimitBps: 500,
    // TODO: pick default
    targetOverrideStrategy: 'proportional',
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
            precision: 'day',
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

const useDecodedCosmosMsg: UseDecodedCosmosMsg<ConfigureRebalancerData> = (
  msg: Record<string, any>
) => {
  let chainId = useActionOptions().chain.chain_id
  const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
  if (decodedPolytone.match) {
    chainId = decodedPolytone.chainId
    msg = decodedPolytone.msg
  }

  let serviceName: string | undefined
  let data: RebalancerData | undefined
  if (
    objectMatchesStructure(msg, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {},
        },
      },
    })
  ) {
    if (
      objectMatchesStructure(msg.wasm.execute.msg, {
        register_to_service: {
          service_name: {},
          data: {},
        },
      })
    ) {
      serviceName = msg.wasm.execute.msg.register_to_service
        .service_name as string
      data = JSON.parse(
        fromUtf8(
          fromBase64(msg.wasm.execute.msg.register_to_service.data as string)
        )
      )
    } else if (
      objectMatchesStructure(msg.wasm.execute.msg, {
        update_service: {
          service_name: {},
          data: {},
        },
      })
    ) {
      serviceName = msg.wasm.execute.msg.update_service.service_name as string
      data = JSON.parse(
        fromUtf8(fromBase64(msg.wasm.execute.msg.update_service.data as string))
      )
    } else {
      return {
        match: false,
      }
    }

    if (
      serviceName !== 'rebalancer' ||
      !objectMatchesStructure(data, {
        base_denom: {},
        targets: {},
        pid: {},
        target_override_strategy: {},
      })
    ) {
      return {
        match: false,
      }
    }
  } else {
    return {
      match: false,
    }
  }

  return {
    match: true,
    data: {},
  }
}

export const makeConfigureRebalancerAction: ActionMaker<
  ConfigureRebalancerData
> = ({ t, context, chain: { chain_id: srcChainId } }) => {
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
      ({ valenceAccount, chainId, tokens, pid }: ConfigureRebalancerData) => {
        if (!valenceAccount) {
          throw new Error('Missing valence account.')
        }

        return maybeMakePolytoneExecuteMessage(
          srcChainId,
          chainId,
          makeWasmMessage({
            wasm: {
              execute: {
                contract_addr: valenceAccount.address,
                funds: [],
                msg: {
                  update_config: {},
                },
              },
            },
          })
        )
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
