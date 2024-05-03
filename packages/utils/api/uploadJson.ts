import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

import { uploadToFilebase } from '../server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (typeof req.body !== 'object' || req.body === null) {
      return res.status(400).json({
        error: 'Invalid request body.',
      })
    }

    const cid = await uploadToFilebase(
      JSON.stringify(req.body, null, 2),
      `${uuidv4()}.json`,
      'application/json'
    )

    return res.status(200).json({
      cid,
    })
  } catch (err) {
    return res
      .status(400)
      .json({ error: err instanceof Error ? err.message : err })
  }
}
