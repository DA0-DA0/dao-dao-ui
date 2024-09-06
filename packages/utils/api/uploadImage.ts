import { nanoid } from 'nanoid'
import { NextApiRequest, NextApiResponse } from 'next'

import { parseForm, uploadToFilebase } from '../server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Parse image from form.
    const {
      fileData: imageData,
      fileExtension: imageExtension,
      mimetype,
    } = await parseForm(req, {
      requireFile: true,
      allowedFiletype: 'image',
    })
    // Type-check. Parser should throw error if no image is found.
    if (!imageData || !imageExtension) {
      throw new Error('No image found.')
    }

    const cid = await uploadToFilebase(
      imageData,
      `${nanoid()}.${imageExtension}`,
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
