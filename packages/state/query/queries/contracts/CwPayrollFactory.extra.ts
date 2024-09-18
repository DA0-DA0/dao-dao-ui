import { QueryClient, queryOptions } from '@tanstack/react-query'

import { ArrayOfVestingContract } from '@dao-dao/types/contracts/CwPayrollFactory'

import { indexerQueries } from '../indexer'
import { cwPayrollFactoryQueries } from './CwPayrollFactory'

/**
 * List all vesting contracts.
 */
export const listAllVestingContracts = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<{
  chainId: string
  contracts: ArrayOfVestingContract
}> => {
  try {
    const list: ArrayOfVestingContract = await queryClient.fetchQuery(
      indexerQueries.queryContract(queryClient, {
        chainId,
        contractAddress: address,
        formula: 'cwPayrollFactory/listVestingContracts',
      })
    )
    if (list && Array.isArray(list)) {
      return {
        chainId,
        contracts: list,
      }
    }
  } catch (err) {
    console.error(err)
  }

  // If indexer query fails, fallback to contract queries.
  const vestingContracts: ArrayOfVestingContract = []
  const limit = 30
  while (true) {
    const response = await queryClient.fetchQuery(
      cwPayrollFactoryQueries.listVestingContracts(queryClient, {
        chainId,
        contractAddress: address,
        args: {
          startAfter: vestingContracts[vestingContracts.length - 1]?.contract,
          limit,
        },
      })
    )

    if (!response?.length) {
      break
    }

    vestingContracts.push(...response)

    // If we have less than the limit of items, we've exhausted them.
    if (response.length < limit) {
      break
    }
  }

  return {
    chainId,
    contracts: vestingContracts,
  }
}

export const cwPayrollFactoryExtraQueries = {
  /**
   * List all vesting contracts.
   */
  listAllVestingContracts: (
    queryClient: QueryClient,
    options: Parameters<typeof listAllVestingContracts>[1]
  ) =>
    queryOptions({
      queryKey: ['cwPayrollFactoryExtra', 'listAllVestingContracts', options],
      queryFn: () => listAllVestingContracts(queryClient, options),
    }),
}
