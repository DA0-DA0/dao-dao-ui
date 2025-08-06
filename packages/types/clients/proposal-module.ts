import {
  CustomTxOptions,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
import { UndefinedInitialDataOptions } from '@tanstack/react-query'

import { HugeDecimal } from '@dao-dao/math'

import { CheckedDepositInfo, Coin, Duration } from '../contracts/common'
import { VetoConfig } from '../contracts/DaoProposalSingle.v2'
import { RegistrationResponse } from '../contracts/DaoVoteDelegation'
import { PreProposeModule } from '../dao'
import { ContractVersion, Feature } from '../features'
import { IDaoBase } from './dao'

export interface IProposalModuleBase<
  Dao extends IDaoBase = IDaoBase,
  Proposal = any,
  ProposalResponse = any,
  ApprovalProposal = any,
  VoteResponse = any,
  VoteInfo = any,
  Vote = any,
  Config = any,
> {
  /**
   * DAO this module belongs to.
   */
  dao: Dao

  /**
   * Chain ID of the proposal module.
   */
  chainId: string

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
   * Veto config, or null if disabled.
   */
  veto: VetoConfig | null

  /**
   * Whether or not the client has been initialized. This only matters for some
   * functions, depending on the implementation.
   */
  initialized: boolean

  /**
   * Initialize the client. This only matters for some functions, depending on
   * the implementation.
   */
  init(): void | Promise<void>

  /**
   * Check whether or not the proposal module supports a given feature.
   */
  supports(feature: Feature): boolean

  /**
   * Make a proposal.
   */
  propose(options: {
    data: Proposal
    /**
     * Cast a vote with the proposal.
     */
    vote?: Vote
    signingClient:
      | SigningCosmWasmClient
      | (() => Promise<SigningCosmWasmClient>)
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
  vote(options: {
    proposalId: number
    vote: Vote
    signingClient:
      | SigningCosmWasmClient
      | (() => Promise<SigningCosmWasmClient>)
    sender: string
    txOptions?: CustomTxOptions
  }): Promise<void>

  /**
   * Execute a passed proposal.
   */
  execute(options: {
    proposalId: number
    signingClient:
      | SigningCosmWasmClient
      | (() => Promise<SigningCosmWasmClient>)
    sender: string
    memo?: string
    txOptions?: CustomTxOptions
  }): Promise<void>

  /**
   * Close a rejected proposal.
   */
  close(options: {
    proposalId: number
    signingClient:
      | SigningCosmWasmClient
      | (() => Promise<SigningCosmWasmClient>)
    sender: string
    txOptions?: CustomTxOptions
  }): Promise<void>

  /**
   * Query options to fetch a proposal.
   */
  getProposalQuery(options: {
    proposalId: number
  }): UndefinedInitialDataOptions<ProposalResponse>

  /**
   * Fetch a proposal.
   */
  getProposal(options: { proposalId: number }): Promise<ProposalResponse>

  /**
   * Query options to fetch an approval proposal from the pre-propose-approval
   * module, if configured.
   */
  getApprovalProposalQuery(options: {
    proposalId: number
  }): UndefinedInitialDataOptions<ApprovalProposal>

  /**
   * Fetch an approval proposal from the pre-propose-approval module, if
   * configured.
   */
  getApprovalProposal(options: {
    proposalId: number
  }): Promise<ApprovalProposal>

  /**
   * Query options to fetch the vote on a proposal by a given address. If voter
   * is undefined, will return query in loading state.
   */
  getVoteQuery(options: {
    proposalId: number
    voter?: string
  }): UndefinedInitialDataOptions<VoteResponse>

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
  getProposalCountQuery(): UndefinedInitialDataOptions<number>

  /**
   * Fetch the total number of proposals.
   */
  getProposalCount(): Promise<number>

  /**
   * Query options to fetch the config.
   */
  getConfigQuery(): Pick<
    UndefinedInitialDataOptions<Config>,
    'queryKey' | 'queryFn'
  >

  /**
   * Query options to fetch configured deposit info, if any.
   */
  getDepositInfoQuery(): Pick<
    UndefinedInitialDataOptions<CheckedDepositInfo | null>,
    'queryKey' | 'queryFn'
  >

  /**
   * Fetch the max voting period.
   */
  getMaxVotingPeriod(): Promise<Duration>

  /**
   * Query options to fetch the delegation module address, or null if none.
   */
  getDelegationModuleQuery(): Pick<
    UndefinedInitialDataOptions<string | null>,
    'queryKey' | 'queryFn'
  >

  /**
   * Fetch the unvoted delegated voting power on a specific proposal for a given
   * delegate.
   */
  getUnvotedDelegatedVotingPowerQuery(options: {
    delegate: string
    proposalId: number
  }): UndefinedInitialDataOptions<UnvotedDelegatedVotingPower>

  /**
   * Fetch a delegate's registration info, optionally at a specific height, or
   * null if no delegation module.
   */
  getDelegateRegistrationQuery(options: {
    delegate: string
    height?: number
  }): UndefinedInitialDataOptions<RegistrationResponse | null>
}

export type UnvotedDelegatedVotingPower = {
  total: HugeDecimal
  effective: HugeDecimal
}
