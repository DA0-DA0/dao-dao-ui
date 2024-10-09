import { daoRewardsDistributorExtraQueries } from '@dao-dao/state/query'
import { ActionBase, PlayPauseEmoji } from '@dao-dao/stateless'
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
  ResumeRewardDistributionComponent,
  ResumeRewardDistributionData,
} from './Component'

export class ResumeRewardDistributionAction extends ActionBase<ResumeRewardDistributionData> {
  public readonly key = ActionKey.ResumeRewardDistribution
  public readonly Component: ActionComponent<
    undefined,
    ResumeRewardDistributionData
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
      throw new Error('Only DAOs can resume reward distributions')
    }

    super(options, {
      Icon: PlayPauseEmoji,
      label: options.t('title.resumeRewardDistribution'),
      description: options.t('info.resumeRewardDistributionDescription'),
    })

    this.distributors = getDaoRewardDistributors(options.context.dao.info.items)

    this.manageStorageItemsAction = new ManageStorageItemsAction(this.options)

    const action = this
    this.Component = function Component(props) {
      return (
        <ResumeRewardDistributionComponent
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

    // Default to first paused distribution, if available.
    const distribution = this.distributions.find(
      (d) => 'paused' in d.active_epoch.emission_rate
    )

    this.defaults = {
      address: distribution?.address || '',
      id: distribution?.id || 0,
    }
  }

  encode({ address, id }: ResumeRewardDistributionData): UnifiedCosmosMsg[] {
    if (this.options.context.type !== ActionContextType.Dao) {
      throw new Error('Only DAOs can resume reward distributions')
    }

    const distribution = this.distributions.find(
      (d) => d.address === address && d.id === id
    )
    if (!distribution) {
      throw new Error('Distribution not found')
    }

    // If not paused, use the current emission rate, in case they are composing
    // some set of actions that pauses and then resumes in the same transaction.
    // If paused, attempt to load the saved emission rate from storage.
    let savedEmissionRate =
      'paused' in distribution.active_epoch.emission_rate
        ? undefined
        : distribution.active_epoch.emission_rate
    if (!savedEmissionRate) {
      try {
        savedEmissionRate = JSON.parse(
          this.options.context.dao.info.items[
            getRewardDistributorSavedEmissionRateStorageItemKey(address, id)
          ]
        )
        if (typeof savedEmissionRate !== 'object') {
          throw new Error('Saved emission rate is not an object')
        }
        if ('paused' in savedEmissionRate) {
          throw new Error('Saved emission rate is paused')
        }
      } catch (error) {
        console.error(error)
        throw new Error(
          'Failed to retrieve previous emission rate. Use the Update Reward Distribution action to unpause and set a new emission rate.'
        )
      }
    }

    return [
      // Remove the saved emission rate.
      this.manageStorageItemsAction.encode({
        setting: false,
        key: getRewardDistributorSavedEmissionRateStorageItemKey(address, id),
        // Unused.
        value: '',
      }),
      // Resume the distribution with the saved emission rate.
      makeExecuteSmartContractMessage({
        chainId: this.options.chain.chainId,
        sender: this.options.address,
        contractAddress: address,
        msg: {
          update: {
            id,
            emission_rate: savedEmissionRate,
          },
        },
      }),
    ]
  }

  match(messages: ProcessedMessage[]): ActionMatch {
    return messages.length >= 2 &&
      // First message saves the emission rate to be restored when unresumed.
      this.manageStorageItemsAction.match([messages[0]]) &&
      this.manageStorageItemsAction
        .decode([messages[0]])
        .key.startsWith(
          DAO_REWARD_DISTRIBUTOR_SAVED_EMISSION_RATE_ITEM_NAMESPACE + ':'
        ) &&
      !this.manageStorageItemsAction.decode([messages[0]]).setting &&
      // Second message resumes the distribution.
      objectMatchesStructure(messages[1].decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              update: {
                id: {},
                emission_rate: {},
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
  ]: ProcessedMessage[]): Promise<ResumeRewardDistributionData> {
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
