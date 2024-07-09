import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { FetchQueryOptions } from '@tanstack/react-query'

import { Coin } from '../contracts/common'
import { PreProposeModule, ProposalModule } from '../dao'
import { ContractVersion } from '../features'
import { IDaoBase } from './dao'

export interface IProposalModuleBase<
  Dao extends IDaoBase = IDaoBase,
  Proposal = any,
  VoteResponse = any,
  VoteInfo = any,
  Vote = any
> {
  /**
   * DAO this module belongs to.
   */
  dao: Dao

  /**
   * Proposal module info.
   */
  info: ProposalModule

  /**
   * Contract address.
   */
  address: string

  /**
   * Contract version.
   */
  version: ContractVersion

  /**
   * Contract name.
   */
  contractName: string

  /**
   * Proposal module prefix in the DAO.
   */
  prefix: string

  /**
   * Pre-propose module, or null if none.
   */
  prePropose: PreProposeModule | null

  /**
   * Make a proposal.
   */
  propose(options: {
    data: Proposal
    getSigningClient: () => Promise<SigningCosmWasmClient>
    sender: string
    funds?: Coin[]
  }): Promise<{
    proposalNumber: number
    proposalId: string
  }>

  /**
   * Vote on a proposal.
   */
  vote(options: {
    proposalId: number
    vote: Vote
    getSigningClient: () => Promise<SigningCosmWasmClient>
    sender: string
  }): Promise<void>

  /**
   * Execute a passed proposal.
   */
  execute(options: {
    proposalId: number
    getSigningClient: () => Promise<SigningCosmWasmClient>
    sender: string
    memo?: string
  }): Promise<void>

  /**
   * Close a rejected proposal.
   */
  close(options: {
    proposalId: number
    getSigningClient: () => Promise<SigningCosmWasmClient>
    sender: string
  }): Promise<void>

  /**
   * Query options to fetch the vote on a proposal by a given address. If voter
   * is undefined, will return query in loading state.
   */
  getVoteQuery(options: {
    proposalId: number
    voter: string | undefined
  }): FetchQueryOptions<VoteResponse>

  /**
   * Fetch the vote on a proposal by a given address. If the address has not
   * voted, it will return null.
   */
  getVote(options: {
    proposalId: number
    voter: string
  }): Promise<VoteInfo | null>

  /**
   * Query options to fetch the total number of proposals.
   */
  getProposalCountQuery(): FetchQueryOptions<number>

  /**
   * Fetch the total number of proposals.
   */
  getProposalCount(): Promise<number>
}
