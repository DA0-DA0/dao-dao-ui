import JSON5 from 'json5'
import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

import { parseForm, uploadToFilebase } from '../server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Parse form fields and image.
    const {
      fields: { name, description = '', extra: _extra },
      fileData: imageData,
      fileExtension: imageExtension,
      mimetype,
    } = await parseForm(req, {
      requireFile: false,
      allowedFiletype: 'image',
    })

    // Make sure name is not empty.
    if (!name?.trim()) {
      return res.status(400).json({ error: 'Name cannot be empty.' })
    }

    // Parse additional metadata if present.
    let extra: Record<string, any> = {}
    if (_extra) {
      try {
        extra = JSON5.parse(_extra)
      } catch (err) {
        return res.status(400).json({ error: 'Invalid extra metadata.' })
      }
    }

    // Ensure image has extension if exists.
    if (imageData && !imageExtension) {
      return res.status(400).json({ error: 'No image extension found.' })
    }

    const folder = uuidv4()

    const imageCid = imageData
      ? await uploadToFilebase(
          imageData,
          `${folder}/image.${imageExtension}`,
          mimetype
        )
      : undefined

    const metadata = {
      ...extra,

      // Ensure name, description, and image are set (overriding extra).
      name,
      // In case description is empty, use extra.description if present.
      description: description || extra.description || '',

      // Add image if present.
      ...(imageCid && { image: `ipfs://${imageCid}` }),
    }

    const cid = await uploadToFilebase(
      JSON.stringify(metadata, null, 2),
      `${folder}/metadata.json`,
      'application/json'
    )
    const metadataUrl = `ipfs://${cid}`
    const imageUrl = metadata.image

    return res.status(200).json({
      cid,
      metadataUrl,
      imageUrl,
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
