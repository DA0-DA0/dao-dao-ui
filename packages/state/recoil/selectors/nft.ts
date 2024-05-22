import { selectorFamily, waitForAll } from 'recoil'

import {
  ChainId,
  GenericToken,
  NftCardInfo,
  NftUriData,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import {
  MAINNET,
  nftCardInfoFromStargazeIndexerNft,
  transformIpfsUrlToHttpsIfNecessary,
} from '@dao-dao/utils'

import {
  stargazeIndexerClient,
  stargazeTokensForOwnerQuery,
} from '../../graphql'
import { refreshWalletStargazeNftsAtom } from '../atoms'
import { accountsSelector } from './account'
import { stargazeWalletUsdValueSelector } from './stargaze'
import { genericTokenSelector } from './token'

// Tries to parse [EIP-721] metadata out of an NFT's metadata JSON.
//
// [EIP-721]: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
export const nftUriDataSelector = selectorFamily<
  NftUriData | undefined,
  string
>({
  key: 'nftUriData',
  get: (tokenUri) => async () => {
    try {
      // Transform IPFS url if necessary.
      let response = await fetch(transformIpfsUrlToHttpsIfNecessary(tokenUri))

      if (!response.ok) {
        // Sometimes `tokenUri` is missing a `.json` extension, so try again on
        // failure in that case.
        if (!tokenUri.endsWith('.json')) {
          response = await fetch(
            transformIpfsUrlToHttpsIfNecessary(tokenUri + '.json')
          )
        }

        if (!response.ok) {
          return
        }
      }

      const data = await response.json()

      let name
      let description
      let imageUrl
      let externalLink

      if (typeof data.name === 'string' && !!data.name.trim()) {
        name = data.name
      }

      if (typeof data.description === 'string' && !!data.description.trim()) {
        description = data.description
      }

      if (typeof data.image === 'string' && !!data.image) {
        imageUrl = transformIpfsUrlToHttpsIfNecessary(data.image)
      }

      if (typeof data.external_url === 'string' && !!data.external_url.trim()) {
        const externalUrl = transformIpfsUrlToHttpsIfNecessary(
          data.external_url
        )
        const externalUrlDomain = new URL(externalUrl).hostname
        externalLink = {
          href: externalUrl,
          name: HostnameMap[externalUrlDomain] ?? externalUrlDomain,
        }
      }

      return {
        // Include all metadata.
        ...data,

        // Override specifics.
        name,
        description,
        imageUrl,
        externalLink,
      }
    } catch (err) {
      console.error(err)
    }
  },
})

export const allNftUsdValueSelector = selectorFamily<
  number,
  WithChainId<{ address: string }>
>({
  key: 'nftAllNftUsdValue',
  get:
    ({ chainId, address }) =>
    ({ get }) => {
      const accounts = get(accountsSelector({ chainId, address }))
      const sum = get(
        waitForAll(
          accounts
            .filter(
              ({ chainId }) =>
                chainId === ChainId.StargazeMainnet ||
                chainId === ChainId.StargazeTestnet
            )
            .map(({ chainId, address }) =>
              stargazeWalletUsdValueSelector({
                chainId,
                address,
              })
            )
        )
      ).reduce((acc, x) => acc + x, 0)
      return sum
    },
})

// Maps domain -> human readable name. If a domain is in this set, NFTs
// associated with it will have their external links displayed using the human
// readable name provided here.
const HostnameMap: Record<string, string | undefined> = {
  'stargaze.zone': 'Stargaze',
}

const STARGAZE_INDEXER_TOKENS_LIMIT = 100
export const walletStargazeNftCardInfosSelector = selectorFamily<
  NftCardInfo[],
  string
>({
  key: 'walletStargazeNftCardInfos',
  get:
    (walletAddress: string) =>
    async ({ get }) => {
      const chainId = MAINNET
        ? ChainId.StargazeMainnet
        : ChainId.StargazeTestnet
      const timestamp = new Date()

      get(refreshWalletStargazeNftsAtom(walletAddress))

      const allStargazeTokens: {
        tokenId: string
        name?: string | null
        description?: string | null
        collection: {
          contractAddress: string
          name?: string | null
        }
        highestOffer?: {
          offerPrice?: {
            amount?: number | null
            amountUsd?: number | null
            denom?: string | null
          } | null
        } | null
        media?: {
          url?: string | null
          visualAssets?: {
            lg?: { url?: string | null } | null
          } | null
        } | null
      }[] = []
      while (true) {
        const { error, data } = await stargazeIndexerClient.query({
          query: stargazeTokensForOwnerQuery,
          variables: {
            ownerAddrOrName: walletAddress,
            limit: STARGAZE_INDEXER_TOKENS_LIMIT,
            offset: allStargazeTokens.length,
          },
          // Don't cache since this recoil selector handles caching. If this
          // selector is re-evaluated, it should be re-fetched since an NFT may
          // have changed ownership.
          fetchPolicy: 'no-cache',
        })

        if (error) {
          throw error
        }

        if (!data.tokens?.tokens?.length) {
          break
        }

        allStargazeTokens.push(...data.tokens.tokens)

        if (
          data.tokens.pageInfo &&
          allStargazeTokens.length === data.tokens.pageInfo.total
        ) {
          break
        }
      }

      const genericTokens = get(
        waitForAll(
          allStargazeTokens.flatMap((token) =>
            token.highestOffer?.offerPrice?.denom
              ? genericTokenSelector({
                  chainId,
                  type: TokenType.Native,
                  denomOrAddress: token.highestOffer!.offerPrice!.denom!,
                })
              : []
          )
        )
      )

      const genericTokensMap: Map<string, GenericToken> = new Map(
        genericTokens.map((item) => [item.denomOrAddress, item])
      )

      return allStargazeTokens.map((token) =>
        nftCardInfoFromStargazeIndexerNft(
          chainId,
          token,
          token.highestOffer?.offerPrice?.denom
            ? genericTokensMap.get(token.highestOffer.offerPrice.denom)
            : undefined,
          timestamp
        )
      )
    },
})
