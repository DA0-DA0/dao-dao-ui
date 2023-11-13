import { fromUtf8, toUtf8 } from '@cosmjs/encoding'

import { ContractVersionInfo } from '@dao-dao/types'
import { cosmWasmClientRouter, getRpcForChainId } from '@dao-dao/utils'

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
