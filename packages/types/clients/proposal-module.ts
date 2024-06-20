import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { QueryClient } from '@tanstack/react-query'

import { Coin } from '../contracts/common'
import { PreProposeModule, ProposalModule } from '../dao'
import { ContractVersion } from '../features'
import { DaoBase } from './dao'

export abstract class ProposalModuleBase<
  Dao extends DaoBase = DaoBase,
  Proposal = any,
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
  abstract propose({
    data,
    getSigningClient,
    sender,
    funds,
  }: {
    data: Proposal
    getSigningClient: () => Promise<SigningCosmWasmClient>
    sender: string
    funds?: Coin[]
  }): Promise<{
    proposalNumber: number
    proposalId: string
  }>

  /**
   * Fetch the vote on a proposal by a given address. If the address has not
   * voted, it will return null.
   */
  abstract getVote(proposalId: number, address: string): Promise<Vote | null>
}
