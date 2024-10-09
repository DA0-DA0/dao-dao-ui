import { daoRewardsDistributorExtraQueries } from '@dao-dao/state/query'
import { ActionBase, PauseEmoji } from '@dao-dao/stateless'
import {
  DaoRewardDistribution,
  DaoRewardDistributor,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  DAO_REWARD_DISTRIBUTOR_SAVED_EMISSION_RATE_ITEM_NAMESPACE,
  getDaoRewardDistributors,
  getRewardDistributorSavedEmissionRateStorageItemKey,
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { ManageStorageItemsAction } from '../ManageStorageItems'
import {
  PauseRewardDistributionComponent,
  PauseRewardDistributionData,
} from './Component'

export class PauseRewardDistributionAction extends ActionBase<PauseRewardDistributionData> {
  public readonly key = ActionKey.PauseRewardDistribution
  public readonly Component: ActionComponent<
    undefined,
    PauseRewardDistributionData
  >

  /**
   * Existing reward distributors.
   */
  private distributors: DaoRewardDistributor[]
  /**
   * Existing reward distributions.
   */
  private distributions: DaoRewardDistribution[] = []

  private manageStorageItemsAction: ManageStorageItemsAction

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Only DAOs can pause reward distributions')
    }

    super(options, {
      Icon: PauseEmoji,
      label: options.t('title.pauseRewardDistribution'),
      description: options.t('info.pauseRewardDistributionDescription'),
    })

    this.distributors = getDaoRewardDistributors(options.context.dao.info.items)

    this.manageStorageItemsAction = new ManageStorageItemsAction(this.options)

    const action = this
    this.Component = function Component(props) {
      return (
        <PauseRewardDistributionComponent
          {...props}
          options={{
            distributions: action.distributions,
          }}
        />
      )
    }
  }

  async setup() {
    await this.manageStorageItemsAction.setup()

    this.distributions = (
      await Promise.all(
        this.distributors.map(
          async ({ address }) =>
            await this.options.queryClient.fetchQuery(
              daoRewardsDistributorExtraQueries.distributions(
                this.options.queryClient,
                {
                  chainId: this.options.chain.chainId,
                  address,
                }
              )
            )
        )
      )
    ).flat()

    // Default to first unpaused distribution, if available.
    const distribution = this.distributions.find(
      (d) => !('paused' in d.active_epoch.emission_rate)
    )

    this.defaults = {
      address: distribution?.address || '',
      id: distribution?.id || 0,
    }
  }

  encode({ address, id }: PauseRewardDistributionData): UnifiedCosmosMsg[] {
    const distribution = this.distributions.find(
      (d) => d.address === address && d.id === id
    )
    if (!distribution) {
      throw new Error('Distribution not found')
    }

    return [
      // Save the emission rate to be restored when unpaused.
      this.manageStorageItemsAction.encode({
        setting: true,
        key: getRewardDistributorSavedEmissionRateStorageItemKey(address, id),
        value: JSON.stringify(distribution.active_epoch.emission_rate),
      }),
      // Pause the distribution.
      makeExecuteSmartContractMessage({
        chainId: this.options.chain.chainId,
        sender: this.options.address,
        contractAddress: address,
        msg: {
          update: {
            id,
            emission_rate: {
              paused: {},
            },
          },
        },
      }),
    ]
  }

  match(messages: ProcessedMessage[]): ActionMatch {
    return messages.length >= 2 &&
      // First message saves the emission rate to be restored when unpaused.
      this.manageStorageItemsAction.match([messages[0]]) &&
      this.manageStorageItemsAction
        .decode([messages[0]])
        .key.startsWith(
          DAO_REWARD_DISTRIBUTOR_SAVED_EMISSION_RATE_ITEM_NAMESPACE + ':'
        ) &&
      this.manageStorageItemsAction.decode([messages[0]]).setting &&
      // Second message pauses the distribution.
      objectMatchesStructure(messages[1].decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              update: {
                id: {},
                emission_rate: {
                  paused: {},
                },
              },
            },
          },
        },
      }) &&
      this.distributors.some(
        ({ address }) =>
          address === messages[1].decodedMessage.wasm.execute.contract_addr
      ) &&
      this.manageStorageItemsAction.decode([messages[0]]).key ===
        getRewardDistributorSavedEmissionRateStorageItemKey(
          messages[1].decodedMessage.wasm.execute.contract_addr,
          messages[1].decodedMessage.wasm.execute.msg.update.id
        )
      ? 2
      : false
  }

  async decode([
    _,
    // Second message.
    { decodedMessage },
  ]: ProcessedMessage[]): Promise<PauseRewardDistributionData> {
    const address = decodedMessage.wasm.execute.contract_addr

    const distribution = this.distributions.find(
      (d) =>
        d.address === address &&
        d.id === decodedMessage.wasm.execute.msg.update.id
    )
    if (!distribution) {
      throw new Error('Distribution not found')
    }

    return {
      address,
      id: distribution.id,
    }
  }
}
