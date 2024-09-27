import { useFormContext } from 'react-hook-form'

import { HugeDecimal } from '@dao-dao/math'
import { daoRewardsDistributorExtraQueries } from '@dao-dao/state/query'
import {
  ActionBase,
  LowBatteryEmoji,
  useActionOptions,
} from '@dao-dao/stateless'
import {
  AccountType,
  DaoRewardDistribution,
  DaoRewardDistributor,
  TokenType,
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
  convertDenomToMicroDenomStringWithDecimals,
  encodeJsonToBase64,
  getDaoRewardDistributors,
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
  parseCw20SendContractMessage,
} from '@dao-dao/utils'

import { useTokenBalances } from '../../../hooks'
import {
  FundRewardDistributionComponent,
  FundRewardDistributionData,
} from './Component'

export class FundRewardDistributionAction extends ActionBase<FundRewardDistributionData> {
  public readonly key = ActionKey.FundRewardDistribution
  public readonly Component: ActionComponent<
    undefined,
    FundRewardDistributionData
  >

  /**
   * Existing reward distributors.
   */
  private distributors: DaoRewardDistributor[]
  /**
   * Existing reward distributions.
   */
  private distributions: DaoRewardDistribution[] = []

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Only DAOs can fund reward distributions')
    }

    super(options, {
      Icon: LowBatteryEmoji,
      label: options.t('title.fundRewardDistribution'),
      description: options.t('info.fundRewardDistributionDescription'),
    })

    this.distributors = getDaoRewardDistributors(options.context.dao.info.items)

    const action = this
    this.Component = function Component(props) {
      const {
        chain: { chain_id: chainId },
      } = useActionOptions()

      const { watch } = useFormContext<FundRewardDistributionData>()

      const address = watch((props.fieldNamePrefix + 'address') as 'address')
      const id = watch((props.fieldNamePrefix + 'id') as 'id')

      const selectedDistribution = action.distributions.find(
        (distribution) =>
          distribution.address === address && distribution.id === id
      )

      const tokens = useTokenBalances({
        // Load selected token when not creating, in case it is no longer
        // returned in the list of all tokens for the given DAO.
        additionalTokens:
          props.isCreating || !selectedDistribution
            ? undefined
            : [
                {
                  chainId,
                  type: selectedDistribution.token.type,
                  denomOrAddress: selectedDistribution.token.denomOrAddress,
                },
              ],
        // Rewards are distributed from the DAO's home chain, so the tokens must
        // live there.
        includeAccountTypes: [AccountType.Base],
      })

      return (
        <FundRewardDistributionComponent
          {...props}
          options={{
            distributions: action.distributions,
            tokens,
          }}
        />
      )
    }
  }

  async setup() {
    this.distributions = (
      await Promise.all(
        this.distributors.map(
          async ({ address }) =>
            await this.options.queryClient.fetchQuery(
              daoRewardsDistributorExtraQueries.distributions(
                this.options.queryClient,
                {
                  chainId: this.options.chain.chain_id,
                  address,
                }
              )
            )
        )
      )
    ).flat()

    // Default to first distribution, if available.
    this.defaults = {
      address: this.distributions[0]?.address || '',
      id: this.distributions[0]?.id || 0,
      amount: 100,
    }
  }

  encode({
    address,
    id,
    amount,
  }: FundRewardDistributionData): UnifiedCosmosMsg {
    const distribution = this.distributions.find(
      (d) => d.address === address && d.id === id
    )
    if (!distribution) {
      throw new Error('Distribution not found')
    }

    const microAmount = convertDenomToMicroDenomStringWithDecimals(
      amount,
      distribution.token.decimals
    )

    return distribution.token.type === TokenType.Native
      ? makeExecuteSmartContractMessage({
          chainId: this.options.chain.chain_id,
          sender: this.options.address,
          contractAddress: address,
          msg: {
            fund: {
              id,
            },
          },
          funds: [
            {
              amount: microAmount,
              denom: distribution.token.denomOrAddress,
            },
          ],
        }) // Execute CW20 send message.
      : makeExecuteSmartContractMessage({
          chainId: this.options.chain.chain_id,
          sender: this.options.address,
          contractAddress: distribution.token.denomOrAddress,
          msg: {
            send: {
              amount: microAmount,
              contract: address,
              msg: encodeJsonToBase64({
                fund: {
                  id,
                },
              }),
            },
          },
        })
  }

  breakdownMessage(decodedMessage: any): {
    distribution: DaoRewardDistribution
    amount: number
  } {
    const isNativeFund = objectMatchesStructure(decodedMessage, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {
            fund: {
              id: {},
            },
          },
        },
      },
    })

    const parsedCw20Fund = parseCw20SendContractMessage(decodedMessage, {
      fund: {
        id: {},
      },
    })

    const address = isNativeFund
      ? decodedMessage.wasm.execute.contract_addr
      : parsedCw20Fund?.contract

    const id = isNativeFund
      ? decodedMessage.wasm.execute.msg.fund.id
      : parsedCw20Fund?.msg.fund.id

    const distribution =
      address &&
      id &&
      this.distributions.find((d) => d.address === address && d.id === id)

    if (!distribution) {
      throw new Error('Distribution not found')
    }

    const amount = isNativeFund
      ? decodedMessage.wasm.execute.funds[0].amount
      : parsedCw20Fund?.amount

    return {
      distribution,
      amount: HugeDecimal.from(amount).toHumanReadableNumber(
        distribution.token.decimals
      ),
    }
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    try {
      return !!this.breakdownMessage(decodedMessage)
    } catch {
      return false
    }
  }

  async decode([
    { decodedMessage },
  ]: ProcessedMessage[]): Promise<FundRewardDistributionData> {
    const {
      distribution: { address, id },
      amount,
    } = this.breakdownMessage(decodedMessage)

    return {
      address,
      id,
      amount,
    }
  }
}
