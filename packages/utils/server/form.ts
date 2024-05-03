import { promises as fs } from 'fs'

import { Fields, File, Files, IncomingForm } from 'formidable'
import { NextApiRequest } from 'next'

// Returns contents of form from a Next.js API route request.
export const parseForm = async (
  req: NextApiRequest,
  {
    requireImage = false,
    /**
     * Limit the maximum size of the uploaded image in megabytes. Defaults to 3.
     */
    maxFileSizeMb = 3,
  } = {}
): Promise<{
  fields: Record<string, string | undefined>
  imageData: Buffer | undefined
  imageExtension: string | undefined
  mimetype: string | undefined
}> => {
  // Get fields and files from form.
  const { fields: _fields, files: _files } = await new Promise<{
    fields: Fields
    files: Files
  }>((resolve, reject) => {
    new IncomingForm({
      maxFileSize: maxFileSizeMb * 1024 * 1024,
    }).parse(req, (err, fields, files) => {
      if (err) {
        if (
          err instanceof Error &&
          err.message.includes('options.maxFileSize')
        ) {
          reject(
            new Error(
              `Your file is too large. The maximum size is ${maxFileSizeMb} MB.`
            )
          )
        } else {
          reject(err)
        }
      } else {
        resolve({ fields, files })
      }
    })
  })

  // Flatten files since a value in this object may be an array of files.
  const files = Object.values(_files).flat()

  // Make sure there is only one file, or optionally none if not required.
  if (requireImage && files.length === 0) {
    throw new Error('No files found.')
  } else if (files.length > 1) {
    throw new Error('Too many files found.')
  }

  const file: File | undefined = files[0]

  // Makes sure file is an image.
  if (file && !file.mimetype?.startsWith('image')) {
    throw new Error('Only images are supported.')
  }

  // Select only string fields.
  const fields = Object.entries(_fields).reduce((acc, [key, value]) => {
    if (typeof value === 'string') {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, string>)
  // Read image data from temporarily uploaded location.
  const imageData = file ? await fs.readFile(file.filepath) : undefined

  return {
    fields,
    imageData,
    imageExtension: file?.originalFilename?.includes('.')
      ? file.originalFilename.split('.').slice(-1)[0]
      : undefined,
    mimetype: file?.mimetype ?? undefined,
  }
}
