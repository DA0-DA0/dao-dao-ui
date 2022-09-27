// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (typeof req.query.url !== 'string') {
    return res.status(400)
  }

  const url = decodeURIComponent(req.query.url)
  const result = await axios.get(url, { responseType: 'stream' })
  result.data.pipe(res)
}
