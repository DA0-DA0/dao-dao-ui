import { useCallback } from 'react'

import { chainSupportsIcaControllerSelector } from '@dao-dao/state/recoil'
import { ChainEmoji, useCachedLoadingWithError } from '@dao-dao/stateless'
import { Feature } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseHideFromPicker,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  ICA_CHAINS_TX_PREFIX,
  getFilteredDaoItemsByPrefix,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'
import {
  ManageIcasData,
  ManageIcasComponent as StatelessManageIcasComponent,
} from './Component'

const useDefaults: UseDefaults<ManageIcasData> = () => ({
  chainId: '',
  register: true,
})

const Component: ActionComponent = (props) => {
  const { context } = useActionOptions()

  if (context.type !== ActionContextType.Dao) {
    return null
  }

  const currentlyEnabled = getFilteredDaoItemsByPrefix(
    context.info.items,
    ICA_CHAINS_TX_PREFIX
  ).map(([key]) => key)

  return (
    <StatelessManageIcasComponent
      {...props}
      options={{
        currentlyEnabled,
      }}
    />
  )
}

export const makeManageIcasAction: ActionMaker<ManageIcasData> = ({
  t,
  address,
  chain: { chain_id: sourceChainId },
  context,
}) => {
  // Only DAOs.
  if (context.type !== ActionContextType.Dao) {
    return null
  }

  const storageItemValueKey = context.info.supportedFeatures[
    Feature.StorageItemValueKey
  ]
    ? 'value'
    : 'addr'

  const useTransformToCosmos: UseTransformToCosmos<ManageIcasData> = () =>
    useCallback(
      ({ chainId, register }: ManageIcasData) =>
        makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
              funds: [],
              msg: register
                ? {
                    set_item: {
                      key: ICA_CHAINS_TX_PREFIX + chainId,
                      [storageItemValueKey]: '1',
                    },
                  }
                : {
                    remove_item: {
                      key: ICA_CHAINS_TX_PREFIX + chainId,
                    },
                  },
            },
          },
        }),
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageIcasData> = (
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
      const register = 'set_item' in msg.wasm.execute.msg
      const key =
        (register
          ? msg.wasm.execute.msg.set_item.key
          : msg.wasm.execute.msg.remove_item.key) ?? ''

      const chainId = key.replace(ICA_CHAINS_TX_PREFIX, '')

      return key.startsWith(ICA_CHAINS_TX_PREFIX)
        ? {
            match: true,
            data: {
              chainId,
              register,
            },
          }
        : {
            match: false,
          }
    }

    return { match: false }
  }

  // Hide from picker if chain does not support ICA controller.
  const useHideFromPicker: UseHideFromPicker = () => {
    const supported = useCachedLoadingWithError(
      chainSupportsIcaControllerSelector({
        chainId: sourceChainId,
      })
    )

    return supported.loading || supported.errored || !supported.data
  }

  return {
    key: ActionKey.ManageIcas,
    Icon: ChainEmoji,
    label: t('title.manageIcas'),
    description: t('info.manageIcasDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    useHideFromPicker,
  }
}
