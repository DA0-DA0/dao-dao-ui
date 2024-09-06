import { nanoid } from 'nanoid'
import { NextApiRequest, NextApiResponse } from 'next'

import { parseForm, uploadToFilebase } from '../server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Parse file from form.
    const { fileData, fileExtension, mimetype } = await parseForm(req, {
      requireFile: true,
    })
    // Type-check. Parser should throw error if no file is found.
    if (!fileData || !fileExtension) {
      throw new Error('No file found.')
    }

    const cid = await uploadToFilebase(
      fileData,
      `${nanoid()}.${fileExtension}`,
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
