import { coins } from '@cosmjs/amino'
import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import {
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
  SegmentedControlsProps,
  TokenType,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  ExecuteMsg,
  InstantiateNativePayrollContractMsg,
} from '@dao-dao/types/contracts/CwPayrollFactory'
import { InstantiateMsg as VestingInstantiateMsg } from '@dao-dao/types/contracts/CwVesting'
import {
  CHAIN_BECH32_PREFIX,
  NATIVE_DENOM,
  convertDenomToMicroDenomWithDecimals,
  convertDurationWithUnitsToSeconds,
  convertMicroDenomToDenomWithDecimals,
  convertSecondsToDurationWithUnits,
  encodeMessageAsBase64,
  isValidContractAddress,
  loadableToLoadingData,
  makeWasmMessage,
  objectMatchesStructure,
  parseEncodedMessage,
} from '@dao-dao/utils'

import { useTokenBalances } from '../../../../../actions/hooks/useTokenBalances'
import {
  AddressInput,
  EntityDisplay,
  SuspenseLoader,
  Trans,
} from '../../../../../components'
import {
  vestingFactoryOwnerSelector,
  vestingInfoSelector,
  vestingInfosSelector,
} from '../../Renderer/state'
import { VestingPaymentsData } from '../../types'
import { BeginVesting, BeginVestingData } from './BeginVesting'
import { CancelVesting, CancelVestingData } from './CancelVesting'
import { RegisterSlash, RegisterSlashData } from './RegisterSlash'

export type ManageVestingData = {
  mode: 'begin' | 'cancel' | 'registerSlash'
  begin: BeginVestingData
  cancel: CancelVestingData
  registerSlash: RegisterSlashData
}

