import { QueryClient } from '@tanstack/react-query'

import {
  PreProposeModule,
  PreProposeModuleType,
  PreProposeModuleTypedConfig,
  SecretAnyContractInfo,
} from '@dao-dao/types'
import { Config as NeutronCwdSubdaoTimelockSingleConfig } from '@dao-dao/types/contracts/NeutronCwdSubdaoTimelockSingle'
import {
  ContractName,
getCosmWasmClientForChainId,
  extractAddressFromMaybeSecretContractInfo,
  parseContractVersion,
} from '@dao-dao/utils'

import {
  DaoPreProposeApprovalSingleQueryClient,
  DaoPreProposeApproverQueryClient,
  NeutronCwdSubdaoPreProposeSingleQueryClient,
  NeutronCwdSubdaoTimelockSingleQueryClient,
} from '../contracts'
import { queryIndexer } from '../indexer'
import { contractQueries } from '../query'

export const fetchPreProposeModule = async (
  queryClient: QueryClient,
  chainId: string,
  preProposeAddress: string
): Promise<PreProposeModule> => {
  const { info: contractInfo } = await queryClient.fetchQuery(
    contractQueries.info(queryClient, {
      chainId,
      address: preProposeAddress,
    })
  )
  const contractVersion = parseContractVersion(contractInfo.version)

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
          await getCosmWasmClientForChainId(chainId),
          preProposeAddress
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
            contractQueries.info(queryClient, {
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
            await getCosmWasmClientForChainId(chainId),
            preProposeApproverContract
          )

          approver = extractAddressFromMaybeSecretContractInfo(
            await client.dao()
          )
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
          await getCosmWasmClientForChainId(chainId),
          preProposeAddress
        )

        preProposeApprovalContract = extractAddressFromMaybeSecretContractInfo(
          (await client.queryExtension({
            msg: {
              pre_propose_approval_contract: {},
            },
          })) as string | SecretAnyContractInfo
        )
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
          await getCosmWasmClientForChainId(chainId),
          preProposeApprovalContract
        )

        approvalDao = extractAddressFromMaybeSecretContractInfo(
          await client.dao()
        )
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
          await getCosmWasmClientForChainId(chainId),
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

  return {
    contractName: contractInfo.contract,
    version: contractVersion,
    address: preProposeAddress,
    ...typedConfig,
  }
}
