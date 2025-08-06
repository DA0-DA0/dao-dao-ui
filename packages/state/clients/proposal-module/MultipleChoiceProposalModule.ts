import { CustomTxOptions } from '@cosmjs/cosmwasm-stargate'
import { UndefinedInitialDataOptions } from '@tanstack/react-query'

import { HugeDecimal } from '@dao-dao/math'
import {
  CheckedDepositInfo,
  Coin,
  ContractVersion,
  Duration,
  Feature,
  ModuleInstantiateInfo,
  MultipleChoiceNewProposalData,
  PreProposeModuleType,
  UnvotedDelegatedVotingPower,
} from '@dao-dao/types'
import {
  InstantiateMsg as DaoPreProposeApprovalMultipleInstantiateMsg,
  MultipleChoiceApprovalProposal,
} from '@dao-dao/types/contracts/DaoPreProposeApprovalMultiple'
import {
  InstantiateMsg as DaoPreProposeMultipleInstantiateMsg,
  UncheckedDepositInfo,
} from '@dao-dao/types/contracts/DaoPreProposeMultiple'
import {
  Config,
  InstantiateMsg,
  MultipleChoiceVote,
  PercentageThreshold,
  PreProposeInfo,
  ProposalResponse,
  VetoConfig,
  VoteInfo,
  VoteResponse,
} from '@dao-dao/types/contracts/DaoProposalMultiple'
import {
  ContractName,
  DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES,
  SupportedSigningCosmWasmClient,
  encodeJsonToBase64,
  findWasmAttributeValue,
  isFeatureSupportedByVersion,
  mustGetSupportedChainConfig,
  parseContractVersion,
} from '@dao-dao/utils'

import {
  DaoPreProposeMultipleClient,
  DaoProposalMultipleClient,
} from '../../contracts'
import {
  contractQueries,
  daoPreProposeApprovalMultipleQueries,
  daoPreProposeMultipleQueries,
  daoProposalMultipleQueries,
  daoVoteDelegationQueries,
  proposalQueries,
} from '../../query'
import { CwDao } from '../dao/CwDao'
import { ProposalModuleBase } from './base'

export class MultipleChoiceProposalModule extends ProposalModuleBase<
  CwDao,
  MultipleChoiceNewProposalData,
  ProposalResponse,
  MultipleChoiceApprovalProposal,
  VoteResponse,
  VoteInfo,
  MultipleChoiceVote,
  Config
