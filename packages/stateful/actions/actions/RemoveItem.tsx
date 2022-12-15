import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import { WrenchEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  ActionOptionsContextType,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { makeWasmMessage } from '@dao-dao/utils'

import {
  RemoveItemData,
  RemoveItemComponent as StatelessRemoveItemComponent,
} from '../components/RemoveItem'
import { useActionOptions } from '../react'

const useDefaults: UseDefaults<RemoveItemData> = () => ({
  key: '',
})

const Component: ActionComponent<undefined, RemoveItemData> = (props) => {
  const { address, chainId } = useActionOptions()

  const existingKeys = useRecoilValue(
    DaoCoreV2Selectors.listAllItemsSelector({
      contractAddress: address,
      chainId,
    })
  )

  return (
    <StatelessRemoveItemComponent
      {...props}
      options={{
        existingKeys,
      }}
    />
  )
}

export const makeRemoveItemAction: ActionMaker<RemoveItemData> = ({
  t,
  address,
  context,
}) => {
  // Can only remove items in a DAO.
  if (context.type !== ActionOptionsContextType.Dao) {
    return null
  }

  const useTransformToCosmos: UseTransformToCosmos<RemoveItemData> = () =>
    useCallback(({ key }: RemoveItemData) => {
      return makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: address,
            funds: [],
            msg: {
              remove_item: {
                key,
              },
            },
          },
        },
      })
    }, [])

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<RemoveItemData> = (
    msg: Record<string, any>
  ) => {
    if (
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'contract_addr' in msg.wasm.execute &&
      msg.wasm.execute.contract_addr === address &&
      'remove_item' in msg.wasm.execute.msg &&
      'key' in msg.wasm.execute.msg.remove_item
    ) {
      return {
        match: true,
        data: {
          key: msg.wasm.execute.msg.remove_item.key,
        },
      }
    }

    return { match: false }
  }

  return {
    key: CoreActionKey.RemoveItem,
    Icon: WrenchEmoji,
    label: t('title.removeItem'),
    description: t('info.removeItemDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
