import { FetchQueryOptions } from '@tanstack/react-query'

import {
  DaoPreProposeMultipleClient,
  DaoProposalMultipleClient,
} from '@dao-dao/state/contracts'
import { daoProposalMultipleQueries } from '@dao-dao/state/query'
import {
  Coin,
  ContractVersion,
  Feature,
  ModuleInstantiateInfo,
} from '@dao-dao/types'
import {
  InstantiateMsg as DaoPreProposeMultipleInstantiateMsg,
  UncheckedDepositInfo,
} from '@dao-dao/types/contracts/DaoPreProposeMultiple'
import {
  Duration,
  InstantiateMsg,
  MultipleChoiceVote,
  PercentageThreshold,
  PreProposeInfo,
  VetoConfig,
  VoteInfo,
  VoteResponse,
} from '@dao-dao/types/contracts/DaoProposalMultiple'
import {
  DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES,
  SupportedSigningCosmWasmClient,
  encodeJsonToBase64,
  findWasmAttributeValue,
  isFeatureSupportedByVersion,
  mustGetSupportedChainConfig,
} from '@dao-dao/utils'

import { NewProposalData } from '../../proposal-module-adapter/adapters/DaoProposalMultiple/types'
import { CwDao } from '../dao/CwDao'
import { ProposalModuleBase } from './base'

export class MultipleChoiceProposalModule extends ProposalModuleBase<
  CwDao,
  NewProposalData,
  VoteResponse,
  VoteInfo,
  MultipleChoiceVote
