import { fromBase64, fromUtf8 } from '@cosmjs/encoding'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValueLoadable, waitForAll } from 'recoil'

import { genericTokenSelector, valenceAccountsSelector } from '@dao-dao/state'
import { historicalUsdPriceSelector } from '@dao-dao/state/recoil/selectors/osmosis'
import {
  BalanceEmoji,
  ChainPickerInput,
  ChainProvider,
  useCachedLoading,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { TokenType, UseDecodedCosmosMsg } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDefaults,
  UseHideFromPicker,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { ExecuteMsg as ValenceAccountExecuteMsg } from '@dao-dao/types/contracts/ValenceAccount'
import {
  RebalancerData,
  RebalancerUpdateData,
} from '@dao-dao/types/contracts/ValenceServiceRebalancer'
import {
  VALENCE_SUPPORTED_CHAINS,
  actionContextSupportsValence,
  convertMicroDenomToDenomWithDecimals,
  decodePolytoneExecuteMsg,
  encodeMessageAsBase64,
  getValenceControllerAccount,
  loadableToLoadingData,
  makeWasmMessage,
  maybeMakePolytoneExecuteMessage,
  mustGetSupportedChainConfig,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components/AddressInput'
import { useTokenBalances } from '../../../hooks/useTokenBalances'
import { useActionOptions } from '../../../react'
import {
  ConfigureRebalancerData,
  ConfigureRebalancerComponent as StatelessConfigureRebalancerComponent,
} from './Component'

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
    // Ensure chosen tokens are loaded.
    additionalTokens: selectedTokens.map(({ denom }) => ({
      chainId,
      type: TokenType.Native,
      denomOrAddress: denom,
    })),
  })

  const minBalanceDenom = watch(
    (props.fieldNamePrefix + 'minBalance.denom') as 'minBalance.denom'
  )
  const minBalanceToken = useCachedLoading(
    minBalanceDenom
      ? genericTokenSelector({
          chainId,
          type: TokenType.Native,
          denomOrAddress: minBalanceDenom,
        })
      : undefined,
    undefined
  )

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
        VALENCE_SUPPORTED_CHAINS.length > 1 && (
          <ChainPickerInput
            className="mb-4"
            disabled={!props.isCreating}
            fieldName={props.fieldNamePrefix + 'chainId'}
            includeChainIds={VALENCE_SUPPORTED_CHAINS}
          />
        )}

      <ChainProvider chainId={chainId}>
        <StatelessConfigureRebalancerComponent
          {...props}
          options={{
            nativeBalances,
            historicalPrices,
            minBalanceToken: minBalanceToken.loading
              ? undefined
              : minBalanceToken.data,
            AddressInput,
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
  let data: RebalancerData | RebalancerUpdateData | undefined
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
    const serviceData =
      'register_to_service' in msg.wasm.execute.msg
        ? msg.wasm.execute.msg.register_to_service
        : 'update_service' in msg.wasm.execute.msg
        ? msg.wasm.execute.msg.update_service
        : undefined
    if (
      objectMatchesStructure(serviceData, {
        service_name: {},
        data: {},
      })
    ) {
      serviceName = serviceData.service_name as string
      data = JSON.parse(fromUtf8(fromBase64(serviceData.data as string)))
    }
  }

  // Get target with min balance set.
  const minBalanceTarget = data?.targets.find(({ min_balance }) => min_balance)
  const minBalanceToken = useCachedLoading(
    minBalanceTarget?.denom
      ? genericTokenSelector({
          chainId,
          type: TokenType.Native,
          denomOrAddress: minBalanceTarget.denom,
        })
      : undefined,
    undefined
  )

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

  const defaultBaseDenom =
    mustGetSupportedChainConfig(chainId).valence?.rebalancer
      .baseTokenAllowlist?.[0]
  if (!defaultBaseDenom) {
    throw new Error('No default base denom found for rebalancer.')
  }

  const maxLimitBps =
    'max_limit' in data
      ? data.max_limit
      : 'max_limit_bps' in data
      ? data.max_limit_bps
      : undefined

  return {
    match: true,
    data: {
      chainId,
      trustee:
        typeof data.trustee === 'string'
          ? 'update_service' in msg.wasm.execute.msg && data.trustee === 'clear'
            ? undefined
            : data.trustee
          : 'update_service' in msg.wasm.execute.msg &&
            typeof data.trustee === 'object' &&
            data.trustee &&
            'set' in data.trustee
          ? data.trustee.set
          : undefined,
      baseDenom: data.base_denom || defaultBaseDenom,
      tokens: data.targets.map(({ denom, min_balance, bps }) => ({
        denom,
        percent: bps / 100,
        minBalance:
          min_balance && !isNaN(Number(min_balance))
            ? Number(min_balance)
            : undefined,
      })),
      pid: {
        kp: Number(data.pid?.p || -1),
        ki: Number(data.pid?.i || -1),
        kd: Number(data.pid?.d || -1),
      },
      maxLimit: typeof maxLimitBps === 'number' ? maxLimitBps / 100 : undefined,
      minBalance:
        minBalanceTarget?.min_balance && !minBalanceToken.loading
          ? {
              denom: minBalanceTarget.denom,
              amount: convertMicroDenomToDenomWithDecimals(
                minBalanceTarget.min_balance,
                minBalanceToken.data?.decimals ?? 0
              ),
            }
          : undefined,
      targetOverrideStrategy: data.target_override_strategy || 'proportional',
    },
  }
}

