// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'

// Allow to be called from any origin so that the dApp can trigger a page to
// cache before the user visits it.
const cors = Cors({
  methods: ['GET'],
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the CORS middleware.
  await new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        reject(result)
      } else {
        resolve(result)
      }
    })
  })

  const { d: coreAddress, p: proposalId } = req.query
  if (typeof coreAddress !== 'string') {
    return res.status(500).end()
  }

  try {
    await res.revalidate(`/${coreAddress}`)
    await res.revalidate(`/${coreAddress}/proposals/create`)
    if (typeof proposalId === 'string') {
      await res.revalidate(`/${coreAddress}/proposals/${proposalId}`)
    }

    return res.status(200).end()
  } catch (err) {
    console.error('Error revalidating', err)
    // If there was an error, Next.js will continue to show the last
    // successfully generated page.
    return res.status(500).end()
  }
}
