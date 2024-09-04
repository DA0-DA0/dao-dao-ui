import { daoVotingTokenStakedQueries } from '@dao-dao/state/query'
import { ActionBase, GearEmoji } from '@dao-dao/stateless'
import { DurationUnits, UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  convertDurationToDurationWithUnits,
  convertDurationWithUnitsToDuration,
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  UpdateStakingConfigComponent as Component,
  UpdateStakingConfigData,
} from './Component'

export class UpdateStakingConfigAction extends ActionBase<UpdateStakingConfigData> {
  public readonly key = ActionKey.UpdateStakingConfig
  public readonly Component = Component

  private stakingContractAddress: string

  constructor(options: ActionOptions) {
    // Type-check.
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Invalid context for update staking config action')
    }

    super(options, {
      Icon: GearEmoji,
      label: options.t('title.updateStakingConfig'),
      description: options.t('info.updateStakingConfigDescription'),
    })

    this.stakingContractAddress = options.context.dao.votingModule.address
  }

  async setup() {
    const { unstaking_duration } = await this.options.queryClient.fetchQuery(
      daoVotingTokenStakedQueries.getConfig(this.options.queryClient, {
        chainId: this.options.chain.chain_id,
        contractAddress: this.stakingContractAddress,
      })
    )

    this.defaults = {
      unstakingDurationEnabled: !!unstaking_duration,
      unstakingDuration: unstaking_duration
        ? convertDurationToDurationWithUnits(unstaking_duration)
        : {
            value: 2,
            units: DurationUnits.Weeks,
          },
    }
  }

  encode({
    unstakingDurationEnabled,
    unstakingDuration,
  }: UpdateStakingConfigData): UnifiedCosmosMsg {
    return makeExecuteSmartContractMessage({
      chainId: this.options.chain.chain_id,
      sender: this.options.address,
      contractAddress: this.stakingContractAddress,
      msg: {
        update_config: {
          duration: unstakingDurationEnabled
            ? convertDurationWithUnitsToDuration(unstakingDuration)
            : null,
        },
      },
    })
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return (
      objectMatchesStructure(decodedMessage, {
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
      decodedMessage.wasm.execute.contract_addr === this.stakingContractAddress
    )
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): UpdateStakingConfigData {
    return {
      unstakingDurationEnabled:
        !!decodedMessage.wasm.execute.msg.update_config.duration,
      unstakingDuration: decodedMessage.wasm.execute.msg.update_config.duration
        ? convertDurationToDurationWithUnits(
            decodedMessage.wasm.execute.msg.update_config.duration
          )
        : {
            value: 2,
            units: DurationUnits.Weeks,
          },
    }
  }
}
