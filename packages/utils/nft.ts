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
