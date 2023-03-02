import { useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import { FamilyEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionMaker,
  ContractVersion,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import { makeWasmMessage } from '@dao-dao/utils'

import { AddressInput } from '../../components'
import {
  ManageSubDaosData,
  ManageSubDaosComponent as StatelessManageSubDaosComponent,
} from '../components/ManageSubDaos'
import { useActionOptions } from '../react'

const useDefaults: UseDefaults<ManageSubDaosData> = () => ({
  toAdd: [
    {
      addr: '',
    },
  ],
  toRemove: [],
})

const Component: ActionComponent = (props) => {
  const { address } = useActionOptions()

  const subDaos = useRecoilValue(
    DaoCoreV2Selectors.allSubDaoConfigsSelector({
      contractAddress: address,
    })
  )

  return (
    <StatelessManageSubDaosComponent
      {...props}
      options={{
        currentSubDaos: subDaos.map(({ address, name }) => ({
          address,
          name,
        })),
        AddressInput,
      }}
    />
  )
}

export const makeManageSubDaosAction: ActionMaker<ManageSubDaosData> = ({
  t,
  address,
  context,
}) => {
  // v1 DAOS don't support SubDAOs.
  if (
    context.type !== ActionContextType.Dao ||
    context.info.coreVersion === ContractVersion.V1
  ) {
    return null
  }

  const useTransformToCosmos: UseTransformToCosmos<ManageSubDaosData> = () =>
    useCallback(
      ({ toAdd, toRemove }) =>
        makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
              funds: [],
              msg: {
                update_sub_daos: {
                  to_add: toAdd,
                  to_remove: toRemove.map(({ address }) => address),
                },
              },
            },
          },
        }),
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageSubDaosData> = (
    msg: Record<string, any>
  ) =>
    useMemo(() => {
      if (
        'wasm' in msg &&
        'execute' in msg.wasm &&
        'contract_addr' in msg.wasm.execute &&
        msg.wasm.execute.contract_addr === address &&
        'update_sub_daos' in msg.wasm.execute.msg &&
        'to_add' in msg.wasm.execute.msg.update_sub_daos &&
        'to_remove' in msg.wasm.execute.msg.update_sub_daos
      ) {
        return {
          match: true,
          data: {
            toAdd: msg.wasm.execute.msg.update_sub_daos.to_add,
            toRemove: msg.wasm.execute.msg.update_sub_daos.to_remove.map(
              (addr: string) => ({
                addr,
              })
            ),
          },
        }
      }

      return { match: false }
    }, [msg])

  return {
    key: CoreActionKey.ManageSubDaos,
    Icon: FamilyEmoji,
    label: t('title.manageSubDaos'),
    description: t('info.manageSubDaosActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
