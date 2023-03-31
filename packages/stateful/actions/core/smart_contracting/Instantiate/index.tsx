import { Coin } from '@cosmjs/stargate'
import JSON5 from 'json5'
import { useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { BabyEmoji } from '@dao-dao/stateless'
import { TokenType } from '@dao-dao/types'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  NATIVE_TOKEN,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useExecutedProposalTxLoadable } from '../../../../hooks/useExecutedProposalTxLoadable'
import { useTokenBalances } from '../../../hooks'
import { InstantiateComponent as StatelessInstantiateComponent } from './Component'

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
              NATIVE_TOKEN.decimals
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
  objectMatchesStructure(msg, {
    wasm: {
      instantiate: {
        code_id: {},
        label: {},
        msg: {},
        funds: {},
      },
    },
  })
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
                  NATIVE_TOKEN.decimals
                )
              ),
            })
          ),
        },
      }
    : {
        match: false,
      }

const Component: ActionComponent = (props) => {
  // Get the selected tokens if not creating.
  const { watch } = useFormContext<InstantiateData>()
  const funds = watch((props.fieldNamePrefix + 'funds') as 'funds')

  const nativeBalances = useTokenBalances({
    filter: TokenType.Native,
    // Load selected tokens when not creating in case they are no longer
    // returned in the list of all tokens for the given DAO/wallet after the
    // proposal is made.
    additionalTokens: props.isCreating
      ? undefined
      : funds.map(({ denom }) => ({
          type: TokenType.Native,
          denomOrAddress: denom,
        })),
  })

  // If in DAO context, use executed proposal TX events to find instantiated
  // address if already instantiated. If in wallet context, there will be no tx.
  const executedTxLoadable = useExecutedProposalTxLoadable()

  const codeId: number = watch((props.fieldNamePrefix + 'codeId') as 'codeId')
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
    if (
      executedTxLoadable.state !== 'hasValue' ||
      !executedTxLoadable.contents
    ) {
      return
    }

    // All instantiate actions' data that instantiate the same code ID.
    const instantiateActionsData = props.allActionsWithData
      .filter(
        ({ actionKey, data }) =>
          actionKey === CoreActionKey.Instantiate &&
          'codeId' in data &&
          data.codeId === codeId
      )
      .map(({ data }) => data) as InstantiateData[]
    // Index of this action in the list of all instantiation actions for this
    // code ID.
    const innerIndex = instantiateActionsData.indexOf(
      props.allActionsWithData[props.index].data
    )
    // Should never happen since this action is part of all actions.
    if (innerIndex === -1) {
      throw new Error(
        'internal error: could not find inner instantiation action index'
      )
    }

    // Instantiated contracts from the transaction data for this code ID.
    const instantiatedContracts = executedTxLoadable.contents.events
      .map(({ type, attributes }) =>
        type === 'instantiate' &&
        attributes.some(
          ({ key, value }) => key === 'code_id' && value === codeId.toString()
        )
          ? attributes.find(({ key }) => key === '_contract_address')?.value
          : null
      )
      .filter((attr): attr is string => !!attr)

    // If the instantiated contracts length does not match the actual
    // instantiation events from the chain, then another message must've
    // instantiated the same contract, so we cannot definitively locate the
    // address.
    if (instantiateActionsData.length !== instantiatedContracts.length) {
      return
    }

    return instantiatedContracts[innerIndex]
  }, [executedTxLoadable, props, codeId])

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
