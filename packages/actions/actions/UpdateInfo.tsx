import { useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { CwCoreV0_1_0Selectors } from '@dao-dao/state'
import {
  Action,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes/actions'
import { makeWasmMessage } from '@dao-dao/utils'

import {
  UpdateInfoComponent as Component,
  UpdateInfoData,
  UpdateInfoIcon,
} from '../components/UpdateInfo'

const useDefaults: UseDefaults<UpdateInfoData> = (coreAddress: string) => {
  const config = useRecoilValue(
    CwCoreV0_1_0Selectors.configSelector({ contractAddress: coreAddress })
  )

  // Need to deep copy as, for reasons beyond me, the object returned
  // from the selector is immutable which causes all sorts of trouble.
  return JSON.parse(JSON.stringify(config))
}

const useTransformToCosmos: UseTransformToCosmos<UpdateInfoData> = (
  coreAddress: string
) =>
  useCallback(
    (data: UpdateInfoData) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: coreAddress,
            funds: [],
            msg: {
              update_config: {
                config: {
                  ...data,
                  // Replace empty string with null.
                  image_url: data.image_url?.trim() || null,
                },
              },
            },
          },
        },
      }),
    [coreAddress]
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdateInfoData> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'update_config' in msg.wasm.execute.msg &&
      'config' in msg.wasm.execute.msg.update_config &&
      'name' in msg.wasm.execute.msg.update_config.config &&
      'description' in msg.wasm.execute.msg.update_config.config &&
      'automatically_add_cw20s' in msg.wasm.execute.msg.update_config.config &&
      'automatically_add_cw721s' in msg.wasm.execute.msg.update_config.config
        ? {
            match: true,
            data: {
              name: msg.wasm.execute.msg.update_config.config.name,
              description:
                msg.wasm.execute.msg.update_config.config.description,

              // Only add image url if it is in the message.
              ...(!!msg.wasm.execute.msg.update_config.config.image_url && {
                image_url: msg.wasm.execute.msg.update_config.config.image_url,
              }),

              automatically_add_cw20s:
                msg.wasm.execute.msg.update_config.config
                  .automatically_add_cw20s,
              automatically_add_cw721s:
                msg.wasm.execute.msg.update_config.config
                  .automatically_add_cw721s,
            },
          }
        : { match: false },
    [msg]
  )

export const updateInfoAction: Action<UpdateInfoData> = {
  key: ActionKey.UpdateInfo,
  Icon: UpdateInfoIcon,
  label: 'Update Info',
  description: "Update your DAO's name, image, and description.",
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
}
