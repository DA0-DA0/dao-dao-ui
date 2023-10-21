import { fromBase64, fromUtf8 } from '@cosmjs/encoding'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValueLoadable, waitForAll } from 'recoil'

import { valenceAccountsSelector } from '@dao-dao/state'
import { historicalUsdPriceSelector } from '@dao-dao/state/recoil/selectors/osmosis'
import {
  BalanceEmoji,
  ChainPickerInput,
  ChainProvider,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { ChainId, TokenType, UseDecodedCosmosMsg } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { ExecuteMsg as ValenceAccountExecuteMsg } from '@dao-dao/types/contracts/ValenceAccount'
import {
  RebalancerData,
  RebalancerUpdateData,
} from '@dao-dao/types/contracts/ValenceServiceRebalancer'
import {
  decodePolytoneExecuteMsg,
  encodeMessageAsBase64,
  getAccountAddress,
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
  REBALANCER_TOKEN_ALLOWLIST,
  ConfigureRebalancerComponent as StatelessConfigureRebalancerComponent,
} from './Component'

const useDefaults: UseDefaults<ConfigureRebalancerData> = () => {
  const {
    address,
    chain: { chain_id: chainId },
    context,
  } = useActionOptions()

  // Get Neutron account.
  const neutronAddress =
    context.type === ActionContextType.Dao
      ? getAccountAddress({
          accounts: context.info.accounts,
          chainId: ChainId.NeutronMainnet,
        })
      : chainId === ChainId.NeutronMainnet
      ? address
      : null
  if (!neutronAddress) {
    throw new Error('Missing Neutron account.')
  }

  const valenceAccountsLoading = useCachedLoadingWithError(
    valenceAccountsSelector({
      chainId: ChainId.NeutronMainnet,
      address,
    })
  )
  const valenceAccount =
    valenceAccountsLoading.loading || valenceAccountsLoading.errored
      ? undefined
      : valenceAccountsLoading.data[0]

  const nativeDenom = getNativeTokenForChainId(
    ChainId.NeutronMainnet
  ).denomOrAddress
  const usdcDenom = getNativeIbcUsdc(ChainId.NeutronMainnet)?.denomOrAddress

  const rebalancerConfig = valenceAccount?.config.rebalancer?.config

  return {
    valenceAccount,
    chainId: ChainId.NeutronMainnet,
    trustee: rebalancerConfig?.trustee || undefined,
    baseDenom:
      (rebalancerConfig?.base_denom ||
        REBALANCER_BASE_TOKEN_ALLOWLIST[ChainId.NeutronMainnet]?.[0]) ??
      nativeDenom,
    tokens: rebalancerConfig?.targets.map(
      ({ denom, percentage, min_balance }) => ({
        denom,
        percent: Number(percentage),
        minBalance:
          min_balance && !isNaN(Number(min_balance))
            ? Number(min_balance)
            : undefined,
      })
    ) || [
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
    // TODO: pick defaults
    pid: {
      kp: Number(rebalancerConfig?.pid.p || 0.1),
      ki: Number(rebalancerConfig?.pid.i || 0.1),
      kd: Number(rebalancerConfig?.pid.d || 0.1),
    },
    maxLimitBps:
      rebalancerConfig?.max_limit && !isNaN(Number(rebalancerConfig.max_limit))
        ? Number(rebalancerConfig.max_limit)
        : // TODO: pick default
          // 5%
          500,
    // TODO: pick default
    targetOverrideStrategy:
      rebalancerConfig?.target_override_strategy || 'proportional',
  }
}

const Component: ActionComponent<undefined, ConfigureRebalancerData> = (
  props
) => {
  const { context } = useActionOptions()
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
      {context.type === ActionContextType.Dao &&
        Object.keys(REBALANCER_TOKEN_ALLOWLIST).length > 1 && (
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
        )}

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
      !data ||
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
    data: {
      chainId,
      trustee: data.trustee || undefined,
      baseDenom: data.base_denom,
      tokens: data.targets.map(({ denom, min_balance, percentage }) => ({
        denom,
        percent: percentage,
        minBalance:
          min_balance && !isNaN(Number(min_balance))
            ? Number(min_balance)
            : undefined,
      })),
      pid: {
        kp: Number(data.pid.p),
        ki: Number(data.pid.i),
        kd: Number(data.pid.d),
      },
      maxLimitBps: data.max_limit || undefined,
      targetOverrideStrategy: data.target_override_strategy,
    },
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
      ({
        valenceAccount,
        chainId,
        trustee,
        baseDenom,
        tokens,
        pid,
        maxLimitBps,
        targetOverrideStrategy,
      }: ConfigureRebalancerData) => {
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
                  update_service: {
                    data: encodeMessageAsBase64({
                      base_denom: baseDenom,
                      max_limit: maxLimitBps,
                      pid: {
                        p: pid.kp.toString(),
                        i: pid.ki.toString(),
                        d: pid.kd.toString(),
                      },
                      target_override_strategy: targetOverrideStrategy,
                      targets: tokens.map(({ denom, percent, minBalance }) => ({
                        denom,
                        min_balance:
                          minBalance && BigInt(minBalance).toString(),
                        percentage: percent,
                      })),
                      trustee,
                    } as RebalancerUpdateData),
                  },
                } as ValenceAccountExecuteMsg,
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
