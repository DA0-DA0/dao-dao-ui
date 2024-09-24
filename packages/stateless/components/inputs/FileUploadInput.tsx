import { CloudDownloadRounded, CloudUploadRounded } from '@mui/icons-material'
import { useState } from 'react'

import { FileDropInput, FileDropInputProps } from './FileDropInput'

export type FileUploadInputProps = Omit<
  FileDropInputProps,
  'onSelect' | 'loading'
> & {
  onChange: (url: string, file: File) => void | Promise<void>
  onError?: (error: unknown) => void
}

export const FileUploadInput = ({
  onChange,
  onError,
  ...props
}: FileUploadInputProps) => {
  const [uploading, setUploading] = useState(false)

  const uploadFile = async (file: File) => {
    setUploading(true)

    try {
      const form = new FormData()
      form.append('file', file)

      // Next.js API route.
      const response = await fetch('/api/uploadFile', {
        method: 'POST',
        body: form,
      })

      if (!response.ok) {
        const fallback = `Failed to upload file. Status: ${response.status} ${response.statusText}`
        throw new Error(
          (await response.json().catch(() => ({ error: fallback })))?.error ||
            fallback
        )
      }

      const { cid } = await response.json()
      if (!cid) {
        throw new Error('Failed to upload file')
      }

      onChange(`ipfs://${cid}`, file)
    } catch (err) {
      console.error(err)
      onError?.(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <FileDropInput
      Icon={CloudUploadRounded}
      IconHover={CloudDownloadRounded}
      loading={uploading}
      onSelect={uploadFile}
      {...props}
    />
  )
}
