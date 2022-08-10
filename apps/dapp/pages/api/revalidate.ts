import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { d: coreAddress, p: proposalId } = req.query
  if (typeof coreAddress !== 'string') {
    return res.status(500).json({ revalidated: false })
  }

  try {
    await res.revalidate(`/dao/${coreAddress}`)
    await res.revalidate(`/dao/${coreAddress}/proposals/create`)
    if (typeof proposalId === 'string') {
      await res.revalidate(`/dao/${coreAddress}/proposals/${proposalId}`)
    }

    return res.status(200).json({ revalidated: true })
  } catch (err) {
    console.error('Error revalidating', err)
    // If there was an error, Next.js will continue to show the last
    // successfully generated page.
    return res.status(500).json({ revalidated: false })
  }
}
