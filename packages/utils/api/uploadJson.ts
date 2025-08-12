import { nanoid } from 'nanoid'
import { NextApiRequest, NextApiResponse } from 'next'

import { uploadToFilebase } from '../server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (typeof req.body !== 'object' || req.body === null) {
      throw new Error('Invalid request body.')
    }

    const cid = await uploadToFilebase(
      JSON.stringify(req.body, null, 2),
      `${nanoid()}.json`,
      'application/json'
    )

    res.status(200).json({
      cid,
    })
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : err })
  }
}
