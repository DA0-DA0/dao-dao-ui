import { useCallback } from 'react'

import { GearEmoji, useDaoInfoContext } from '@dao-dao/stateless'
import { DurationUnits, Feature } from '@dao-dao/types'
import {
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  convertDurationToDurationWithUnits,
  convertDurationWithUnitsToDuration,
  isFeatureSupportedByVersion,
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
    unstakingDuration: unstakingDuration
      ? convertDurationToDurationWithUnits(unstakingDuration)
      : {
          value: 2,
          units: DurationUnits.Weeks,
        },
  }
}

const useTransformToCosmos: UseTransformToCosmos<
  UpdateStakingConfigData
> = () => {
  const { coreAddress } = useDaoInfoContext()
  const { stakingContractVersion, stakingContractAddress } = useStakingInfo()

  return useCallback(
    ({ unstakingDurationEnabled, unstakingDuration }) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: stakingContractAddress,
            funds: [],
            msg: {
              update_config: {
                // Prevent unsetting the NFT contract owner when updating config
                // if using an old contract version.
                ...(!isFeatureSupportedByVersion(
                  Feature.DaoVotingCw721StakedNoOwner,
                  stakingContractVersion
                )
                  ? {
                      owner: coreAddress,
                    }
                  : {}),
                duration: unstakingDurationEnabled
                  ? convertDurationWithUnitsToDuration(unstakingDuration)
                  : null,
              },
            },
          },
        },
      }),
    [coreAddress, stakingContractAddress, stakingContractVersion]
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
  }) && msg.wasm.execute.contract_addr === stakingContractAddress
    ? {
        match: true,
        data: {
          unstakingDurationEnabled:
            !!msg.wasm.execute.msg.update_config.duration,
          unstakingDuration: msg.wasm.execute.msg.update_config.duration
            ? convertDurationToDurationWithUnits(
                msg.wasm.execute.msg.update_config.duration
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
