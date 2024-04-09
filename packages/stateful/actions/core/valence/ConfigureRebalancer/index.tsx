import { fromBase64, fromUtf8 } from '@cosmjs/encoding'
import cloneDeep from 'lodash.clonedeep'
import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { waitForAll } from 'recoil'

import {
  ValenceServiceRebalancerSelectors,
  genericTokenSelector,
} from '@dao-dao/state'
import { usdPriceSelector } from '@dao-dao/state/recoil/selectors'
import {
  BalanceEmoji,
  ChainProvider,
  DaoSupportedChainPickerInput,
  useCachedLoading,
  useCachedLoadingWithError,
  useUpdatingRef,
} from '@dao-dao/stateless'
import {
  AccountType,
  TokenType,
  UseDecodedCosmosMsg,
  ValenceAccount,
} from '@dao-dao/types'
import {
  ActionChainContextType,
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
  VALENCE_INSTANTIATE2_SALT,
  VALENCE_SUPPORTED_CHAINS,
  convertDenomToMicroDenomStringWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  decodePolytoneExecuteMsg,
  encodeMessageAsBase64,
  getAccount,
  getChainAddressForActionOptions,
  makeWasmMessage,
  maybeMakePolytoneExecuteMessage,
  mustGetSupportedChainConfig,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components/AddressInput'
import { useGenerateInstantiate2 } from '../../../../hooks'
import { useTokenBalances } from '../../../hooks/useTokenBalances'
import { useActionForKey, useActionOptions } from '../../../react'
import {
  ConfigureRebalancerData,
  ConfigureRebalancerComponent as StatelessConfigureRebalancerComponent,
} from './Component'

const Component: ActionComponent<undefined, ConfigureRebalancerData> = (
  props
) => {
  const options = useActionOptions()
  const { watch, setValue } = useFormContext<ConfigureRebalancerData>()
  const valenceAccount = watch(
    (props.fieldNamePrefix + 'valenceAccount') as 'valenceAccount'
  )
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const selectedTokens = watch((props.fieldNamePrefix + 'tokens') as 'tokens')

  // Get predictable valence account address in case we have to create it.
  const generatedValenceAddress = useGenerateInstantiate2({
    chainId,
    creator: getChainAddressForActionOptions(options, chainId) || '',
    codeId:
      (options.chainContext.type === ActionChainContextType.Supported &&
        options.chainContext.config.codeIds.ValenceAccount) ||
      -1,
    salt: VALENCE_INSTANTIATE2_SALT,
  })

  const existingValenceAccount = getAccount({
    accounts: options.context.accounts,
    chainId,
    types: [AccountType.Valence],
  })

  // Check if create valence account action already exists.
  const existingCreateValenceAccountActionIndex =
    props.allActionsWithData.findIndex(
      ({ actionKey }) => actionKey === ActionKey.CreateValenceAccount
    )
  const createValenceAccountActionDefaults = useActionForKey(
    ActionKey.CreateValenceAccount
  )?.useDefaults()
  // Can add create valence account if no existing action and defaults loaded.
  const canAddCreateValenceAccountAction =
    !existingValenceAccount &&
    (existingCreateValenceAccountActionIndex === -1 ||
      existingCreateValenceAccountActionIndex > props.index) &&
    createValenceAccountActionDefaults
  const addCreateValenceAccountActionIfNeededRef = useUpdatingRef(() => {
    if (canAddCreateValenceAccountAction) {
      props.addAction?.(
        {
          actionKey: ActionKey.CreateValenceAccount,
          data: cloneDeep(createValenceAccountActionDefaults),
        },
        props.index
      )
    }
  })

  // Set valence account if not set, or add action to create if not found before
  // this configure action.
  useEffect(() => {
    if (!valenceAccount) {
      // If existing account found, set it.
      if (existingValenceAccount?.type === AccountType.Valence) {
        setValue(
          (props.fieldNamePrefix + 'valenceAccount') as 'valenceAccount',
          existingValenceAccount
        )
      }
      // Otherwise attempt to use generated one.
      else if (
        !generatedValenceAddress.loading &&
        !generatedValenceAddress.errored
      ) {
        setValue(
          (props.fieldNamePrefix + 'valenceAccount') as 'valenceAccount',
          {
            type: AccountType.Valence,
            chainId,
            address: generatedValenceAddress.data,
            config: {},
          }
        )
      }
    }

    // Attempt to add create valence account action if needed.
    if (canAddCreateValenceAccountAction) {
      addCreateValenceAccountActionIfNeededRef.current()
    }
  }, [
    setValue,
    valenceAccount,
    props.fieldNamePrefix,
    existingValenceAccount,
    canAddCreateValenceAccountAction,
    addCreateValenceAccountActionIfNeededRef,
    generatedValenceAddress,
    chainId,
  ])

  const rebalancer = mustGetSupportedChainConfig(chainId).valence?.rebalancer
  const whitelists = useCachedLoadingWithError(
    rebalancer
      ? ValenceServiceRebalancerSelectors.whitelistGenericTokensSelector({
          chainId,
          contractAddress: rebalancer,
        })
      : undefined
  )

  const loadingTokens = useTokenBalances({
    filter: TokenType.Native,
    // Ensure chosen tokens are loaded.
    additionalTokens: selectedTokens.map(({ denom }) => ({
      chainId,
      type: TokenType.Native,
      denomOrAddress: denom,
    })),
    // Only fetch balances for Valence account.
    includeAccountTypes: [AccountType.Valence],
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

  const prices = useCachedLoadingWithError(
    whitelists.loading || whitelists.errored
      ? undefined
      : waitForAll(
          whitelists.data.denoms.map(({ chainId, type, denomOrAddress }) =>
            usdPriceSelector({
              chainId,
              type,
              denomOrAddress,
            })
          )
        ),
    (data) => data.flatMap((data) => data || [])
  )

  return (
    <>
      {options.context.type === ActionContextType.Dao &&
        VALENCE_SUPPORTED_CHAINS.length > 1 && (
          <DaoSupportedChainPickerInput
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
            baseDenomWhitelistTokens:
              whitelists.loading || whitelists.errored
                ? { loading: true }
                : { loading: false, data: whitelists.data.baseDenoms },
            denomWhitelistTokens:
              whitelists.loading || whitelists.errored
                ? { loading: true }
                : { loading: false, data: whitelists.data.denoms },
            prices,
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

  const rebalancer = mustGetSupportedChainConfig(chainId).valence?.rebalancer
  const whitelists = useCachedLoadingWithError(
    rebalancer
      ? ValenceServiceRebalancerSelectors.whitelistGenericTokensSelector({
          chainId,
          contractAddress: rebalancer,
        })
      : undefined
  )

  if (
    serviceName !== 'rebalancer' ||
    !data ||
    !objectMatchesStructure(data, {
      base_denom: {},
      targets: {},
      pid: {},
      target_override_strategy: {},
    }) ||
    whitelists.loading ||
    whitelists.errored
  ) {
    return {
      match: false,
    }
  }

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
      baseDenom:
        data.base_denom || whitelists.data.baseDenoms[0].denomOrAddress,
      tokens: data.targets.map(({ denom, bps }) => ({
        denom,
        percent: bps / 100,
      })),
      pid: {
        kp: Number(data.pid?.p || -1),
        ki: Number(data.pid?.i || -1),
        kd: Number(data.pid?.d || -1),
      },
      maxLimit:
        typeof data.max_limit_bps === 'number'
          ? data.max_limit_bps / 100
          : undefined,
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
  const {
    t,
    chain: { chain_id: srcChainId },
    context,
  } = options

  const valenceAccount = getAccount({
    accounts: context.accounts,
    types: [AccountType.Valence],
  }) as ValenceAccount | undefined
  const chainId = valenceAccount?.chainId || VALENCE_SUPPORTED_CHAINS[0]
  const rebalancer = mustGetSupportedChainConfig(chainId).valence?.rebalancer

  const useDefaults: UseDefaults<ConfigureRebalancerData> = () => {
    const whitelists = useCachedLoadingWithError(
      rebalancer
        ? ValenceServiceRebalancerSelectors.whitelistGenericTokensSelector({
            chainId,
            contractAddress: rebalancer,
          })
        : undefined
    )

    const rebalancerConfig = valenceAccount?.config?.rebalancer?.config
    const minBalanceTarget = rebalancerConfig?.targets.find(
      ({ min_balance }) => min_balance
    )
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

    if (whitelists.loading) {
      return
    } else if (whitelists.errored) {
      return whitelists.error
    }

    return {
      // If no valence account found, the action will detect this and add the
      // create account action automatically.
      valenceAccount,
      chainId,
      trustee: rebalancerConfig?.trustee || undefined,
      baseDenom:
        rebalancerConfig?.base_denom ||
        whitelists.data.baseDenoms[0].denomOrAddress,
      tokens: rebalancerConfig?.targets.map(({ denom, percentage }) => ({
        denom,
        percent: Number(percentage) * 100,
      })) || [
        {
          denom: whitelists.data.baseDenoms[0].denomOrAddress,
          percent: 50,
        },
        {
          denom: whitelists.data.baseDenoms[1].denomOrAddress,
          percent: 50,
        },
      ],
      // TODO(rebalancer): pick defaults
      pid: {
        kp: Number(rebalancerConfig?.pid.p || 0.1),
        ki: Number(rebalancerConfig?.pid.i || 0.1),
        kd: Number(rebalancerConfig?.pid.d || 0.1),
      },
      maxLimitBps:
        rebalancerConfig?.max_limit &&
        !isNaN(Number(rebalancerConfig.max_limit))
          ? Number(rebalancerConfig.max_limit)
          : // TODO(rebalancer): pick default
            // 5%
            500,
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
      targetOverrideStrategy:
        rebalancerConfig?.target_override_strategy || 'proportional',
    }
  }

  const useTransformToCosmos: UseTransformToCosmos<
    ConfigureRebalancerData
  > = () => {
    const whitelists = useCachedLoadingWithError(
      rebalancer
        ? ValenceServiceRebalancerSelectors.whitelistGenericTokensSelector({
            chainId,
            contractAddress: rebalancer,
          })
        : undefined
    )

    return useCallback(
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
        if (whitelists.loading) {
          return
        } else if (whitelists.errored) {
          throw whitelists.error
        }

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
                        max_limit_bps: maxLimit && maxLimit * 100,
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
                              ? convertDenomToMicroDenomStringWithDecimals(
                                  minBalance.amount,
                                  // Should always find this.
                                  whitelists.data.denoms.find(
                                    (d) => d.denomOrAddress === denom
                                  )?.decimals ?? 0
                                )
                              : undefined,
                          // BPS
                          bps: percent * 100,
                        })),
                      } as Pick<
                        RebalancerData,
                        keyof RebalancerData & keyof RebalancerUpdateData
                      >),
                      // Differences between data and update.
                      ...(valenceAccount.config.rebalancer
                        ? ({
                            trustee: trustee ? { set: trustee } : 'clear',
                          } as Partial<RebalancerUpdateData>)
                        : ({
                            trustee: trustee || null,
                          } as Partial<RebalancerData>)),
                    }),
                  },
                } as ValenceAccountExecuteMsg,
              },
            },
          })
        )
      },
      [whitelists]
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
