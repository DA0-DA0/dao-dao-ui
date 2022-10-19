import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes/actions'
import { makeWasmMessage } from '@dao-dao/utils'

import { useVotingModule as useCw4VotingModule } from '../../hooks/useVotingModule'
import {
  ManageMembersData,
  ManageMembersIcon,
  ManageMembersComponent as StatelessManageMembersComponent,
} from './ManageMembersComponent'

const useDefaults: UseDefaults<ManageMembersData> = (): ManageMembersData => ({
  toAdd: [],
  toRemove: [],
})

export const makeManageMembersAction: ActionMaker<ManageMembersData> = ({
  t,
  address,
}) => {
  const useTransformToCosmos: UseTransformToCosmos<ManageMembersData> = () => {
    const { cw4GroupAddress } = useCw4VotingModule(address)

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
    msg: Record<string, any>
  ) => {
    const { cw4GroupAddress } = useCw4VotingModule(address)

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
    const { members } = useCw4VotingModule(address, {
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

  return {
    key: ActionKey.ManageMembers,
    Icon: ManageMembersIcon,
    label: t('title.manageMembers'),
    description: t('info.manageMembersActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
