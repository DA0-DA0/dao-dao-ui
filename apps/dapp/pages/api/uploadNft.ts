// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { promises as fs } from 'fs'

import { File, IncomingForm } from 'formidable'
import { NextApiRequest, NextApiResponse } from 'next'
import { Blob, NFTStorage } from 'nft.storage'

import { NFT_STORAGE_API_KEY } from '@dao-dao/utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get files from form.
  let name = ''
  let description = ''
  const parsedFiles = await new Promise<File[]>((resolve, reject) => {
    const form = new IncomingForm()

    const files: File[] = []
    form.on('file', function (_, file) {
      files.push(file)
    })
    form.on('field', (key, value) => {
      if (key === 'name') {
        name = value
      }
      if (key === 'description') {
        description = value
      }
    })

    form.on('end', () => resolve(files))
    form.on('error', (err) => reject(err))

    // Parse form.
    form.parse(req)
  })

  // Make sure there is only one file.
  if (parsedFiles.length === 0) {
    return res.status(400).json({ error: 'No files found.' })
  } else if (parsedFiles.length > 1) {
    return res.status(400).json({ error: 'Too many files found.' })
  }

  const parsedFile = parsedFiles[0]

  // Makes sure file is an image.
  if (!parsedFile.mimetype?.startsWith('image')) {
    return res.status(400).json({ error: 'Only images are supported.' })
  }

  // Make sure name is not empty.
  if (!name?.trim()) {
    return res.status(400).json({ error: 'Name cannot be empty.' })
  }

  const imageData = await fs.readFile(parsedFile.filepath)

  // Upload.
  const client = new NFTStorage({
    token: NFT_STORAGE_API_KEY,
  })
  const metadata = await client.store({
    name,
    description,
    image: new Blob([imageData], { type: parsedFile.mimetype ?? undefined }),
  })

  return res.status(200).json({
    metadataUrl: metadata.url,
    imageUrl: metadata.embed().image.toString(),
  })
}

// Disable default body parser.
export const config = {
  api: {
    bodyParser: false,
  },
}
