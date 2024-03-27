import { useCallback } from 'react'

import { PeopleEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { makeWasmMessage } from '@dao-dao/utils'

import { useActionOptions } from '../../../../../actions'
import { AddressInput, EntityDisplay } from '../../../../../components'
import { useLoadingVotingModule } from '../../hooks/useLoadingVotingModule'
import {
  ManageMembersData,
  ManageMembersComponent as StatelessManageMembersComponent,
} from './Component'

const useDefaults: UseDefaults<ManageMembersData> = (): ManageMembersData => ({
  toAdd: [],
  toRemove: [],
})

const Component: ActionComponent = (props) => {
  const { address } = useActionOptions()

  const votingModule = useLoadingVotingModule(address, {
    fetchMembers: true,
  })

  return (
    <StatelessManageMembersComponent
      {...props}
      options={{
        currentMembers:
          votingModule.loading || votingModule.errored
            ? { loading: true }
            : {
                loading: false,
                data: votingModule.data.members?.map(({ addr }) => addr) || [],
              },
        AddressInput,
        EntityDisplay,
      }}
    />
  )
}

export const makeManageMembersAction: ActionMaker<ManageMembersData> = ({
  t,
  address,
}) => {
  const useTransformToCosmos: UseTransformToCosmos<ManageMembersData> = () => {
    const votingModule = useLoadingVotingModule(address)
    const cw4GroupAddress =
      votingModule.loading || votingModule.errored
        ? undefined
        : votingModule.data.cw4GroupAddress

    return useCallback(
      ({ toAdd, toRemove }) => {
        if (!cw4GroupAddress) {
          throw new Error(t('error.loadingData'))
        }

        return makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: cw4GroupAddress,
              funds: [],
              msg: {
                update_members: {
                  add: toAdd,
                  remove: toRemove,
                },
              },
            },
          },
        })
      },
      [cw4GroupAddress]
    )
  }

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageMembersData> = (
    msg: Record<string, any>
  ) => {
    const votingModule = useLoadingVotingModule(address)
    const cw4GroupAddress =
      votingModule.loading || votingModule.errored
        ? undefined
        : votingModule.data.cw4GroupAddress

    if (
      cw4GroupAddress &&
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
          toRemove: msg.wasm.execute.msg.update_members.remove,
        },
      }
    }

    return {
      match: false,
    }
  }

  return {
    key: ActionKey.ManageMembers,
    Icon: PeopleEmoji,
    label: t('title.manageMembers'),
    description: t('info.manageMembersActionDescription'),
    notReusable: true,
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    // Show at the top.
    order: 1,
  }
}
