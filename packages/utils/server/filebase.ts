import { PutObjectCommand, S3 } from '@aws-sdk/client-s3'
import { StreamingBlobPayloadInputTypes } from '@smithy/types'

import {
  FILEBASE_ACCESS_KEY_ID,
  FILEBASE_BUCKET,
  FILEBASE_SECRET_ACCESS_KEY,
} from '../constants'

/**
 * Upload data to Filebase and return the IPFS CID.
 *
 * https://docs.filebase.com/getting-started/developer-quick-start-guide
 */
export const uploadToFilebase = async (
  /**
   * Data to upload.
   */
  data: StreamingBlobPayloadInputTypes,
  /**
   * File path.
   */
  path: string,
  /**
   * Optional content type.
   */
  contentType?: string
  /**
   * Optional subfolder.
   */
): Promise<string> => {
  const client = new S3({
    credentials: {
      accessKeyId: FILEBASE_ACCESS_KEY_ID,
      secretAccessKey: FILEBASE_SECRET_ACCESS_KEY,
    },
    endpoint: 'https://s3.filebase.com',
    region: 'us-east-1',
    forcePathStyle: true,
  })

  return await new Promise<string>(async (resolve, reject) => {
    // https://docs.filebase.com/code-development-+-sdks/sdk-examples-pinning-files-and-folders-to-ipfs/aws-sdk-for-javascript#aws-sdk-v3

    const command = new PutObjectCommand({
      Bucket: FILEBASE_BUCKET,
      Key: path,
      ContentType: contentType,
      Body: data,
      ACL: 'public-read',
    })

    command.middlewareStack.add(
      (next) => async (args) => {
        // Check if request is incoming as middleware works both ways
        const response = await next(args)
        if (!(response.response as any).statusCode) return response

        // Get cid from headers
        const cid = (response.response as any).headers['x-amz-meta-cid']
        if (cid) {
          resolve(cid)
        } else {
          reject(new Error('No CID found.'))
        }

        return response
      },
      {
        step: 'build',
        name: 'addCidToOutput',
      }
    )

    try {
      await client.send(command)
    } catch (err) {
      reject(err)
    }
  })
}
