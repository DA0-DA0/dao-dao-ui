import { fromUtf8, toUtf8 } from '@cosmjs/encoding'

import {
  ContractVersionInfo,
  PreProposeModule,
  PreProposeModuleType,
  PreProposeModuleTypedConfig,
} from '@dao-dao/types'
import { Config as NeutronCwdSubdaoTimelockSingleConfig } from '@dao-dao/types/contracts/NeutronCwdSubdaoTimelockSingle'
import {
  ContractName,
  INVALID_CONTRACT_ERROR_SUBSTRINGS,
  cosmWasmClientRouter,
  getRpcForChainId,
  parseContractVersion,
} from '@dao-dao/utils'

import {
  DaoPreProposeApprovalSingleQueryClient,
  DaoPreProposeApproverQueryClient,
  NeutronCwdSubdaoPreProposeSingleQueryClient,
  NeutronCwdSubdaoTimelockSingleQueryClient,
} from '../contracts'
import { queryIndexer } from '../indexer'

export const fetchContractInfo = async (
  chainId: string,
  contractAddress: string
): Promise<ContractVersionInfo | undefined> => {
  let info: ContractVersionInfo | undefined

  // Try indexer first.
  try {
    info = await queryIndexer({
      type: 'contract',
      address: contractAddress,
      formula: 'info',
      chainId,
    })
  } catch (err) {
    // Ignore error.
    console.error(err)
  }

  // If indexer fails, fallback to querying chain.
  if (!info) {
    try {
      const client = await cosmWasmClientRouter.connect(
        getRpcForChainId(chainId)
      )
      const contractInfo = await client.queryContractRaw(
        contractAddress,
        toUtf8('contract_info')
      )
      if (contractInfo) {
        info = JSON.parse(fromUtf8(contractInfo))
      }
    } catch (err) {
      if (
        err instanceof Error &&
        INVALID_CONTRACT_ERROR_SUBSTRINGS.some((substring) =>
          (err as Error).message.includes(substring)
        )
      ) {
        // Ignore error.
        console.error(err)
        return undefined
      }

      // Rethrow other errors because it should not have failed.
      throw err
    }
  }

  return info
}

export const fetchPreProposeModule = async (
  chainId: string,
  preProposeAddress: string
): Promise<PreProposeModule> => {
  const contractInfo = await fetchContractInfo(chainId, preProposeAddress)
  const contractVersion =
    contractInfo && parseContractVersion(contractInfo.version)

  if (!contractInfo || !contractVersion) {
    throw new Error('Failed to fetch pre propose module info')
  }

  let typedConfig: PreProposeModuleTypedConfig = {
    type: PreProposeModuleType.Other,
  }

  switch (contractInfo.contract) {
    case ContractName.PreProposeApprovalSingle: {
      let approver: string | undefined
      let preProposeApproverContract: string | null = null

      // Try indexer first.
      try {
        approver = await queryIndexer({
          type: 'contract',
          address: preProposeAddress,
          formula: 'daoPreProposeApprovalSingle/approver',
          chainId,
        })
      } catch (err) {
        // Ignore error.
        console.error(err)
      }
      // If indexer fails, fallback to querying chain.
      if (!approver) {
        const client = new DaoPreProposeApprovalSingleQueryClient(
          await cosmWasmClientRouter.connect(getRpcForChainId(chainId)),
          preProposeAddress
        )

        approver = (await client.queryExtension({
          msg: {
            approver: {},
          },
        })) as string
      }

      // Check if approver is an approver contract.
      const approverContractInfo = await fetchContractInfo(chainId, approver)
      if (approverContractInfo?.contract === ContractName.PreProposeApprover) {
        preProposeApproverContract = approver
        approver = undefined

        // Get DAO address from approver contract.
        // Try indexer first.
        try {
          approver = await queryIndexer({
            type: 'contract',
            address: preProposeApproverContract,
            formula: 'daoPreProposeApprover/dao',
            chainId,
          })
        } catch (err) {
          // Ignore error.
          console.error(err)
        }
        // If indexer fails, fallback to querying chain.
        if (!approver) {
          const client = new DaoPreProposeApproverQueryClient(
            await cosmWasmClientRouter.connect(getRpcForChainId(chainId)),
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
        preProposeApprovalContract = await queryIndexer({
          type: 'contract',
          address: preProposeAddress,
          formula: 'daoPreProposeApprover/preProposeApprovalContract',
          chainId,
        })
      } catch (err) {
        // Ignore error.
        console.error(err)
      }
      // If indexer fails, fallback to querying chain.
      if (!preProposeApprovalContract) {
        const client = new DaoPreProposeApproverQueryClient(
          await cosmWasmClientRouter.connect(getRpcForChainId(chainId)),
          preProposeAddress
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
        approvalDao = await queryIndexer({
          type: 'contract',
          address: preProposeApprovalContract,
          formula: 'daoPreProposeApprovalSingle/dao',
          chainId,
        })
      } catch (err) {
        // Ignore error.
        console.error(err)
      }
      // If indexer fails, fallback to querying chain.
      if (!approvalDao) {
        const client = new DaoPreProposeApprovalSingleQueryClient(
          await cosmWasmClientRouter.connect(getRpcForChainId(chainId)),
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
        timelockAddress = await queryIndexer({
          type: 'contract',
          address: preProposeAddress,
          formula: 'neutron/cwdSubdaoPreProposeSingle/timelockAddress',
          chainId,
        })
      } catch (err) {
        // Ignore error.
        console.error(err)
      }
      // If indexer fails, fallback to querying chain.
      if (!timelockAddress) {
        const client = new NeutronCwdSubdaoPreProposeSingleQueryClient(
          await cosmWasmClientRouter.connect(getRpcForChainId(chainId)),
          preProposeAddress
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
        config = await queryIndexer({
          type: 'contract',
          address: timelockAddress,
          formula: 'neutron/cwdSubdaoTimelockSingle/config',
          chainId,
        })
      } catch (err) {
        // Ignore error.
        console.error(err)
      }
      // If indexer fails, fallback to querying chain.
      if (!config) {
        const client = new NeutronCwdSubdaoTimelockSingleQueryClient(
          await cosmWasmClientRouter.connect(getRpcForChainId(chainId)),
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

  return {
    contractName: contractInfo.contract,
    version: contractVersion,
    address: preProposeAddress,
    ...typedConfig,
  }
}
