import { QueryClient, queryOptions } from '@tanstack/react-query'

import {
  NeutronTimelockOverrule,
  PreProposeModule,
  PreProposeModuleType,
  PreProposeModuleTypedConfig,
} from '@dao-dao/types'
import { SingleChoiceApprovalProposal } from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'
import { PreProposeSubmissionPolicy } from '@dao-dao/types/contracts/DaoPreProposeSingle'
import { Config as NeutronCwdSubdaoTimelockSingleConfig } from '@dao-dao/types/contracts/NeutronCwdSubdaoTimelockSingle'
import {
  ContractName,
  DAO_PRE_PROPOSE_MULTIPLE_CONTRACT_NAMES,
  DAO_PRE_PROPOSE_SINGLE_CONTRACT_NAMES,
  getCosmWasmClientForChainId,
  parseContractVersion,
} from '@dao-dao/utils'

import { getDao } from '../../clients'
import {
  DaoPreProposeApprovalSingleQueryClient,
  DaoPreProposeApproverQueryClient,
  NeutronCwdSubdaoPreProposeSingleQueryClient,
  NeutronCwdSubdaoTimelockSingleQueryClient,
} from '../../contracts'
import { contractQueries } from './contract'
import {
  daoPreProposeApprovalSingleQueries,
  daoPreProposeApproverQueries,
  daoProposalSingleV2Queries,
  neutronCwdPreProposeSingleOverruleQueries,
  neutronCwdSubdaoTimelockSingleQueries,
} from './contracts'
import { daoPreProposeSingleQueries } from './contracts/DaoPreProposeSingle'
import { indexerQueries } from './indexer'

/**
 * Fetch pre-propose module info.
 */
