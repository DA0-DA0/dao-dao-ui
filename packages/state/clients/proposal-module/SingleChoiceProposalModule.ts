import { CustomTxOptions } from '@cosmjs/cosmwasm-stargate'
import { UndefinedInitialDataOptions } from '@tanstack/react-query'

import { HugeDecimal } from '@dao-dao/math'
import {
  CheckedDepositInfo,
  Coin,
  ContractVersion,
  DepositRefundPolicy,
  Duration,
  Feature,
  ModuleInstantiateInfo,
  PreProposeModuleType,
  SingleChoiceNewProposalData,
  UnvotedDelegatedVotingPower,
} from '@dao-dao/types'
import {
  InstantiateMsg as DaoPreProposeApprovalSingleInstantiateMsg,
  SingleChoiceApprovalProposal,
} from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'
import {
  InstantiateMsg as DaoPreProposeSingleInstantiateMsg,
  UncheckedDepositInfo,
} from '@dao-dao/types/contracts/DaoPreProposeSingle'
import {
  Config,
  InstantiateMsg,
  PreProposeInfo,
  ProposalResponse,
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

import {
  CwProposalSingleV1Client,
  DaoPreProposeSingleClient,
  DaoProposalSingleV2Client,
} from '../../contracts'
import {
  cwProposalSingleV1Queries,
  daoPreProposeApprovalSingleQueries,
  daoPreProposeSingleQueries,
  daoProposalSingleV2Queries,
  daoVoteDelegationQueries,
  proposalQueries,
} from '../../query'
import { CwDao } from '../dao/CwDao'
import { ProposalModuleBase } from './base'

export class SingleChoiceProposalModule extends ProposalModuleBase<
  CwDao,
  SingleChoiceNewProposalData,
  ProposalResponse,
  SingleChoiceApprovalProposal,
  VoteResponse,
  VoteInfo,
  Vote,
  Config
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
      /**
       * v2.7.0+
       */
      delegationModuleAddress?: string
    }
  ): ModuleInstantiateInfo {
    const { codeIds, latestVersion } = mustGetSupportedChainConfig(chainId)

    const preProposeCommon = {
      deposit_info: config.deposit,
      ...(isFeatureSupportedByVersion(
        Feature.GranularSubmissionPolicy,
        latestVersion
      )
        ? {
            submission_policy:
              config.submissionPolicy === 'anyone'
                ? {
                    anyone: {
                      denylist: [],
                    },
                  }
                : {
                    specific: {
                      dao_members: true,
                      allowlist: [],
                      denylist: [],
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
                } satisfies DaoPreProposeApprovalSingleInstantiateMsg)
              : ({
                  ...preProposeCommon,
                  extension: {},
                } satisfies DaoPreProposeSingleInstantiateMsg)
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
        delegation_module: config.delegationModuleAddress,
      } satisfies InstantiateMsg),
      funds: [],
    }
  }

  /**
   * Query options to fetch the DAO address.
   */
  static getDaoAddressQuery(options: {
    chainId: string
    contractAddress: string
  }) {
    return daoProposalSingleV2Queries.dao(options)
  }

  /**
   * Initialize the client. This only matters for some functions, depending on
   * the implementation.
   */
  async init(): Promise<void> {
    if (this.initialized) {
      return
    }

    await Promise.all([
      // Load pre-propose module.
      isFeatureSupportedByVersion(Feature.PrePropose, this.version)
        ? this.queryClient
            .fetchQuery(
              daoProposalSingleV2Queries.proposalCreationPolicy({
                chainId: this.chainId,
                contractAddress: this.address,
              })
            )
            .catch(() => null)
            .then(async (creationPolicy) => {
              const preProposeAddress =
                creationPolicy &&
                ('Module' in creationPolicy && creationPolicy.Module.addr
                  ? creationPolicy.Module.addr
                  : creationPolicy &&
                      'module' in creationPolicy &&
                      creationPolicy.module.addr
                    ? creationPolicy.module.addr
                    : null)

              if (preProposeAddress) {
                this._prePropose = await this.queryClient.fetchQuery(
                  proposalQueries.preProposeModule({
                    chainId: this.chainId,
                    address: preProposeAddress,
                  })
                )
              }
            })
        : undefined,
      // Load veto config.
      isFeatureSupportedByVersion(Feature.Veto, this.version)
        ? this.queryClient
            .fetchQuery(
              daoProposalSingleV2Queries.config({
                chainId: this.chainId,
                contractAddress: this.address,
              })
            )
            .catch(() => null)
            .then((config) => {
              this._veto = config?.veto ?? null
            })
        : undefined,
    ])

    this._initialized = true
  }

  async propose({
    data: _data,
    vote,
    signingClient,
    sender,
    funds,
    txOptions,
  }: {
    data: SingleChoiceNewProposalData
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
    isApprovalProposal: boolean
  }> {
    if (vote && !this.supports(Feature.CastVoteOnProposalCreation)) {
      throw new Error(
        `Casting vote on proposal creation is not supported by version ${this.version}`
      )
    }

    const data = {
      ..._data,
      ...(vote && {
        vote: {
          vote,
        },
      }),
    }

    const client =
      typeof signingClient === 'function'
        ? await signingClient()
        : signingClient

    let proposalNumber: number
    let isApprovalProposal = false

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
        funds,
        txOptions
      )

      proposalNumber = Number(
        findWasmAttributeValue(
          this.chainId,
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
        funds,
        txOptions
      )

      isApprovalProposal =
        this.prePropose.contractName === ContractName.PreProposeApprovalSingle
      proposalNumber =
        // pre-propose-approval proposals have a different event
        isApprovalProposal
          ? Number(
              findWasmAttributeValue(
                this.chainId,
                events,
                this.prePropose.address,
                'id'
              ) ?? -1
            )
          : Number(
              findWasmAttributeValue(
                this.chainId,
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
        funds,
        txOptions
      )

      proposalNumber = Number(
        findWasmAttributeValue(
          this.chainId,
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
        isApprovalProposal ? '*' : ''
      }${proposalNumber}`,
      isApprovalProposal,
    }
  }

  async vote({
    proposalId,
    vote,
    signingClient,
    sender,
    txOptions,
  }: {
    proposalId: number
    vote: Vote
    signingClient:
      | SupportedSigningCosmWasmClient
      | (() => Promise<SupportedSigningCosmWasmClient>)
    sender: string
    txOptions?: CustomTxOptions
  }): Promise<void> {
    const client =
      typeof signingClient === 'function'
        ? await signingClient()
        : signingClient

    const Client =
      this.version === ContractVersion.V1
        ? CwProposalSingleV1Client
        : DaoProposalSingleV2Client

    await new Client(client, sender, this.address).vote(
      {
        proposalId,
        vote,
      },
      undefined,
      undefined,
      undefined,
      txOptions
    )

    await this.queryClient.refetchQueries({
      queryKey: this.getVoteQuery({
        proposalId,
        voter: sender,
      }).queryKey,
    })
  }

  async execute({
    proposalId,
    signingClient,
    sender,
    memo,
    txOptions,
  }: {
    proposalId: number
    signingClient:
      | SupportedSigningCosmWasmClient
      | (() => Promise<SupportedSigningCosmWasmClient>)
    sender: string
    memo?: string
    txOptions?: CustomTxOptions
  }): Promise<void> {
    const client =
      typeof signingClient === 'function'
        ? await signingClient()
        : signingClient

    const Client =
      this.version === ContractVersion.V1
        ? CwProposalSingleV1Client
        : DaoProposalSingleV2Client

    await new Client(client, sender, this.address).execute(
      {
        proposalId,
      },
      undefined,
      memo,
      undefined,
      txOptions
    )
  }

  async close({
    proposalId,
    signingClient,
    sender,
    txOptions,
  }: {
    proposalId: number
    signingClient:
      | SupportedSigningCosmWasmClient
      | (() => Promise<SupportedSigningCosmWasmClient>)
    sender: string
    txOptions?: CustomTxOptions
  }): Promise<void> {
    const client =
      typeof signingClient === 'function'
        ? await signingClient()
        : signingClient

    const Client =
      this.version === ContractVersion.V1
        ? CwProposalSingleV1Client
        : DaoProposalSingleV2Client

    await new Client(client, sender, this.address).close(
      {
        proposalId,
      },
      undefined,
      undefined,
      undefined,
      txOptions
    )
  }

  getProposalQuery({
    proposalId,
  }: {
    proposalId: number
  }): UndefinedInitialDataOptions<ProposalResponse> {
    return daoProposalSingleV2Queries.proposal({
      chainId: this.chainId,
      contractAddress: this.address,
      args: {
        proposalId,
      },
    })
  }

  getApprovalProposalQuery({
    proposalId,
  }: {
    proposalId: number
  }): UndefinedInitialDataOptions<SingleChoiceApprovalProposal> {
    if (!this.prePropose) {
      throw new Error('Pre-propose module not found')
    }
    if (this.prePropose.type !== PreProposeModuleType.Approval) {
      throw new Error('Pre-propose module is not an approval module')
    }

    return daoPreProposeApprovalSingleQueries.queryExtension({
      chainId: this.chainId,
      contractAddress: this.prePropose.address,
      args: {
        msg: {
          proposal: {
            id: proposalId,
          },
        },
      },
    })
  }

  getVoteQuery({
    proposalId,
    voter,
  }: {
    proposalId: number
    voter?: string
  }): UndefinedInitialDataOptions<VoteResponse> {
    const query =
      this.version === ContractVersion.V1
        ? cwProposalSingleV1Queries.vote
        : daoProposalSingleV2Queries.getVote

    return query({
      chainId: this.chainId,
      contractAddress: this.address,
      args: {
        proposalId,
        ...(voter && { voter }),
        // Force type-cast since the query won't be enabled until voter is set.
        // This allows us to pass an undefined `voter` argument in order to
        // invalidate/refresh the query for all voters.
      } as any,
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

  getProposalCountQuery(): UndefinedInitialDataOptions<number> {
    const query =
      this.version === ContractVersion.V1
        ? cwProposalSingleV1Queries.proposalCount
        : daoProposalSingleV2Queries.proposalCount

    return query({
      chainId: this.chainId,
      contractAddress: this.address,
    })
  }

  getConfigQuery(): UndefinedInitialDataOptions<Config> {
    return daoProposalSingleV2Queries.config({
      chainId: this.chainId,
      contractAddress: this.address,
    })
  }

  getDepositInfoQuery(): UndefinedInitialDataOptions<CheckedDepositInfo | null> {
    return {
      queryKey: [
        'singleChoiceProposalModule',
        'depositInfo',
        {
          chainId: this.chainId,
          address: this.address,
        },
      ],
      queryFn: async (ctx) => {
        if (this.prePropose) {
          const { deposit_info: depositInfo } = await ctx.client.fetchQuery(
            daoPreProposeSingleQueries.config({
              chainId: this.chainId,
              contractAddress: this.prePropose.address,
            })
          )

          return depositInfo || null
        } else if (
          // V1 has proposal deposits built right into the proposal module
          // instead of a separate pre-propose module.
          !isFeatureSupportedByVersion(Feature.PrePropose, this.version)
        ) {
          const { deposit_info: depositInfo } = await ctx.client.fetchQuery(
            cwProposalSingleV1Queries.config({
              chainId: this.chainId,
              contractAddress: this.address,
            })
          )

          return depositInfo
            ? {
                amount: depositInfo.deposit,
                denom: {
                  cw20: depositInfo.token,
                },
                refund_policy: depositInfo.refund_failed_proposals
                  ? DepositRefundPolicy.Always
                  : DepositRefundPolicy.OnlyPassed,
              }
            : null
        }

        // If pre-propose is supported but not set, there are no deposits.
        return null
      },
    }
  }

  async getMaxVotingPeriod(): Promise<Duration> {
    return (await this.queryClient.fetchQuery(this.getConfigQuery()))
      .max_voting_period
  }

  getDelegationModuleQuery(): Pick<
    UndefinedInitialDataOptions<string | null>,
    'queryKey' | 'queryFn'
  > {
    return daoProposalSingleV2Queries.delegationModule({
      chainId: this.chainId,
      contractAddress: this.address,
    })
  }

  getUnvotedDelegatedVotingPowerQuery({
    delegate,
    proposalId,
  }: {
    delegate: string
    proposalId: number
  }): UndefinedInitialDataOptions<UnvotedDelegatedVotingPower> {
    return {
      queryKey: [
        'singleChoiceProposalModule',
        'unvotedDelegatedVotingPower',
        {
          chainId: this.chainId,
          address: this.address,
          delegate,
          proposalId,
        },
      ],
      queryFn: async (ctx) => {
        if (
          !isFeatureSupportedByVersion(Feature.VoteDelegation, this.version)
        ) {
          return {
            total: HugeDecimal.zero,
            effective: HugeDecimal.zero,
          }
        }

        const [
          delegationModule,
          {
            proposal: { start_height },
          },
        ] = await Promise.all([
          this.queryClient.fetchQuery(this.getDelegationModuleQuery()),
          this.getProposal({
            proposalId,
          }),
        ])

        // If no delegation module, there is no unvoted delegated voting power.
        if (!delegationModule) {
          return {
            total: HugeDecimal.zero,
            effective: HugeDecimal.zero,
          }
        }

        const { total, effective } = await ctx.client.fetchQuery(
          daoVoteDelegationQueries.unvotedDelegatedVotingPower({
            chainId: this.chainId,
            contractAddress: delegationModule,
            args: {
              delegate,
              height: start_height,
              proposalId,
              proposalModule: this.address,
            },
          })
        )

        return {
          total: HugeDecimal.from(total),
          effective: HugeDecimal.from(effective),
        }
      },
    }
  }
}
