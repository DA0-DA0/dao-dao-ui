import { coins } from '@cosmjs/amino'
import { ComponentType, useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import {
  Cw1WhitelistSelectors,
  genericTokenSelector,
  nativeUnstakingDurationSecondsSelector,
} from '@dao-dao/state/recoil'
import {
  Loader,
  MoneyWingsEmoji,
  SegmentedControls,
  useCachedLoadable,
  useCachedLoading,
} from '@dao-dao/stateless'
import {
  DurationUnits,
  DurationWithUnits,
  SegmentedControlsProps,
  TokenType,
  TypedOption,
  VestingPaymentsWidgetData,
  VestingPaymentsWidgetVersion,
  WidgetId,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionComponentProps,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseHideFromPicker,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { InstantiateMsg as Cw1WhietlistInstantiateMsg } from '@dao-dao/types/contracts/Cw1Whitelist'
import {
  ExecuteMsg,
  InstantiateNativePayrollContractMsg,
} from '@dao-dao/types/contracts/CwPayrollFactory'
import { InstantiateMsg as VestingInstantiateMsg } from '@dao-dao/types/contracts/CwVesting'
import {
  convertDenomToMicroDenomWithDecimals,
  convertDurationWithUnitsToSeconds,
  convertMicroDenomToDenomWithDecimals,
  convertSecondsToDurationWithUnits,
  decodeCw1WhitelistExecuteMsg,
  encodeMessageAsBase64,
  getNativeTokenForChainId,
  instantiateSmartContract,
  isValidBech32Address,
  isValidContractAddress,
  loadableToLoadingData,
  makeWasmMessage,
  objectMatchesStructure,
  parseEncodedMessage,
  processError,
} from '@dao-dao/utils'

import {
  AddressInput,
  EntityDisplay,
  SuspenseLoader,
  Trans,
  VestingPaymentCard,
} from '../../../../components'
import { useWallet } from '../../../../hooks'
import {
  vestingFactoryOwnerSelector,
  vestingInfoSelector,
  vestingInfosOwnedBySelector,
  vestingPaymentsOwnedBySelector,
} from '../../../../recoil/selectors/vesting'
import { useWidget } from '../../../../widgets'
import { useTokenBalances } from '../../../hooks/useTokenBalances'
import { useActionOptions } from '../../../react'
import { BeginVesting, BeginVestingData } from './BeginVesting'
import { CancelVesting, CancelVestingData } from './CancelVesting'
import { RegisterSlash, RegisterSlashData } from './RegisterSlash'

export type ManageVestingData = {
  mode: 'begin' | 'cancel' | 'registerSlash'
  begin: BeginVestingData
  cancel: CancelVestingData
  registerSlash: RegisterSlashData
}

const instantiateStructure = {
  instantiate_msg: {
    denom: {},
    recipient: {},
    schedule: {},
    title: {},
    total: {},
    unbonding_duration_seconds: {},
    vesting_duration_seconds: {},
  },
  label: {},
}

const Component: ComponentType<
  ActionComponentProps<undefined, ManageVestingData> & {
    widgetData?: VestingPaymentsWidgetData
  }
> = ({ widgetData, ...props }) => {
  const { t } = useTranslation()
  const {
    address,
    chain: { chain_id: chainId, bech32_prefix: bech32Prefix },
    chainContext: {
      config: { codeIds },
    },
  } = useActionOptions()
  const { address: walletAddress, getSigningCosmWasmClient } = useWallet()

  const { setValue, watch, setError, clearErrors, getValues } =
    useFormContext<ManageVestingData>()
  const mode = watch((props.fieldNamePrefix + 'mode') as 'mode')
  const selectedAddress =
    mode === 'registerSlash'
      ? watch(
          (props.fieldNamePrefix +
            'registerSlash.address') as 'registerSlash.address'
        )
      : mode === 'cancel'
      ? watch((props.fieldNamePrefix + 'cancel.address') as 'cancel.address')
      : undefined
  const beginOwnerMode = watch(
    (props.fieldNamePrefix + 'begin.ownerMode') as 'begin.ownerMode'
  )
  const beginManyOwnersCw1WhitelistContract = watch(
    (props.fieldNamePrefix +
      'begin.manyOwnersCw1WhitelistContract') as 'begin.manyOwnersCw1WhitelistContract'
  )

  const tokenBalances = useTokenBalances()

  const vestingFactoryOwner = loadableToLoadingData(
    useCachedLoadable(
      widgetData
        ? vestingFactoryOwnerSelector({
            factory: widgetData.factory,
            chainId,
          })
        : undefined
    ),
    undefined
  )

  const vestingInfos = loadableToLoadingData(
    useCachedLoadable(
      vestingInfosOwnedBySelector({
        address,
        chainId,
      })
    ),
    []
  )

  const selectedVest = useCachedLoading(
    !props.isCreating &&
      (mode === 'registerSlash' || mode === 'cancel') &&
      selectedAddress
      ? vestingInfoSelector({
          vestingContractAddress: selectedAddress,
          chainId,
        })
      : constSelector(undefined),
    undefined
  )

  // Prevent action from being submitted if no address is selected while we're
  // registering slash or cancelling.
  useEffect(() => {
    if (mode !== 'registerSlash' && mode !== 'cancel') {
      clearErrors(
        (props.fieldNamePrefix +
          'registerSlash.address') as 'registerSlash.address'
      )
      clearErrors(
        (props.fieldNamePrefix + 'cancel.address') as 'cancel.address'
      )
      return
    }
    // Make sure to clear errors for other modes on switch.
    else if (mode === 'registerSlash') {
      clearErrors(
        (props.fieldNamePrefix + 'cancel.address') as 'cancel.address'
      )
    } else if (mode === 'cancel') {
      clearErrors(
        (props.fieldNamePrefix +
          'registerSlash.address') as 'registerSlash.address'
      )
    }

    if (
      !selectedAddress ||
      !isValidContractAddress(selectedAddress, bech32Prefix)
    ) {
      setError(
        (props.fieldNamePrefix + `${mode}.address`) as `${typeof mode}.address`,
        {
          type: 'manual',
          message: t('error.noVestingContractSelected'),
        }
      )
    } else {
      clearErrors(
        (props.fieldNamePrefix + `${mode}.address`) as `${typeof mode}.address`
      )
    }
  }, [
    setError,
    clearErrors,
    props.fieldNamePrefix,
    t,
    mode,
    selectedAddress,
    bech32Prefix,
  ])

  const tabs: SegmentedControlsProps<ManageVestingData['mode']>['tabs'] = [
    // Only allow beginning a vest if widget is setup.
    ...(widgetData
      ? ([
          {
            label: t('title.beginVesting'),
            value: 'begin',
          },
        ] as TypedOption<ManageVestingData['mode']>[])
      : []),
    {
      label: t('title.cancelVesting'),
      value: 'cancel',
    },
    {
      label: t('title.registerSlash'),
      value: 'registerSlash',
    },
  ]
  const selectedTab = tabs.find((tab) => tab.value === mode)

  const [creatingCw1WhitelistOwners, setCreatingCw1WhitelistOwners] =
    useState(false)
  const createCw1WhitelistOwners = async () => {
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }

    setCreatingCw1WhitelistOwners(true)
    try {
      const beginData = getValues((props.fieldNamePrefix + 'begin') as 'begin')
      if (beginData.ownerMode !== 'many') {
        throw new Error(t('error.unexpectedError'))
      }
      if (beginData.manyOwnersCw1WhitelistContract) {
        throw new Error(t('error.accountListAlreadySaved'))
      }
      if (beginData.manyOwners.length < 2) {
        throw new Error(t('error.enterAtLeastTwoAccounts'))
      }
      const admins = beginData.manyOwners.map(({ address }) => address)
      if (admins.some((admin) => !isValidBech32Address(admin, bech32Prefix))) {
        throw new Error(t('error.invalidAccount'))
      }

      const contractAddress = await instantiateSmartContract(
        await getSigningCosmWasmClient(),
        walletAddress,
        codeIds.Cw1Whitelist,
        'Cw1Whitelist',
        {
          admins,
          mutable: false,
        } as Cw1WhietlistInstantiateMsg
      )

      setValue(
        (props.fieldNamePrefix +
          'begin.manyOwnersCw1WhitelistContract') as 'begin.manyOwnersCw1WhitelistContract',
        contractAddress
      )

      toast.success(t('success.saved'))
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setCreatingCw1WhitelistOwners(false)
    }
  }

  // Prevent action from being submitted if the cw1-whitelist contract has
  // not yet been created and it needs to be.
  useEffect(() => {
    if (beginOwnerMode === 'many' && !beginManyOwnersCw1WhitelistContract) {
      setError(
        (props.fieldNamePrefix +
          'begin.manyOwnersCw1WhitelistContract') as 'begin.manyOwnersCw1WhitelistContract',
        {
          type: 'manual',
          message: t('error.accountListNeedsSaving'),
        }
      )
    } else {
      clearErrors(
        (props.fieldNamePrefix +
          'begin.manyOwnersCw1WhitelistContract') as 'begin.manyOwnersCw1WhitelistContract'
      )
    }
  }, [
    setError,
    clearErrors,
    t,
    beginOwnerMode,
    beginManyOwnersCw1WhitelistContract,
    props.fieldNamePrefix,
  ])

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={
        // Manually trigger loader.
        tokenBalances.loading
      }
    >
      {props.isCreating ? (
        <SegmentedControls<ManageVestingData['mode']>
          className="mb-2"
          onSelect={(value) =>
            setValue((props.fieldNamePrefix + 'mode') as 'mode', value)
          }
          selected={mode}
          tabs={tabs}
        />
      ) : (
        <p className="title-text mb-2">{selectedTab?.label}</p>
      )}

      {mode === 'begin' ? (
        <BeginVesting
          {...props}
          errors={props.errors?.begin}
          fieldNamePrefix={props.fieldNamePrefix + 'begin.'}
          options={{
            widgetData,
            tokens: tokenBalances.loading ? [] : tokenBalances.data,
            vestingFactoryOwner,
            AddressInput,
            EntityDisplay,
            createCw1WhitelistOwners,
            creatingCw1WhitelistOwners,
          }}
        />
      ) : mode === 'registerSlash' ? (
        <RegisterSlash
          {...props}
          errors={props.errors?.registerSlash}
          fieldNamePrefix={props.fieldNamePrefix + 'registerSlash.'}
          options={{
            vestingInfos,
            selectedVest,
            EntityDisplay,
            Trans,
          }}
        />
      ) : mode === 'cancel' ? (
        <CancelVesting
          {...props}
          errors={props.errors?.cancel}
          fieldNamePrefix={props.fieldNamePrefix + 'cancel.'}
          options={{
            vestingInfos,
            cancelledVestingContract: selectedVest,
            EntityDisplay,
            VestingPaymentCard,
          }}
        />
      ) : null}
    </SuspenseLoader>
  )
}

