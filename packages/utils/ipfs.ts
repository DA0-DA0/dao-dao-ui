/**
 * Upload JSON to IPFS and return the CID.
 */
export const uploadJsonToIpfs = async (
  data: Record<string, unknown>
): Promise<string> => {
  // Next.js API route.
  const response = await fetch('/api/uploadJson', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.ok) {
    const { cid } = await response.json()
    if (!cid) {
      throw new Error('Failed to get CID from response.')
    }

    return cid
  } else {
    // Vercel limits file size to 4.5MB and responds with 413 if exceeded. Add
    // some buffer to make room for the other fields.
    if (response.status === 413) {
      throw new Error('Data too large to upload. Max 4MB.')
    }

    const { error } = await response
      .json()
      .catch(() => ({ error: 'Unknown error' }))
    throw new Error(error)
  }
}
