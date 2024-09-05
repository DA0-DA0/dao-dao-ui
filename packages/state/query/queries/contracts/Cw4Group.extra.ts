import { QueryClient, queryOptions } from '@tanstack/react-query'

import { ListMembersResponse } from '@dao-dao/types/contracts/Cw4Group'

import { indexerQueries } from '../indexer'
import { cw4GroupQueries } from './Cw4Group'

/**
 * List all members.
 */
export const listAllMembers = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<ListMembersResponse> => {
  try {
    const indexerMembers: ListMembersResponse['members'] =
      await queryClient.fetchQuery(
        indexerQueries.queryContract(queryClient, {
          chainId,
          contractAddress: address,
          formula: 'cw4Group/listMembers',
        })
      )
    if (indexerMembers && Array.isArray(indexerMembers)) {
      return {
        members: indexerMembers,
      }
    }
  } catch (err) {
    console.error(err)
  }

  // If indexer query fails, fallback to contract queries.
  const members: ListMembersResponse['members'] = []
  const limit = 30
  while (true) {
    const response = (
      await queryClient.fetchQuery(
        cw4GroupQueries.listMembers(queryClient, {
          chainId,
          contractAddress: address,
          args: {
            startAfter: members[members.length - 1]?.addr,
            limit,
          },
        })
      )
    ).members

    if (!response?.length) {
      break
    }

    members.push(...response)

    // If we have less than the limit of items, we've exhausted them.
    if (response.length < limit) {
      break
    }
  }

  return {
    members,
  }
}

export const cw4GroupExtraQueries = {
  /**
   * List all members.
   */
  listAllMembers: (
    queryClient: QueryClient,
    options: Parameters<typeof listAllMembers>[1]
  ) =>
    queryOptions({
      queryKey: ['cw4GroupExtra', 'listAllMembers', options],
      queryFn: () => listAllMembers(queryClient, options),
    }),
}