export const fetchPreProposeModule = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<PreProposeModule> => {
  const [{ info: contractInfo }, moduleConfig] = await Promise.all([
    queryClient.fetchQuery(
      contractQueries.info({
        chainId,
        address: address,
      })
    ),
    // All pre-propose modules share the same config.
    queryClient
      .fetchQuery(
        daoPreProposeSingleQueries.config({
          chainId,
          contractAddress: address,
        })
      )
      // If failed to query config, fail gracefully since a DAO may use any
      // custom pre-propose module.
      .catch(() => undefined),
  ])
  const contractVersion = parseContractVersion(contractInfo.version)

  let typedConfig: PreProposeModuleTypedConfig = {
    // If normal DAO DAO pre-propose module, use normal. Otherwise, default to
    // other.
    type: [
      ...DAO_PRE_PROPOSE_SINGLE_CONTRACT_NAMES,
      ...DAO_PRE_PROPOSE_MULTIPLE_CONTRACT_NAMES,
    ].includes(contractInfo.contract)
      ? PreProposeModuleType.Normal
      : PreProposeModuleType.Other,
  }

  switch (contractInfo.contract) {
    case ContractName.PreProposeApprovalSingle:
    case ContractName.PreProposeApprovalMultiple: {
      let approver: string | undefined
      let preProposeApproverContract: string | null = null

      // Try indexer first.
      try {
        approver = await queryClient.fetchQuery(
          indexerQueries.queryContract({
            chainId,
            contractAddress: address,
            formula: 'daoPreProposeApprovalSingle/approver',
          })
        )
      } catch (err) {
        // Ignore error.
        console.error(err)
      }
      // If indexer fails, fallback to querying chain.
      if (!approver) {
        const client = new DaoPreProposeApprovalSingleQueryClient(
          await getCosmWasmClientForChainId(chainId),
          address
        )

        approver = (await client.queryExtension({
          msg: {
            approver: {},
          },
        })) as string
      }

      // Check if approver is an approver contract.
      const approverContractName = (
        await queryClient
          .fetchQuery(
            contractQueries.info({
              chainId,
              address: approver,
            })
          )
          .catch(() => undefined)
      )?.info.contract
      if (approverContractName === ContractName.PreProposeApprover) {
        preProposeApproverContract = approver
        approver = undefined

        // Get DAO address from approver contract.
        // Try indexer first.
        try {
          approver = await queryClient.fetchQuery(
            indexerQueries.queryContract({
              chainId,
              contractAddress: preProposeApproverContract,
              formula: 'daoPreProposeApprover/dao',
            })
          )
        } catch (err) {
          // Ignore error.
          console.error(err)
        }
        // If indexer fails, fallback to querying chain.
        if (!approver) {
          const client = new DaoPreProposeApproverQueryClient(
            await getCosmWasmClientForChainId(chainId),
            preProposeApproverContract
          )

          approver = await client.dao()
        }
      }

      typedConfig = {
        type: PreProposeModuleType.Approval,
        config: {
          approver,
          preProposeApproverContract,
        },
      }
      break
    }
    case ContractName.PreProposeApprover: {
      let preProposeApprovalContract: string | undefined
      // Try indexer first.
      try {
        preProposeApprovalContract = await queryClient.fetchQuery(
          indexerQueries.queryContract({
            chainId,
            contractAddress: address,
            formula: 'daoPreProposeApprover/preProposeApprovalContract',
          })
        )
      } catch (err) {
        // Ignore error.
        console.error(err)
      }
      // If indexer fails, fallback to querying chain.
      if (!preProposeApprovalContract) {
        const client = new DaoPreProposeApproverQueryClient(
          await getCosmWasmClientForChainId(chainId),
          address
        )

        preProposeApprovalContract = (await client.queryExtension({
          msg: {
            pre_propose_approval_contract: {},
          },
        })) as string
      }

      let approvalDao: string | undefined
      // Try indexer first.
      try {
        approvalDao = await queryClient.fetchQuery(
          indexerQueries.queryContract({
            chainId,
            contractAddress: preProposeApprovalContract,
            formula: 'daoPreProposeApprovalSingle/dao',
          })
        )
      } catch (err) {
        // Ignore error.
        console.error(err)
      }
      // If indexer fails, fallback to querying chain.
      if (!approvalDao) {
        const client = new DaoPreProposeApprovalSingleQueryClient(
          await getCosmWasmClientForChainId(chainId),
          preProposeApprovalContract
        )

        approvalDao = await client.dao()
      }

      typedConfig = {
        type: PreProposeModuleType.Approver,
        config: {
          approvalDao,
          preProposeApprovalContract,
        },
      }
      break
    }
    case ContractName.NeutronCwdSubdaoPreProposeSingle: {
      let timelockAddress: string | undefined
      // Try indexer first.
      try {
        timelockAddress = await queryClient.fetchQuery(
          indexerQueries.queryContract({
            chainId,
            contractAddress: address,
            formula: 'neutron/cwdSubdaoPreProposeSingle/timelockAddress',
          })
        )
      } catch (err) {
        // Ignore error.
        console.error(err)
      }
      // If indexer fails, fallback to querying chain.
      if (!timelockAddress) {
        const client = new NeutronCwdSubdaoPreProposeSingleQueryClient(
          await getCosmWasmClientForChainId(chainId),
          address
        )

        timelockAddress = (await client.queryExtension({
          msg: {
            timelock_address: {},
          },
        })) as string
      }

      let config: NeutronCwdSubdaoTimelockSingleConfig | undefined
      // Try indexer first.
      try {
        config = await queryClient.fetchQuery(
          indexerQueries.queryContract({
            chainId,
            contractAddress: timelockAddress,
            formula: 'neutron/cwdSubdaoTimelockSingle/config',
          })
        )
      } catch (err) {
        // Ignore error.
        console.error(err)
      }
      // If indexer fails, fallback to querying chain.
      if (!config) {
        const client = new NeutronCwdSubdaoTimelockSingleQueryClient(
          await getCosmWasmClientForChainId(chainId),
          timelockAddress
        )

        config = await client.config()
      }

      typedConfig = {
        type: PreProposeModuleType.NeutronSubdaoSingle,
        config: {
          timelockAddress,
          timelockConfig: config,
        },
      }
      break
    }
    case ContractName.NeutronCwdPreProposeSingleOverrule:
      typedConfig = {
        type: PreProposeModuleType.NeutronOverruleSingle,
      }
      break
  }

  const submissionPolicy: PreProposeSubmissionPolicy = moduleConfig
    ? // < v2.5.0
      'open_proposal_submission' in moduleConfig
      ? moduleConfig.open_proposal_submission
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
          }
      : // >= v2.5.0
        'submission_policy' in moduleConfig && moduleConfig.submission_policy
        ? moduleConfig.submission_policy
        : // If unknown config shape, assume only members can propose.
          {
            specific: {
              dao_members: true,
              allowlist: [],
              denylist: [],
            },
          }
    : // If no config loaded, assume only members can propose.
      {
        specific: {
          dao_members: true,
          allowlist: [],
          denylist: [],
        },
      }

  return {
    contractName: contractInfo.contract,
    version: contractVersion,
    address,
    submissionPolicy,
    ...typedConfig,
  }
}

