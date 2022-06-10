import JSON5 from 'json5'
import { useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue } from 'recoil'

import { transactionEventsSelector, useProposalInfo } from '@dao-dao/state'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import { makeWasmMessage, VotingModuleType } from '@dao-dao/utils'

import {
  Template,
  TemplateKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
  InstantiateComponent as StatelessInstantiateComponent,
  TemplateComponent,
} from '../components'

interface InstantiateData {
  codeId: number
  label: string
  message: string
}

const useDefaults: UseDefaults<InstantiateData> = () => ({
  codeId: 0,
  label: '',
  message: '{}',
})

const useTransformToCosmos: UseTransformToCosmos<InstantiateData> = () =>
  useCallback(({ codeId, label, message }: InstantiateData) => {
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
          admin: null,
          code_id: codeId,
          funds: [],
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
              codeId: msg.wasm.instantiate.code_id,
              label: msg.wasm.instantiate.label,
              message: JSON.stringify(msg.wasm.instantiate.msg, undefined, 2),
            },
          }
        : { match: false },
    [msg]
  )

const Component: TemplateComponent = (props) => {
  const { proposalResponse, txHash } = useProposalInfo(
    props.coreAddress,
    props.proposalId
  )
  const txEvents = useRecoilValue(
    proposalResponse?.proposal?.status === Status.Executed && txHash
      ? transactionEventsSelector(txHash)
      : constSelector(undefined)
  )

  const { watch } = useFormContext()
  const codeId: number = watch(props.getLabel('codeId'))
  // This gets all instantiation templates that instantiate the same codeId
  // and all addresses actually instantiated in the transaction on-chain.
  // If these two lists are not the same length, then another instantiation
  // occurred in this transaction (likely via a custom message or a
  // contract execution) for the same code ID, and we cannot detect the
  // correct address. If the lists are the same length, there is a 1:1
  // mapping of instantiation templates to instantiated addresses, so we
  // can use the index of this template in all instantiation templates to
  // select the correct address.
  const instantiatedAddress = useMemo(() => {
    if (!txEvents) {
      return
    }

    // All instantiate templates' data that instantiate the same code ID.
    const instantiateTemplatesData = props.allTemplatesWithData
      .filter(
        ({ key, data }) =>
          key === TemplateKey.Instantiate &&
          'codeId' in data &&
          data.codeId === codeId
      )
      .map(({ data }) => data) as InstantiateData[]
    // Index of this template in the list of all instantiation templates.
    const innerIndex = instantiateTemplatesData.indexOf(
      props.allTemplatesWithData[props.index].data
    )
    // Should never happen since this template is part of all templates.
    if (innerIndex === -1) {
      throw new Error(
        'internal error: could not find inner instantiation template index'
      )
    }

    // Instantiation events from the transaction data.
    const instantiationAttributes: { key: string; value: string }[] =
      txEvents.find(({ type }) => type === 'instantiate')?.attributes ?? []
    // Instantiated addresses for the code ID this template instantiated.
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

    // If the instantiation template length does not match the actual
    // instantiation events from the chain, then another message must've
    // instantiated the contract, so we cannot definitively locate the
    // address.
    if (instantiateTemplatesData.length !== codeIdInstantiations.length) {
      return
    }

    return codeIdInstantiations[innerIndex]
  }, [txEvents, props, codeId])

  return (
    <StatelessInstantiateComponent
      {...props}
      options={{
        instantiatedAddress,
      }}
    />
  )
}

export const instantiateTemplate: Template<InstantiateData> = {
  key: TemplateKey.Instantiate,
  label: '👶 Instantiate Smart Contract',
  description: 'Instantiate a smart contract.',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
  votingModuleTypes: [
    VotingModuleType.Cw20StakedBalanceVoting,
    VotingModuleType.Cw4Voting,
  ],
}
