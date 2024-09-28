import { HugeDecimal } from '@dao-dao/math'
import {
  daoRewardsDistributorExtraQueries,
  daoRewardsDistributorQueries,
} from '@dao-dao/state/query'
import { ActionBase, OpenMailboxEmoji } from '@dao-dao/stateless'
import {
  DaoRewardDistributionWithRemaining,
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
  getDaoRewardDistributors,
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  WithdrawRewardDistributionComponent,
  WithdrawRewardDistributionData,
} from './Component'

export class WithdrawRewardDistributionAction extends ActionBase<WithdrawRewardDistributionData> {
  public readonly key = ActionKey.WithdrawRewardDistribution
  public readonly Component: ActionComponent<
    undefined,
    WithdrawRewardDistributionData
  >

  /**
   * Existing reward distributors.
   */
  private distributors: DaoRewardDistributor[]
  /**
   * Existing reward distributions.
   */
  private distributions: DaoRewardDistributionWithRemaining[] = []

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Only DAOs can withdraw reward distributions')
    }

    super(options, {
      Icon: OpenMailboxEmoji,
      label: options.t('title.withdrawRewardDistribution'),
      description: options.t('info.withdrawRewardDistributionDescription'),
    })

    this.distributors = getDaoRewardDistributors(options.context.dao.info.items)

    const action = this
    this.Component = function Component(props) {
      return (
        <WithdrawRewardDistributionComponent
          {...props}
          options={{
            distributions: action.distributions,
          }}
        />
      )
    }
  }

  async setup() {
    this.distributions = (
      await Promise.all(
        this.distributors.map(async ({ address }) => {
          const distributions = await this.options.queryClient.fetchQuery(
            daoRewardsDistributorExtraQueries.distributions(
              this.options.queryClient,
              {
                chainId: this.options.chain.chain_id,
                address,
              }
            )
          )

          return await Promise.all(
            distributions.map(
              async (
                distribution
              ): Promise<DaoRewardDistributionWithRemaining> => ({
                ...distribution,
                remaining: HugeDecimal.from(
                  await this.options.queryClient.fetchQuery(
                    daoRewardsDistributorQueries.undistributedRewards({
                      chainId: this.options.chain.chain_id,
                      contractAddress: address,
                      args: { id: distribution.id },
                    })
                  )
                ),
              })
            )
          )
        })
      )
    ).flat()

    // Default to first distribution, if available.
    this.defaults = {
      address: this.distributions[0]?.address || '',
      id: this.distributions[0]?.id || 0,
    }
  }

  encode({ address, id }: WithdrawRewardDistributionData): UnifiedCosmosMsg {
    const distribution = this.distributions.find(
      (d) => d.address === address && d.id === id
    )
    if (!distribution) {
      throw new Error('Distribution not found')
    }

    return makeExecuteSmartContractMessage({
      chainId: this.options.chain.chain_id,
      sender: this.options.address,
      contractAddress: address,
      msg: {
        withdraw: {
          id,
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
              withdraw: {
                id: {},
              },
            },
          },
        },
      }) &&
      this.distributors.some(
        ({ address }) => address === decodedMessage.wasm.execute.contract_addr
      )
    )
  }

  async decode([
    { decodedMessage },
  ]: ProcessedMessage[]): Promise<WithdrawRewardDistributionData> {
    const address = decodedMessage.wasm.execute.contract_addr

    const distribution = this.distributions.find(
      (d) =>
        d.address === address &&
        d.id === decodedMessage.wasm.execute.msg.withdraw.id
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