/**
 * Fetch proposal execution TX hash.
 */
export const fetchProposalExecutionTxHash = async ({
  chainId,
  contractAddress,
  proposalId,
  isNeutronTimelockExecute,
}: {
  chainId: string
  contractAddress: string
  proposalId: string | number
  /**
   * Whether or not this is executed from Neutron's fork SubDAO timelock
   * system. If so, the execute action event attribute is different.
   */
  isNeutronTimelockExecute?: boolean
}): Promise<string | null> => {
  const client = await getCosmWasmClientForChainId(chainId)
  const events = await client.searchTx([
    { key: 'wasm._contract_address', value: contractAddress },
    { key: 'wasm.proposal_id', value: proposalId.toString() },
    {
      key: 'wasm.action',
      value: isNeutronTimelockExecute ? 'execute_proposal' : 'execute',
    },
  ])

  if (events.length > 1) {
    console.error('More than one execution', events)
  }

  return events?.[0]?.hash ?? null
}

/**
 * Given the pre-propose approval ID of a pending proposal that has its approver
 * set to a pre-propose-approver contract, retrieve the automatically-created
 * proposal's ID in the approver's DAO.
 */
const fetchApproverIdForPreProposeApprovalId = async (
  queryClient: QueryClient,
  {
    chainId,
    preProposeAddress,
    proposalNumber,
    isApprovalProposal,
    approver,
    preProposeApproverContract,
  }: {
    chainId: string
    preProposeAddress: string
    proposalNumber: number
    isApprovalProposal: boolean
    approver: string
    preProposeApproverContract: string
  }
): Promise<string | null> => {
  const approverDao = getDao({
    queryClient,
    chainId,
    coreAddress: approver,
  })
  await approverDao.init()

  const preProposeApprovalNumber = isApprovalProposal
    ? proposalNumber
    : // Get pre-propose proposal ID that was accepted to create this
      // proposal.
      await queryClient.fetchQuery(
        daoPreProposeApprovalSingleQueries.queryExtension({
          chainId,
          contractAddress: preProposeAddress,
          args: {
            msg: {
              completed_proposal_id_for_created_proposal_id: {
                id: proposalNumber,
              },
            },
          },
        })
      )

  // If no proposal number found, approver must not have been setup when this
  // pre-propose approval proposal was created.
  if (!preProposeApprovalNumber) {
    return null
  }

  const approverProposalNumber = await queryClient.fetchQuery<number | null>(
    daoPreProposeApproverQueries.queryExtension({
      chainId,
      contractAddress: preProposeApproverContract,
      args: {
        msg: {
          approver_proposal_id_for_pre_propose_approval_id: {
            id: Number(preProposeApprovalNumber),
          },
        },
      },
    })
  )

  // If no proposal number found, approver must not have been setup when this
  // pre-propose approval proposal was created.
  if (!approverProposalNumber) {
    return null
  }

  // Get prefix of proposal module with dao-pre-propose-approver attached
  // so we can link to the approver proposal.
  const approverDaoApproverProposalModulePrefix =
    approverDao.proposalModules.find(
      (approverDaoProposalModule) =>
        approverDaoProposalModule.prePropose?.type ===
          PreProposeModuleType.Approver &&
        approverDaoProposalModule.prePropose.address ===
          preProposeApproverContract
    )?.prefix

  // The approver proposal module will not be found if it was disabled, so
  // error since we can't determine the prefix.
  if (!approverDaoApproverProposalModulePrefix) {
    throw new Error(`failed to find approver proposal module for ${approver}`)
  }

  return `${approverDaoApproverProposalModulePrefix}${approverProposalNumber}`
}

