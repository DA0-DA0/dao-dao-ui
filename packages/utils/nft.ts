// If name is only a number, prefix with collection name. Fallback to token ID

import { HugeDecimal } from '@dao-dao/math'
import {
  GenericToken,
  NftCardInfo,
  StargazeNft,
  StargazeNftMediaType,
} from '@dao-dao/types'

import { STARGAZE_URL_BASE } from './constants'

// if name does not exist.
export const getNftName = (
  collectionName: string,
  tokenId: string,
  tokenName?: string
) =>
  !tokenName || /^[0-9]+$/.test(tokenName.trim())
    ? `${collectionName} ${(tokenName || tokenId).trim()}`.trim()
    : tokenName

// Uploads an NFT to NFT Storage and returns the metadata.
export const uploadNft = async (
  name: string,
  description: string,
  image?: File,
  extra?: string
): Promise<{
  cid: string
  metadataUrl: string
  imageUrl: string | undefined
}> => {
  const form = new FormData()
  form.append('name', name)
  form.append('description', description)
  if (image) {
    form.append('image', image)
  }
  if (extra) {
    form.append('extra', extra)
  }

  // Next.js API route.
  const response = await fetch('/api/uploadNft', {
    method: 'POST',
    body: form,
  })

  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    // Vercel limits file size to 4.5MB and responds with 413 if exceeded. Add
    // some buffer to make room for the other fields.
    if (response.status === 413) {
      throw new Error('File too large. Max 4MB.')
    }

    const { error } = await response
      .json()
      .catch(() => ({ error: 'Unknown error' }))
    throw new Error(error)
  }
}

export const getNftKey = (
  chainId: string,
  collectionAddress: string,
  tokenId: string
): string =>
  [chainId, collectionAddress, tokenId]
    // Ensure this produces an empty string if the variables are empty.
    .filter(Boolean)
    .join(':')

export const imageUrlFromStargazeIndexerNft = (
  token: StargazeNft
): string | undefined =>
  // The Stargaze API resizes animated images (gifs) into `video/mp4` mimetype,
  // which cannot display in an `img` tag. If this is a gif, use the original
  // media URL instead of the resized one.
  (token.media?.type !== StargazeNftMediaType.AnimatedImage &&
    token.media?.visualAssets?.lg?.url) ||
  token.media?.url ||
  undefined

export const nftCardInfoFromStargazeIndexerNft = (
  chainId: string,
  token: StargazeNft,
  offerToken: GenericToken | null = null,
  timestamp: Date = new Date()
): NftCardInfo => ({
  key: getNftKey(
    chainId,
    token.collection.contractAddress || '',
    token.tokenId || ''
  ),
  chainId,
  collectionAddress: token.collection.contractAddress || '',
  collectionName: token.collection.name || 'Unknown Collection',
  tokenId: token.tokenId || '',
  externalLink: {
    href: `${STARGAZE_URL_BASE}/media/${token.collection.contractAddress}/${token.tokenId}`,
    name: 'Stargaze',
  },
  imageUrl: imageUrlFromStargazeIndexerNft(token),
  name: token.name || token.tokenId || 'Unknown NFT',
  description: token.description || undefined,
  highestOffer: offerToken
    ? {
        offerToken,
        amountUsd: token.highestOffer?.offerPrice?.amountUsd,
        amount: HugeDecimal.from(token.highestOffer?.offerPrice?.amount || -1),
      }
    : undefined,
  fetchedTimestamp: timestamp,
})
