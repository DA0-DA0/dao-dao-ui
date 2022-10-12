import { useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { CwdCoreV2Selectors } from '@dao-dao/state'
import {
  Action,
  ActionComponent,
  ActionKey,
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

const useTransformToCosmos: UseTransformToCosmos<ManageSubDaosData> = (
  coreAddress: string
) =>
  useCallback(
    ({ toAdd, toRemove }) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: coreAddress,
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
    [coreAddress]
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageSubDaosData> = (
  msg: Record<string, any>,
  coreAddress: string
) =>
  useMemo(() => {
    if (
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'contract_addr' in msg.wasm.execute &&
      msg.wasm.execute.contract_addr === coreAddress &&
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
  }, [coreAddress, msg])

const Component: ActionComponent = (props) => {
  const subDaos = useRecoilValue(
    CwdCoreV2Selectors.allSubDaoConfigsSelector({
      contractAddress: props.coreAddress,
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

export const manageSubDaosAction: Action<ManageSubDaosData> = {
  key: ActionKey.ManageSubDaos,
  Icon: ManageSubDaosEmoji,
  label: 'Manage SubDAOs',
  description: 'Add or remove SubDAOs from the DAO.',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
  // Only v2 DAOs support SubDAOs.
  supportedCoreVersions: [ContractVersion.V0_2_0],
}
