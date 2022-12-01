import clsx from 'clsx'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { transformIpfsUrlToHttpsIfNecessary } from '@dao-dao/utils'

import { Button } from '../buttons/Button'
import { Loader } from '../logo'

export interface ImageUploadInputProps {
  url?: string
  onChange: (url?: string) => void | Promise<void>
  className?: string
}

export const ImageUploadInput = ({
  url,
  onChange,
  className,
}: ImageUploadInputProps) => {
  const { t } = useTranslation()

  const [uploading, setUploading] = useState(false)
  const [dragHovering, setDragHovering] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File) => {
    setUploading(true)

    try {
      const form = new FormData()
      form.append('image', file)
      // Next.js API route.
      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: form,
      })
      const { cid } = await response.json()
      onChange(transformIpfsUrlToHttpsIfNecessary(`ipfs://${cid}`))
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div
      className={clsx(
        'flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-border-primary bg-cover bg-center p-6',
        url || dragHovering ? 'border-solid' : 'border-dashed',
        className
      )}
      onClick={() => inputRef.current?.click()}
      onDragEnter={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragHovering(true)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragHovering(false)
      }}
      onDragOver={
        // Prevent default behavior which is stopping drop event from firing. We
        // want to allow dropping.
        (e) => {
          e.preventDefault()
          e.stopPropagation()
        }
      }
      onDrop={(e) => {
        // Prevent default behavior which is to open the file in the browser.
        e.preventDefault()
        e.stopPropagation()

        setDragHovering(false)

        // Upload file if exists.
        const file = e.dataTransfer.files?.[0]
        if (file) {
          uploadFile(file)
        }
      }}
      style={url ? { backgroundImage: `url(${url})` } : undefined}
    >
      <input
        className="hidden"
        onChange={(e) => {
          // Upload file if exists.
          const file = e.target.files?.[0]
          if (file) {
            uploadFile(file)
          }
        }}
        ref={inputRef}
        type="file"
      />

      {url ? (
        uploading && (
          <div className="flex flex-col items-center rounded-lg bg-background-overlay p-4">
            <Loader size={24} />
          </div>
        )
      ) : (
        <div
          className={clsx(
            'flex flex-col items-center gap-2 rounded-lg p-4 transition',
            url && 'bg-background-overlay'
          )}
        >
          <p className="secondary-text">
            {dragHovering ? t('form.dropImageHere') : t('form.dragImageHere')}
          </p>
          <Button
            loading={uploading}
            onClick={() => inputRef.current?.click()}
            variant="secondary"
          >
            {t('button.chooseImage')}
          </Button>
        </div>
      )}
    </div>
  )
}