> {
  static contractNames: readonly string[] = DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES

  /**
   * Generate the module instantiate info to plug into the DAO instantiate info
   * generator function.
   */
  static generateModuleInstantiateInfo(
    chainId: string,
    config: {
      quorum: PercentageThreshold
      maxVotingPeriod: Duration
      minVotingPeriod?: Duration
      allowRevoting: boolean
      veto?: VetoConfig | null
      deposit?: UncheckedDepositInfo | null
      submissionPolicy: 'members' | 'anyone'
      /**
       * Defaults to true.
       */
      closeProposalOnExecutionFailure?: boolean
      /**
       * Defaults to true.
       */
      onlyMembersExecute?: boolean
    },
    options: {
      /**
       * If true, omits the funds field from the module instantiate info objects
       * and uses v2.1.0 contracts. This is used when enabling multiple choice
       * via the action for a DAO that is on a version below v2.3.0, since there
       * was a breaking change on the `funds` field.
       *
       * Defaults to false.
       */
      useV210WithoutFunds?: boolean
    } = {
      useV210WithoutFunds: false,
    }
  ): ModuleInstantiateInfo {
    const { codeIds, codeIdsVersion, historicalCodeIds } =
      mustGetSupportedChainConfig(chainId)
    const codeIdsToUse = {
      ...codeIds,
      ...(options.useV210WithoutFunds &&
        historicalCodeIds?.[ContractVersion.V210]),
    }

    const pre_propose_info: PreProposeInfo = {
      module_may_propose: {
        info: {
          admin: { core_module: {} },
          code_id: codeIdsToUse.DaoPreProposeMultiple,
          label: `dao-pre-propose-multiple_${Date.now()}`,
          msg: encodeJsonToBase64({
            deposit_info: config.deposit,
            extension: {},
            ...(!options.useV210WithoutFunds &&
            isFeatureSupportedByVersion(
              Feature.GranularSubmissionPolicy,
              codeIdsVersion
            )
              ? {
                  submission_policy:
                    config.submissionPolicy === 'anyone'
                      ? {
                          anyone: {},
                        }
                      : {
                          specific: {
                            dao_members: true,
                          },
                        },
                }
              : {
                  open_proposal_submission:
                    config.submissionPolicy === 'anyone',
                }),
          } as DaoPreProposeMultipleInstantiateMsg),
          // This function is used by the enable multiple choice action, and
          // DAOs before v2.3.0 still might want to enable multiple choice, so
          // make sure to support the old version without the `funds` field.
          ...(!options.useV210WithoutFunds && {
            funds: [],
          }),
        },
      },
    }

    return {
      admin: { core_module: {} },
      code_id: codeIdsToUse.DaoProposalMultiple,
      label: `dao-proposal-multiple_${Date.now()}`,
      msg: encodeJsonToBase64({
        allow_revoting: config.allowRevoting,
        close_proposal_on_execution_failure:
          config.closeProposalOnExecutionFailure ?? true,
        max_voting_period: config.maxVotingPeriod,
        min_voting_period: config.minVotingPeriod,
        only_members_execute: config.onlyMembersExecute ?? true,
        pre_propose_info,
        veto: config.veto,
        voting_strategy: {
          single_choice: {
            quorum: config.quorum,
          },
        },
      } as InstantiateMsg),
      // This function is used by the enable multiple choice action, and DAOs
      // before v2.3.0 still might want to enable multiple choice, so make sure
      // to support the old version without the `funds` field.
      ...(!options.useV210WithoutFunds && {
        funds: [],
      }),
    }
  }

  async propose({
    data,
    getSigningClient,
    sender,
    funds,
  }: {
    data: NewProposalData
    getSigningClient: () => Promise<SupportedSigningCosmWasmClient>
    sender: string
    funds?: Coin[]
  }): Promise<{
    proposalNumber: number
    proposalId: string
  }> {
    const client = await getSigningClient()

    let proposalNumber: number

    if (this.prePropose) {
      const { events } = await new DaoPreProposeMultipleClient(
        client,
        sender,
        this.prePropose.address
      ).propose(
        {
          msg: {
            // Type mismatch between Cosmos msgs and Secret Network Cosmos msgs.
            // The contract execution will fail if the messages are invalid, so
            // this is safe. The UI should ensure that the co rrect messages are
            // used for the given chain anyways.
            propose: data as any,
          },
        },
        undefined,
        undefined,
        funds
      )

      proposalNumber = Number(
        findWasmAttributeValue(
          this.dao.chainId,
          events,
          this.address,
          'proposal_id'
        ) ?? -1
      )
    } else {
      const { events } = await new DaoProposalMultipleClient(
        client,
        sender,
        this.address
      ).propose(
        // Type mismatch between Cosmos msgs and Secret Network Cosmos msgs.
        // The contract execution will fail if the messages are invalid, so this
        // is safe. The UI should ensure that the correct messages are used for
        // the given chain anyways.
        data as any,
        undefined,
        undefined,
        funds
      )

      proposalNumber = Number(
        findWasmAttributeValue(
          this.dao.chainId,
          events,
          this.address,
          'proposal_id'
        ) ?? -1
      )
    }

    if (proposalNumber === -1) {
      throw new Error('Proposal ID not found')
    }

    return {
      proposalNumber,
      // Proposal IDs are the the prefix plus the proposal number.
      proposalId: `${this.prefix}${proposalNumber}`,
    }
  }

  async vote({
    proposalId,
    vote,
    getSigningClient,
    sender,
  }: {
    proposalId: number
    vote: MultipleChoiceVote
    getSigningClient: () => Promise<SupportedSigningCosmWasmClient>
    sender: string
  }): Promise<void> {
    const client = await getSigningClient()

    await new DaoProposalMultipleClient(client, sender, this.address).vote({
      proposalId,
      vote,
    })

    await this.queryClient.refetchQueries({
      queryKey: this.getVoteQuery({
        proposalId,
        voter: sender,
      }).queryKey,
    })
  }

  async execute({
    proposalId,
    getSigningClient,
    sender,
    memo,
  }: {
    proposalId: number
    getSigningClient: () => Promise<SupportedSigningCosmWasmClient>
    sender: string
    memo?: string
  }): Promise<void> {
    const client = await getSigningClient()
    await new DaoProposalMultipleClient(client, sender, this.address).execute(
      {
        proposalId,
      },
      undefined,
      memo
    )
  }

  async close({
    proposalId,
    getSigningClient,
    sender,
  }: {
    proposalId: number
    getSigningClient: () => Promise<SupportedSigningCosmWasmClient>
    sender: string
  }): Promise<void> {
    const client = await getSigningClient()
    await new DaoProposalMultipleClient(client, sender, this.address).close({
      proposalId,
    })
  }

  getVoteQuery({
    proposalId,
    voter,
  }: {
    proposalId: number
    voter?: string
  }): FetchQueryOptions<VoteResponse> {
    return daoProposalMultipleQueries.getVote(this.queryClient, {
      chainId: this.dao.chainId,
      contractAddress: this.info.address,
      args: {
        proposalId,
        ...(voter && { voter }),
        // Force type-cast since the query won't be enabled until voter is set.
        // This allows us to pass an undefined `voter` argument in order to
        // invalidate/refresh the query for all voters.
      } as any,
      // If no voter, return query in loading state.
      options: {
        enabled: !!voter,
      },
    })
  }

  async getVote(
    ...params: Parameters<MultipleChoiceProposalModule['getVoteQuery']>
  ): Promise<VoteInfo | null> {
    return (
      (await this.queryClient.fetchQuery(this.getVoteQuery(...params))).vote ||
      null
    )
  }

  getProposalCountQuery(): FetchQueryOptions<number> {
    return daoProposalMultipleQueries.proposalCount(this.queryClient, {
      chainId: this.dao.chainId,
      contractAddress: this.info.address,
    })
  }
}
