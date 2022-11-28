import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue, useRecoilValueLoadable } from 'recoil'

import { CwdCoreV2Selectors } from '@dao-dao/state'
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
  SetItemData,
  SetItemComponent as StatelessSetItemComponent,
} from '../components/SetItem'

const useDefaults: UseDefaults<SetItemData> = () => ({
  key: '',
  value: '',
})

export const makeSetItemAction: ActionMaker<SetItemData> = ({
  t,
  address,
  chainId,
  context,
}) => {
  // Can only set items in a DAO.
  if (context.type !== ActionOptionsContextType.Dao) {
    return null
  }

  const Component: ActionComponent<undefined, SetItemData> = (props) => {
    const { watch } = useFormContext()
    const key = watch(props.fieldNamePrefix + 'key')

    const existingKeys = useRecoilValue(
      CwdCoreV2Selectors.listAllItemsSelector({
        contractAddress: address,
        chainId,
      })
    )

    const currentValue = loadableToLoadingData(
      useRecoilValueLoadable(
        key
          ? CwdCoreV2Selectors.getItemSelector({
              contractAddress: address,
              chainId,
              params: [{ key }],
            })
          : constSelector(undefined)
      ),
      { item: null }
    )

    return (
      <StatelessSetItemComponent
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

  // V1 DAOs use a value key of `addr`, V2 uses `value`.
  const valueKey =
    context.coreVersion === ContractVersion.V0_1_0 ? 'addr' : 'value'

  const useTransformToCosmos: UseTransformToCosmos<SetItemData> = () =>
    useCallback(({ key, value }: SetItemData) => {
      return makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: address,
            funds: [],
            msg: {
              set_item: {
                key,
                [valueKey]: value,
              },
            },
          },
        },
      })
    }, [])

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<SetItemData> = (
    msg: Record<string, any>
  ) => {
    if (
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'contract_addr' in msg.wasm.execute &&
      msg.wasm.execute.contract_addr === address &&
      'set_item' in msg.wasm.execute.msg &&
      'key' in msg.wasm.execute.msg.set_item &&
      valueKey in msg.wasm.execute.msg.set_item
    ) {
      return {
        match: true,
        data: {
          key: msg.wasm.execute.msg.set_item.key,
          value: msg.wasm.execute.msg.set_item[valueKey],
        },
      }
    }

    return { match: false }
  }

  return {
    key: CoreActionKey.SetItem,
    Icon: WrenchEmoji,
    label: t('title.setItem'),
    description: t('info.setItemDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
