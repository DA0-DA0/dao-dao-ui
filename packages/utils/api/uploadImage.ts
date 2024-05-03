import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

import { parseForm, uploadToFilebase } from '../server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Parse image from form.
    const { imageData, imageExtension, mimetype } = await parseForm(req, {
      requireImage: true,
    })
    // Type-check. Parser should throw error if no image is found.
    if (!imageData || !imageExtension) {
      throw new Error('No image found.')
    }

    const cid = await uploadToFilebase(
      imageData,
      `${uuidv4()}.${imageExtension}`,
      mimetype
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

// Disable default body parser since Formidable parses for us.
export const config = {
  api: {
    bodyParser: false,
  },
}
