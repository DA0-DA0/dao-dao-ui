// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { NextApiRequest, NextApiResponse } from 'next'

import { SYNAPS_API_KEY, SYNAPS_CLIENT_ID } from '@dao-dao/utils'

type Data = {
  sessionId: string
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!SYNAPS_CLIENT_ID || !SYNAPS_API_KEY) {
    return res.status(500).end()
  }

  // TODO(checkmark): See if address already exists?

  const response = await fetch(
    'https://individual-api.synaps.io/v3/session/init',
    {
      method: 'POST',
      headers: {
        'Client-Id': SYNAPS_CLIENT_ID,
        'Api-Key': SYNAPS_API_KEY,
      },
    }
  )
  if (response.ok) {
    const { session_id } = await response.json()
    return res.status(200).json({
      sessionId: session_id,
    })
  }

  return res.status(500).end()
}
