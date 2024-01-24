import { selectorFamily, waitForAll } from 'recoil'

import { ChainId, NftUriData, WithChainId } from '@dao-dao/types'
import { transformIpfsUrlToHttpsIfNecessary } from '@dao-dao/utils'

import { accountsSelector } from './account'
import { stargazeWalletUsdValueSelector } from './stargaze'

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
  key: 'commonNftAllNftUsdValue',
  get:
    ({ chainId, address }) =>
    ({ get }) => {
      const accounts = get(accountsSelector({ chainId, address }))
      const sum = get(
        waitForAll(
          accounts
            .filter(
              (x) =>
                x.chainId === ChainId.StargazeMainnet ||
                x.chainId === ChainId.StargazeTestnet
            )
            .map((x) =>
              stargazeWalletUsdValueSelector({
                chainId: x.chainId,
                address: x.address,
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
