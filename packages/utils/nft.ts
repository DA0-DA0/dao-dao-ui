import { transformIpfsUrlToHttpsIfNecessary } from './conversion'

// If name is only a number, prefix with collection name. Fallback to token ID
// if name does not exist.
export const getNftName = (
  collectionName: string,
  tokenId: string,
  tokenName?: string
) =>
  !tokenName || /^[0-9]+$/.test(tokenName.trim())
    ? `${collectionName} ${(tokenName || tokenId).trim()}`.trim()
    : tokenName

// Tries to parse [EIP-721] metadata out of the data at it's metadata pointer.
//
// [EIP-721]: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
export const parseNftUriResponse = (
  uriDataResponse: string
): {
  name: string | undefined
  description: string | undefined
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
  let description
  let imageUrl
  let externalLink
  // Only try to parse if there's a good chance this is JSON, the
  // heuristic being the first non-whitespace character is a "{".
  if (uriDataResponse.trimStart().startsWith('{')) {
    try {
      const json = JSON.parse(uriDataResponse)

      if (typeof json.name === 'string' && !!json.name.trim()) {
        name = json.name
      }

      if (typeof json.description === 'string' && !!json.description.trim()) {
        description = json.description
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

  return {
    name,
    description,
    imageUrl,
    externalLink,
  }
}

// Uploads an NFT to NFT Storage and returns the metadata.
export const uploadNft = async (
  name: string,
  description: string,
  file: File,
  extra?: string
): Promise<{
  metadataUrl: string
  imageUrl: string
}> => {
  const form = new FormData()
  form.append('name', name)
  form.append('description', description)
  form.append('image', file)
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
    const { error } = await response
      .json()
      .catch(() => ({ error: 'Unknown error' }))
    throw new Error(error)
  }
}
