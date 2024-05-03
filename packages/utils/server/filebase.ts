import { S3 } from 'aws-sdk'

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
  data: S3.Body,
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
    apiVersion: '2006-03-01',
    accessKeyId: FILEBASE_ACCESS_KEY_ID,
    secretAccessKey: FILEBASE_SECRET_ACCESS_KEY,
    endpoint: 'https://s3.filebase.com',
    region: 'us-east-1',
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  })

  return await new Promise<string>((resolve, reject) => {
    const request = client.putObject({
      Bucket: FILEBASE_BUCKET,
      Key: path,
      ContentType: contentType,
      Body: data,
      ACL: 'public-read',
    })

    // Listen for CID.
    request.on('httpHeaders', (_, headers) => {
      const cid = headers['x-amz-meta-cid']
      if (!cid) {
        reject(new Error('No CID found.'))
      }

      resolve(cid)
    })

    request.on('error', (err) => {
      reject(err)
    })

    request.send()
  })
}
