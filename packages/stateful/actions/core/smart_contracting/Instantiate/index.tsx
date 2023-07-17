import { Coin } from '@cosmjs/stargate'
import JSON5 from 'json5'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector } from 'recoil'

import { PolytoneListenerSelectors } from '@dao-dao/state/recoil'
import {
  BabyEmoji,
  ChainPickerInput,
  ChainProvider,
  useCachedLoading,
} from '@dao-dao/stateless'
import { PolytoneNote, TokenType } from '@dao-dao/types'
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
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  decodePolytoneExecuteMsg,
  getNativeTokenForChainId,
  makePolytoneExecuteMessage,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useExecutedProposalTxLoadable } from '../../../../hooks/useExecutedProposalTxLoadable'
import { useTokenBalances } from '../../../hooks'
import { useActionOptions } from '../../../react'
import { InstantiateComponent as StatelessInstantiateComponent } from './Component'

interface InstantiateData {
  chainId: string
  admin: string
  codeId: number
  label: string
  message: string
  funds: { denom: string; amount: number }[]

  // Loaded on transform once created if this is a polytone message.
  _polytone?: {
    chainId: string
    note: PolytoneNote
    initiatorMsg: string
  }
}

const useTransformToCosmos: UseTransformToCosmos<InstantiateData> = () => {
  const currentChainId = useActionOptions().chain.chain_id

  return useCallback(
    ({ chainId, admin, codeId, label, message, funds }: InstantiateData) => {
      let msg
      try {
        msg = JSON5.parse(message)
      } catch (err) {
        console.error(`internal error. unparsable message: (${message})`, err)
        return
      }

      const instantiateMsg = makeWasmMessage({
        wasm: {
          instantiate: {
            admin: admin || null,
            code_id: codeId,
            funds: funds.map(({ denom, amount }) => ({
              denom,
              amount: convertDenomToMicroDenomWithDecimals(
                amount,
                getNativeTokenForChainId(chainId).decimals
              ).toString(),
            })),
            label,
            msg,
          },
        },
      })

      if (chainId === currentChainId) {
        return instantiateMsg
      } else {
        return makePolytoneExecuteMessage(chainId, instantiateMsg)
      }
    },
    [currentChainId]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<InstantiateData> = (
  msg: Record<string, any>
) => {
  let chainId = useActionOptions().chain.chain_id
  const decodedPolytone = decodePolytoneExecuteMsg(msg)
  if (decodedPolytone.match) {
    chainId = decodedPolytone.chainId
    msg = decodedPolytone.msg
  }

  return objectMatchesStructure(msg, {
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
          chainId,
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
                  getNativeTokenForChainId(chainId).decimals
                )
              ),
            })
          ),
          _polytone: decodedPolytone.match
            ? {
                chainId: decodedPolytone.chainId,
                note: decodedPolytone.polytoneNote,
                initiatorMsg: decodedPolytone.initiatorMsg,
              }
            : undefined,
        },
      }
    : {
        match: false,
      }
}

const Component: ActionComponent = (props) => {
  const {
    context,
    address,
    chain: { chain_id: currentChainId },
  } = useActionOptions()

  const { watch, setValue } = useFormContext<InstantiateData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const funds = watch((props.fieldNamePrefix + 'funds') as 'funds')

  // Once created, if this is a polytone message, this will be defined with
  // polytone metadata that can be used to get the instantiated address.
  const _polytone = watch((props.fieldNamePrefix + '_polytone') as '_polytone')
  // Callback results.
  const polytoneResult = useCachedLoading(
    _polytone
      ? PolytoneListenerSelectors.resultSelector({
          chainId: currentChainId,
          contractAddress: _polytone.note.listener,
          params: [
            {
              initiator: address,
              initiatorMsg: _polytone.initiatorMsg,
            },
          ],
        })
      : constSelector(undefined),
    undefined
  )

  const nativeBalances = useTokenBalances({
    filter: TokenType.Native,
    // Load selected tokens when not creating in case they are no longer
    // returned in the list of all tokens for the given DAO/wallet after the
    // proposal is made.
    additionalTokens: props.isCreating
      ? undefined
      : funds.map(({ denom }) => ({
          chainId,
          type: TokenType.Native,
          denomOrAddress: denom,
        })),
    allChains: true,
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
  const getInstantiatedAddress = () => {
    // If polytone, can get from the polytone execution results directly.
    if (_polytone) {
      if (
        !polytoneResult.loading &&
        polytoneResult.data &&
        'execute' in polytoneResult.data.callback.result &&
        'Ok' in polytoneResult.data.callback.result.execute
      ) {
        const instantiateEvent =
          polytoneResult.data.callback.result.execute.Ok.result[0].events.find(
            ({ type }) => type === 'instantiate'
          )
        return instantiateEvent?.attributes.find(
          ({ key }) => key === '_contract_address'
        )?.value
      }

      return
    }

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
          actionKey === ActionKey.Instantiate &&
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
  }
  const instantiatedAddress = getInstantiatedAddress()

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <ChainPickerInput
          className="mb-4"
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onChange={(chainId) => {
            // Reset funds and update admin when switching chain.
            setValue((props.fieldNamePrefix + 'funds') as 'funds', [])
            setValue(
              (props.fieldNamePrefix + 'admin') as 'admin',
              chainId === currentChainId
                ? address
                : context.info.polytoneProxies[chainId] ?? ''
            )
          }}
        />
      )}

      <ChainProvider chainId={chainId}>
        <StatelessInstantiateComponent
          {...props}
          options={{
            nativeBalances,
            instantiatedAddress,
          }}
        />
      </ChainProvider>
    </>
  )
}

export const makeInstantiateAction: ActionMaker<InstantiateData> = ({
  t,
  address,
  chain: { chain_id: chainId },
}) => {
  const useDefaults: UseDefaults<InstantiateData> = () => ({
    chainId,
    admin: address,
    codeId: 0,
    label: '',
    message: '{}',
    funds: [],
  })

  return {
    key: ActionKey.Instantiate,
    Icon: BabyEmoji,
    label: t('title.instantiateSmartContract'),
    description: t('info.instantiateSmartContractActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
