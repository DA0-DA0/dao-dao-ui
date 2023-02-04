import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { genericTokenSelector } from '@dao-dao/state/recoil'
import {
  ActionCardLoader,
  MoneyWingsEmoji,
  SegmentedControls,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { TokenType } from '@dao-dao/types'
import {
  ActionComponent,
  ActionMaker,
  ActionOptionsContextType,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { InstantiateMsg } from '@dao-dao/types/contracts/CwPayrollFactory'
import { UncheckedVestingParams } from '@dao-dao/types/contracts/CwVesting'
import {
  CHAIN_BECH32_PREFIX,
  NATIVE_DENOM,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  encodeMessageAsBase64,
  isValidContractAddress,
  loadableToLoadingData,
  makeWasmMessage,
  objectMatchesStructure,
  parseEncodedMessage,
} from '@dao-dao/utils'

import { ActionCard, useActionOptions } from '../../../../actions'
import { useTokenBalances } from '../../../../actions/hooks/useTokenBalances'
import {
  AddressInput,
  EntityDisplay,
  SuspenseLoader,
} from '../../../../components'
import {
  vestingFactoryOwnerSelector,
  vestingFactorySelector,
  vestingPaymentCardPropsSelector,
  vestingPaymentCardsPropsSelector,
} from '../state'
import {
  BeginVesting,
  BeginVestingData,
  CancelVesting,
  CancelVestingData,
} from './stateless'

export type ManageVestingData = {
  creating: boolean
  begin: BeginVestingData
  cancel: CancelVestingData
}

const useDefaults: UseDefaults<ManageVestingData> = () => ({
  creating: true,
  begin: {
    amount: 1000000,
    denomOrAddress: NATIVE_DENOM,
    recipient: '',
    startDate: '',
    finishDate: '',
  },
  cancel: {
    address: '',
  },
})

const Component: ActionComponent<undefined, ManageVestingData> = (props) => {
  const { t, address, chainId } = useActionOptions()

  const { setValue, watch, setError, clearErrors } = useFormContext()
  const creating = watch(props.fieldNamePrefix + 'creating')
  const cancelledAddress = watch(props.fieldNamePrefix + 'cancel.address')

  const tokenBalances = useTokenBalances()

  const vestingFactoryOwner = loadableToLoadingData(
    useCachedLoadable(
      vestingFactoryOwnerSelector({
        coreAddress: address,
        chainId,
      })
    ),
    undefined
  )

  const vestingContracts = loadableToLoadingData(
    useCachedLoadable(
      vestingPaymentCardsPropsSelector({
        coreAddress: address,
        chainId,
      })
    ),
    []
  )

  const cancelledVestingContract = loadableToLoadingData(
    useRecoilValueLoadable(
      !props.isCreating && !creating && cancelledAddress
        ? vestingPaymentCardPropsSelector({
            vestingContractAddress: cancelledAddress,
            chainId,
          })
        : constSelector(undefined)
    ),
    undefined
  )

  // Prevent action from being submitted if no address is selected while we're
  // cancelling.
  useEffect(() => {
    if (creating) {
      clearErrors(props.fieldNamePrefix + 'cancel.address')
      return
    }

    if (
      !cancelledAddress ||
      !isValidContractAddress(cancelledAddress, CHAIN_BECH32_PREFIX)
    ) {
      setError(props.fieldNamePrefix + 'cancel.address', {
        type: 'manual',
        message: t('error.noVestingContractSelected'),
      })
    } else {
      clearErrors(props.fieldNamePrefix + 'cancel.address')
    }
  }, [
    setError,
    clearErrors,
    creating,
    cancelledAddress,
    props.fieldNamePrefix,
    t,
  ])

  return (
    <SuspenseLoader
      fallback={<ActionCardLoader />}
      forceFallback={
        // Manually trigger loader.
        tokenBalances.loading
      }
    >
      <ActionCard Icon={MoneyWingsEmoji} title={t('title.manageVesting')}>
        <SegmentedControls<boolean>
          className="mb-2"
          disabled={!props.isCreating}
          onSelect={(value) =>
            setValue(props.fieldNamePrefix + 'creating', value)
          }
          selected={creating}
          tabs={[
            {
              label: t('title.beginVesting'),
              value: true,
            },
            {
              label: t('title.cancelVesting'),
              value: false,
            },
          ]}
        />

        {creating ? (
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
        ) : (
          <CancelVesting
            {...props}
            errors={props.errors?.cancel}
            fieldNamePrefix={props.fieldNamePrefix + 'cancel.'}
            options={{
              vestingContracts,
              cancelledVestingContract,
              EntityDisplay,
            }}
          />
        )}
      </ActionCard>
    </SuspenseLoader>
  )
}

const useTransformToCosmos: UseTransformToCosmos<ManageVestingData> = () => {
  const { address, chainId } = useActionOptions()

  const loadingTokenBalances = useTokenBalances()

  const vestingFactoryOwner = loadableToLoadingData(
    useCachedLoadable(
      vestingFactoryOwnerSelector({
        coreAddress: address,
        chainId,
      })
    ),
    undefined
  )

  const vestingFactoryLoadable = useRecoilValueLoadable(
    vestingFactorySelector({
      coreAddress: address,
      chainId,
    })
  )
  const vestingFactory =
    vestingFactoryLoadable.state === 'hasValue'
      ? vestingFactoryLoadable.contents
      : null

  return useCallback(
    ({ creating, begin, cancel }: ManageVestingData) => {
      if (creating) {
        if (
          loadingTokenBalances.loading ||
          !vestingFactory ||
          vestingFactoryOwner.loading
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

        const instantiateMsg: InstantiateMsg = {
          owner: vestingFactoryOwner.data,
          params: {
            amount,
            denom:
              token.type === TokenType.Native
                ? {
                    native: token.denomOrAddress,
                  }
                : {
                    cw20: token.denomOrAddress,
                  },
            recipient: begin.recipient,
            title: begin.title || undefined,
            description: begin.description || undefined,
            vesting_schedule: {
              saturating_linear: {
                min_x: !isNaN(Date.parse(begin.startDate))
                  ? // milliseconds => seconds
                    Math.round(new Date(begin.startDate).getTime() / 1000)
                  : -1,
                max_x: !isNaN(Date.parse(begin.finishDate))
                  ? // milliseconds => seconds
                    Math.round(new Date(begin.finishDate).getTime() / 1000)
                  : -1,
                min_y: amount,
                max_y: '0',
              },
            },
          },
        }

        const msg = {
          instantiate_msg: instantiateMsg,
          label: `vest_to_${begin.recipient}`,
        }

        if (token.type === TokenType.Native) {
          return makeWasmMessage({
            wasm: {
              execute: {
                contract_addr: vestingFactory,
                funds: [],
                msg: {
                  instantiate_native_payroll_contract: msg,
                },
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
                    contract: vestingFactory,
                    msg: encodeMessageAsBase64({
                      instantiate_payroll_contract: msg,
                    }),
                  },
                },
              },
            },
          })
        }
      } else {
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
    [loadingTokenBalances, vestingFactory, vestingFactoryOwner]
  )
}

const instantiateStructure = {
  instantiate_msg: {
    params: {
      amount: {},
      denom: {},
      recipient: {},
      title: {},
      description: {},
      vesting_schedule: {
        saturating_linear: {
          min_x: {},
          max_x: {},
          min_y: {},
          max_y: {},
        },
      },
    },
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
    let params: UncheckedVestingParams
    if (isNativeBegin) {
      params = (
        msg.wasm.execute.msg.instantiate_native_payroll_contract
          .instantiate_msg as InstantiateMsg
      ).params
    }
    // isCw20Begin
    else {
      // Extract instantiate message params from cw20 send message.
      params = (
        parseEncodedMessage(msg.wasm.execute.msg.send.msg)
          .instantiate_payroll_contract.instantiate_msg as InstantiateMsg
      ).params
    }

    if (!('saturating_linear' in params.vesting_schedule)) {
      return { match: false }
    }

    return {
      match: true,
      data: {
        ...defaults,
        creating: true,
        begin: {
          amount: convertMicroDenomToDenomWithDecimals(
            params.amount,
            token.decimals
          ),
          denomOrAddress: token.denomOrAddress,
          recipient: params.recipient,
          title: params.title || undefined,
          description: params.description || undefined,
          startDate: new Date(
            params.vesting_schedule.saturating_linear.min_x * 1000
          ).toLocaleString(),
          finishDate: new Date(
            params.vesting_schedule.saturating_linear.max_x * 1000
          ).toLocaleString(),
        },
      },
    }
  } else if (isCancel) {
    return {
      match: true,
      data: {
        ...defaults,
        creating: false,
        cancel: {
          address: msg.wasm.execute.contract_addr,
        },
      },
    }
  }

  return { match: false }
}

export const makeManageVestingAction: ActionMaker<ManageVestingData> = ({
  t,
  context,
}) => {
  // Only available in DAO context.
  if (context.type !== ActionOptionsContextType.Dao) {
    return null
  }

  return {
    key: CoreActionKey.ManageVesting,
    Icon: MoneyWingsEmoji,
    label: t('title.manageVesting'),
    description: t('info.manageVestingDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
