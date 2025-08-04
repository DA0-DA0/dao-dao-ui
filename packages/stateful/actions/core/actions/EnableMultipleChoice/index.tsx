import { fromBase64, fromUtf8, toBase64, toUtf8 } from '@cosmjs/encoding'
import { nanoid } from 'nanoid'

import { HugeDecimal } from '@dao-dao/math'
import {
  SecretSingleChoiceProposalModule,
  SingleChoiceProposalModule,
} from '@dao-dao/state/clients'
import { contractQueries, tokenQueries } from '@dao-dao/state/query'
import { ActionBase, NumbersEmoji } from '@dao-dao/stateless'
import {
  DepositRefundPolicy,
  Feature,
  ModuleInstantiateInfo,
  PreProposeModuleType,
  TokenType,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import {
  ActionChainContextType,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { PercentageThreshold } from '@dao-dao/types/contracts/DaoProposalMultiple'
import { Config as SingleChoiceConfig } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import { Config as SecretSingleChoiceConfig } from '@dao-dao/types/contracts/SecretDaoProposalSingle'
import {
  DaoProposalMultipleAdapterId,
  convertCosmosVetoConfigToVeto,
  convertDurationToDurationWithUnits,
  decodeJsonFromBase64,
  getNativeTokenForChainId,
  isFeatureSupportedByVersion,
  isNeutronForkVersion,
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { DaoProposalMultipleAdapter } from '../../../../proposal-module-adapter'
import { makeDefaultNewDao } from '../../../../recoil'
import { EnableMultipleChoiceComponent } from './Component'

const INSTANTIATE2_SALT_PREFIX = 'enable_multiple_choice_delegation_module-'

export class EnableMultipleChoiceAction extends ActionBase<{}> {
  public readonly key = ActionKey.EnableMultipleChoice
  public readonly Component = EnableMultipleChoiceComponent

  protected _defaults = {}

  constructor(options: ActionOptions) {
    // Disallow usage if:
    // - not a DAO
    // - DAO doesn't support multiple choice proposals
    // - Neutron fork SubDAO
    // - chain is not supported (type-check, implied by DAO check)
    //
    // Disallows creation via `hideWithPicker` (at the bottom) if multiple
    // choice proposal module already exists.
    if (
      options.context.type !== ActionContextType.Dao ||
      !options.context.dao.supports(Feature.MultipleChoiceProposals) ||
      // Neutron fork SubDAOs don't support multiple choice proposals due to the
      // timelock/overrule system only being designed for single choice
      // proposals.
      isNeutronForkVersion(options.context.dao.coreVersion) ||
      options.chainContext.type !== ActionChainContextType.Supported
    ) {
      throw new Error('Invalid context for enabling multiple choice proposals')
    }

    super(options, {
      Icon: NumbersEmoji,
      label: options.t('title.enableMultipleChoiceProposals'),
      description: options.t('info.enableMultipleChoiceProposalsDescription'),
      notReusable: true,
      // Disallow creation if multiple choice proposal module already exists
      hideFromPicker: options.context.dao.proposalModules.some(
        ({ contractName }) =>
          DaoProposalMultipleAdapter.contractNames.some((name) =>
            contractName.includes(name)
          )
      ),
    })
  }

  async encode(): Promise<UnifiedCosmosMsg[]> {
    // Type-check. This is already checked in the constructor.
    if (
      this.options.context.type !== ActionContextType.Dao ||
      this.options.chainContext.type !== ActionChainContextType.Supported
    ) {
      throw new Error('Invalid context for enabling multiple choice proposals')
    }

    const singleChoiceProposalModule =
      this.options.context.dao.proposalModules.find(
        (module) =>
          module instanceof SingleChoiceProposalModule ||
          module instanceof SecretSingleChoiceProposalModule
      )
    if (!singleChoiceProposalModule) {
      throw new Error('No single choice proposal module found')
    }

    // Error if the single choice proposal module has an approver set but
    // multiple choice approval is not supported on this chain. We don't want to
    // create a situation where a DAO has a proposal module that doesn't respect
    // the designated approver.
    if (
      singleChoiceProposalModule.prePropose?.type ===
        PreProposeModuleType.Approval &&
      !isFeatureSupportedByVersion(
        Feature.MultipleChoiceApproval,
        this.options.chainContext.config.latestVersion
      )
    ) {
      throw new Error(
        'Multiple choice approval is not supported on this chain yet but the single choice proposal module is has an approver set.'
      )
    }

    const [config, depositInfoWithToken, delegationModule] = await Promise.all([
      this.options.queryClient.fetchQuery<
        SingleChoiceConfig | SecretSingleChoiceConfig
      >(
        // Type-cast since we know the module is either a single choice or
        // secret single choice proposal module.
        singleChoiceProposalModule.getConfigQuery() as any
      ),
      this.options.queryClient
        .fetchQuery(singleChoiceProposalModule.getDepositInfoQuery())
        .then(async (depositInfo) =>
          depositInfo
            ? {
                depositInfo,
                token: await this.options.queryClient.fetchQuery(
                  tokenQueries.info({
                    chainId: this.options.chain.chainId,
                    type:
                      'cw20' in depositInfo.denom
                        ? TokenType.Cw20
                        : TokenType.Native,
                    denomOrAddress:
                      'cw20' in depositInfo.denom
                        ? depositInfo.denom.cw20
                        : depositInfo.denom.native,
                  })
                ),
              }
            : {
                depositInfo,
              }
        ),
      // Version used to choose multiple choice proposal module.
      isFeatureSupportedByVersion(
        Feature.VoteDelegation,
        this.options.chainContext.config.latestVersion
      ) &&
      // Can only query single choice proposal module for delegation module if
      // supported.
      isFeatureSupportedByVersion(
        Feature.VoteDelegation,
        singleChoiceProposalModule.version
      )
        ? this.options.queryClient.fetchQuery(
            singleChoiceProposalModule.getDelegationModuleQuery()
          )
        : null,
    ])

    const quorum: PercentageThreshold =
      'threshold_quorum' in config.threshold
        ? config.threshold.threshold_quorum.quorum
        : {
            percent: '0.2',
          }

    const newDao = makeDefaultNewDao(this.options.chain.chainId)
    const info = DaoProposalMultipleAdapter.daoCreation.getInstantiateInfo(
      this.options.chainContext.config,
      {
        ...newDao,
        votingConfig: {
          ...newDao.votingConfig,
          quorum: {
            majority: 'majority' in quorum,
            value: 'majority' in quorum ? 50 : Number(quorum.percent) * 100,
          },
          votingDuration: convertDurationToDurationWithUnits(
            config.max_voting_period
          ),
          proposalDeposit: {
            enabled: !!depositInfoWithToken.depositInfo,
            amount: depositInfoWithToken.depositInfo
              ? HugeDecimal.from(
                  depositInfoWithToken.depositInfo.amount
                ).toHumanReadableString(depositInfoWithToken.token.decimals)
              : '10',
            type:
              depositInfoWithToken.depositInfo &&
              'cw20' in depositInfoWithToken.depositInfo.denom
                ? 'cw20'
                : 'native',
            denomOrAddress: depositInfoWithToken.depositInfo
              ? 'cw20' in depositInfoWithToken.depositInfo.denom
                ? depositInfoWithToken.depositInfo.denom.cw20
                : depositInfoWithToken.depositInfo.denom.native
              : getNativeTokenForChainId(this.options.chain.chainId)
                  .denomOrAddress,
            token: depositInfoWithToken.token,
            refundPolicy:
              depositInfoWithToken.depositInfo?.refund_policy ??
              DepositRefundPolicy.OnlyPassed,
          },
          anyoneCanPropose: singleChoiceProposalModule.prePropose
            ? 'anyone' in singleChoiceProposalModule.prePropose.submissionPolicy
            : // If no pre-propose module, default to only members can propose.
              false,
          allowRevoting: config.allow_revoting,
          approver:
            singleChoiceProposalModule.prePropose?.type ===
            PreProposeModuleType.Approval
              ? {
                  enabled: true,
                  address:
                    singleChoiceProposalModule.prePropose.config.approver,
                }
              : {
                  enabled: false,
                  address: '',
                },
          veto: convertCosmosVetoConfigToVeto(
            'veto' in config ? config.veto : null
          ),
        },
      },
      {
        ...makeDefaultNewDao(this.options.chain.chainId).votingConfig,
        enableMultipleChoice: true,
        delegationModuleAddress: delegationModule || undefined,
      },
      this.options.t
    )

    // If instantiating with delegation module, use instantiate2 for the module
    // creation and add the sync proposal modules message and vote hook message.
    const delegationModuleMessages: UnifiedCosmosMsg[] = []
    if (delegationModule) {
      // Generate unique salt (max size is 64 bytes).
      const salt =
        INSTANTIATE2_SALT_PREFIX + nanoid(64 - INSTANTIATE2_SALT_PREFIX.length)
      // Set salt to use instantiate2, added in v2.7.0.
      ;(info as ModuleInstantiateInfo).salt = toBase64(toUtf8(salt))

      // This will be the address of the multiple choice proposal module created
      // by the first action, before the hook is added.
      const predictedMultipleChoiceProposalModuleAddress =
        await this.options.queryClient.fetchQuery(
          contractQueries.instantiate2Address({
            chainId: this.options.chain.chainId,
            creator: this.options.address,
            codeId: info.code_id,
            salt,
          })
        )

      // Add the sync proposal modules message.
      delegationModuleMessages.push(
        makeExecuteSmartContractMessage({
          chainId: this.options.chain.chainId,
          contractAddress: delegationModule,
          sender: this.options.address,
          msg: {
            sync_proposal_modules: {},
          },
        })
      )

      // Add the vote hook.
      delegationModuleMessages.push(
        makeExecuteSmartContractMessage({
          chainId: this.options.chain.chainId,
          contractAddress: predictedMultipleChoiceProposalModuleAddress,
          sender: this.options.address,
          msg: {
            add_vote_hook: {
              address: delegationModule,
            },
          },
        })
      )
    }

    return [
      makeExecuteSmartContractMessage({
        chainId: this.options.chain.chainId,
        contractAddress: this.options.address,
        sender: this.options.address,
        msg: {
          update_proposal_modules: {
            to_add: [info],
            to_disable: [],
          },
        },
      }),
      ...delegationModuleMessages,
    ]
  }

  async match(messages: ProcessedMessage[]): Promise<ActionMatch> {
    const isUpdatingProposalModules = objectMatchesStructure(
      messages[0].decodedMessage,
      {
        wasm: {
          execute: {
            msg: {
              update_proposal_modules: {
                to_add: [
                  {
                    admin: {},
                    code_id: {},
                    label: {},
                    msg: {},
                  },
                ],
                to_disable: [],
              },
            },
          },
        },
      }
    )

    if (!isUpdatingProposalModules) {
      return false
    }

    const info = messages[0].decodedMessage.wasm.execute.msg
      .update_proposal_modules.to_add[0] as ModuleInstantiateInfo

    if (
      !(
        info.label.startsWith('dao-proposal-multiple') ||
        // backwards compatibility
        info.label.endsWith(DaoProposalMultipleAdapterId)
      )
    ) {
      return false
    }

    // Check if instantiate2 is used, delegation module is set, and sync
    // proposal modules + vote hook add messages are present. If so, match the
    // hook addition message.
    if (
      messages.length >= 3 &&
      'salt' in info &&
      info.salt &&
      fromUtf8(fromBase64(info.salt)).startsWith(INSTANTIATE2_SALT_PREFIX)
    ) {
      const delegationModule = decodeJsonFromBase64(info.msg).delegation_module
      if (delegationModule) {
        if (
          objectMatchesStructure(messages[1].decodedMessage, {
            wasm: {
              execute: {
                contract_addr: {},
                msg: {
                  sync_proposal_modules: {},
                },
              },
            },
          }) &&
          // Ensure the sync proposal modules message is being sent to the
          // correct delegation module.
          messages[1].decodedMessage.wasm.execute.contract_addr ===
            delegationModule
        ) {
          const predictedMultipleChoiceProposalModuleAddress =
            await this.options.queryClient.fetchQuery(
              contractQueries.instantiate2Address({
                chainId: this.options.chain.chainId,
                creator: this.options.address,
                codeId: info.code_id,
                salt: fromUtf8(fromBase64(info.salt)),
              })
            )

          if (
            objectMatchesStructure(messages[2].decodedMessage, {
              wasm: {
                execute: {
                  contract_addr: {},
                  msg: {
                    add_vote_hook: {
                      address: {},
                    },
                  },
                },
              },
            }) &&
            // Ensure the vote hook is being added to the multiple choice
            // proposal module that was created via instantiate2.
            messages[2].decodedMessage.wasm.execute.contract_addr ===
              predictedMultipleChoiceProposalModuleAddress &&
            // Ensure the vote hook is being added for the correct delegation
            // module set during the instantiation.
            messages[2].decodedMessage.wasm.execute.msg.add_vote_hook
              .address === delegationModule
          ) {
            return 3
          }
        }
      }
    }

    // If we could not verify the additional delegation module messages, just
    // match the instantiation.
    return 1
  }

  decode() {
    return {}
  }
}
