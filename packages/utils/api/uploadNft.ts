import JSON5 from 'json5'
import { NextApiRequest, NextApiResponse } from 'next'
import { Blob, NFTStorage } from 'nft.storage'
import { TokenInput } from 'nft.storage/dist/src/lib/interface'

import { NFT_STORAGE_API_KEY } from '../constants'
import { parseForm } from '../server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Parse form fields and image.
    const {
      fields: { name, description = '', extra: _extra },
      imageData,
      mimetype,
    } = await parseForm(req, {
      requireImage: false,
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

    // Upload to IPFS via NFT.Storage's API: https://nft.storage/docs/. This
    // automatically uploads the image and creates/uploads a metadata.json file
    // conforming to the ERC-1155 NFT standard.
    const client = new NFTStorage({
      token: NFT_STORAGE_API_KEY,
    })

    let cid: string
    let metadataUrl: string
    let imageUrl: string | undefined

    const metadata = {
      ...extra,

      // Ensure name, description, and image are set (overriding extra).
      name,
      // In case description is empty, use extra.description if present.
      description: description || extra.description || '',

      // Add image if present.
      ...(imageData && {
        image: new Blob([imageData], { type: mimetype }),
      }),
    }
    // If image exists, upload it with metadata. Otherwise, manually upload
    // metadata only.
    if (metadata.image) {
      const storedMetadata = await client.store(metadata as TokenInput)
      cid = storedMetadata.ipnft
      metadataUrl = storedMetadata.url
      imageUrl = storedMetadata.embed().image.toString()
    } else {
      const metadataJsonFilename = 'metadata.json'
      cid = await client.storeDirectory([
        new File([JSON.stringify(metadata, null, 2)], metadataJsonFilename),
      ])
      metadataUrl = `ipfs://${cid}/${metadataJsonFilename}`
    }

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
