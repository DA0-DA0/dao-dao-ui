import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import { WrenchEmoji } from '@dao-dao/stateless'
import { ContractVersion } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { makeWasmMessage, objectMatchesStructure } from '@dao-dao/utils'

import { useActionOptions } from '../../../react'
import {
  ManageStorageItemsData,
  ManageStorageItemsComponent as StatelessManageStorageItemsComponent,
} from './Component'

const useDefaults: UseDefaults<ManageStorageItemsData> = () => ({
  setting: true,
  key: '',
  value: '',
})

const Component: ActionComponent<undefined, ManageStorageItemsData> = (
  props
) => {
  const { address, chainId } = useActionOptions()

  const existingItems = useRecoilValue(
    DaoCoreV2Selectors.listAllItemsSelector({
      contractAddress: address,
      chainId,
    })
  )

  return (
    <StatelessManageStorageItemsComponent
      {...props}
      options={{
        existingItems,
      }}
    />
  )
}

export const makeManageStorageItemsAction: ActionMaker<
  ManageStorageItemsData
> = ({ t, address, context }) => {
  // Can only set items in a DAO.
  if (context.type !== ActionContextType.Dao) {
    return null
  }

  // V1 DAOs and V2-alpha DAOs use a value key of `addr`, V2-beta uses `value`.
  const valueKey =
    context.info.coreVersion === ContractVersion.V1 ||
    context.info.coreVersion === ContractVersion.V2Alpha
      ? 'addr'
      : 'value'

  const useTransformToCosmos: UseTransformToCosmos<
    ManageStorageItemsData
  > = () =>
    useCallback(
      ({ setting, key, value }: ManageStorageItemsData) =>
        makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
              funds: [],
              msg: setting
                ? {
                    set_item: {
                      key,
                      [valueKey]: value,
                    },
                  }
                : {
                    remove_item: {
                      key,
                    },
                  },
            },
          },
        }),
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageStorageItemsData> = (
    msg: Record<string, any>
  ) => {
    if (
      objectMatchesStructure(msg, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {},
          },
        },
      }) &&
      msg.wasm.execute.contract_addr === address &&
      ('set_item' in msg.wasm.execute.msg ||
        'remove_item' in msg.wasm.execute.msg)
    ) {
      const setting = 'set_item' in msg.wasm.execute.msg

      return {
        match: true,
        data: {
          setting,
          key:
            (setting
              ? msg.wasm.execute.msg.set_item.key
              : msg.wasm.execute.msg.remove_item.key) ?? '',
          value: setting ? msg.wasm.execute.msg.set_item[valueKey] : '',
        },
      }
    }

    return { match: false }
  }

  return {
    key: ActionKey.ManageStorageItems,
    Icon: WrenchEmoji,
    label: t('title.manageStorageItems'),
    description: t('info.manageStorageItemsDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
