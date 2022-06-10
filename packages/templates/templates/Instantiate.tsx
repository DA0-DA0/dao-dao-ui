import JSON5 from 'json5'
import { useCallback, useMemo } from 'react'
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
  const instantiatedAddress = (
    txEvents?.find(({ type }) => type === 'instantiate')?.attributes as
      | { key: string; value: string }[]
      | undefined
  )?.filter(({ key }) => key === '_contract_address')[props.indexInType]?.value

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
