import { FetchQueryOptions, skipToken } from '@tanstack/react-query'

import {
  SecretDaoPreProposeMultipleClient,
  SecretDaoProposalMultipleClient,
} from '@dao-dao/state/contracts'
import { secretDaoProposalMultipleQueries } from '@dao-dao/state/query'
import { Coin, SecretModuleInstantiateInfo } from '@dao-dao/types'
import {
  InstantiateMsg as SecretDaoPreProposeMultipleInstantiateMsg,
  UncheckedDepositInfo,
} from '@dao-dao/types/contracts/SecretDaoPreProposeMultiple'
import {
  Duration,
  InstantiateMsg,
  MultipleChoiceVote,
  PercentageThreshold,
  PreProposeInfo,
  VetoConfig,
  VoteInfo,
  VoteResponse,
} from '@dao-dao/types/contracts/SecretDaoProposalMultiple'
import {
  DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES,
  SupportedSigningCosmWasmClient,
  encodeJsonToBase64,
  findWasmAttributeValue,
  mustGetSupportedChainConfig,
} from '@dao-dao/utils'

import { NewProposalData } from '../../proposal-module-adapter/adapters/DaoProposalMultiple/types'
import { SecretCwDao } from '../dao/SecretCwDao'
import { ProposalModuleBase } from './base'

export class SecretMultipleChoiceProposalModule extends ProposalModuleBase<
  SecretCwDao,
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
    daoName: string,
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
    }
  ): SecretModuleInstantiateInfo {
    const { codeIds, codeHashes } = mustGetSupportedChainConfig(chainId)
    if (!codeHashes) {
      throw new Error('Code hashes not configured for chain ' + chainId)
    }

    const pre_propose_info: PreProposeInfo = {
      module_may_propose: {
        info: {
          admin: { core_module: {} },
          code_id: codeIds.DaoPreProposeMultiple,
          code_hash: codeHashes.DaoPreProposeMultiple,
          label: `DAO_${daoName.trim()}_pre-propose-multiple`,
          msg: encodeJsonToBase64({
            deposit_info: config.deposit,
            extension: {},
            open_proposal_submission: config.submissionPolicy === 'anyone',
            proposal_module_code_hash: codeHashes.DaoProposalMultiple,
          } as SecretDaoPreProposeMultipleInstantiateMsg),
          funds: [],
        },
      },
    }

    return {
      admin: { core_module: {} },
      code_id: codeIds.DaoProposalMultiple,
      code_hash: codeHashes.DaoProposalMultiple,
      label: `DAO_${daoName.trim()}_proposal-multiple`,
      msg: encodeJsonToBase64({
        allow_revoting: config.allowRevoting,
        close_proposal_on_execution_failure:
          config.closeProposalOnExecutionFailure ?? true,
        dao_code_hash: codeHashes.DaoCore,
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
    const permit = await this.dao.getPermit(sender)

    let proposalNumber: number

    if (this.prePropose) {
      const { events } = await new SecretDaoPreProposeMultipleClient(
        client,
        sender,
        this.prePropose.address
      ).propose({
        msg: {
          // Type mismatch between Cosmos msgs and Secret Network Cosmos msgs.
          // The contract execution will fail if the messages are invalid, so
          // this is safe. The UI should ensure that the co rrect messages are
          // used for the given chain anyways.
          propose: data as any,
        },
        auth: {
          permit,
        },
      })

      proposalNumber = Number(
        findWasmAttributeValue(events, this.address, 'proposal_id') ?? -1
      )
    } else {
      const { events } = await new SecretDaoProposalMultipleClient(
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
        findWasmAttributeValue(events, this.address, 'proposal_id') ?? -1
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
    const permit = await this.dao.getPermit(sender)

    await new SecretDaoProposalMultipleClient(
      client,
      sender,
      this.address
    ).vote({
      proposalId,
      vote,
      auth: {
        permit,
      },
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
    const permit = await this.dao.getPermit(sender)

    await new SecretDaoProposalMultipleClient(
      client,
      sender,
      this.address
    ).execute(
      {
        proposalId,
        auth: {
          permit,
        },
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
    await new SecretDaoProposalMultipleClient(
      client,
      sender,
      this.address
    ).close({
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
    // If no voter nor permit, return query in loading state.
    const permit = voter && this.dao.getExistingPermit(voter)
    if (!permit) {
      return {
        queryKey: [],
        queryFn: skipToken,
      }
    }

    return secretDaoProposalMultipleQueries.getVote({
      chainId: this.dao.chainId,
      contractAddress: this.info.address,
      args: {
        proposalId,
        auth: {
          permit,
        },
      },
    })
  }

  async getVote(
    options: Parameters<SecretMultipleChoiceProposalModule['getVoteQuery']>[0],
    /**
     * Whether or not to prompt the wallet for a permit. If true,
     * `dao.registerOfflineSignerAminoGetter` must be called first.
     *
     * Defaults to false.
     */
    prompt = false
  ): Promise<VoteInfo | null> {
    if (prompt && options.voter) {
      // Load permit now which will be retrieved in getVoteQuery.
      await this.dao.getPermit(options.voter)
    }

    return (
      (await this.queryClient.fetchQuery(this.getVoteQuery(options))).vote ||
      null
    )
  }

  getProposalCountQuery(): FetchQueryOptions<number> {
    return secretDaoProposalMultipleQueries.proposalCount({
      chainId: this.dao.chainId,
      contractAddress: this.info.address,
    })
  }
}
