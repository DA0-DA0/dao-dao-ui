import imageCompression from 'browser-image-compression'
import { useRef, useState } from 'react'

import { ImageDropInput, ImageDropInputProps } from './ImageDropInput'

export type ImageUploadInputProps = Omit<
  ImageDropInputProps,
  'onSelect' | 'loading'
> & {
  onChange: (url: string, file: File) => void | Promise<void>
  onError?: (error: unknown) => void
}

export const ImageUploadInput = ({
  onChange,
  onError,
  ...props
}: ImageUploadInputProps) => {
  const [uploading, setUploading] = useState(false)
  const clearImageRef = useRef<() => void>(() => {})

  const uploadFile = async (file: File) => {
    setUploading(true)

    try {
      // Compress png/jpeg/webp image to be below 3MB.
      if (
        file.size > 3 * 1024 * 1024 &&
        ['image/png', 'image/jpeg', 'image/webp'].includes(file.type)
      ) {
        // The image compression library actually returns a Blob, so we need to
        // wrap it in a File so that its name and file extension are preserved.
        file = new File(
          [
            await imageCompression(file, {
              maxSizeMB: 3,
              useWebWorker: true,
            }),
          ],
          file.name,
          {
            type: file.type,
          }
        )
      }

      const form = new FormData()
      form.append('image', file)

      // Next.js API route.
      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: form,
      })

      if (!response.ok) {
        const fallback = `Failed to upload image. Status: ${response.status} ${response.statusText}`
        throw new Error(
          (await response.json().catch(() => ({ error: fallback })))?.error ||
            fallback
        )
      }

      const { cid } = await response.json()
      if (!cid) {
        throw new Error('Failed to upload image')
      }

      await onChange(`ipfs://${cid}`, file)
    } catch (err) {
      console.error(err)
      onError?.(err)
      clearImageRef.current()
    } finally {
      setUploading(false)
    }
  }

  return (
    <ImageDropInput
      clearImageRef={clearImageRef}
      loading={uploading}
      onSelect={uploadFile}
      {...props}
    />
  )
}