const useDefaults: UseDefaults<ManageVestingData> = () => ({
  mode: 'begin',
  begin: {
    amount: 1,
    denomOrAddress: NATIVE_DENOM,
    recipient: '',
    startDate: '',
    title: '',
    duration: {
      value: 1,
      units: DurationUnits.Years,
    },
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
})

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

const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageVestingData> = (
  msg: Record<string, any>
) => {
  const defaults = useDefaults()

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
    objectMatchesStructure(parseEncodedMessage(msg.wasm.execute.msg.send.msg), {
      instantiate_payroll_contract: instantiateStructure,
    })

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
          type: isNativeBegin ? TokenType.Native : TokenType.Cw20,
          denomOrAddress: isNativeBegin
            ? msg.wasm.execute.funds[0].denom
            : msg.wasm.execute.contract_addr,
        })
      : constSelector(undefined)
  )

  if (tokenLoadable.state !== 'hasValue') {
    return { match: false }
  }

  const token = tokenLoadable.contents
  if (isBegin && token) {
    let instantiateMsg: VestingInstantiateMsg
    if (isNativeBegin) {
      instantiateMsg =
        msg.wasm.execute.msg.instantiate_native_payroll_contract.instantiate_msg
    }
    // isCw20Begin
    else {
      // Extract instantiate message from cw20 send message.
      instantiateMsg = parseEncodedMessage(msg.wasm.execute.msg.send.msg)
        .instantiate_payroll_contract.instantiate_msg as VestingInstantiateMsg
    }

    // Can only render saturating linear vesting schedules.
    if (instantiateMsg.schedule !== 'saturating_linear') {
      return { match: false }
    }

    return {
      match: true,
      data: {
        ...defaults,
        mode: 'begin',
        begin: {
          denomOrAddress: token.denomOrAddress,
          description: instantiateMsg.description || undefined,
          recipient: instantiateMsg.recipient,
          schedule: instantiateMsg.schedule,
          startDate: instantiateMsg.start_time
            ? new Date(
                // nanoseconds => milliseconds
                Number(instantiateMsg.start_time) / 1e6
              ).toLocaleString()
            : undefined,
          title: instantiateMsg.title,
          amount: convertMicroDenomToDenomWithDecimals(
            instantiateMsg.total,
            token.decimals
          ),
          duration: convertSecondsToDurationWithUnits(
            instantiateMsg.vesting_duration_seconds
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
          duringUnbonding: msg.wasm.execute.msg.register_slash.during_unbonding,
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

export const makeManageVestingActionMaker =
  ({ factory }: VestingPaymentsData): ActionMaker<ManageVestingData> =>
  ({ t, context, chain: { chain_id: chainId } }) => {
    // Only available in DAO context.
    if (context.type !== ActionContextType.Dao) {
      return null
    }

    const useTransformToCosmos: UseTransformToCosmos<
      ManageVestingData
    > = () => {
      const loadingTokenBalances = useTokenBalances()

      const vestingFactoryOwner = loadableToLoadingData(
        useCachedLoadable(
          vestingFactoryOwnerSelector({
            factory,
            chainId,
          })
        ),
        undefined
      )

      const nativeUnstakingDurationSecondsLoadable = useRecoilValueLoadable(
        nativeUnstakingDurationSecondsSelector({
          chainId,
        })
      )

      return useCallback(
        ({ mode, begin, registerSlash, cancel }: ManageVestingData) => {
          if (mode === 'begin') {
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

            const amount = convertDenomToMicroDenomWithDecimals(
              begin.amount,
              token.decimals
            ).toString()

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
              owner: vestingFactoryOwner.data,
              recipient: begin.recipient,
              schedule: 'saturating_linear',
              start_time:
                begin.startDate && !isNaN(Date.parse(begin.startDate))
                  ? // milliseconds => nanoseconds
                    Math.round(
                      new Date(begin.startDate).getTime() * 1e6
                    ).toString()
                  : '',
              title: begin.title,
              total: amount,
              unbonding_duration_seconds:
                token.type === TokenType.Native &&
                token.denomOrAddress === NATIVE_DENOM
                  ? nativeUnstakingDurationSecondsLoadable.contents
                  : 0,
              vesting_duration_seconds: convertDurationWithUnitsToSeconds(
                begin.duration
              ),
            }

            const msg: InstantiateNativePayrollContractMsg = {
              instantiate_msg: instantiateMsg,
              label: `vest_to_${begin.recipient}_${Date.now()}`,
            }

            if (token.type === TokenType.Native) {
              return makeWasmMessage({
                wasm: {
                  execute: {
                    contract_addr: factory,
                    funds: coins(amount, token.denomOrAddress),
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
                        amount,
                        contract: factory,
                        msg: encodeMessageAsBase64({
                          instantiate_payroll_contract: msg,
                        }),
                      },
                    },
                  },
                },
              })
            }
          } else if (mode === 'registerSlash') {
            return makeWasmMessage({
              wasm: {
                execute: {
                  contract_addr: registerSlash.address,
                  funds: [],
                  msg: {
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
          } else if (mode === 'cancel') {
            return makeWasmMessage({
              wasm: {
                execute: {
                  contract_addr: cancel.address,
                  funds: [],
                  msg: {
                    cancel: {},
                  },
                },
              },
            })
          }
        },
        [
          loadingTokenBalances,
          nativeUnstakingDurationSecondsLoadable,
          vestingFactoryOwner,
        ]
      )
    }

    const Component: ActionComponent<undefined, ManageVestingData> = (
      props
    ) => {
      const { t } = useTranslation()

      const { setValue, watch, setError, clearErrors } =
        useFormContext<ManageVestingData>()
      const mode = watch((props.fieldNamePrefix + 'mode') as 'mode')
      const selectedAddress =
        mode === 'registerSlash'
          ? watch(
              (props.fieldNamePrefix +
                'registerSlash.address') as 'registerSlash.address'
            )
          : mode === 'cancel'
          ? watch(
              (props.fieldNamePrefix + 'cancel.address') as 'cancel.address'
            )
          : undefined

      const tokenBalances = useTokenBalances()

      const vestingFactoryOwner = loadableToLoadingData(
        useCachedLoadable(
          vestingFactoryOwnerSelector({
            factory,
            chainId,
          })
        ),
        undefined
      )

      const vestingInfos = loadableToLoadingData(
        useCachedLoadable(
          vestingInfosSelector({
            factory,
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
          !isValidContractAddress(selectedAddress, CHAIN_BECH32_PREFIX)
        ) {
          setError(
            (props.fieldNamePrefix +
              `${mode}.address`) as `${typeof mode}.address`,
            {
              type: 'manual',
              message: t('error.noVestingContractSelected'),
            }
          )
        } else {
          clearErrors(
            (props.fieldNamePrefix +
              `${mode}.address`) as `${typeof mode}.address`
          )
        }
      }, [
        setError,
        clearErrors,
        props.fieldNamePrefix,
        t,
        mode,
        selectedAddress,
      ])

      const tabs: SegmentedControlsProps<ManageVestingData['mode']>['tabs'] = [
        {
          label: t('title.beginVesting'),
          value: 'begin',
        },
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
                tokens: tokenBalances.loading ? [] : tokenBalances.data,
                vestingFactoryOwner,
                AddressInput,
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
              }}
            />
          ) : null}
        </SuspenseLoader>
      )
    }

    return {
      key: ActionKey.ManageVesting,
      Icon: MoneyWingsEmoji,
      label: t('title.manageVesting'),
      description: t('info.manageVestingDescription'),
      Component,
      useDefaults,
      useTransformToCosmos,
      useDecodedCosmosMsg,
    }
  }
