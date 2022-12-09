import { useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { CwCoreV1Selectors, DaoCoreV2Selectors } from '@dao-dao/state'
import { InfoEmoji } from '@dao-dao/stateless'
import {
  ActionMaker,
  ActionOptionsContextType,
  ContractVersion,
} from '@dao-dao/types'
import {
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { makeWasmMessage } from '@dao-dao/utils'

import {
  UpdateInfoComponent as Component,
  UpdateInfoData,
} from '../components/UpdateInfo'

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

              // Only add image url if in the message.
              ...(!!msg.wasm.execute.msg.update_config.config.image_url && {
                image_url: msg.wasm.execute.msg.update_config.config.image_url,
              }),

              // V1 and V2 passthrough
              automatically_add_cw20s:
                msg.wasm.execute.msg.update_config.config
                  .automatically_add_cw20s,
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
        : { match: false },
    [msg]
  )

export const makeUpdateInfoAction: ActionMaker<UpdateInfoData> = ({
  t,
  address,
  context,
}) => {
  // Only DAOs.
  if (context.type !== ActionOptionsContextType.Dao) {
    return null
  }

  const configSelector =
    context.coreVersion === ContractVersion.V1
      ? CwCoreV1Selectors.configSelector({
          contractAddress: address,
        })
      : DaoCoreV2Selectors.configSelector({
          contractAddress: address,
          params: [],
        })

  const useDefaults: UseDefaults<UpdateInfoData> = () => {
    const config = useRecoilValue(configSelector)
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

  return {
    key: CoreActionKey.UpdateInfo,
    Icon: InfoEmoji,
    label: t('title.updateInfo'),
    description: t('info.updateInfoActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
