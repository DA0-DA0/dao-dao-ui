import { queryOptions } from '@tanstack/react-query'

import { HugeDecimal } from '@dao-dao/math'
import { fetchNftMetadataFromUri } from '@dao-dao/state/query'
import { useVotingModule } from '@dao-dao/stateless'
import { NftCardInfo, NftUriData } from '@dao-dao/types'
import {
  getCosmWasmClientForChainId,
  getNftKey,
  parseNftMetadata,
} from '@dao-dao/utils'

import {
  useDaoGovernanceToken,
  useQueryLoadingDataWithError,
} from '../../../../hooks'

export type Cw721RolesMember = {
  address: string
  tokenCount: number
  weight: HugeDecimal
  roles: string[]
  nfts: Cw721RolesNft[]
}

export type Cw721RolesNft = Pick<
  NftCardInfo,
  | 'chainId'
  | 'collectionAddress'
  | 'collectionName'
  | 'description'
  | 'externalLink'
  | 'imageUrl'
  | 'key'
  | 'metadata'
  | 'name'
  | 'tokenId'
> & {
  owner: string
  role?: string
  weight: HugeDecimal
  tokenUri?: string | null
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
        const collectionInfo = await client.queryContractSmart(collection, {
          contract_info: {},
        })

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

        const nfts: {
          owner: string
          role?: string
          weight: HugeDecimal
          nft: Cw721RolesNft
        }[] = await Promise.all(
          tokenIds.map(async (tokenId) => {
            const { access, info } = await client.queryContractSmart(
              collection,
              {
                all_nft_info: {
                  token_id: tokenId,
                },
              }
            )

            const tokenUri = info.token_uri as string | null | undefined
            const extension =
              info.extension && typeof info.extension === 'object'
                ? (info.extension as Record<string, any>)
                : undefined
            const metadataFromUri = tokenUri
              ? await fetchNftMetadataFromUri({ tokenUri }).catch(
                  () => undefined
                )
              : undefined
            const metadata: NftUriData | undefined =
              metadataFromUri ||
              (extension && parseNftMetadata(extension as any))

            const role = (extension?.role ?? undefined) as string | undefined

            return {
              owner: access.owner as string,
              role,
              weight: HugeDecimal.from(extension?.weight ?? 0),
              nft: {
                chainId: votingModule.chainId,
                collectionAddress: collection,
                collectionName: collectionInfo.name as string,
                description: metadata?.description,
                externalLink: metadata?.externalLink,
                imageUrl: metadata?.imageUrl || tokenUri || undefined,
                key: getNftKey(votingModule.chainId, collection, tokenId),
                metadata,
                name: metadata?.name || role || '',
                owner: access.owner as string,
                role,
                tokenId,
                tokenUri,
                weight: HugeDecimal.from(extension?.weight ?? 0),
              } satisfies Cw721RolesNft,
            }
          })
        )

        return Object.values(
          nfts.reduce(
            (acc, { owner, role, weight, nft }) => {
              acc[owner] ||= {
                address: owner,
                nfts: [],
                tokenCount: 0,
                weight: HugeDecimal.zero,
                roles: [],
              }

              acc[owner].tokenCount += 1
              acc[owner].weight = acc[owner].weight.plus(weight)
              acc[owner].nfts.push(nft)

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
