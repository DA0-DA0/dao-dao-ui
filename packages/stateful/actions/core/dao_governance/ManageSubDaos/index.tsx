import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import { FamilyEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  Feature,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import { makeWasmMessage, objectMatchesStructure } from '@dao-dao/utils'

import { AddressInput, EntityDisplay } from '../../../../components'
import { useActionOptions } from '../../../react'
import {
  ManageSubDaosData,
  ManageSubDaosComponent as StatelessManageSubDaosComponent,
} from './Component'

const useDefaults: UseDefaults<ManageSubDaosData> = () => ({
  toAdd: [
    {
      addr: '',
    },
  ],
  toRemove: [],
})

const Component: ActionComponent = (props) => {
  const {
    address,
    chain: { chain_id: chainId },
  } = useActionOptions()

  const currentSubDaos = useRecoilValue(
    DaoCoreV2Selectors.allAdministratedSubDaoConfigsSelector({
      chainId,
      contractAddress: address,
    })
  )

  return (
    <StatelessManageSubDaosComponent
      {...props}
      options={{
        currentSubDaos,
        AddressInput,
        EntityDisplay,
      }}
    />
  )
}

export const makeManageSubDaosAction: ActionMaker<ManageSubDaosData> = ({
  t,
  address,
  context,
}) => {
  if (
    context.type !== ActionContextType.Dao ||
    !context.info.supportedFeatures[Feature.SubDaos]
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
    objectMatchesStructure(msg, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {
            update_sub_daos: {
              to_add: {},
              to_remove: {},
            },
          },
        },
      },
    }) && msg.wasm.execute.contract_addr === address
      ? {
          match: true,
          data: {
            toAdd: msg.wasm.execute.msg.update_sub_daos.to_add,
            toRemove: msg.wasm.execute.msg.update_sub_daos.to_remove.map(
              (address: string) => ({
                address,
              })
            ),
          },
        }
      : {
          match: false,
        }

  return {
    key: ActionKey.ManageSubDaos,
    Icon: FamilyEmoji,
    label: t('title.manageSubDaos'),
    description: t('info.manageSubDaosActionDescription'),
    notReusable: true,
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
