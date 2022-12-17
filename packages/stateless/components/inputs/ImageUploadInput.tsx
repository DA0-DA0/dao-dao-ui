import { useState } from 'react'

import { transformIpfsUrlToHttpsIfNecessary, uploadImage } from '@dao-dao/utils'

import { ImageDropInput, ImageDropInputProps } from './ImageDropInput'

export type ImageUploadInputProps = Omit<
  ImageDropInputProps,
  'onSelect' | 'loading'
> & {
  onChange: (url: string) => void | Promise<void>
}

export const ImageUploadInput = ({
  onChange,
  ...props
}: ImageUploadInputProps) => {
  const [uploading, setUploading] = useState(false)

  const uploadFile = async (file: File) => {
    setUploading(true)

    try {
      const cid = await uploadImage(file)
      onChange(transformIpfsUrlToHttpsIfNecessary(`ipfs://${cid}`))
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return <ImageDropInput loading={uploading} onSelect={uploadFile} {...props} />
}
