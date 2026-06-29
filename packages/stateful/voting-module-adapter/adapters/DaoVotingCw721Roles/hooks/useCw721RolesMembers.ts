import { queryOptions } from '@tanstack/react-query'

import { HugeDecimal } from '@dao-dao/math'
import { useVotingModule } from '@dao-dao/stateless'
import { getCosmWasmClientForChainId } from '@dao-dao/utils'

import {
  useDaoGovernanceToken,
  useQueryLoadingDataWithError,
} from '../../../../hooks'

export type Cw721RolesMember = {
  address: string
  tokenCount: number
  weight: HugeDecimal
  roles: string[]
}

const PAGE_LIMIT = 100

export const useCw721RolesMembers = () => {
  const votingModule = useVotingModule()
  const token = useDaoGovernanceToken() ?? undefined

  return useQueryLoadingDataWithError(
    queryOptions({
      enabled: !!token,
      queryKey: [
        'cw721RolesMembers',
        {
          chainId: votingModule.chainId,
          collection: token?.denomOrAddress,
          votingModule: votingModule.address,
        },
      ],
      queryFn: async (): Promise<Cw721RolesMember[]> => {
        if (!token) {
          return []
        }

        const client = await getCosmWasmClientForChainId(votingModule.chainId)
        const collection = token.denomOrAddress

        const tokenIds: string[] = []
        let startAfter: string | undefined

        while (true) {
          const { tokens } = await client.queryContractSmart(collection, {
            all_tokens: {
              limit: PAGE_LIMIT,
              start_after: startAfter,
            },
          })

          tokenIds.push(...tokens)

          if (tokens.length < PAGE_LIMIT) {
            break
          }

          startAfter = tokens[tokens.length - 1]
        }

        const members = await Promise.all(
          tokenIds.map(async (tokenId) => {
            const { access, info } = await client.queryContractSmart(
              collection,
              {
                all_nft_info: {
                  token_id: tokenId,
                },
              }
            )

            return {
              owner: access.owner as string,
              role: (info.extension?.role ?? undefined) as string | undefined,
              weight: HugeDecimal.from(info.extension?.weight ?? 0),
            }
          })
        )

        return Object.values(
          members.reduce(
            (acc, { owner, role, weight }) => {
              acc[owner] ||= {
                address: owner,
                tokenCount: 0,
                weight: HugeDecimal.zero,
                roles: [],
              }

              acc[owner].tokenCount += 1
              acc[owner].weight = acc[owner].weight.plus(weight)

              if (role && !acc[owner].roles.includes(role)) {
                acc[owner].roles.push(role)
              }

              return acc
            },
            {} as Record<string, Cw721RolesMember>
          )
        ).sort((a, b) => b.weight.minus(a.weight).toNumber())
      },
    })
  )
}
