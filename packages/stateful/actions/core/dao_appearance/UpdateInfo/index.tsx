import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import { InfoEmoji } from '@dao-dao/stateless'
import { ActionContextType, ActionMaker } from '@dao-dao/types'
import {
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { makeWasmMessage, objectMatchesStructure } from '@dao-dao/utils'

import { UpdateInfoComponent as Component, UpdateInfoData } from './Component'

export const makeUpdateInfoAction: ActionMaker<UpdateInfoData> = ({
  t,
  address,
  context,
}) => {
  // Only DAOs.
  if (context.type !== ActionContextType.Dao) {
    return null
  }

  const useDefaults: UseDefaults<UpdateInfoData> = () => {
    const config = useRecoilValue(
      DaoCoreV2Selectors.configSelector({
        contractAddress: address,
        params: [],
      })
    )
    return { ...config }
  }

  const useTransformToCosmos: UseTransformToCosmos<UpdateInfoData> = () =>
    useCallback(
      (data: UpdateInfoData) =>
        makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
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
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdateInfoData> = (
    msg: Record<string, any>
  ) =>
    objectMatchesStructure(msg, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {
            update_config: {
              config: {
                name: {},
                description: {},
                automatically_add_cw20s: {},
                automatically_add_cw721s: {},
              },
            },
          },
        },
      },
    }) && msg.wasm.execute.contract_addr === address
      ? {
          match: true,
          data: {
            name: msg.wasm.execute.msg.update_config.config.name,
            description: msg.wasm.execute.msg.update_config.config.description,

            // Only add image url if in the message.
            ...(!!msg.wasm.execute.msg.update_config.config.image_url && {
              image_url: msg.wasm.execute.msg.update_config.config.image_url,
            }),

            // V1 and V2 passthrough
            automatically_add_cw20s:
              msg.wasm.execute.msg.update_config.config.automatically_add_cw20s,
            automatically_add_cw721s:
              msg.wasm.execute.msg.update_config.config
                .automatically_add_cw721s,

            // V2 passthrough
            // Only add dao URI if in the message.
            ...('dao_uri' in msg.wasm.execute.msg.update_config.config && {
              dao_uri: msg.wasm.execute.msg.update_config.config.dao_uri,
            }),
          },
        }
      : {
          match: false,
        }

  return {
    key: ActionKey.UpdateInfo,
    Icon: InfoEmoji,
    label: t('title.updateInfo'),
    description: t('info.updateInfoActionDescription'),
    notReusable: true,
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
