import { fromBase64, fromUtf8 } from '@cosmjs/encoding'
import { useQueries, useQueryClient } from '@tanstack/react-query'
import cloneDeep from 'lodash.clonedeep'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { waitForAll } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
  genericTokenSelector,
  tokenQueries,
  valenceRebalancerExtraQueries,
} from '@dao-dao/state'
import { usdPriceSelector } from '@dao-dao/state/recoil/selectors'
import {
  ActionBase,
  BalanceEmoji,
  ChainProvider,
  DaoSupportedChainPickerInput,
  useActionOptions,
  useCachedLoading,
  useCachedLoadingWithError,
  useInitializedActionForKey,
  useUpdatingRef,
} from '@dao-dao/stateless'
import {
  AccountType,
  GenericTokenBalance,
  LoadingData,
  TokenType,
  UnifiedCosmosMsg,
  ValenceAccount,
} from '@dao-dao/types'
import {
  ActionChainContextType,
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { ExecuteMsg as ValenceAccountExecuteMsg } from '@dao-dao/types/contracts/ValenceAccount'
import {
  RebalancerData,
  RebalancerUpdateData,
} from '@dao-dao/types/contracts/ValenceRebalancer'
import {
  VALENCE_INSTANTIATE2_SALT,
  VALENCE_SUPPORTED_CHAINS,
  encodeJsonToBase64,
  getAccount,
  getChainAddressForActionOptions,
  getSupportedChainConfig,
  makeCombineQueryResultsIntoLoadingData,
  makeWasmMessage,
  maybeMakePolytoneExecuteMessages,
  mustGetSupportedChainConfig,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components/AddressInput'
import {
  useGenerateInstantiate2,
  useQueryLoadingDataWithError,
} from '../../../../hooks'
import { useTokenBalances } from '../../../hooks/useTokenBalances'
import { CreateValenceAccountData } from '../CreateValenceAccount/Component'
import {
  ConfigureRebalancerData,
  ConfigureRebalancerComponent as StatelessConfigureRebalancerComponent,
  pidPresets,
} from './Component'

const Component: ActionComponent<undefined, ConfigureRebalancerData> = (
  props
) => {
  const queryClient = useQueryClient()
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
  // Get the data from the Valence creation action if it exists.
  const existingCreateValenceAccountActionData =
    existingCreateValenceAccountActionIndex > -1
      ? (props.allActionsWithData[existingCreateValenceAccountActionIndex]
          ?.data as CreateValenceAccountData)
      : undefined
  const createValenceAccountAction = useInitializedActionForKey(
    ActionKey.CreateValenceAccount
  )
  // Can add create valence account if no existing action and defaults loaded.
  const canAddCreateValenceAccountAction =
    props.isCreating &&
    !existingValenceAccount &&
    (existingCreateValenceAccountActionIndex === -1 ||
      existingCreateValenceAccountActionIndex > props.index) &&
    !createValenceAccountAction.loading &&
    !createValenceAccountAction.errored
  const addCreateValenceAccountActionIfNeededRef = useUpdatingRef(() => {
    if (canAddCreateValenceAccountAction) {
      props.addAction?.(
        {
          actionKey: ActionKey.CreateValenceAccount,
          data: cloneDeep(createValenceAccountAction.data.defaults),
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
            config: {
              admin: '',
              rebalancer: null,
            },
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
  const whitelists = useQueryLoadingDataWithError(
    valenceRebalancerExtraQueries.whitelistGenericTokens(
      queryClient,
      rebalancer
        ? {
            chainId,
            address: rebalancer,
          }
        : undefined
    )
  )

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

  const currentBalances = useTokenBalances({
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

  // Load tokens used in the create valence account action if it exists.
  const initialTokens = useQueries({
    queries:
      existingCreateValenceAccountActionData?.funds.map(({ denom }) =>
        tokenQueries.info(queryClient, {
          chainId,
          type: TokenType.Native,
          denomOrAddress: denom,
        })
      ) ?? [],
    combine: makeCombineQueryResultsIntoLoadingData({
      transform: (tokens) =>
        tokens.map(
          (token): GenericTokenBalance => ({
            token,
            balance: HugeDecimal.fromHumanReadable(
              existingCreateValenceAccountActionData?.funds
                .find(({ denom }) => denom === token.denomOrAddress)
                ?.amount?.toString() || 0,
              token.decimals
            ).toString(),
          })
        ),
    }),
  })

  const nativeBalances: LoadingData<GenericTokenBalance[]> =
    // If creating new Valence account, use initial tokens from that action,
    // since there will be no current balances loaded yet.
    existingCreateValenceAccountActionData
      ? initialTokens
      : currentBalances.loading
      ? currentBalances
      : {
          loading: false,
          updating: currentBalances.updating,
          data: currentBalances.data.filter(
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

export class ConfigureRebalancerAction extends ActionBase<ConfigureRebalancerData> {
  public readonly key = ActionKey.ConfigureRebalancer
  public readonly Component = Component

  private existingValenceAccount: ValenceAccount | undefined
  private valenceChainId: string

  constructor(options: ActionOptions) {
    super(options, {
      Icon: BalanceEmoji,
      label: options.t('title.configureRebalancer'),
      description: options.t('info.configureRebalancerDescription'),
      notReusable: true,
    })

    this.existingValenceAccount = getAccount({
      accounts: options.context.accounts,
      types: [AccountType.Valence],
    }) as ValenceAccount | undefined
    this.valenceChainId =
      this.existingValenceAccount?.chainId || VALENCE_SUPPORTED_CHAINS[0]
  }

  async setup() {
    const rebalancer = mustGetSupportedChainConfig(this.valenceChainId).valence
      ?.rebalancer
    if (!rebalancer) {
      throw new Error('Missing rebalancer address.')
    }

    const whitelists = await this.options.queryClient.fetchQuery(
      valenceRebalancerExtraQueries.whitelistGenericTokens(
        this.options.queryClient,
        {
          chainId: this.valenceChainId,
          address: rebalancer,
        }
      )
    )

    const rebalancerConfig =
      this.existingValenceAccount?.config?.rebalancer?.config
    const minBalanceTarget = rebalancerConfig?.targets.find(
      ({ min_balance }) => min_balance
    )
    const minBalanceToken = minBalanceTarget
      ? await this.options.queryClient.fetchQuery(
          tokenQueries.info(this.options.queryClient, {
            chainId: this.valenceChainId,
            type: TokenType.Native,
            denomOrAddress: minBalanceTarget.denom,
          })
        )
      : undefined

    const defaultPid: ConfigureRebalancerData['pid'] = rebalancerConfig
      ? {
          kp: Number(rebalancerConfig.pid.p),
          ki: Number(rebalancerConfig.pid.i),
          kd: Number(rebalancerConfig.pid.d),
        }
      : {
          ...pidPresets.find((p) => p.preset === 'medium')!,
        }
    const showCustomPid = !pidPresets.some(
      (preset) =>
        preset.kp === defaultPid.kp &&
        preset.ki === defaultPid.ki &&
        preset.kd === defaultPid.kd
    )

    this.defaults = {
      // If no valence account found, the action will detect this and add the
      // create account action automatically.
      valenceAccount: this.existingValenceAccount,
      chainId: this.valenceChainId,
      trustee: rebalancerConfig?.trustee || undefined,
      baseDenom:
        rebalancerConfig?.base_denom || whitelists.baseDenoms[0].denomOrAddress,
      tokens: rebalancerConfig?.targets.map(({ denom, percentage }) => ({
        denom,
        percent: Number(percentage) * 100,
      })) || [
        {
          denom: whitelists.baseDenoms[0].denomOrAddress,
          percent: 50,
        },
        {
          denom: whitelists.baseDenoms[1].denomOrAddress,
          percent: 50,
        },
      ],
      pid: defaultPid,
      showCustomPid,
      maxLimit:
        rebalancerConfig?.max_limit &&
        !isNaN(Number(rebalancerConfig.max_limit))
          ? Number(rebalancerConfig.max_limit)
          : 500,
      minBalance:
        minBalanceTarget?.min_balance && minBalanceToken
          ? {
              denom: minBalanceTarget.denom,
              amount: HugeDecimal.from(
                minBalanceTarget.min_balance
              ).toHumanReadableNumber(minBalanceToken.decimals),
            }
          : undefined,
      targetOverrideStrategy:
        rebalancerConfig?.target_override_strategy || 'proportional',
    }
  }

  async encode({
    valenceAccount,
    chainId,
    trustee,
    baseDenom,
    tokens,
    pid,
    maxLimit,
    minBalance,
    targetOverrideStrategy,
  }: ConfigureRebalancerData): Promise<UnifiedCosmosMsg[]> {
    if (!valenceAccount) {
      throw new Error('Missing valence account.')
    }

    const rebalancer = mustGetSupportedChainConfig(chainId).valence?.rebalancer
    if (!rebalancer) {
      throw new Error('Missing rebalancer address.')
    }

    const whitelists = await this.options.queryClient.fetchQuery(
      valenceRebalancerExtraQueries.whitelistGenericTokens(
        this.options.queryClient,
        {
          chainId,
          address: rebalancer,
        }
      )
    )

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chain_id,
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
                data: encodeJsonToBase64({
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
                          ? HugeDecimal.fromHumanReadable(
                              minBalance.amount,
                              // Should always find this.
                              whitelists.denoms.find(
                                (d) => d.denomOrAddress === denom
                              )?.decimals ?? 0
                            ).toString()
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
  }

  async match([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): Promise<ActionMatch> {
    let serviceName: string | undefined
    let data: RebalancerData | RebalancerUpdateData | undefined
    if (
      objectMatchesStructure(decodedMessage, {
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
        'register_to_service' in decodedMessage.wasm.execute.msg
          ? decodedMessage.wasm.execute.msg.register_to_service
          : 'update_service' in decodedMessage.wasm.execute.msg
          ? decodedMessage.wasm.execute.msg.update_service
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

    if (
      serviceName !== 'rebalancer' ||
      !objectMatchesStructure(data, {
        base_denom: {},
        targets: {},
        pid: {},
        target_override_strategy: {},
      }) ||
      !getSupportedChainConfig(chainId)?.valence?.rebalancer
    ) {
      return false
    }

    return true
  }

  async decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): Promise<ConfigureRebalancerData> {
    let data: RebalancerData | RebalancerUpdateData | undefined
    if (
      objectMatchesStructure(decodedMessage, {
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
        'register_to_service' in decodedMessage.wasm.execute.msg
          ? decodedMessage.wasm.execute.msg.register_to_service
          : 'update_service' in decodedMessage.wasm.execute.msg
          ? decodedMessage.wasm.execute.msg.update_service
          : undefined
      if (
        objectMatchesStructure(serviceData, {
          service_name: {},
          data: {},
        })
      ) {
        data = JSON.parse(fromUtf8(fromBase64(serviceData.data as string)))
      }
    }

    // Should never happen as this is checked in match.
    if (!data) {
      throw new Error('Missing data.')
    }

    const rebalancer = mustGetSupportedChainConfig(chainId).valence?.rebalancer
    // Should never happen as this is checked in match.
    if (!rebalancer) {
      throw new Error('Missing rebalancer address.')
    }

    const whitelists = await this.options.queryClient.fetchQuery(
      valenceRebalancerExtraQueries.whitelistGenericTokens(
        this.options.queryClient,
        {
          chainId,
          address: rebalancer,
        }
      )
    )

    const kp = Number(data.pid?.p || -1)
    const ki = Number(data.pid?.i || -1)
    const kd = Number(data.pid?.d || -1)

    // Show custom PID fields if no preset found for these settings.
    const showCustomPid = !pidPresets.some(
      (preset) => preset.kp === kp && preset.ki === ki && preset.kd === kd
    )

    // Get target with min balance set.
    const minBalanceTarget = data.targets.find(({ min_balance }) => min_balance)
    const minBalanceToken = minBalanceTarget
      ? await this.options.queryClient.fetchQuery(
          tokenQueries.info(this.options.queryClient, {
            chainId,
            type: TokenType.Native,
            denomOrAddress: minBalanceTarget.denom,
          })
        )
      : undefined

    return {
      chainId,
      trustee:
        typeof data.trustee === 'string'
          ? 'update_service' in decodedMessage.wasm.execute.msg &&
            data.trustee === 'clear'
            ? undefined
            : data.trustee
          : 'update_service' in decodedMessage.wasm.execute.msg &&
            typeof data.trustee === 'object' &&
            data.trustee &&
            'set' in data.trustee
          ? data.trustee.set
          : undefined,
      baseDenom: data.base_denom || whitelists.baseDenoms[0].denomOrAddress,
      tokens: data.targets.map(({ denom, bps }) => ({
        denom,
        percent: bps / 100,
      })),
      pid: {
        kp,
        ki,
        kd,
      },
      showCustomPid,
      maxLimit:
        typeof data.max_limit_bps === 'number'
          ? data.max_limit_bps / 100
          : undefined,
      minBalance:
        minBalanceTarget?.min_balance && minBalanceToken
          ? {
              denom: minBalanceTarget.denom,
              amount: HugeDecimal.from(
                minBalanceTarget.min_balance
              ).toHumanReadableNumber(minBalanceToken.decimals),
            }
          : undefined,
      targetOverrideStrategy: data.target_override_strategy || 'proportional',
    }
  }
}
