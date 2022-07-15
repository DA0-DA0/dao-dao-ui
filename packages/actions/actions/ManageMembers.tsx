import { useCallback, useMemo } from 'react'

import { useVotingModule } from '@dao-dao/state'
import { SuspenseLoader } from '@dao-dao/ui'
import { VotingModuleType, makeWasmMessage } from '@dao-dao/utils'

import {
  ActionCardLoader,
  ManageMembersData,
  ManageMembersComponent as StatelessManageMembersComponent,
} from '../components'
import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '../types'

const useDefaults: UseDefaults<ManageMembersData> = (): ManageMembersData => ({
  toAdd: [],
  toRemove: [],
})

const useTransformToCosmos: UseTransformToCosmos<ManageMembersData> = (
  coreAddress: string
) => {
  const { cw4GroupAddress } = useVotingModule(coreAddress)

  if (!cw4GroupAddress) {
    throw new Error('Failed to load data.')
  }

  return useCallback(
    ({ toAdd, toRemove }) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: cw4GroupAddress,
            funds: [],
            msg: {
              update_members: {
                add: toAdd,
                remove: toRemove.map(({ addr }) => addr),
              },
            },
          },
        },
      }),
    [cw4GroupAddress]
  )
}
const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageMembersData> = (
  msg: Record<string, any>,
  coreAddress: string
) => {
  const { cw4GroupAddress } = useVotingModule(coreAddress)

  if (!cw4GroupAddress) {
    throw new Error('Failed to load data.')
  }

  return useMemo(() => {
    if (
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'contract_addr' in msg.wasm.execute &&
      msg.wasm.execute.contract_addr === cw4GroupAddress &&
      'update_members' in msg.wasm.execute.msg &&
      'add' in msg.wasm.execute.msg.update_members &&
      'remove' in msg.wasm.execute.msg.update_members
    ) {
      return {
        match: true,
        data: {
          toAdd: msg.wasm.execute.msg.update_members.add,
          toRemove: msg.wasm.execute.msg.update_members.remove.map(
            (addr: string) => ({
              addr,
            })
          ),
        },
      }
    }

    return { match: false }
  }, [cw4GroupAddress, msg])
}

const InnerManageMembersComponent: ActionComponent = (props) => {
  const { cw4VotingMembers } = useVotingModule(props.coreAddress, {
    fetchCw4VotingMembers: true,
  })

  if (!cw4VotingMembers) {
    throw new Error('Failed to load data.')
  }

  return (
    <StatelessManageMembersComponent
      {...props}
      options={{
        currentMembers: cw4VotingMembers.map(({ addr }) => addr),
      }}
    />
  )
}

const Component: ActionComponent = (props) => (
  <SuspenseLoader fallback={<ActionCardLoader />}>
    <InnerManageMembersComponent {...props} />
  </SuspenseLoader>
)

export const manageMembersAction: Action<ManageMembersData> = {
  key: ActionKey.ManageMembers,
  label: '👥 Manage Members',
  description: 'Add, update, or remove members from the DAO.',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
  votingModuleTypes: [VotingModuleType.Cw4Voting],
}
