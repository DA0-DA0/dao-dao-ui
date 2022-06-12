import { useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { ConfigResponse } from '@dao-dao/state/clients/cw-core'
import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { makeWasmMessage, VotingModuleType } from '@dao-dao/utils'

import { ActionKey } from '.'
import {
  Action,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '..'
import { UpdateInfoComponent as Component } from '../components'

type UpdateInfoData = ConfigResponse

const useDefaults: UseDefaults<UpdateInfoData> = (coreAddress: string) => {
  const config = useRecoilValue(
    configSelector({ contractAddress: coreAddress })
  ) ?? {
    name: '',
    description: '',
    automatically_add_cw20s: true,
    automatically_add_cw721s: true,
  }
  // We should really never hit the ?? case. The configSelector only
  // returns undefined if the client can not be loaded. If the client
  // can not be loaded, everything else will go terribly wrong before
  // this breaks.
  return config
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
                config: data,
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
  label: 'ℹ️ Update Info',
  description: "Update your DAO's name, image, and description.",
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
  votingModuleTypes: [
    VotingModuleType.Cw20StakedBalanceVoting,
    VotingModuleType.Cw4Voting,
  ],
}