> {
  static contractNames: readonly string[] = DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES

  /**
   * Generate the module instantiate info to plug into the DAO instantiate info
   * generator function.
   */
  static generateModuleInstantiateInfo(
    chainId: string,
    config: {
      quorum: PercentageThreshold
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
    },
    options: {
      /**
       * If defined, use a specific version of the proposal module instead of
       * the latest. This is needed since different contract versions have
       * breaking changes, and we should try to use consistent versions across
       * modules. This is used in the Enable Multiple Choice action, which may
       * be used by old DAOs.
       */
      overrideContractVersion?: ContractVersion
    } = {}
  ): ModuleInstantiateInfo {
    const { latestVersion, allCodeIds } = mustGetSupportedChainConfig(chainId)

    const contractVersion = options.overrideContractVersion || latestVersion
    const {
      DaoProposalMultiple: daoProposalMultipleCodeId,
      DaoPreProposeMultiple: daoPreProposeMultipleCodeId,
      DaoPreProposeApprovalMultiple: daoPreProposeApprovalMultipleCodeId,
    } = allCodeIds[contractVersion] ?? {}

    if (
      config.approver &&
      !isFeatureSupportedByVersion(
        Feature.MultipleChoiceApproval,
        latestVersion
      )
    ) {
      throw new Error(
        `Multiple choice approval is not supported by version ${latestVersion} on chain ${chainId}`
      )
    }

    const preProposeCodeId = config.approver
      ? daoPreProposeApprovalMultipleCodeId
      : daoPreProposeMultipleCodeId

    if (!daoProposalMultipleCodeId || !preProposeCodeId) {
      throw new Error(
        `Code IDs not found for version ${contractVersion} on chain ${chainId}`
      )
    }

    const preProposeCommon = {
      deposit_info: config.deposit,
      ...(isFeatureSupportedByVersion(
        Feature.GranularSubmissionPolicy,
        contractVersion
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
          code_id: preProposeCodeId,
          label: `dao-pre-propose${
            config.approver ? '-approval' : ''
          }-multiple_${Date.now()}`,
          msg: encodeJsonToBase64(
            config.approver
              ? ({
                  ...(preProposeCommon as any),
                  extension: {
                    approver: config.approver,
                  },
                } satisfies DaoPreProposeApprovalMultipleInstantiateMsg)
              : ({
                  ...preProposeCommon,
                  extension: {},
                } satisfies DaoPreProposeMultipleInstantiateMsg)
          ),
          // This function is used by the enable multiple choice action, and
          // DAOs before v2.3.0 still might want to enable multiple choice, so
          // make sure to support the old version without the `funds` field.
          ...(isFeatureSupportedByVersion(
            Feature.ModuleInstantiateFunds,
            contractVersion
          ) && {
            funds: [],
          }),
        },
      },
    }

    return {
      admin: { core_module: {} },
      code_id: daoProposalMultipleCodeId,
      label: `dao-proposal-multiple_${Date.now()}`,
      msg: encodeJsonToBase64({
        allow_revoting: config.allowRevoting,
        close_proposal_on_execution_failure:
          config.closeProposalOnExecutionFailure ?? true,
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
        delegation_module: config.delegationModuleAddress,
      } satisfies InstantiateMsg),
      // This function is used by the enable multiple choice action, and DAOs
      // before v2.3.0 still might want to enable multiple choice, so make sure
      // to support the old version without the `funds` field.
      ...(isFeatureSupportedByVersion(
        Feature.ModuleInstantiateFunds,
        contractVersion
      ) && {
        funds: [],
      }),
    }
  }

  /**
   * Query options to fetch the DAO address.
   */
  static getDaoAddressQuery(options: {
    chainId: string
    contractAddress: string
  }) {
    return daoProposalMultipleQueries.dao(options)
  }

  /**
   * Initialize the client. This only matters for some functions, depending on
   * the implementation.
   */
  async init(): Promise<void> {
    if (this.initialized) {
      return
    }

    // Load contract info with version.
    const { info } = await this.queryClient.fetchQuery(
      contractQueries.info({
        chainId: this.chainId,
        address: this.address,
      })
    )

    this._version =
      (info && parseContractVersion(info.version)) ?? ContractVersion.Unknown

    this._contractName = info?.contract || ''

    await Promise.all([
      // Load pre-propose module.
      isFeatureSupportedByVersion(Feature.PrePropose, this._version)
        ? this.queryClient
            .fetchQuery(
              daoProposalMultipleQueries.proposalCreationPolicy({
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
      isFeatureSupportedByVersion(Feature.Veto, this._version)
        ? this.queryClient
            .fetchQuery(
              daoProposalMultipleQueries.config({
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
    data: MultipleChoiceNewProposalData
    vote?: MultipleChoiceVote
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

    if (this.prePropose) {
      const { events } = await new DaoPreProposeMultipleClient(
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
        this.prePropose.contractName === ContractName.PreProposeApprovalMultiple
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
    vote: MultipleChoiceVote
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

    await new DaoProposalMultipleClient(client, sender, this.address).vote(
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
    await new DaoProposalMultipleClient(client, sender, this.address).execute(
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
    await new DaoProposalMultipleClient(client, sender, this.address).close(
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
    return daoProposalMultipleQueries.proposal({
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
  }): UndefinedInitialDataOptions<MultipleChoiceApprovalProposal> {
    if (!this.prePropose) {
      throw new Error('Pre-propose module not found')
    }
    if (this.prePropose.type !== PreProposeModuleType.Approval) {
      throw new Error('Pre-propose module is not an approval module')
    }

    return daoPreProposeApprovalMultipleQueries.queryExtension({
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
    return daoProposalMultipleQueries.getVote({
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
    ...params: Parameters<MultipleChoiceProposalModule['getVoteQuery']>
  ): Promise<VoteInfo | null> {
    return (
      (await this.queryClient.fetchQuery(this.getVoteQuery(...params))).vote ||
      null
    )
  }

  getProposalCountQuery(): UndefinedInitialDataOptions<number> {
    return daoProposalMultipleQueries.proposalCount({
      chainId: this.chainId,
      contractAddress: this.address,
    })
  }

  getDaoAddressQuery(): UndefinedInitialDataOptions<string> {
    return daoProposalMultipleQueries.dao({
      chainId: this.chainId,
      contractAddress: this.address,
    })
  }

  getConfigQuery(): UndefinedInitialDataOptions<Config> {
    return daoProposalMultipleQueries.config({
      chainId: this.chainId,
      contractAddress: this.address,
    })
  }

  getDepositInfoQuery(): UndefinedInitialDataOptions<CheckedDepositInfo | null> {
    return {
      queryKey: [
        'multipleChoiceProposalModule',
        'depositInfo',
        {
          chainId: this.chainId,
          address: this.address,
        },
      ],
      queryFn: async (ctx) => {
        if (this.prePropose) {
          const { deposit_info: depositInfo } = await ctx.client.fetchQuery(
            daoPreProposeMultipleQueries.config({
              chainId: this.chainId,
              contractAddress: this.prePropose.address,
            })
          )

          return depositInfo || null
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
    return daoProposalMultipleQueries.delegationModule({
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
        'multipleChoiceProposalModule',
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
