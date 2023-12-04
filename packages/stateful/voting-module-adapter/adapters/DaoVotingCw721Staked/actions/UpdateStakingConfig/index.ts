import { useCallback } from 'react'

import { GearEmoji } from '@dao-dao/stateless'
import { DurationUnits } from '@dao-dao/types'
import {
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  convertDurationWithUnitsToDuration,
  convertSecondsToDurationWithUnits,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useStakingInfo } from '../../hooks'
import {
  UpdateStakingConfigComponent as Component,
  UpdateStakingConfigData,
} from './Component'

const useDefaults: UseDefaults<UpdateStakingConfigData> = () => {
  const { unstakingDuration } = useStakingInfo()

  return {
    unstakingDurationEnabled: !!unstakingDuration,
    unstakingDuration:
      unstakingDuration && 'time' in unstakingDuration
        ? convertSecondsToDurationWithUnits(unstakingDuration.time)
        : {
            value: 2,
            units: DurationUnits.Weeks,
          },
  }
}

const useTransformToCosmos: UseTransformToCosmos<
  UpdateStakingConfigData
> = () => {
  const { stakingContractAddress } = useStakingInfo()

  return useCallback(
    ({ unstakingDurationEnabled, unstakingDuration }) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: stakingContractAddress,
            funds: [],
            msg: {
              update_config: {
                duration: unstakingDurationEnabled
                  ? convertDurationWithUnitsToDuration(unstakingDuration)
                  : null,
              },
            },
          },
        },
      }),
    [stakingContractAddress]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdateStakingConfigData> = (
  msg: Record<string, any>
) => {
  const { stakingContractAddress } = useStakingInfo()

  return objectMatchesStructure(msg, {
    wasm: {
      execute: {
        contract_addr: {},
        funds: {},
        msg: {
          update_config: {},
        },
      },
    },
  }) &&
    msg.wasm.execute.contract_addr === stakingContractAddress &&
    (!msg.wasm.execute.msg.update_config.duration ||
      'time' in msg.wasm.execute.msg.update_config.duration)
    ? {
        match: true,
        data: {
          unstakingDurationEnabled:
            !!msg.wasm.execute.msg.update_config.duration,
          unstakingDuration: msg.wasm.execute.msg.update_config.duration
            ? convertSecondsToDurationWithUnits(
                msg.wasm.execute.msg.update_config.duration.time
              )
            : {
                value: 2,
                units: DurationUnits.Weeks,
              },
        },
      }
    : {
        match: false,
      }
}

export const makeUpdateStakingConfigAction: ActionMaker<
  UpdateStakingConfigData
> = ({ t }) => ({
  key: ActionKey.UpdateStakingConfig,
  Icon: GearEmoji,
  label: t('title.updateStakingConfig'),
  description: t('info.updateStakingConfigDescription'),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
  notReusable: true,
})