// Only check if widget exists in DAOs.
const DaoComponent: ActionComponent<undefined, ManageVestingData> = (props) => {
  const widgetData = useWidget<VestingPaymentsWidgetData>(
    WidgetId.VestingPayments
  )?.daoWidget.values

  return <Component {...props} widgetData={widgetData} />
}

const WalletComponent: ActionComponent<undefined, ManageVestingData> = (
  props
) => <Component {...props} />

export const makeManageVestingAction: ActionMaker<ManageVestingData> = ({
  t,
  address,
  context,
  chain: { chain_id: chainId },
}) => {
  // Only available in DAO and wallet contexts.
  if (
    context.type !== ActionContextType.Dao &&
    context.type !== ActionContextType.Wallet
  ) {
    return null
  }

  const makeUseDefaults =
    (hasWidgetData: boolean): UseDefaults<ManageVestingData> =>
    () => {
      const {
        address,
        chain: { chain_id: chainId },
      } = useActionOptions()

      const start = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

      return {
        // Cannot use begin if no widget setup, so default to cancel.
        mode: hasWidgetData ? 'begin' : 'cancel',
        begin: {
          amount: 1,
          denomOrAddress: getNativeTokenForChainId(chainId).denomOrAddress,
          recipient: '',
          startDate: `${start.toISOString().split('T')[0]} 12:00 AM`,
          title: '',
          ownerMode: 'me',
          otherOwner: '',
          manyOwners: [
            {
              address,
            },
            {
              address: '',
            },
          ],
          manyOwnersCw1WhitelistContract: '',
          steps: [
            {
              percent: 100,
              delay: {
                value: 1,
                units: DurationUnits.Years,
              },
            },
          ],
        },
        cancel: {
          address: '',
        },
        registerSlash: {
          address: '',
          validator: '',
          time: '',
          amount: '',
          duringUnbonding: false,
        },
      }
    }

  const makeUseTransformToCosmos =
    (
      widgetData?: VestingPaymentsWidgetData
    ): UseTransformToCosmos<ManageVestingData> =>
    () => {
      const loadingTokenBalances = useTokenBalances()

      const vestingFactoryOwner = loadableToLoadingData(
        useCachedLoadable(
          widgetData
            ? vestingFactoryOwnerSelector({
                factory: widgetData.factory,
                chainId,
              })
            : undefined
        ),
        undefined
      )

      const nativeUnstakingDurationSecondsLoadable = useRecoilValueLoadable(
        nativeUnstakingDurationSecondsSelector({
          chainId,
        })
      )

      const loadingVestingInfos = loadableToLoadingData(
        useCachedLoadable(
          vestingInfosOwnedBySelector({
            address,
            chainId,
          })
        ),
        []
      )

      return useCallback(
        ({ mode, begin, registerSlash, cancel }: ManageVestingData) => {
          // Can only begin a vest if there is widget data available.
          if (mode === 'begin' && widgetData) {
            if (
              loadingTokenBalances.loading ||
              vestingFactoryOwner.loading ||
              nativeUnstakingDurationSecondsLoadable.state !== 'hasValue'
            ) {
              return
            }

            const token = loadingTokenBalances.data.find(
              ({ token }) => token.denomOrAddress === begin.denomOrAddress
            )?.token
            if (!token) {
              throw new Error(`Unknown token: ${begin.denomOrAddress}`)
            }

            const total = convertDenomToMicroDenomWithDecimals(
              begin.amount,
              token.decimals
            )

            const vestingDurationSeconds = begin.steps.reduce(
              (acc, { delay }) =>
                acc + convertDurationWithUnitsToSeconds(delay),
              0
            )

            const instantiateMsg: VestingInstantiateMsg = {
              denom:
                token.type === TokenType.Native
                  ? {
                      native: token.denomOrAddress,
                    }
                  : {
                      cw20: token.denomOrAddress,
                    },
              description: begin.description || undefined,
              // Widgets prior to V1 use the factory owner.
              owner: !widgetData.version
                ? vestingFactoryOwner.data
                : // V1 and later can set the owner.
                widgetData.version >= VestingPaymentsWidgetVersion.V1
                ? begin.ownerMode === 'none'
                  ? undefined
                  : begin.ownerMode === 'me'
                  ? address
                  : begin.ownerMode === 'other'
                  ? begin.otherOwner
                  : begin.ownerMode === 'many'
                  ? begin.manyOwnersCw1WhitelistContract
                  : address
                : address,
              recipient: begin.recipient,
              schedule:
                begin.steps.length === 1
                  ? 'saturating_linear'
                  : {
                      piecewise_linear: [
                        // First point must be 0 amount at 1 second.
                        [1, '0'],
                        ...(begin.steps.reduce(
                          (acc, { percent, delay }, index) => {
                            const delaySeconds = Math.max(
                              // Ensure this is at least 1 second since it can't
                              // have overlapping points.
                              1,
                              convertDurationWithUnitsToSeconds(delay) -
                                // For the first step, subtract 1 second since
                                // the first point must start at 1 second and is
                                // hardcoded above.
                                (index === 0 ? 1 : 0)
                            )

                            // For the first step, start at 1 second since the
                            // first point must start at 1 second and is
                            // hardcoded above.
                            const lastSeconds =
                              index === 0 ? 1 : acc[acc.length - 1][0]
                            const lastAmount =
                              index === 0 ? '0' : acc[acc.length - 1][1]

                            return [
                              ...acc,
                              [
                                lastSeconds + delaySeconds,
                                BigInt(
                                  // For the last step, use total to avoid
                                  // rounding issues.
                                  index === begin.steps.length - 1
                                    ? total
                                    : Math.round(
                                        Number(lastAmount) +
                                          (percent / 100) * Number(total)
                                      )
                                ).toString(),
                              ],
                            ]
                          },
                          [] as [number, string][]
                        ) as [number, string][]),
                      ],
                    },
              start_time:
                begin.startDate && !isNaN(Date.parse(begin.startDate))
                  ? // milliseconds => nanoseconds
                    Math.round(
                      new Date(begin.startDate).getTime() * 1e6
                    ).toString()
                  : '',
              title: begin.title,
              total: BigInt(total).toString(),
              unbonding_duration_seconds:
                token.type === TokenType.Native &&
                token.denomOrAddress ===
                  getNativeTokenForChainId(chainId).denomOrAddress
                  ? nativeUnstakingDurationSecondsLoadable.contents
                  : 0,
              vesting_duration_seconds: vestingDurationSeconds,
            }

            const msg: InstantiateNativePayrollContractMsg = {
              instantiate_msg: instantiateMsg,
              label: `vest_to_${begin.recipient}_${Date.now()}`,
            }

            if (token.type === TokenType.Native) {
              return makeWasmMessage({
                wasm: {
                  execute: {
                    contract_addr: widgetData.factory,
                    funds: coins(total, token.denomOrAddress),
                    msg: {
                      instantiate_native_payroll_contract: msg,
                    } as ExecuteMsg,
                  },
                },
              })
            } else if (token.type === TokenType.Cw20) {
              // Execute CW20 send message.
              return makeWasmMessage({
                wasm: {
                  execute: {
                    contract_addr: token.denomOrAddress,
                    funds: [],
                    msg: {
                      send: {
                        amount: total,
                        contract: widgetData.factory,
                        msg: encodeMessageAsBase64({
                          instantiate_payroll_contract: msg,
                        }),
                      },
                    },
                  },
                },
              })
            }
          } else if (mode === 'cancel' || mode === 'registerSlash') {
            if (loadingVestingInfos.loading) {
              return
            }

            const contractAddress =
              mode === 'cancel' ? cancel.address : registerSlash.address
            const vestingInfo = loadingVestingInfos.data.find(
              ({ vestingContractAddress }) =>
                vestingContractAddress === contractAddress
            )
            if (!vestingInfo) {
              throw new Error(t('error.loadingData'))
            }

            const msg = makeWasmMessage({
              wasm: {
                execute: {
                  contract_addr: contractAddress,
                  funds: [],
                  msg:
                    mode === 'cancel'
                      ? {
                          cancel: {},
                        }
                      : {
                          register_slash: {
                            validator: registerSlash.validator,
                            time: registerSlash.time,
                            amount: registerSlash.amount,
                            during_unbonding: registerSlash.duringUnbonding,
                          },
                        },
                },
              },
            })

            return vestingInfo.owner?.isCw1Whitelist &&
              vestingInfo.owner.cw1WhitelistAdmins.includes(address)
              ? // Wrap in cw1-whitelist execute.
                makeWasmMessage({
                  wasm: {
                    execute: {
                      contract_addr: vestingInfo.owner.address,
                      funds: [],
                      msg: {
                        execute: {
                          msgs: [msg],
                        },
                      },
                    },
                  },
                })
              : msg
          }
        },
        [
          loadingTokenBalances,
          nativeUnstakingDurationSecondsLoadable,
          vestingFactoryOwner,
          loadingVestingInfos,
        ]
      )
    }

  // Only check if widget exists in DAOs.
  const useDefaults: UseDefaults<ManageVestingData> =
    context.type === ActionContextType.Dao
      ? () => {
          const widgetData = useWidget<VestingPaymentsWidgetData>(
            WidgetId.VestingPayments
          )?.daoWidget.values
          return makeUseDefaults(!!widgetData)()
        }
      : makeUseDefaults(false)

  // Only check if widget exists in DAOs.
  const useTransformToCosmos =
    context.type === ActionContextType.Dao
      ? () => {
          const widgetData = useWidget<VestingPaymentsWidgetData>(
            WidgetId.VestingPayments
          )?.daoWidget.values
          return makeUseTransformToCosmos(widgetData)()
        }
      : makeUseTransformToCosmos()

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageVestingData> = (
    msg: Record<string, any>
  ) => {
    // If this is a cw1-whitelist execute msg, check msg inside of it.
    const decodedCw1Whitelist = decodeCw1WhitelistExecuteMsg(msg, 'one')
    if (decodedCw1Whitelist) {
      msg = decodedCw1Whitelist.msgs[0]
    }

    const defaults = useDefaults()
    const {
      address,
      chain: { chain_id: chainId },
    } = useActionOptions()

    const isNativeBegin =
      objectMatchesStructure(msg, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              instantiate_native_payroll_contract: instantiateStructure,
            },
          },
        },
      }) &&
      msg.wasm.execute.funds.length === 1 &&
      objectMatchesStructure(msg.wasm.execute.funds[0], {
        amount: {},
        denom: {},
      })

    const isCw20Begin =
      objectMatchesStructure(msg, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              send: {
                amount: {},
                contract: {},
                msg: {},
              },
            },
          },
        },
      }) &&
      objectMatchesStructure(
        parseEncodedMessage(msg.wasm.execute.msg.send.msg),
        {
          instantiate_payroll_contract: instantiateStructure,
        }
      )

    const isRegisterSlash = objectMatchesStructure(msg, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {
            register_slash: {
              validator: {},
              time: {},
              amount: {},
              during_unbonding: {},
            },
          },
        },
      },
    })

    const isCancel = objectMatchesStructure(msg, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {
            cancel: {},
          },
        },
      },
    })

    const isBegin = isNativeBegin || isCw20Begin

    // Defined if the message is a begin vesting message.
    const tokenLoadable = useCachedLoadable(
      isBegin
        ? genericTokenSelector({
            chainId,
            type: isNativeBegin ? TokenType.Native : TokenType.Cw20,
            denomOrAddress: isNativeBegin
              ? msg.wasm.execute.funds[0].denom
              : msg.wasm.execute.contract_addr,
          })
        : constSelector(undefined)
    )

    let instantiateMsg: VestingInstantiateMsg | undefined
    if (isBegin) {
      if (isNativeBegin) {
        instantiateMsg =
          msg.wasm.execute.msg.instantiate_native_payroll_contract
            .instantiate_msg
      }
      // isCw20Begin
      else {
        // Extract instantiate message from cw20 send message.
        instantiateMsg = parseEncodedMessage(msg.wasm.execute.msg.send.msg)
          .instantiate_payroll_contract.instantiate_msg as VestingInstantiateMsg
      }
    }

    // Attempt to load cw1-whitelist admins if the owner is set. Will only succeed
    // if the owner is a cw1-whitelist contract. Otherwise it returns undefined.
    const cw1WhitelistAdminsLoadable = useCachedLoadable(
      isBegin && instantiateMsg?.owner
        ? Cw1WhitelistSelectors.adminsIfCw1Whitelist({
            chainId,
            contractAddress: instantiateMsg.owner,
          })
        : constSelector(undefined)
    )

    if (
      tokenLoadable.state !== 'hasValue' ||
      cw1WhitelistAdminsLoadable.state !== 'hasValue'
    ) {
      return { match: false }
    }

    const token = tokenLoadable.contents
    if (isBegin && token && instantiateMsg) {
      const ownerMode = !instantiateMsg.owner
        ? 'none'
        : instantiateMsg.owner === address
        ? 'me'
        : cw1WhitelistAdminsLoadable.contents
        ? 'many'
        : 'other'

      return {
        match: true,
        data: {
          ...defaults,
          mode: 'begin',
          begin: {
            denomOrAddress: token.denomOrAddress,
            description: instantiateMsg.description || undefined,
            recipient: instantiateMsg.recipient,
            startDate: instantiateMsg.start_time
              ? new Date(
                  // nanoseconds => milliseconds
                  Number(instantiateMsg.start_time) / 1e6
                ).toLocaleString()
              : '',
            title: instantiateMsg.title,
            amount: convertMicroDenomToDenomWithDecimals(
              instantiateMsg.total,
              token.decimals
            ),
            ownerMode,
            otherOwner: (ownerMode === 'other' && instantiateMsg.owner) || '',
            manyOwners:
              ownerMode === 'many' && cw1WhitelistAdminsLoadable.contents
                ? cw1WhitelistAdminsLoadable.contents.map((address) => ({
                    address,
                  }))
                : [],
            manyOwnersCw1WhitelistContract:
              (ownerMode === 'many' && instantiateMsg.owner) || '',
            steps:
              instantiateMsg.schedule === 'saturating_linear'
                ? [
                    {
                      percent: 100,
                      delay: convertSecondsToDurationWithUnits(
                        instantiateMsg.vesting_duration_seconds
                      ),
                    },
                  ]
                : instantiateMsg.schedule.piecewise_linear.reduce(
                    (acc, [seconds, amount], index) => {
                      // Ignore first step if hardcoded 0 amount at 1 second.
                      if (index === 0 && seconds === 1 && amount === '0') {
                        return acc
                      }

                      const pastTimestamp =
                        index === 1 ||
                        // Typecheck. Always false.
                        instantiateMsg!.schedule === 'saturating_linear'
                          ? // For first user-defined step, account for 1 second
                            // delay since we ignore the first hardcoded step at 1
                            // second. When we created the msg, we subtracted 1
                            // second from the first user-defined step's delay.
                            0
                          : instantiateMsg!.schedule.piecewise_linear[
                              index - 1
                            ][0]
                      const pastAmount =
                        index === 0 ||
                        // Typecheck. Always false.
                        instantiateMsg!.schedule === 'saturating_linear'
                          ? '0'
                          : instantiateMsg!.schedule.piecewise_linear[
                              index - 1
                            ][1]

                      return [
                        ...acc,
                        {
                          percent: Number(
                            (
                              ((Number(amount) - Number(pastAmount)) /
                                Number(instantiateMsg!.total)) *
                              100
                            ).toFixed(2)
                          ),
                          delay: convertSecondsToDurationWithUnits(
                            seconds - pastTimestamp
                          ),
                        },
                      ]
                    },
                    [] as {
                      percent: number
                      delay: DurationWithUnits
                    }[]
                  ),
          },
        },
      }
    } else if (isRegisterSlash) {
      return {
        match: true,
        data: {
          ...defaults,
          mode: 'registerSlash',
          registerSlash: {
            address: msg.wasm.execute.contract_addr,
            validator: msg.wasm.execute.msg.register_slash.validator,
            time: msg.wasm.execute.msg.register_slash.time,
            amount: msg.wasm.execute.msg.register_slash.amount,
            duringUnbonding:
              msg.wasm.execute.msg.register_slash.during_unbonding,
          },
        },
      }
    } else if (isCancel) {
      return {
        match: true,
        data: {
          ...defaults,
          mode: 'cancel',
          cancel: {
            address: msg.wasm.execute.contract_addr,
          },
        },
      }
    }

    return { match: false }
  }

  // Don't show if vesting payment widget is not enabled (for DAOs) and this
  // account owns no vesting payments.
  const useHideFromPicker: UseHideFromPicker =
    context.type === ActionContextType.Dao
      ? // For a DAO, check if the widget is enabled or if it owns any payments.
        () => {
          const hasWidget = useWidget(WidgetId.VestingPayments)
          const ownedVestingPaymentsLoading = useCachedLoading(
            vestingPaymentsOwnedBySelector({
              chainId,
              address,
            }),
            undefined
          )
          const ownsVestingPayments =
            !ownedVestingPaymentsLoading.loading &&
            !!ownedVestingPaymentsLoading.data?.length

          return !hasWidget && !ownsVestingPayments
        }
      : // For a non-DAO, just check if address owns any payments.
        () => {
          const ownedVestingPaymentsLoading = useCachedLoading(
            vestingPaymentsOwnedBySelector({
              chainId,
              address,
            }),
            undefined
          )
          const ownsVestingPayments =
            !ownedVestingPaymentsLoading.loading &&
            !!ownedVestingPaymentsLoading.data?.length

          return !ownsVestingPayments
        }

  return {
    key: ActionKey.ManageVesting,
    Icon: MoneyWingsEmoji,
    label: t('title.manageVesting'),
    description: t('info.manageVestingDescription'),
    Component:
      context.type === ActionContextType.Dao ? DaoComponent : WalletComponent,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    useHideFromPicker,
  }
}