export const makeConfigureRebalancerAction: ActionMaker<
  ConfigureRebalancerData
> = (options) => {
  if (!actionContextSupportsValence(options)) {
    return null
  }

  const {
    t,
    chain: { chain_id: srcChainId },
    context,
  } = options

  // Get account that can control valence accounts.
  const valenceControllerAccount = getValenceControllerAccount(options)

  const useDefaults: UseDefaults<ConfigureRebalancerData> = () => {
    // This action should not be allowed to be picked if there are no accounts
    // that can control a Valence account, so this is just a type check.
    if (!valenceControllerAccount) {
      throw new Error('No valence controller account found.')
    }

    const valenceAccountsLoading = useCachedLoadingWithError(
      valenceAccountsSelector({
        chainId: valenceControllerAccount.chainId,
        address: valenceControllerAccount.address,
      })
    )
    const valenceAccount =
      valenceAccountsLoading.loading || valenceAccountsLoading.errored
        ? undefined
        : valenceAccountsLoading.data[0]

    const { chainId } = valenceControllerAccount

    const defaultBaseDenom =
      mustGetSupportedChainConfig(chainId).valence?.rebalancer
        .baseTokenAllowlist?.[0]
    if (!defaultBaseDenom) {
      throw new Error('No default base denom found for rebalancer.')
    }

    const rebalancerConfig = valenceAccount?.config.rebalancer?.config

    return {
      valenceAccount,
      chainId: valenceAccount?.chainId || chainId,
      trustee: rebalancerConfig?.trustee || undefined,
      baseDenom: rebalancerConfig?.base_denom || defaultBaseDenom,
      tokens: rebalancerConfig?.targets.map(
        ({ denom, percentage, min_balance }) => ({
          denom,
          percent: Number(percentage) * 100,
          minBalance:
            min_balance && !isNaN(Number(min_balance))
              ? Number(min_balance)
              : undefined,
        })
      ) || [
        {
          denom: defaultBaseDenom,
          percent: 100,
        },
      ],
      // TODO: pick defaults
      pid: {
        kp: Number(rebalancerConfig?.pid.p || 0.1),
        ki: Number(rebalancerConfig?.pid.i || 0.1),
        kd: Number(rebalancerConfig?.pid.d || 0.1),
      },
      maxLimitBps:
        rebalancerConfig?.max_limit &&
        !isNaN(Number(rebalancerConfig.max_limit))
          ? Number(rebalancerConfig.max_limit)
          : // TODO: pick default
            // 5%
            500,
      targetOverrideStrategy:
        rebalancerConfig?.target_override_strategy || 'proportional',
    }
  }

  const useTransformToCosmos: UseTransformToCosmos<
    ConfigureRebalancerData
  > = () =>
    useCallback(
      ({
        valenceAccount,
        chainId,
        trustee,
        baseDenom,
        tokens,
        pid,
        maxLimit,
        minBalance,
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
                  // If rebalancer already exists, update it. Otherwise,
                  // register it.
                  [valenceAccount.config.rebalancer
                    ? 'update_service'
                    : 'register_to_service']: {
                    service_name: 'rebalancer',
                    data: encodeMessageAsBase64({
                      // Common options.
                      ...({
                        base_denom: baseDenom,
                        // BPS
                        max_limit: maxLimit && maxLimit * 100,
                        pid: {
                          p: pid.kp.toString(),
                          i: pid.ki.toString(),
                          d: pid.kd.toString(),
                        },
                        target_override_strategy: targetOverrideStrategy,
                        targets: tokens.map(({ denom, percent }) => ({
                          denom,
                          min_balance:
                            minBalance && minBalance.denom === denom
                              ? BigInt(minBalance.amount).toString()
                              : undefined,
                          // BPS
                          bps: percent * 100,
                        })),
                        trustee,
                      } as Pick<
                        RebalancerData,
                        keyof RebalancerData & keyof RebalancerUpdateData
                      >),
                      // Differences between data and update.
                      ...(valenceAccount.config.rebalancer
                        ? ({
                            // BPS
                            max_limit: maxLimit && maxLimit * 100,
                          } as Omit<
                            RebalancerUpdateData,
                            keyof RebalancerData & keyof RebalancerUpdateData
                          >)
                        : ({
                            // BPS
                            max_limit_bps: maxLimit && maxLimit * 100,
                          } as Omit<
                            RebalancerData,
                            keyof RebalancerData & keyof RebalancerUpdateData
                          >)),
                    }),
                  },
                } as ValenceAccountExecuteMsg,
              },
            },
          })
        )
      },
      []
    )

  // Disallow selection if there are no valence accounts.
  const useHideFromPicker: UseHideFromPicker = () => {
    const valenceAccountsLoading = useCachedLoadingWithError(
      valenceControllerAccount
        ? valenceAccountsSelector({
            chainId: valenceControllerAccount.chainId,
            address: valenceControllerAccount.address,
          })
        : undefined
    )

    return (
      !valenceControllerAccount ||
      valenceAccountsLoading.loading ||
      valenceAccountsLoading.errored ||
      valenceAccountsLoading.data.length === 0
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
    useHideFromPicker,
  }
}
