import { useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import {
  CwCoreV1Selectors,
  CwdCoreV2Selectors,
  contractVersionSelector,
} from '@dao-dao/state'
import { ContractVersion } from '@dao-dao/tstypes'
import {
  Action,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes/actions'
import { UpdateInfoEmoji } from '@dao-dao/ui'
import { makeWasmMessage } from '@dao-dao/utils'

import {
  UpdateInfoComponent as Component,
  UpdateInfoData,
} from '../components/UpdateInfo'

const useDefaults: UseDefaults<UpdateInfoData> = (coreAddress: string) => {
  const coreVersion = useRecoilValue(
    contractVersionSelector({
      contractAddress: coreAddress,
    })
  )
  const config = useRecoilValue(
    coreVersion === ContractVersion.V0_1_0
      ? CwCoreV1Selectors.configSelector({ contractAddress: coreAddress })
      : CwdCoreV2Selectors.configSelector({
          contractAddress: coreAddress,
          params: [],
        })
  )

  return { ...config }
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

export const updateInfoAction: Action<UpdateInfoData> = {
  key: ActionKey.UpdateInfo,
  Icon: UpdateInfoEmoji,
  label: 'Update Info',
  description: "Update your DAO's name, image, and description.",
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
}