/**
 * Given an approver's proposal that approved a pre-propose approval proposal,
 * retrieve the approved (completed) pre-propose approval proposal ID.
 */
const fetchApprovedIdForPreProposeApproverId = async (
  queryClient: QueryClient,
  {
    chainId,
    preProposeAddress,
    proposalNumber,
    approvalDao,
    preProposeApprovalContract,
  }: {
    chainId: string
    preProposeAddress: string
    proposalNumber: number
    approvalDao: string
    preProposeApprovalContract: string
  }
): Promise<string> => {
  const approvalDaoClient = getDao({
    queryClient,
    chainId,
    coreAddress: approvalDao,
  })
  await approvalDaoClient.init()

  const approvalProposalNumber = await queryClient.fetchQuery(
    daoPreProposeApproverQueries.queryExtension({
      chainId,
      contractAddress: preProposeAddress,
      args: {
        msg: {
          pre_propose_approval_id_for_approver_proposal_id: {
            id: proposalNumber,
          },
        },
      },
    })
  )

  // Get prefix of proposal module with dao-pre-propose-approval attached so
  // we can link to the created proposal.
  const approvalDaoApprovalProposalModulePrefix =
    approvalDaoClient.proposalModules.find(
      (approvalDaoProposalModule) =>
        approvalDaoProposalModule.prePropose?.type ===
          PreProposeModuleType.Approval &&
        approvalDaoProposalModule.prePropose.address ===
          preProposeApprovalContract
    )?.prefix

  // The approval proposal module will not be found if it was disabled, so
  // error since we can't determine the prefix.
  if (!approvalDaoApprovalProposalModulePrefix) {
    throw new Error(
      `failed to find approval proposal module for ${approvalDao}`
    )
  }

  // Get completed pre-propose proposal ID so we can extract the created
  // proposal ID.
  const completedApprovalProposal = (await queryClient.fetchQuery(
    daoPreProposeApprovalSingleQueries.queryExtension({
      chainId,
      contractAddress: preProposeApprovalContract,
      args: {
        msg: {
          completed_proposal: {
            id: approvalProposalNumber,
          },
        },
      },
    })
  )) as SingleChoiceApprovalProposal

  // Should never happen if the passed in approver proposal ID was executed
  // and the proposal was created. Type-check for below.
  if (!('approved' in completedApprovalProposal.status)) {
    throw new Error(
      `pre-propose approval proposal ${approvalProposalNumber} was not approved`
    )
  }

  return `${approvalDaoApprovalProposalModulePrefix}${completedApprovalProposal.status.approved.created_proposal_id}`
}

/**
 * For the Neutron fork, retrieve the associated timelock and overrule proposal
 * created in the DAO given a SubDAO's timelock address, overrule pre-propose
 * address, and the timelocked proposal ID.
 */
