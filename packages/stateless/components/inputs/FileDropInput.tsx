import { Download, DownloadDone } from '@mui/icons-material'
import clsx from 'clsx'
import {
  CSSProperties,
  ComponentType,
  ReactNode,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

import { TransProps } from '@dao-dao/types'

import { Loader } from '../logo/Loader'

export type FileDropInputProps = {
  onSelect: (file: File) => void | Promise<void>
  Icon?: ComponentType<{ className: string }>
  IconHover?: ComponentType<{ className: string }>
  dropHereText?: string
  dragHereOrSelect?: ReactNode
  Trans?: ComponentType<TransProps>
  className?: string
  style?: CSSProperties
  loading?: boolean
  hideText?: boolean
}

export const FileDropInput = ({
  onSelect,
  Icon = Download,
  IconHover = DownloadDone,
  dropHereText,
  dragHereOrSelect,
  Trans,
  className,
  style,
  loading,
  hideText,
}: FileDropInputProps) => {
  const { t } = useTranslation()

  const [dragHovering, setDragHovering] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className={clsx(
        'flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-cover bg-center p-6 outline outline-border-primary',
        dragHovering ? 'outline-solid' : 'outline-dashed',
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
          onSelect(file)
        }
      }}
      style={style}
    >
      <input
        className="hidden"
        onChange={(e) => {
          // Select file if exists, and then unselect so another file can be
          // selected.
          const file = e.target.files?.[0]
          if (file) {
            onSelect(file)

            // Unselect file.
            e.target.value = ''
          }
        }}
        onClick={(e) => {
          // Don't click on parent which also opens file dialog.
          e.stopPropagation()
        }}
        ref={inputRef}
        type="file"
      />

      {loading ? (
        <div className="pointer-events-none flex flex-col items-center rounded-lg bg-background-overlay p-4">
          <Loader size={24} />
        </div>
      ) : (
        !hideText && (
          <div className="pointer-events-none flex flex-col items-center gap-2 rounded-lg p-2 transition">
            {dragHovering ? (
              <IconHover className="!h-10 !w-10" />
            ) : (
              <Icon className="!h-10 !w-10" />
            )}

            <p className="secondary-text text-center">
              {dragHovering
                ? dropHereText || t('form.dropFileHere')
                : dragHereOrSelect ||
                  (Trans && (
                    <Trans i18nKey="form.dragFileHereOrClick">
                      Drag file here or{' '}
                      <span className="pointer-events-auto underline transition-opacity hover:opacity-80 active:opacity-70">
                        click
                      </span>{' '}
                      to select one.
                    </Trans>
                  ))}
            </p>
          </div>
        )
      )}
    </div>
  )
}
