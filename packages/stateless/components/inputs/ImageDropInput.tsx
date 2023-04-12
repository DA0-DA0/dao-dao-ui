import { CloudDownloadRounded, CloudUploadRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TransProps } from '@dao-dao/types'

import { FileDropInput, FileDropInputProps } from './FileDropInput'

export type ImageDropInputProps = Pick<
  FileDropInputProps,
  'onSelect' | 'className' | 'loading'
> & {
  Trans: ComponentType<TransProps>
}

export const ImageDropInput = ({
  onSelect: _onSelect,
  className,
  loading,
  Trans,
}: ImageDropInputProps) => {
  const { t } = useTranslation()

  const [imageData, setImageData] = useState<string>()
  const onSelect = (file: File) => {
    const url = URL.createObjectURL(file)
    setImageData(url)
    _onSelect(file, url)
  }

  return (
    <FileDropInput
      Icon={CloudUploadRounded}
      IconHover={CloudDownloadRounded}
      className={clsx(className, imageData && '!outline-solid')}
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
      hideText={!!imageData}
      loading={loading}
      onSelect={onSelect}
      style={imageData ? { backgroundImage: `url(${imageData})` } : undefined}
    />
  )
}
