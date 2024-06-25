import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { QueryClient, UseQueryOptions } from '@tanstack/react-query'

import { Coin } from '../contracts/common'
import { PreProposeModule, ProposalModule } from '../dao'
import { ContractVersion } from '../features'
import { DaoBase } from './dao'

export abstract class ProposalModuleBase<
  Dao extends DaoBase = DaoBase,
  Proposal = any,
  VoteResponse = any,
  VoteInfo = any,
  Vote = any
> {
  /**
   * The contract names that this module supports.
   */
  static contractNames: readonly string[]

  constructor(
    protected readonly queryClient: QueryClient,
    /**
     * Get the DAO this proposal module belongs to.
     */
    public readonly dao: Dao,
    public readonly info: ProposalModule
  ) {}

  /**
   * Contract address.
   */
  get address(): string {
    return this.info.address
  }

  /**
   * Contract version.
   */
  get version(): ContractVersion {
    return this.info.version
  }

  /**
   * Contract name.
   */
  get contractName(): string {
    return this.info.contractName
  }

  /**
   * Proposal module prefix in the DAO.
   */
  get prefix(): string {
    return this.info.prefix
  }

  /**
   * Pre-propose module, or null if none.
   */
  get prePropose(): PreProposeModule | null {
    return this.info.prePropose
  }

  /**
   * Make a proposal.
   */
  abstract propose(options: {
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
  abstract vote(options: {
    proposalId: number
    vote: Vote
    getSigningClient: () => Promise<SigningCosmWasmClient>
    sender: string
  }): Promise<void>

  /**
   * Execute a passed proposal.
   */
  abstract execute(options: {
    proposalId: number
    getSigningClient: () => Promise<SigningCosmWasmClient>
    sender: string
    memo?: string
  }): Promise<void>

  /**
   * Close a rejected proposal.
   */
  abstract close(options: {
    proposalId: number
    getSigningClient: () => Promise<SigningCosmWasmClient>
    sender: string
  }): Promise<void>

  /**
   * Query options to fetch the vote on a proposal by a given address. If voter
   * is undefined, will return query in loading state.
   */
  abstract getVoteQuery(options: {
    proposalId: number
    voter: string | undefined
  }): UseQueryOptions<VoteResponse>

  /**
   * Fetch the vote on a proposal by a given address. If the address has not
   * voted, it will return null.
   */
  abstract getVote(options: {
    proposalId: number
    voter: string
  }): Promise<VoteInfo | null>
}
