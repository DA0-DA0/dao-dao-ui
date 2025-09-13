import { CustomTxOptions } from '@cosmjs/cosmwasm-stargate'
import { UndefinedInitialDataOptions } from '@tanstack/react-query'

import {
  CheckedDepositInfo,
  Coin,
  ContractVersion,
  ContractVersionInfo,
  Duration,
  Feature,
  IDaoBase,
  IProposalModuleBase,
  IQueryClient,
  PreProposeModule,
  UnvotedDelegatedVotingPower,
} from '@dao-dao/types'
import { VetoConfig } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import { RegistrationResponse } from '@dao-dao/types/contracts/DaoVoteDelegation'
import {
  SupportedSigningCosmWasmClient,
  isFeatureSupportedByVersion,
  parseContractVersion,
} from '@dao-dao/utils'

import { daoVoteDelegationQueries } from '../../query'

export abstract class ProposalModuleBase<
  Dao extends IDaoBase = IDaoBase,
  Proposal = any,
  ProposalResponse = any,
  ApprovalProposal = any,
  VoteResponse = any,
  VoteInfo = any,
  Vote = any,
  Config = any,
> implements
    IProposalModuleBase<
      Dao,
      Proposal,
      ProposalResponse,
      ApprovalProposal,
      VoteResponse,
      VoteInfo,
      Vote,
      Config
    >
{
  /**
   * The contract names that this module supports.
   */
  static contractNames: readonly string[]

  /**
   * Whether or not the client has been initialized. This only matters for some
   * functions, depending on the implementation.
   */
  protected _initialized: boolean = false

  /**
   * Pre-propose module, or null if none.
   */
  protected _prePropose: PreProposeModule | null = null

  /**
   * Veto config, or null if disabled.
   */
  protected _veto: VetoConfig | null = null

  constructor(
    /**
     * Query client.
     */
    protected readonly queryClient: IQueryClient,
    /**
     * DAO this module belongs to.
     */
    public readonly dao: Dao,
    /**
     * Chain ID of the proposal module.
     */
    public readonly chainId: string,
    /**
     * Contract address.
     */
    public readonly address: string,
    /**
     * Proposal module prefix in the DAO.
     */
    public readonly prefix: string,
    /**
     * Info for the proposal module.
     */
    public readonly info: ContractVersionInfo
  ) {}

  /**
   * Initialize the client. This only matters for some functions, depending on
   * the implementation.
   */
  init() {
    this._initialized = true
  }

  /**
   * Whether or not the client has been initialized. This only matters for some
   * functions, depending on the implementation.
   */
  get initialized(): boolean {
    return this._initialized
  }

  /**
   * Contract version.
   */
  get version(): ContractVersion {
    return parseContractVersion(this.info.version)
  }

  /**
   * Contract name.
   */
  get contractName(): string {
    return this.info.contract
  }

  /**
   * Pre-propose module, or null if none.
   */
  get prePropose(): PreProposeModule | null {
    if (!this.initialized) {
      throw new Error('Not initialized')
    }
    return this._prePropose
  }

  /**
   * Veto config, or null if not enabled.
   */
  get veto(): VetoConfig | null {
    if (!this.initialized) {
      throw new Error('Not initialized')
    }
    return this._veto
  }

  /**
   * Check whether or not the proposal module supports a given feature.
   */
  supports(feature: Feature): boolean {
    return isFeatureSupportedByVersion(feature, this.version)
  }

  /**
   * Make a proposal.
   */
  abstract propose(options: {
    data: Proposal
    /**
     * Cast a vote with the proposal.
     */
    vote?: Vote
    signingClient:
      | SupportedSigningCosmWasmClient
      | (() => Promise<SupportedSigningCosmWasmClient>)
    sender: string
    funds?: Coin[]
    txOptions?: CustomTxOptions
  }): Promise<{
    proposalNumber: number
    proposalId: string
    isApprovalProposal?: boolean
  }>

  /**
   * Vote on a proposal.
   */
  abstract vote(options: {
    proposalId: number
    vote: Vote
    signingClient:
      | SupportedSigningCosmWasmClient
      | (() => Promise<SupportedSigningCosmWasmClient>)
    sender: string
    txOptions?: CustomTxOptions
  }): Promise<void>

  /**
   * Execute a passed proposal.
   */
  abstract execute(options: {
    proposalId: number
    signingClient:
      | SupportedSigningCosmWasmClient
      | (() => Promise<SupportedSigningCosmWasmClient>)
    sender: string
    memo?: string
    txOptions?: CustomTxOptions
  }): Promise<void>

  /**
   * Close a rejected proposal.
   */
  abstract close(options: {
    proposalId: number
    signingClient:
      | SupportedSigningCosmWasmClient
      | (() => Promise<SupportedSigningCosmWasmClient>)
    sender: string
    txOptions?: CustomTxOptions
  }): Promise<void>

  /**
   * Query options to fetch a proposal.
   */
  abstract getProposalQuery(options: {
    proposalId: number
  }): UndefinedInitialDataOptions<ProposalResponse>

  /**
   * Fetch a proposal.
   */
  async getProposal(options: {
    proposalId: number
  }): Promise<ProposalResponse> {
    return await this.queryClient.fetchQuery(this.getProposalQuery(options))
  }

  /**
   * Query options to fetch an approval proposal from the pre-propose-approval
   * module, if configured.
   */
  getApprovalProposalQuery(_options: {
    proposalId: number
  }): UndefinedInitialDataOptions<ApprovalProposal> {
    throw new Error('Not implemented')
  }

  /**
   * Fetch an approval proposal from the pre-propose-approval module, if
   * configured.
   */
  async getApprovalProposal(options: {
    proposalId: number
  }): Promise<ApprovalProposal> {
    return await this.queryClient.fetchQuery(
      this.getApprovalProposalQuery(options)
    )
  }

  /**
   * Query options to fetch the vote on a proposal by a given address. If voter
   * is undefined, will return query in loading state.
   */
  abstract getVoteQuery(options: {
    proposalId: number
    voter?: string
  }): UndefinedInitialDataOptions<VoteResponse>

  /**
   * Fetch the vote on a proposal by a given address. If the address has not
   * voted, it will return null.
   */
  abstract getVote(options: {
    proposalId: number
    voter: string
  }): Promise<VoteInfo | null>

  /**
   * Query options to fetch the total number of proposals.
   */
  abstract getProposalCountQuery(): UndefinedInitialDataOptions<number>

  /**
   * Fetch the total number of proposals.
   */
  async getProposalCount(
    ...params: Parameters<ProposalModuleBase['getProposalCountQuery']>
  ): Promise<number> {
    return await this.queryClient.fetchQuery(
      this.getProposalCountQuery(...params)
    )
  }

  /**
   * Query options to fetch the config.
   */
  abstract getConfigQuery(): Pick<
    UndefinedInitialDataOptions<Config>,
    'queryKey' | 'queryFn'
  >

  /**
   * Query options to fetch configured deposit info, if any.
   */
  abstract getDepositInfoQuery(): Pick<
    UndefinedInitialDataOptions<CheckedDepositInfo | null>,
    'queryKey' | 'queryFn'
  >

  /**
   * Fetch the max voting period.
   */
  abstract getMaxVotingPeriod(): Promise<Duration>

  /**
   * Query options to fetch the delegation module address, or null if none.
   */
  abstract getDelegationModuleQuery(): Pick<
    UndefinedInitialDataOptions<string | null>,
    'queryKey' | 'queryFn'
  >

  /**
   * Fetch the unvoted delegated voting power on a specific proposal for a given
   * delegate.
   */
  getUnvotedDelegatedVotingPowerQuery(_options: {
    delegate: string
    proposalId: number
  }): UndefinedInitialDataOptions<UnvotedDelegatedVotingPower> {
    throw new Error('Not implemented')
  }

  /**
   * Fetch a delegate's registration info, optionally at a specific height, or
   * null if no delegation module.
   */
  getDelegateRegistrationQuery({
    delegate,
    height,
  }: {
    delegate: string
    height?: number
  }): UndefinedInitialDataOptions<RegistrationResponse | null> {
    return {
      queryKey: [
        'proposalModule',
        'delegateRegistration',
        {
          chainId: this.chainId,
          address: this.address,
          delegate,
          height,
        },
      ],
      queryFn: async (ctx) => {
        if (
          !isFeatureSupportedByVersion(Feature.VoteDelegation, this.version)
        ) {
          return null
        }

        const delegationModule = await ctx.client.fetchQuery(
          this.getDelegationModuleQuery()
        )

        if (!delegationModule) {
          return null
        }

        const registration = await ctx.client.fetchQuery(
          daoVoteDelegationQueries.registration({
            chainId: this.chainId,
            contractAddress: delegationModule,
            args: {
              delegate,
              height,
            },
          })
        )

        return registration
      },
    }
  }
}
