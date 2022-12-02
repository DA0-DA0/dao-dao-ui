import { transformIpfsUrlToHttpsIfNecessary } from './conversion'

// If name is only a number, prefix with collection name.
export const getNftName = (collectionName: string, tokenName: string) =>
  /^[0-9]+$/.test(tokenName.trim())
    ? `${collectionName} ${tokenName.trim()}`
    : tokenName

// Normalize NFT image URLs by ensuring they are from a valid IPFS provider.
export const normalizeNftImageUrl = (url: string) => {
  url = transformIpfsUrlToHttpsIfNecessary(url)

  // Convert `https://CID.ipfs.nftstorage.link` to
  // `https://nftstorage.link/ipfs/CID`
  if (url.includes('.ipfs.nftstorage.link')) {
    const matches = url.match(/([a-zA-Z0-9]+)\.ipfs\.nftstorage\.link(.*)$/)
    if (matches?.length === 3) {
      url = `https://nftstorage.link/ipfs/${matches[1]}${matches[2]}`
    }
  }

  // If this is not an IPFS image, we can't enforce that it is coming from one
  // of our nextJS allowed image sources.
  if (!url.includes('ipfs')) {
    url = `https://img-proxy.ekez.workers.dev/${url}`
  }

  return url
}

// Tries to parse [EIP-721] metadata out of the data at it's metadata pointer.
//
// [EIP-721]: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
export const parseNftUriResponse = (
  uriDataResponse: string,
  collectionName: string
): {
  name: string | undefined
  imageUrl: string | undefined
  externalLink: { href: string; name: string } | undefined
} => {
  // Maps domain -> human readable name. If a domain is in this set, NFTs
  // associated with it will have their external links displayed using the human
  // readable name provided here.
  const HostnameMap: Record<string, string | undefined> = {
    'stargaze.zone': 'Stargaze',
  }

  let name
  let imageUrl
  let externalLink
  // Only try to parse if there's a good chance this is JSON, the
  // heuristic being the first non-whitespace character is a "{".
  if (uriDataResponse.trimStart().startsWith('{')) {
    try {
      const json = JSON.parse(uriDataResponse)

      if (typeof json.name === 'string' && !!json.name.trim()) {
        name = getNftName(collectionName, json.name)
      }

      if (typeof json.image === 'string' && !!json.image) {
        imageUrl = transformIpfsUrlToHttpsIfNecessary(json.image)
      }

      if (typeof json.external_url === 'string' && !!json.external_url.trim()) {
        const externalUrl = transformIpfsUrlToHttpsIfNecessary(
          json.external_url
        )
        const externalUrlDomain = new URL(externalUrl).hostname
        externalLink = {
          href: externalUrl,
          name: HostnameMap[externalUrlDomain] ?? externalUrlDomain,
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  return { name, imageUrl, externalLink }
}
