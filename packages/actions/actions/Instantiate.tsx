import { Coin } from '@cosmjs/stargate'
import JSON5 from 'json5'
import { useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue } from 'recoil'

import { useProposalModuleAdapter } from '@dao-dao/proposal-module-adapter'
import {
  nativeBalancesSelector,
  transactionEventsSelector,
} from '@dao-dao/state'
import {
  NATIVE_DECIMALS,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeWasmMessage,
} from '@dao-dao/utils'

import {
  InstantiateIcon,
  InstantiateComponent as StatelessInstantiateComponent,
} from '../components'
import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '../types'

interface InstantiateData {
  admin: string
  codeId: number
  label: string
  message: string
  funds: { denom: string; amount: number }[]
}

const useDefaults: UseDefaults<InstantiateData> = (coreAddress) => ({
  admin: coreAddress,
  codeId: 0,
  label: '',
  message: '{}',
  funds: [],
})

const useTransformToCosmos: UseTransformToCosmos<InstantiateData> = () =>
  useCallback(({ admin, codeId, label, message, funds }: InstantiateData) => {
    let msg
    try {
      msg = JSON5.parse(message)
    } catch (err) {
      console.error(`internal error. unparsable message: (${message})`, err)
      return
    }

    return makeWasmMessage({
      wasm: {
        instantiate: {
          admin: admin || null,
          code_id: codeId,
          funds: funds.map(({ denom, amount }) => ({
            denom,
            amount: convertDenomToMicroDenomWithDecimals(
              amount,
              NATIVE_DECIMALS
            ),
          })),
          label,
          msg,
        },
      },
    })
  }, [])

const useDecodedCosmosMsg: UseDecodedCosmosMsg<InstantiateData> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'wasm' in msg && 'instantiate' in msg.wasm
        ? {
            match: true,
            data: {
              admin: msg.wasm.instantiate.admin ?? '',
              codeId: msg.wasm.instantiate.code_id,
              label: msg.wasm.instantiate.label,
              message: JSON.stringify(msg.wasm.instantiate.msg, undefined, 2),
              funds: (msg.wasm.instantiate.funds as Coin[]).map(
                ({ denom, amount }) => ({
                  denom,
                  amount: Number(
                    convertMicroDenomToDenomWithDecimals(
                      amount,
                      NATIVE_DECIMALS
                    )
                  ),
                })
              ),
            },
          }
        : { match: false },
    [msg]
  )

const Component: ActionComponent = (props) => {
  const nativeBalances =
    useRecoilValue(nativeBalancesSelector(props.coreAddress)) ?? []

  const {
    hooks: { useProposalExecutionTxHash },
  } = useProposalModuleAdapter()
  const executionTxHash = useProposalExecutionTxHash()

  const txEvents = useRecoilValue(
    executionTxHash
      ? transactionEventsSelector(executionTxHash)
      : constSelector(undefined)
  )

  const { watch } = useFormContext()
  const codeId: number = watch(props.getFieldName('codeId'))
  // This gets all instantiation actions that instantiate the same codeId
  // and all addresses actually instantiated in the transaction on-chain.
  // If these two lists are not the same length, then another instantiation
  // occurred in this transaction (likely via a custom message or a
  // contract execution) for the same code ID, and we cannot detect the
  // correct address. If the lists are the same length, there is a 1:1
  // mapping of instantiation actions to instantiated addresses, so we
  // can use the index of this action in all instantiation actions to
  // select the correct address.
  const instantiatedAddress = useMemo(() => {
    if (!txEvents) {
      return
    }

    // All instantiate actions' data that instantiate the same code ID.
    const instantiateActionsData = props.allActionsWithData
      .filter(
        ({ key, data }) =>
          key === ActionKey.Instantiate &&
          'codeId' in data &&
          data.codeId === codeId
      )
      .map(({ data }) => data) as InstantiateData[]
    // Index of this action in the list of all instantiation actions.
    const innerIndex = instantiateActionsData.indexOf(
      props.allActionsWithData[props.index].data
    )
    // Should never happen since this action is part of all actions.
    if (innerIndex === -1) {
      throw new Error(
        'internal error: could not find inner instantiation action index'
      )
    }

    // Instantiation events from the transaction data.
    const instantiationAttributes: { key: string; value: string }[] =
      txEvents.find(({ type }) => type === 'instantiate')?.attributes ?? []
    // Instantiated addresses for the code ID this action instantiated.
    const codeIdInstantiations = instantiationAttributes.reduce(
      (acc, { key, value }, index) => [
        ...acc,
        ...(key === '_contract_address' &&
        instantiationAttributes[index + 1].key === 'code_id' &&
        Number(instantiationAttributes[index + 1].value) === codeId
          ? [value]
          : []),
      ],
      [] as string[]
    )

    // If the instantiation action length does not match the actual
    // instantiation events from the chain, then another message must've
    // instantiated the contract, so we cannot definitively locate the
    // address.
    if (instantiateActionsData.length !== codeIdInstantiations.length) {
      return
    }

    return codeIdInstantiations[innerIndex]
  }, [txEvents, props, codeId])

  return (
    <StatelessInstantiateComponent
      {...props}
      options={{
        nativeBalances,
        instantiatedAddress,
      }}
    />
  )
}

export const instantiateAction: Action<InstantiateData> = {
  key: ActionKey.Instantiate,
  Icon: InstantiateIcon,
  label: 'Instantiate Smart Contract',
  description: 'Instantiate a smart contract.',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
}