const fetchNeutronTimelockOverrule = async (
  queryClient: QueryClient,
  {
    chainId,
    preProposeOverruleAddress,
    timelockAddress,
    subdaoProposalId,
  }: {
    chainId: string
    preProposeOverruleAddress: string
    timelockAddress: string
    subdaoProposalId: number
  }
): Promise<NeutronTimelockOverrule> => {
  const [dao, proposalModuleAddress, overruleProposalId, timelockProposal] =
    await Promise.all([
      queryClient.fetchQuery(
        neutronCwdPreProposeSingleOverruleQueries.dao({
          chainId,
          contractAddress: preProposeOverruleAddress,
        })
      ),
      queryClient.fetchQuery(
        neutronCwdPreProposeSingleOverruleQueries.proposalModule({
          chainId,
          contractAddress: preProposeOverruleAddress,
        })
      ),
      queryClient.fetchQuery(
        neutronCwdPreProposeSingleOverruleQueries.queryExtension({
          chainId,
          contractAddress: preProposeOverruleAddress,
          args: {
            msg: {
              overrule_proposal_id: {
                subdao_proposal_id: subdaoProposalId,
                timelock_address: timelockAddress,
              },
            },
          },
        })
      ),
      queryClient.fetchQuery(
        neutronCwdSubdaoTimelockSingleQueries.proposal({
          chainId,
          contractAddress: timelockAddress,
          args: {
            proposalId: subdaoProposalId,
          },
        })
      ),
    ])

  const daoClient = getDao({
    queryClient,
    chainId,
    coreAddress: dao,
  })
  await daoClient.init()

  const overruleProposal = await queryClient.fetchQuery(
    daoProposalSingleV2Queries.proposal({
      chainId,
      contractAddress: proposalModuleAddress,
      args: {
        proposalId: Number(overruleProposalId),
      },
    })
  )

  const proposalModule = daoClient.proposalModules.find(
    ({ address }) => address === proposalModuleAddress
  )
  if (!proposalModule) {
    throw new Error(
      `No proposal module found for address ${proposalModuleAddress} in DAO ${dao}`
    )
  }

  return {
    dao,
    proposalModulePrefix: proposalModule.prefix,
    overruleProposal,
    timelockProposal,
  }
}

export const proposalQueries = {
  /**
   * Fetch pre-propose module info.
   */
  preProposeModule: (options: Parameters<typeof fetchPreProposeModule>[1]) =>
    queryOptions({
      queryKey: ['proposal', 'preProposeModule', options],
      queryFn: (ctx) => fetchPreProposeModule(ctx.client, options),
    }),
  /**
   * Fetch proposal execution TX hash.
   */
  proposalExecutionTxHash: (
    options: Parameters<typeof fetchProposalExecutionTxHash>[0]
  ) =>
    queryOptions({
      queryKey: ['proposal', 'executionTxHash', options],
      queryFn: () => fetchProposalExecutionTxHash(options),
    }),
  /**
   * Given the pre-propose approval ID of a pending proposal that has its
   * approver set to a pre-propose-approver contract, retrieve the
   * automatically-created proposal's ID in the approver's DAO.
   */
  approverIdForPreProposeApprovalId: (
    options: Parameters<typeof fetchApproverIdForPreProposeApprovalId>[1]
  ) =>
    queryOptions({
      queryKey: ['proposal', 'approverIdForPreProposeApprovalId', options],
      queryFn: (ctx) =>
        fetchApproverIdForPreProposeApprovalId(ctx.client, options),
    }),
  /**
   * Given an approver's proposal that approved a pre-propose approval proposal,
   * retrieve the approved (completed) pre-propose approval proposal ID.
   */
  approvedIdForPreProposeApproverId: (
    options: Parameters<typeof fetchApprovedIdForPreProposeApproverId>[1]
  ) =>
    queryOptions({
      queryKey: ['proposal', 'approvedIdForPreProposeApproverId', options],
      queryFn: (ctx) =>
        fetchApprovedIdForPreProposeApproverId(ctx.client, options),
    }),
  /**
   * For the Neutron fork, retrieve the associated timelock and overrule
   * proposal created in the DAO given a SubDAO's timelock address, overrule
   * pre-propose address, and the timelocked proposal ID.
   */
  neutronTimelockOverrule: (
    options: Parameters<typeof fetchNeutronTimelockOverrule>[1]
  ) =>
    queryOptions({
      queryKey: ['proposal', 'neutronTimelockOverrule', options],
      queryFn: (ctx) => fetchNeutronTimelockOverrule(ctx.client, options),
    }),
}
