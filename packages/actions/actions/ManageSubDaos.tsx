import { useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { CwdCoreV2Selectors } from '@dao-dao/state'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  ActionOptionsContextType,
  ContractVersion,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes'
import { ManageSubDaosEmoji } from '@dao-dao/ui'
import { makeWasmMessage } from '@dao-dao/utils'

import {
  ManageSubDaosData,
  ManageSubDaosComponent as StatelessManageSubDaosComponent,
} from '../components/ManageSubDaos'

const useDefaults: UseDefaults<ManageSubDaosData> = () => ({
  toAdd: [
    {
      addr: '',
    },
  ],
  toRemove: [],
})

export const makeManageSubDaosAction: ActionMaker<ManageSubDaosData> = ({
  t,
  address,
  context,
}) => {
  // v1 DAOS don't support SubDAOs.
  if (
    context.type !== ActionOptionsContextType.Dao ||
    context.coreVersion === ContractVersion.V0_1_0
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

  const Component: ActionComponent = (props) => {
    const subDaos = useRecoilValue(
      CwdCoreV2Selectors.allSubDaoConfigsSelector({
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
        }}
      />
    )
  }

  return {
    key: ActionKey.ManageSubDaos,
    Icon: ManageSubDaosEmoji,
    label: t('title.manageSubDaos'),
    description: t('info.manageSubDaosActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
