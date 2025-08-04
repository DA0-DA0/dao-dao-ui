import { useQueries } from '@tanstack/react-query'
import uniq from 'lodash.uniq'
import { useFormContext } from 'react-hook-form'

import {
  SecretSingleChoiceProposalModule,
  SingleChoiceProposalModule,
} from '@dao-dao/state/clients'
import {
  daoPreProposeApprovalSingleQueries,
  daoQueries,
} from '@dao-dao/state/query'
import {
  ActionBase,
  PersonRaisingHandEmoji,
  useActionOptions,
} from '@dao-dao/stateless'
import {
  Feature,
  ModuleInstantiateInfo,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import {
  ActionChainContextType,
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { InstantiateMsg as DaoPreProposeApproverInstantiateMsg } from '@dao-dao/types/contracts/DaoPreProposeApprover'
import {
  InstantiateMsg as DaoProposalSingleInstantiateMsg,
  Config as SingleChoiceConfig,
} from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import { Config as SecretSingleChoiceConfig } from '@dao-dao/types/contracts/SecretDaoProposalSingle'
import {
  DaoProposalSingleAdapterId,
  decodeJsonFromBase64,
  encodeJsonToBase64,
  makeCombineQueryResultsIntoLoadingDataWithError,
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { EntityDisplay } from '../../../../components/EntityDisplay'
import { useQueryLoadingDataWithError } from '../../../../hooks'
import {
  BecomeApproverData,
  DaoWithPreProposeAddresses,
  BecomeApproverComponent as StatelessComponent,
} from './Component'

const Component: ActionComponent = (props) => {
  const {
    address,
    chain: { chainId },
  } = useActionOptions()

  const { watch } = useFormContext<BecomeApproverData>()
  const preProposeApprovalContracts =
    watch((props.fieldNamePrefix + 'addresses') as 'addresses')?.split(',') ||
    []
  // Once created, load DAO addresses from pre-propose module addresses and keep
  // only the unique DAOs.
  const loadedDaos = useQueries({
    queries:
      !props.isCreating && preProposeApprovalContracts.length
        ? preProposeApprovalContracts.map((contract) =>
            daoPreProposeApprovalSingleQueries.dao({
              chainId,
              contractAddress: contract,
            })
          )
        : [],
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      firstLoad: 'all',
      errorIf: 'any',
      transform: (data) => uniq(data),
    }),
  })

  const options = useQueryLoadingDataWithError(
    daoQueries.listPotentialApprovalDaos({
      chainId,
      address,
    }),
    (data) =>
      data.reduce((acc, { dao, preProposeAddress }) => {
        const existing = acc.find((item) => item.dao === dao)
        if (existing) {
          existing.preProposeAddresses.push(preProposeAddress)
        } else {
          acc.push({ dao, preProposeAddresses: [preProposeAddress] })
        }
        return acc
      }, [] as DaoWithPreProposeAddresses[])
  )

  return (
    <StatelessComponent
      {...props}
      options={{
        loadedDaos,
        options,
        EntityDisplay,
      }}
    />
  )
}

export class BecomeApproverAction extends ActionBase<BecomeApproverData> {
  public readonly key = ActionKey.BecomeApprover
  public readonly Component = Component

  protected _defaults: BecomeApproverData = {
    addresses: '',
  }

  constructor(options: ActionOptions) {
    if (
      options.context.type !== ActionContextType.Dao ||
      // Single choice approval is supported by an earlier version than multiple
      // choice approval, so just check for single choice approval support.
      !options.context.dao.supports(Feature.SingleChoiceApproval)
    ) {
      throw new Error('Invalid context for becoming an approver')
    }

    super(options, {
      Icon: PersonRaisingHandEmoji,
      label: options.t('title.becomeApprover'),
      description: options.t('info.becomeApproverDescription'),
    })
  }

  async encode({ addresses }: BecomeApproverData): Promise<UnifiedCosmosMsg> {
    // Type-check. This is already checked in the constructor.
    if (
      this.options.context.type !== ActionContextType.Dao ||
      this.options.chainContext.type !== ActionChainContextType.Supported
    ) {
      throw new Error('Invalid context for becoming an approver')
    }

    const preProposeApprovalContracts = addresses.split(',')
    if (preProposeApprovalContracts.length === 0) {
      throw new Error('No DAO selected.')
    }

    // Copy the config from the first single choice proposal module.
    const singleChoiceProposalModule =
      this.options.context.dao.proposalModules.find(
        (module) =>
          module instanceof SingleChoiceProposalModule ||
          module instanceof SecretSingleChoiceProposalModule
      )
    if (!singleChoiceProposalModule) {
      throw new Error('No single choice proposal module found')
    }

    const config = await this.options.queryClient.fetchQuery<
      SingleChoiceConfig | SecretSingleChoiceConfig
    >(
      // Type-cast since we know the module is either a single choice or
      // secret single choice proposal module.
      singleChoiceProposalModule.getConfigQuery() as any
    )

    const singleChoiceProposalModuleCodeId =
      this.options.chainContext.config.codeIds.DaoProposalSingle
    const preProposeApproverCodeId =
      this.options.chainContext.config.codeIds.DaoPreProposeApprover

    const timestamp = Date.now()

    // Add single choice proposal modules that will be used to approve/reject
    // proposals from the pre-propose-approval-* contracts in the other DAO.
    const infos: ModuleInstantiateInfo[] = preProposeApprovalContracts.map(
      (preProposeApprovalContract, index) => ({
        admin: { core_module: {} },
        code_id: singleChoiceProposalModuleCodeId,
        label: `dao-proposal-single_approver_${timestamp}_${index}`,
        msg: encodeJsonToBase64({
          threshold: config.threshold,
          allow_revoting: config.allow_revoting,
          close_proposal_on_execution_failure:
            'close_proposal_on_execution_failure' in config
              ? config.close_proposal_on_execution_failure
              : true,
          min_voting_period:
            'min_voting_period' in config
              ? config.min_voting_period
              : undefined,
          max_voting_period: config.max_voting_period,
          only_members_execute: config.only_members_execute,
          veto: 'veto' in config ? config.veto : undefined,
          pre_propose_info: {
            module_may_propose: {
              info: {
                admin: { core_module: {} },
                code_id: preProposeApproverCodeId,
                label: `dao-pre-propose-approver_${timestamp}_${index}`,
                msg: encodeJsonToBase64({
                  pre_propose_approval_contract: preProposeApprovalContract,
                } as DaoPreProposeApproverInstantiateMsg),
                funds: [],
              },
            },
          },
        } as DaoProposalSingleInstantiateMsg),
        funds: [],
      })
    )

    return makeExecuteSmartContractMessage({
      chainId: this.options.chain.chainId,
      contractAddress: this.options.address,
      sender: this.options.address,
      msg: {
        update_proposal_modules: {
          to_add: infos,
          to_disable: [],
        },
      },
    })
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    if (
      !objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              update_proposal_modules: {
                // Any number of modules can be added.
                to_add: {},
                // None are disabled.
                to_disable: [],
              },
            },
          },
        },
      })
    ) {
      return false
    }

    // Ensure all modules being added are the approver modules.
    const infos = decodedMessage.wasm.execute.msg.update_proposal_modules
      .to_add as ModuleInstantiateInfo[]
    const existAndAllMatch =
      infos.length > 0 &&
      infos.every((info) => {
        if (
          !objectMatchesStructure(info, {
            admin: {},
            code_id: {},
            label: {},
            msg: {},
          })
        ) {
          return false
        }

        const parsedMsg = decodeJsonFromBase64(info.msg)
        if (
          (!info.label.startsWith('dao-proposal-single_approver') &&
            // backwards compatibility
            !info.label.endsWith(`${DaoProposalSingleAdapterId}_approver`)) ||
          !objectMatchesStructure(parsedMsg, {
            pre_propose_info: {
              module_may_propose: {
                info: {
                  msg: {},
                },
              },
            },
          }) ||
          !parsedMsg.pre_propose_info.module_may_propose.info.label.includes(
            'approver'
          )
        ) {
          return false
        }

        const parsedPreProposeMsg = decodeJsonFromBase64(
          parsedMsg.pre_propose_info.module_may_propose.info.msg
        )
        return objectMatchesStructure(parsedPreProposeMsg, {
          pre_propose_approval_contract: {},
        })
      })

    return existAndAllMatch
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): BecomeApproverData {
    const preProposeApprovalContracts = (
      decodedMessage.wasm.execute.msg.update_proposal_modules
        .to_add as ModuleInstantiateInfo[]
    ).map(
      ({ msg }): string =>
        decodeJsonFromBase64(
          decodeJsonFromBase64(msg).pre_propose_info.module_may_propose.info.msg
        ).pre_propose_approval_contract
    )

    return {
      addresses: preProposeApprovalContracts.join(','),
    }
  }
}
