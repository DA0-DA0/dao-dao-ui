import { fromUtf8, toUtf8 } from '@cosmjs/encoding'

import {
  ContractVersionInfo,
  PreProposeModule,
  PreProposeModuleType,
  PreProposeModuleTypedConfig,
} from '@dao-dao/types'
import {
  ContractName,
  cosmWasmClientRouter,
  getRpcForChainId,
  parseContractVersion,
} from '@dao-dao/utils'

import {
  DaoPreProposeApprovalSingleQueryClient,
  DaoPreProposeApproverQueryClient,
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
      required: true,
    })
  } catch (err) {
    // Ignore error.
    console.error(err)
  }

  // If indexer fails, fallback to querying chain.
  if (!info) {
    const client = await cosmWasmClientRouter.connect(getRpcForChainId(chainId))
    const contractInfo = await client.queryContractRaw(
      contractAddress,
      toUtf8('contract_info')
    )
    if (contractInfo) {
      info = JSON.parse(fromUtf8(contractInfo))
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
    case ContractName.PreProposeApprover: {
      let preProposeApprovalContract: string | undefined
      // Try indexer first.
      try {
        preProposeApprovalContract = await queryIndexer({
          type: 'contract',
          address: preProposeAddress,
          formula: 'daoPreProposeApprover/preProposeApprovalContract',
          chainId,
          required: true,
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
          required: true,
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
  }

  return {
    contractName: contractInfo.contract,
    version: contractVersion,
    address: preProposeAddress,
    ...typedConfig,
  }
}
