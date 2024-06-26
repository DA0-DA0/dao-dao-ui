import { FetchQueryOptions, skipToken } from '@tanstack/react-query'

import {
  DaoPreProposeMultipleClient,
  DaoProposalMultipleClient,
} from '@dao-dao/state/contracts'
import { daoProposalMultipleQueries } from '@dao-dao/state/query'
import { Coin } from '@dao-dao/types'
import {
  MultipleChoiceVote,
  VoteInfo,
  VoteResponse,
} from '@dao-dao/types/contracts/DaoProposalMultiple'
import {
  DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES,
  SupportedSigningCosmWasmClient,
  findWasmAttributeValue,
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
      ).propose({
        msg: {
          // Type mismatch between Cosmos msgs and Secret Network Cosmos msgs.
          // The contract execution will fail if the messages are invalid, so
          // this is safe. The UI should ensure that the co rrect messages are
          // used for the given chain anyways.
          propose: data as any,
        },
      })

      proposalNumber = Number(
        findWasmAttributeValue(events, this.address, 'proposal_id') ?? -1
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

    await new DaoProposalMultipleClient(client, sender, this.address).vote({
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
    // If no voter, return query in loading state.
    if (!voter) {
      return {
        queryKey: [],
        queryFn: skipToken,
      }
    }

    return daoProposalMultipleQueries.getVote({
      chainId: this.dao.chainId,
      contractAddress: this.info.address,
      args: {
        proposalId,
        voter,
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
}
