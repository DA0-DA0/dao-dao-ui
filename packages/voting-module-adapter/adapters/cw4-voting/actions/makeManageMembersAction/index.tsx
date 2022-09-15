import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useCw4VotingModule } from '@dao-dao/state'
import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes/actions'
import { makeWasmMessage } from '@dao-dao/utils'

import {
  ManageMembersData,
  ManageMembersIcon,
  ManageMembersComponent as StatelessManageMembersComponent,
} from './ManageMembersComponent'

const useDefaults: UseDefaults<ManageMembersData> = (): ManageMembersData => ({
  toAdd: [],
  toRemove: [],
})

const useTransformToCosmos: UseTransformToCosmos<ManageMembersData> = (
  coreAddress: string
) => {
  const { cw4GroupAddress } = useCw4VotingModule(coreAddress)

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
  const { cw4GroupAddress } = useCw4VotingModule(coreAddress)

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

const Component: ActionComponent = (props) => {
  const { t } = useTranslation()
  const { members } = useCw4VotingModule(props.coreAddress, {
    fetchMembers: true,
  })
  if (!members) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <StatelessManageMembersComponent
      {...props}
      options={{
        currentMembers: members.map(({ addr }) => addr),
      }}
    />
  )
}

export const makeManageMembersAction = (): Action<ManageMembersData> => ({
  key: ActionKey.ManageMembers,
  Icon: ManageMembersIcon,
  label: 'Manage Members',
  description: 'Add, update, or remove members from the DAO.',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
