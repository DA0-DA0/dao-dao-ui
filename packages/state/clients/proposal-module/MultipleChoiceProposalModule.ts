import { CustomTxOptions } from '@cosmjs/cosmwasm-stargate'
import { FetchQueryOptions, QueryClient } from '@tanstack/react-query'

import {
  CheckedDepositInfo,
  Coin,
  ContractVersion,
  Duration,
  Feature,
  ModuleInstantiateInfo,
  MultipleChoiceNewProposalData,
} from '@dao-dao/types'
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
    } = allCodeIds[contractVersion] ?? {}

    if (!daoProposalMultipleCodeId || !daoPreProposeMultipleCodeId) {
      throw new Error(
        `Code IDs not found for version ${contractVersion} on chain ${chainId}`
      )
    }

    const pre_propose_info: PreProposeInfo = {
      module_may_propose: {
        info: {
          admin: { core_module: {} },
          code_id: daoPreProposeMultipleCodeId,
          label: `dao-pre-propose-multiple_${Date.now()}`,
          msg: encodeJsonToBase64({
            deposit_info: config.deposit,
            extension: {},
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
                  open_proposal_submission:
                    config.submissionPolicy === 'anyone',
                }),
          } satisfies DaoPreProposeMultipleInstantiateMsg),
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
  static getDaoAddressQuery(
    queryClient: QueryClient,
    options: {
      chainId: string
      contractAddress: string
    }
  ) {
    return daoProposalMultipleQueries.dao(queryClient, options)
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
      contractQueries.info(this.queryClient, {
        chainId: this.chainId,
        address: this.address,
      })
    )

    this._version =
      (info && parseContractVersion(info.version)) ?? ContractVersion.Unknown

    this._contractName = info?.contract || ''

    // Load pre-propose module.
    if (isFeatureSupportedByVersion(Feature.PrePropose, this._version)) {
      const creationPolicy = await this.queryClient
        .fetchQuery(
          daoProposalMultipleQueries.proposalCreationPolicy(this.queryClient, {
            chainId: this.chainId,
            contractAddress: this.address,
          })
        )
        .catch(() => null)

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
          proposalQueries.preProposeModule(this.queryClient, {
            chainId: this.chainId,
            address: preProposeAddress,
          })
        )
      }
    }

    // Load veto config.
    if (isFeatureSupportedByVersion(Feature.Veto, this._version)) {
      this._veto =
        (
          await this.queryClient
            .fetchQuery(
              daoProposalMultipleQueries.config(this.queryClient, {
                chainId: this.chainId,
                contractAddress: this.address,
              })
            )
            .catch(() => null)
        )?.veto ?? null
    }

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

      proposalNumber = Number(
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
      // Proposal IDs are the the prefix plus the proposal number.
      proposalId: `${this.prefix}${proposalNumber}`,
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
  }): FetchQueryOptions<ProposalResponse> {
    return daoProposalMultipleQueries.proposal(this.queryClient, {
      chainId: this.chainId,
      contractAddress: this.address,
      args: {
        proposalId,
      },
    })
  }

  async getProposal(
    ...params: Parameters<MultipleChoiceProposalModule['getProposalQuery']>
  ): Promise<ProposalResponse> {
    return await this.queryClient.fetchQuery(this.getProposalQuery(...params))
  }

  getVoteQuery({
    proposalId,
    voter,
  }: {
    proposalId: number
    voter?: string
  }): FetchQueryOptions<VoteResponse> {
    return daoProposalMultipleQueries.getVote(this.queryClient, {
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

  getProposalCountQuery(): FetchQueryOptions<number> {
    return daoProposalMultipleQueries.proposalCount(this.queryClient, {
      chainId: this.chainId,
      contractAddress: this.address,
    })
  }

  getDaoAddressQuery(): FetchQueryOptions<string> {
    return daoProposalMultipleQueries.dao(this.queryClient, {
      chainId: this.chainId,
      contractAddress: this.address,
    })
  }

  getConfigQuery(): FetchQueryOptions<Config> {
    return daoProposalMultipleQueries.config(this.queryClient, {
      chainId: this.chainId,
      contractAddress: this.address,
    })
  }

  getDepositInfoQuery(): FetchQueryOptions<CheckedDepositInfo | null> {
    return {
      queryKey: [
        'multipleChoiceProposalModule',
        'depositInfo',
        {
          chainId: this.chainId,
          address: this.address,
        },
      ],
      queryFn: async () => {
        if (this.prePropose) {
          const { deposit_info: depositInfo } =
            await this.queryClient.fetchQuery(
              daoPreProposeMultipleQueries.config(this.queryClient, {
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
    FetchQueryOptions<string | null>,
    'queryKey' | 'queryFn'
  > {
    return daoProposalMultipleQueries.delegationModule(this.queryClient, {
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
  }): FetchQueryOptions<string> {
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
      queryFn: async () => {
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
          return '0'
        }

        const udvp = await this.queryClient.fetchQuery(
          daoVoteDelegationQueries.unvotedDelegatedVotingPower(
            this.queryClient,
            {
              chainId: this.chainId,
              contractAddress: delegationModule,
              args: {
                delegate,
                height: start_height,
                proposalId,
                proposalModule: this.address,
              },
            }
          )
        )

        return udvp.effective
      },
    }
  }
}
