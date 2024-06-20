import { QueryClient } from '@tanstack/react-query'

import { ProposalModule } from '@dao-dao/types'

import { DaoBase } from './dao'

export abstract class ProposalModuleBase<
  Dao extends DaoBase = DaoBase,
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

  // /**
  //  * Initialize the client. This only matters for some functions, depending on
  //  * the implementation.
  //  */
  // abstract init(): Promise<void>

  // /**
  //  * Whether or not the client has been initialized. This only matters for some
  //  * functions, depending on the implementation.
  //  */
  // abstract get initialized(): boolean

  /**
   * Fetch the vote on a proposal by a given address. If the address has not
   * voted, it will return null.
   */
  abstract getVote(proposalId: number, address: string): Promise<Vote | null>
}
