import { useQueryClient } from '@tanstack/react-query'
import { nanoid } from 'nanoid'
import { useFormContext } from 'react-hook-form'

import { contractQueries, tokenQueries } from '@dao-dao/state/query'
import { ActionBase, BucketEmoji, useChain } from '@dao-dao/stateless'
import {
  AccountType,
  DaoRewardDistributor,
  DurationUnits,
  TokenType,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import {
  ActionChainContextType,
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  CreateMsg,
  InstantiateMsg,
} from '@dao-dao/types/contracts/DaoRewardsDistributor'
import {
  convertDenomToMicroDenomStringWithDecimals,
  convertDurationToDurationWithUnits,
  convertDurationWithUnitsToDuration,
  convertMicroDenomToDenomWithDecimals,
  getDaoRewardDistributors,
  getNativeTokenForChainId,
  getRewardDistributorStorageItemKey,
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useQueryLoadingDataWithError } from '../../../../hooks'
import { useTokenBalances } from '../../../hooks'
import { Instantiate2Action } from '../Instantiate2'
import { ManageStorageItemsAction } from '../ManageStorageItems'
import {
  CreateRewardDistributionComponent,
  CreateRewardDistributionData,
} from './Component'

const Component: ActionComponent<undefined, CreateRewardDistributionData> = (
  props
) => {
  const { chain_id: chainId } = useChain()
  const queryClient = useQueryClient()

  const { watch } = useFormContext<CreateRewardDistributionData>()
  const type = watch((props.fieldNamePrefix + 'type') as 'type')
  const denomOrAddress = watch(
    (props.fieldNamePrefix + 'denomOrAddress') as 'denomOrAddress'
  )

  const tokens = useTokenBalances({
    // Load selected token when not creating, in case it is no longer returned
    // in the list of all tokens for the given DAO.
    additionalTokens: props.isCreating
      ? undefined
      : [
          {
            chainId,
            type,
            denomOrAddress,
          },
        ],
    // Rewards are distributed from the DAO's home chain, so the tokens must
    // live there.
    includeAccountTypes: [AccountType.Base],
  })

  const token = useQueryLoadingDataWithError(
    denomOrAddress
      ? tokenQueries.info(queryClient, {
          chainId,
          type,
          denomOrAddress,
        })
      : undefined
  )

  return (
    <CreateRewardDistributionComponent {...props} options={{ tokens, token }} />
  )
}

export class CreateRewardDistributionAction extends ActionBase<CreateRewardDistributionData> {
  public readonly key = ActionKey.CreateRewardDistribution
  public readonly Component = Component

  /**
   * Existing reward distributors.
   */
  private distributors: DaoRewardDistributor[]

  private instantiate2Action: Instantiate2Action
  private manageStorageItemsAction: ManageStorageItemsAction

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Only DAOs can create reward distributions')
    }

    super(options, {
      Icon: BucketEmoji,
      label: options.t('title.createRewardDistribution'),
      description: options.t('info.createRewardDistributionDescription'),
    })

    this.distributors = getDaoRewardDistributors(options.context.dao.info.items)

    this.instantiate2Action = new Instantiate2Action(this.options)
    this.manageStorageItemsAction = new ManageStorageItemsAction(this.options)

    this.defaults = {
      type: TokenType.Native,
      denomOrAddress: getNativeTokenForChainId(options.chain.chain_id)
        .denomOrAddress,
      immediate: false,
      rate: {
        amount: 1,
        duration: {
          value: 1,
          units: DurationUnits.Hours,
        },
      },
      initialFunds: 0,
    }
  }

  async setup() {
    await this.instantiate2Action.setup()
    await this.manageStorageItemsAction.setup()
  }

  async encode({
    type,
    denomOrAddress,
    immediate,
    rate,
    initialFunds,
  }: CreateRewardDistributionData): Promise<UnifiedCosmosMsg[]> {
    if (this.options.context.type !== ActionContextType.Dao) {
      throw new Error('Only DAOs can create reward distributions')
    }
    if (this.options.chainContext.type !== ActionChainContextType.Supported) {
      throw new Error('Unsupported chain')
    }

    const votingModule = this.options.context.dao.votingModule
    const hookCaller = await votingModule.getHookCaller()

    const messages: UnifiedCosmosMsg[] = []

    const token = await this.options.queryClient.fetchQuery(
      tokenQueries.info(this.options.queryClient, {
        chainId: this.options.chain.chain_id,
        type,
        denomOrAddress,
      })
    )

    let distributor = this.distributors[0]?.address

    // Create new distributor if not found.
    if (!distributor) {
      const codeId =
        this.options.chainContext.config.codeIds.DaoRewardsDistributor
      if (!codeId) {
        throw new Error(
          'Reward distributor contract not yet uploaded to this chain'
        )
      }

      const id = nanoid(8)
      const salt = `dao-reward-distributor-${id}`

      distributor = await this.options.queryClient.fetchQuery(
        contractQueries.instantiate2Address(this.options.queryClient, {
          chainId: this.options.chain.chain_id,
          creator: this.options.address,
          codeId,
          salt,
        })
      )

      messages.push(
        // Will only ever be one message since it's on the native chain.
        ...[
          this.instantiate2Action.encode({
            chainId: this.options.chain.chain_id,
            sender: this.options.address,
            admin: this.options.address,
            codeId,
            label: `DAO Rewards Distributor (${id})`,
            message: JSON.stringify(
              {
                owner: this.options.address,
              } as InstantiateMsg,
              null,
              2
            ),
            salt,
            funds: [],
          }),
        ].flat(),
        // Set storage item after instantiation.
        this.manageStorageItemsAction.encode({
          setting: true,
          key: getRewardDistributorStorageItemKey(id),
          value: distributor,
        })
      )
    }

    // Create reward distribution.
    messages.push(
      makeExecuteSmartContractMessage({
        chainId: this.options.chain.chain_id,
        sender: this.options.address,
        contractAddress: distributor,
        msg: {
          create: {
            denom:
              type === TokenType.Cw20
                ? {
                    cw20: denomOrAddress,
                  }
                : {
                    native: denomOrAddress,
                  },
            emission_rate: immediate
              ? {
                  immediate: {},
                }
              : {
                  linear: {
                    amount: convertDenomToMicroDenomStringWithDecimals(
                      rate.amount,
                      token.decimals
                    ),
                    duration: convertDurationWithUnitsToDuration(rate.duration),
                    continuous: false,
                  },
                },
            hook_caller: hookCaller,
            vp_contract: votingModule.address,
          } as CreateMsg,
        },
        funds:
          type === TokenType.Native && initialFunds
            ? [
                {
                  denom: denomOrAddress,
                  amount: convertDenomToMicroDenomStringWithDecimals(
                    initialFunds,
                    token.decimals
                  ),
                },
              ]
            : undefined,
      })
    )

    // If hook missing, add it.
    const hooks = await votingModule.getHooks()
    if (!hooks.includes(distributor)) {
      messages.push(
        makeExecuteSmartContractMessage({
          chainId: this.options.chain.chain_id,
          sender: this.options.address,
          contractAddress: hookCaller,
          msg: {
            add_hook: {
              addr: distributor,
            },
          },
        })
      )
    }

    // Cw20 funds must be sent after this passes and the distribution ID is
    // created.
    if (type === TokenType.Cw20 && initialFunds) {
      throw new Error('CW20 initial funds not yet supported')
    }

    return messages
  }

  async match(messages: ProcessedMessage[]): Promise<ActionMatch> {
    if (this.options.context.type !== ActionContextType.Dao) {
      throw new Error('Only DAOs can create reward distributions')
    }

    const currentVotingModule = this.options.context.dao.votingModule
    const hookCaller = await currentVotingModule.getHookCaller()

    // There are 2 scenarios with different message sets:
    //
    // new contract:
    // - instantiate contract
    // - set storage item
    // - create distribution
    // - add hook (if needed)
    //
    // existing contract:
    // - create distribution
    // - add hook (if needed)

    // Existing contract
    if (
      objectMatchesStructure(messages[0].decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              create: {
                denom: {},
                emission_rate: {},
                hook_caller: {},
                vp_contract: {},
              },
            },
          },
        },
      }) &&
      this.distributors.some(
        (d) =>
          d.address === messages[0].decodedMessage.wasm.execute.contract_addr
      ) &&
      // Ensure voting module and hook caller are correct. Otherwise, this may
      // be a malicious actor trying to use a different voting module that
      // distributes rewards to different recipients.
      messages[0].decodedMessage.wasm.execute.msg.create.vp_contract ===
        currentVotingModule.address &&
      messages[0].decodedMessage.wasm.execute.msg.create.hook_caller ===
        hookCaller
    ) {
      const distributor = messages[0].decodedMessage.wasm.execute.contract_addr

      // Only one or two messages expected for existing contracts, depending on
      // if hook is being added.
      return messages.length >= 2 &&
        objectMatchesStructure(messages[1].decodedMessage, {
          wasm: {
            execute: {
              contract_addr: {},
              funds: {},
              msg: {
                add_hook: {
                  addr: {},
                },
              },
            },
          },
        }) &&
        messages[1].decodedMessage.wasm.execute.contract_addr === hookCaller &&
        messages[1].decodedMessage.wasm.execute.msg.add_hook.addr ===
          distributor
        ? 2
        : 1
    }

    // New contract
    if (
      messages.length >= 3 &&
      // First is instantiate contract.
      this.instantiate2Action.match([messages[0]]) &&
      // Second is set storage item.
      this.manageStorageItemsAction.match([messages[1]]) &&
      // Third is create distribution.
      objectMatchesStructure(messages[2].decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              create: {
                denom: {},
                emission_rate: {},
                hook_caller: {},
                vp_contract: {},
              },
            },
          },
        },
      }) &&
      // Ensure voting module and hook caller are correct. Otherwise, this may
      // be a malicious actor trying to use a different voting module that
      // distributes rewards to different recipients.
      messages[2].decodedMessage.wasm.execute.msg.create.vp_contract ===
        currentVotingModule.address &&
      messages[2].decodedMessage.wasm.execute.msg.create.hook_caller ===
        hookCaller
    ) {
      const distributor = messages[2].decodedMessage.wasm.execute.contract_addr

      // Only three or four messages expected for existing contracts, depending
      // on if hook is being added.
      return messages.length >= 4 &&
        objectMatchesStructure(messages[3].decodedMessage, {
          wasm: {
            execute: {
              contract_addr: {},
              funds: {},
              msg: {
                add_hook: {
                  addr: {},
                },
              },
            },
          },
        }) &&
        messages[3].decodedMessage.wasm.execute.contract_addr === hookCaller &&
        messages[3].decodedMessage.wasm.execute.msg.add_hook.addr ===
          distributor
        ? 4
        : 3
    }

    return false
  }

  async decode(
    messages: ProcessedMessage[]
  ): Promise<CreateRewardDistributionData> {
    const target = (
      messages.length === 1
        ? messages[0].decodedMessage
        : messages[2].decodedMessage
    ).wasm.execute
    const createMsg: CreateMsg = target.msg.create
    const initialFunds = target.funds[0]?.amount ?? '0'

    const type = 'native' in createMsg.denom ? TokenType.Native : TokenType.Cw20
    const denomOrAddress =
      'native' in createMsg.denom
        ? createMsg.denom.native
        : createMsg.denom.cw20

    const token = await this.options.queryClient.fetchQuery(
      tokenQueries.info(this.options.queryClient, {
        chainId: this.options.chain.chain_id,
        type,
        denomOrAddress,
      })
    )

    return {
      type,
      denomOrAddress,
      immediate: 'immediate' in createMsg.emission_rate,
      rate: {
        amount:
          'linear' in createMsg.emission_rate
            ? convertMicroDenomToDenomWithDecimals(
                createMsg.emission_rate.linear.amount,
                token.decimals
              )
            : 1,
        duration:
          'linear' in createMsg.emission_rate
            ? convertDurationToDurationWithUnits(
                createMsg.emission_rate.linear.duration
              )
            : {
                value: 1,
                units: DurationUnits.Hours,
              },
      },
      initialFunds:
        initialFunds === '0'
          ? 0
          : convertMicroDenomToDenomWithDecimals(initialFunds, token.decimals),
    }
  }
}
