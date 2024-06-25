import { FetchQueryOptions, skipToken } from '@tanstack/react-query'

import {
  SecretDaoPreProposeSingleClient,
  SecretDaoProposalSingleClient,
} from '@dao-dao/state/contracts'
import { secretDaoProposalSingleQueries } from '@dao-dao/state/query'
import { Coin, ProposalModuleBase } from '@dao-dao/types'
import {
  Vote,
  VoteInfo,
  VoteResponse,
} from '@dao-dao/types/contracts/SecretDaoProposalSingle'
import {
  ContractName,
  DAO_PROPOSAL_SINGLE_CONTRACT_NAMES,
  SupportedSigningCosmWasmClient,
  findWasmAttributeValue,
} from '@dao-dao/utils'

import { NewProposalData } from '../../proposal-module-adapter/adapters/DaoProposalSingle/types'
import { SecretCwDao } from '../dao/SecretCwDao'

export class SecretSingleChoiceProposalModule extends ProposalModuleBase<
  SecretCwDao,
  NewProposalData,
  VoteResponse,
  VoteInfo,
  Vote
> {
  static contractNames: readonly string[] = DAO_PROPOSAL_SINGLE_CONTRACT_NAMES

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
    let isPreProposeApprovalProposal = false

    if (this.prePropose) {
      const { events } = await new SecretDaoPreProposeSingleClient(
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

      isPreProposeApprovalProposal =
        this.prePropose.contractName === ContractName.PreProposeApprovalSingle
      proposalNumber =
        // pre-propose-approval proposals have a different event
        isPreProposeApprovalProposal
          ? Number(
              findWasmAttributeValue(events, this.prePropose.address, 'id') ??
                -1
            )
          : Number(
              findWasmAttributeValue(events, this.address, 'proposal_id') ?? -1
            )
    } else {
      const { events } = await new SecretDaoProposalSingleClient(
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
    const permit = await this.dao.getPermit(sender)

    await new SecretDaoProposalSingleClient(client, sender, this.address).vote({
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

    await new SecretDaoProposalSingleClient(
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
    await new SecretDaoProposalSingleClient(client, sender, this.address).close(
      {
        proposalId,
      }
    )
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

    return secretDaoProposalSingleQueries.getVote({
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
    options: Parameters<SecretSingleChoiceProposalModule['getVoteQuery']>[0],
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
}
