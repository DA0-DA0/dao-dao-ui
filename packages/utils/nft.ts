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
