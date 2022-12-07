import { Coin } from '@cosmjs/stargate'
import JSON5 from 'json5'
import { useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue } from 'recoil'

import {
  nativeBalancesSelector,
  transactionEventsSelector,
} from '@dao-dao/state'
import { BabyEmoji, useCachedLoadable } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  NATIVE_DECIMALS,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeWasmMessage,
} from '@dao-dao/utils'

import { useProposalModuleAdapterIfAvailable } from '../../proposal-module-adapter/react/context'
import { InstantiateComponent as StatelessInstantiateComponent } from '../components/Instantiate'

interface InstantiateData {
  admin: string
  codeId: number
  label: string
  message: string
  funds: { denom: string; amount: number }[]
}

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
            ).toString(),
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

export const makeInstantiateAction: ActionMaker<InstantiateData> = ({
  t,
  address,
}) => {
  const useDefaults: UseDefaults<InstantiateData> = () => ({
    admin: address,
    codeId: 0,
    label: '',
    message: '{}',
    funds: [],
  })

  const Component: ActionComponent = (props) => {
    const nativeBalances = useRecoilValue(nativeBalancesSelector({ address }))

    // If in DAO context, use proposal execution hash to find instantiated
    // address if already instantiated. If in wallet context, proposal module
    // adapter will not be available.
    const {
      hooks: { useProposalExecutionTxHash },
    } = useProposalModuleAdapterIfAvailable() ?? { hooks: {} }
    const loadingExecutionTxHash = useProposalExecutionTxHash?.()

    const txEventsLoadable = useCachedLoadable(
      loadingExecutionTxHash
        ? loadingExecutionTxHash.loading
          ? // If still loading, return undefined to indicate loading.
            undefined
          : loadingExecutionTxHash.data
          ? transactionEventsSelector({ txHash: loadingExecutionTxHash.data })
          : // If no data, return undefined.
            constSelector(undefined)
        : // If loading value undefined, return undefined.
          constSelector(undefined)
    )

    const { watch } = useFormContext()
    const codeId: number = watch(props.fieldNamePrefix + 'codeId')
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
      if (txEventsLoadable.state !== 'hasValue' || !txEventsLoadable.contents) {
        return
      }
      const txEvents = txEventsLoadable.contents

      // All instantiate actions' data that instantiate the same code ID.
      const instantiateActionsData = props.allActionsWithData
        .filter(
          ({ key, data }) =>
            key === CoreActionKey.Instantiate &&
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
      const instantiationAttributes =
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
    }, [txEventsLoadable, props, codeId])

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

  return {
    key: CoreActionKey.Instantiate,
    Icon: BabyEmoji,
    label: t('title.instantiateSmartContract'),
    description: t('info.instantiateSmartContractActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
