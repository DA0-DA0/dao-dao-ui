import { FetchQueryOptions } from '@tanstack/react-query'

import {
  CwProposalSingleV1Client,
  DaoPreProposeSingleClient,
  DaoProposalSingleV2Client,
} from '@dao-dao/state/contracts'
import {
  cwProposalSingleV1Queries,
  daoProposalSingleV2Queries,
} from '@dao-dao/state/query'
import {
  Coin,
  ContractVersion,
  Feature,
  ModuleInstantiateInfo,
} from '@dao-dao/types'
import { InstantiateMsg as DaoPreProposeApprovalSingleInstantiateMsg } from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'
import {
  InstantiateMsg as DaoPreProposeSingleInstantiateMsg,
  UncheckedDepositInfo,
} from '@dao-dao/types/contracts/DaoPreProposeSingle'
import {
  Duration,
  InstantiateMsg,
  PreProposeInfo,
  Threshold,
  VetoConfig,
  Vote,
  VoteInfo,
  VoteResponse,
} from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
  ContractName,
  DAO_PROPOSAL_SINGLE_CONTRACT_NAMES,
  SupportedSigningCosmWasmClient,
  encodeJsonToBase64,
  findWasmAttributeValue,
  isFeatureSupportedByVersion,
  mustGetSupportedChainConfig,
} from '@dao-dao/utils'

import { NewProposalData } from '../../proposal-module-adapter/adapters/DaoProposalSingle/types'
import { CwDao } from '../dao/CwDao'
import { ProposalModuleBase } from './base'

export class SingleChoiceProposalModule extends ProposalModuleBase<
  CwDao,
  NewProposalData,
  VoteResponse,
  VoteInfo,
  Vote
> {
  static contractNames: readonly string[] = DAO_PROPOSAL_SINGLE_CONTRACT_NAMES

  /**
   * Generate the module instantiate info to plug into the DAO instantiate info
   * generator function.
   */
  static generateModuleInstantiateInfo(
    chainId: string,
    config: {
      threshold: Threshold
      maxVotingPeriod: Duration
      minVotingPeriod?: Duration
      allowRevoting: boolean
      veto?: VetoConfig | null
      approver?: string
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
    }
  ): ModuleInstantiateInfo {
    const { codeIds, codeIdsVersion } = mustGetSupportedChainConfig(chainId)

    const preProposeCommon = {
      deposit_info: config.deposit,
      ...(isFeatureSupportedByVersion(
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
            open_proposal_submission: config.submissionPolicy === 'anyone',
          }),
    }

    const pre_propose_info: PreProposeInfo = {
      module_may_propose: {
        info: {
          admin: { core_module: {} },
          code_id: config.approver
            ? codeIds.DaoPreProposeApprovalSingle
            : codeIds.DaoPreProposeSingle,
          label: `dao-pre-propose${
            config.approver ? '-approval' : ''
          }-single_${Date.now()}`,
          msg: encodeJsonToBase64(
            config.approver
              ? ({
                  ...preProposeCommon,
                  extension: {
                    approver: config.approver,
                  },
                } as DaoPreProposeApprovalSingleInstantiateMsg)
              : ({
                  ...preProposeCommon,
                  extension: {},
                } as DaoPreProposeSingleInstantiateMsg)
          ),
          funds: [],
        },
      },
    }

    return {
      admin: { core_module: {} },
      code_id: codeIds.DaoProposalSingle,
      label: `dao-proposal-single_${Date.now()}`,
      msg: encodeJsonToBase64({
        allow_revoting: config.allowRevoting,
        close_proposal_on_execution_failure:
          config.closeProposalOnExecutionFailure ?? true,
        max_voting_period: config.maxVotingPeriod,
        min_voting_period: config.minVotingPeriod,
        only_members_execute: config.onlyMembersExecute ?? true,
        pre_propose_info,
        threshold: config.threshold,
        veto: config.veto,
      } as InstantiateMsg),
      funds: [],
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
    let isPreProposeApprovalProposal = false

    // V1 does not support pre-propose.
    if (this.version === ContractVersion.V1) {
      const { events } = await new CwProposalSingleV1Client(
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

      // Every other version supports pre-propose.
    } else if (this.prePropose) {
      const { events } = await new DaoPreProposeSingleClient(
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

      isPreProposeApprovalProposal =
        this.prePropose.contractName === ContractName.PreProposeApprovalSingle
      proposalNumber =
        // pre-propose-approval proposals have a different event
        isPreProposeApprovalProposal
          ? Number(
              findWasmAttributeValue(
                this.dao.chainId,
                events,
                this.prePropose.address,
                'id'
              ) ?? -1
            )
          : Number(
              findWasmAttributeValue(
                this.dao.chainId,
                events,
                this.address,
                'proposal_id'
              ) ?? -1
            )
    } else {
      const { events } = await new DaoProposalSingleV2Client(
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
      // Proposal IDs are the the prefix plus the proposal number. If a
      // pre-propose-approval proposal, an asterisk is inserted in the middle.
      proposalId: `${this.prefix}${
        isPreProposeApprovalProposal ? '*' : ''
      }${proposalNumber}`,
    }
  }

  async vote({
    proposalId,
    vote,
    getSigningClient,
    sender,
  }: {
    proposalId: number
    vote: Vote
    getSigningClient: () => Promise<SupportedSigningCosmWasmClient>
    sender: string
  }): Promise<void> {
    const client = await getSigningClient()

    const Client =
      this.version === ContractVersion.V1
        ? CwProposalSingleV1Client
        : DaoProposalSingleV2Client

    await new Client(client, sender, this.address).vote({
      proposalId,
      vote,
    })

    await this.queryClient.invalidateQueries({
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

    const Client =
      this.version === ContractVersion.V1
        ? CwProposalSingleV1Client
        : DaoProposalSingleV2Client

    await new Client(client, sender, this.address).execute(
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

    const Client =
      this.version === ContractVersion.V1
        ? CwProposalSingleV1Client
        : DaoProposalSingleV2Client

    await new Client(client, sender, this.address).close({
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
    const query =
      this.info.version === ContractVersion.V1
        ? cwProposalSingleV1Queries.vote
        : daoProposalSingleV2Queries.getVote

    return query(this.queryClient, {
      chainId: this.dao.chainId,
      contractAddress: this.info.address,
      args: {
        proposalId,
        // Force type-cast since the query won't be enabled until this is set.
        // This allows us to pass an undefined `voter` argument in order to
        // invalidate/refresh the query for all voters.
        voter: voter!,
      },
      // If no voter, return query in loading state.
      options: {
        enabled: !!voter,
      },
    })
  }

  async getVote(
    ...params: Parameters<SingleChoiceProposalModule['getVoteQuery']>
  ): Promise<VoteInfo | null> {
    return (
      (await this.queryClient.fetchQuery(this.getVoteQuery(...params))).vote ||
      null
    )
  }

  getProposalCountQuery(): FetchQueryOptions<number> {
    const query =
      this.info.version === ContractVersion.V1
        ? cwProposalSingleV1Queries.proposalCount
        : daoProposalSingleV2Queries.proposalCount

    return query(this.queryClient, {
      chainId: this.dao.chainId,
      contractAddress: this.info.address,
    })
  }
}
