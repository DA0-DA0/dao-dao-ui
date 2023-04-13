import { CloudDownloadRounded, CloudUploadRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TransProps } from '@dao-dao/types'

import { FileDropInput, FileDropInputProps } from './FileDropInput'

export type ImageDropInputProps = Pick<
  FileDropInputProps,
  'onSelect' | 'className' | 'loading'
> & {
  currentImage?: string
  Trans: ComponentType<TransProps>
}

export const ImageDropInput = ({
  onSelect: _onSelect,
  className,
  loading,
  currentImage,
  Trans,
}: ImageDropInputProps) => {
  const { t } = useTranslation()

  const [image, setImage] = useState<string | undefined>(currentImage)
  const onSelect = (file: File) => {
    const url = URL.createObjectURL(file)
    setImage(url)
    _onSelect(file, url)
  }

  // If passed in image changes, update the image.
  useEffect(() => {
    if (currentImage) {
      setImage(currentImage)
    }
  }, [currentImage])

  return (
    <FileDropInput
      Icon={CloudUploadRounded}
      IconHover={CloudDownloadRounded}
      className={clsx(className, image && '!outline-solid')}
      dragHereOrSelect={
        <Trans i18nKey="form.dragImageHereOrClick">
          Drag image here or{' '}
          <span className="pointer-events-auto underline transition-opacity hover:opacity-80 active:opacity-70">
            click
          </span>{' '}
          to select one.
        </Trans>
      }
      dropHereText={t('form.dropImageHere')}
      hideText={!!image}
      loading={loading}
      onSelect={onSelect}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    />
  )
}
