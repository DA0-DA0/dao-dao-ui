import { CloudDownloadRounded, CloudUploadRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TransProps } from '@dao-dao/types'

import { Loader } from '../logo'

export interface ImageDropInputProps {
  onSelect: (file: File) => void | Promise<void>
  className?: string
  loading?: boolean
  Trans: ComponentType<TransProps>
}

export const ImageDropInput = ({
  onSelect,
  className,
  loading,
  Trans,
}: ImageDropInputProps) => {
  const { t } = useTranslation()

  const [dragHovering, setDragHovering] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const [imageData, setImageData] = useState<string>()
  const selectFile = (file: File) => {
    setImageData(URL.createObjectURL(file))
    onSelect(file)
  }

  return (
    <div
      className={clsx(
        'flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-cover bg-center p-6 outline outline-border-primary',
        imageData || dragHovering ? 'outline-solid' : 'outline-dashed',
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

        // Select file if exists.
        const file = e.dataTransfer.files?.[0]
        if (file) {
          selectFile(file)
        }
      }}
      style={imageData ? { backgroundImage: `url(${imageData})` } : undefined}
    >
      <input
        className="hidden"
        onChange={(e) => {
          // Select file if exists.
          const file = e.target.files?.[0]
          if (file) {
            selectFile(file)
          }
        }}
        onClick={(e) => {
          // Don't click on parent which also opens file dialog.
          e.stopPropagation()
        }}
        ref={inputRef}
        type="file"
      />

      {imageData ? (
        loading && (
          <div className="pointer-events-none flex flex-col items-center rounded-lg bg-background-overlay p-4">
            <Loader size={24} />
          </div>
        )
      ) : (
        <div className="pointer-events-none flex flex-col items-center gap-2 rounded-lg p-2 transition">
          {dragHovering ? (
            <CloudDownloadRounded className="!h-10 !w-10" />
          ) : (
            <CloudUploadRounded className="!h-10 !w-10" />
          )}

          <p className="secondary-text text-center">
            {dragHovering ? (
              t('form.dropImageHere')
            ) : (
              <Trans i18nKey="form.dragImageHereOrClick">
                Drag image here or{' '}
                <span className="pointer-events-auto underline transition-opacity hover:opacity-80 active:opacity-70">
                  click
                </span>{' '}
                to select one.
              </Trans>
            )}
          </p>
        </div>
      )}
    </div>
  )
}
