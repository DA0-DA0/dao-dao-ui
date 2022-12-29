import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue, useRecoilValueLoadable } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import { WrenchEmoji } from '@dao-dao/stateless'
import { ContractVersion } from '@dao-dao/types'
import {
  ActionComponent,
  ActionMaker,
  ActionOptionsContextType,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { loadableToLoadingData, makeWasmMessage } from '@dao-dao/utils'

import {
  ManageStorageItemsData,
  ManageStorageItemsComponent as StatelessManageStorageItemsComponent,
} from '../components/ManageStorageItems'
import { useActionOptions } from '../react'

const useDefaults: UseDefaults<ManageStorageItemsData> = () => ({
  setting: true,
  remove_item: {
    key: '',
  },
  set_item: {
    key: '',
    value: '',
  },
})

const Component: ActionComponent<undefined, ManageStorageItemsData> = (
  props
) => {
  const { address, chainId } = useActionOptions()

  const { watch } = useFormContext()
  const key = watch(props.fieldNamePrefix + 'key')

  const existingKeys = useRecoilValue(
    DaoCoreV2Selectors.listAllItemsSelector({
      contractAddress: address,
      chainId,
    })
  )

  const currentValue = loadableToLoadingData(
    useRecoilValueLoadable(
      key
        ? DaoCoreV2Selectors.getItemSelector({
            contractAddress: address,
            chainId,
            params: [{ key }],
          })
        : constSelector(undefined)
    ),
    { item: null }
  )

  return (
    <StatelessManageStorageItemsComponent
      {...props}
      options={{
        existingKeys,
        currentValue: currentValue.loading
          ? { loading: true }
          : {
              loading: false,
              data: currentValue.data?.item ?? null,
            },
      }}
    />
  )
}

export const makeManageStorageItemsAction: ActionMaker<
  ManageStorageItemsData
> = ({ t, address, context }) => {
  // Can only set items in a DAO.
  if (context.type !== ActionOptionsContextType.Dao) {
    return null
  }

  // V1 DAOs and V2-alpha DAOs use a value key of `addr`, V2-beta uses `value`.
  const valueKey =
    context.coreVersion === ContractVersion.V1 ||
    context.coreVersion === ContractVersion.V2Alpha
      ? 'addr'
      : 'value'

  const useTransformToCosmos: UseTransformToCosmos<
    ManageStorageItemsData
  > = () =>
    useCallback(
      ({ setting, remove_item, set_item }: ManageStorageItemsData) => {
        return makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
              funds: [],
              msg: setting
                ? {
                    set_item: {
                      key: set_item.key,
                      [valueKey]: set_item.value,
                    },
                  }
                : {
                    remove_item,
                  },
            },
          },
        })
      },
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageStorageItemsData> = (
    msg: Record<string, any>
  ) => {
    if (
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'contract_addr' in msg.wasm.execute &&
      msg.wasm.execute.contract_addr === address &&
      'set_item' in msg.wasm.execute.msg
    ) {
      const setting =
        'key' in msg.wasm.execute.msg.set_item &&
        valueKey in msg.wasm.execute.msg.set_item

      return {
        match: true,
        data: {
          setting,
          remove_item: {
            key: msg.wasm.execute.msg?.remove_item?.key,
          },
          set_item: {
            key: msg.wasm.execute.msg?.set_item?.key,
            value: msg.wasm.execute.msg?.set_item[valueKey],
          },
        },
      }
    }

    return { match: false }
  }

  return {
    key: CoreActionKey.ManageStorageItems,
    Icon: WrenchEmoji,
    label: t('title.manageStorageItems'),
    description: t('info.manageStorageItemsDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
