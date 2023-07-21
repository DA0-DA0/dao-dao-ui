import { ComponentType, useState } from 'react'
import { FieldError, FieldValues, Path, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  Button,
  CopyToClipboard,
  ImageDropInput,
  InputErrorMessage,
  InputLabel,
  SwitchCard,
  TextInput,
} from '@dao-dao/stateless'
import { TransProps } from '@dao-dao/types'
import {
  processError,
  uploadNft,
  validateRequired,
  validateUrlWithIpfs,
} from '@dao-dao/utils'

export type UploadNftMetadataProps<
  FV extends FieldValues,
  FieldName extends Path<FV> = Path<FV>
> = {
  collectionAddress?: string
  nameFieldName: FieldName
  nameError?: FieldError
  descriptionFieldName: FieldName
  descriptionError?: FieldError
  audioFieldName: FieldName
  audioError?: FieldError
  videoFieldName: FieldName
  videoError?: FieldError
  onUpload: (metadataUrl: string, showingAdvanced: boolean) => void
  onToggleAdvanced?: (showingAdvanced: boolean) => void
  validateUpload?: () => Promise<boolean>
  Trans: ComponentType<TransProps>
}

export const UploadNftMetadata = <
  FV extends FieldValues,
  FieldName extends Path<FV> = Path<FV>
>({
  collectionAddress,
  nameFieldName,
  nameError,
  descriptionFieldName,
  descriptionError,
  audioFieldName,
  audioError,
  videoFieldName,
  videoError,
  onUpload,
  onToggleAdvanced,
  validateUpload,
  Trans,
}: UploadNftMetadataProps<FV, FieldName>) => {
  const { t } = useTranslation()

  const { watch, register } = useFormContext<FV>()
  const name = watch(nameFieldName)
  const description = watch(descriptionFieldName)
  const audio = watch(audioFieldName)
  const video = watch(videoFieldName)

  const [showAdvanced, setShowAdvanced] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File>()

  const upload = async () => {
    if (!file) {
      toast.error(t('error.noImageSelected'))
      return
    }

    setUploading(true)
    try {
      const extra =
        !showAdvanced || (!audio && !video)
          ? undefined
          : {
              properties: {
                ...(audio && {
                  audio,
                }),
                ...(video && {
                  video,
                }),
              },
            }

      const { metadataUrl } = await uploadNft(
        name,
        description,
        file,
        extra && JSON.stringify(extra)
      )

      onUpload(metadataUrl, showAdvanced)
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="max-w-prose">{t('form.nftUploadMetadataInstructions')}</p>

      <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
        <ImageDropInput
          Trans={Trans}
          className="aspect-square w-full shrink-0 sm:h-40 sm:w-40"
          onSelect={setFile}
        />

        <div className="flex grow flex-col gap-4">
          <div className="space-y-2">
            <InputLabel name={t('form.name')} />

            <TextInput
              error={nameError}
              fieldName={nameFieldName}
              register={register}
              validation={[validateRequired]}
            />

            <InputErrorMessage error={nameError} />
          </div>

          <div className="space-y-2">
            <InputLabel name={t('form.description')} />

            <TextInput
              error={descriptionError}
              fieldName={descriptionFieldName}
              register={register}
            />

            <InputErrorMessage error={descriptionError} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <SwitchCard
          containerClassName="self-start"
          enabled={showAdvanced}
          label={t('form.showAdvancedNftFields')}
          onClick={() => {
            setShowAdvanced((s) => !s)
            onToggleAdvanced?.(!showAdvanced)
          }}
          sizing="sm"
          tooltip={t('form.showAdvancedNftFieldsTooltip')}
          tooltipIconSize="sm"
        />

        {showAdvanced && (
          <div className="mt-2 space-y-4">
            <div className="space-y-1">
              <InputLabel name={t('form.audioUrl')} />

              <TextInput
                error={audioError}
                fieldName={audioFieldName}
                register={register}
                validation={[(v) => !v || validateUrlWithIpfs(v)]}
              />

              <InputErrorMessage error={audioError} />
            </div>

            <div className="space-y-1">
              <InputLabel name={t('form.videoUrl')} />

              <TextInput
                error={videoError}
                fieldName={videoFieldName}
                register={register}
                validation={[(v) => !v || validateUrlWithIpfs(v)]}
              />

              <InputErrorMessage error={videoError} />
            </div>
          </div>
        )}
      </div>

      <div className="mt-2 flex min-w-0 flex-col gap-x-6 gap-y-2 overflow-hidden sm:flex-row sm:items-end sm:justify-between">
        {collectionAddress && (
          <div className="min-w-0 max-w-full space-y-1 overflow-hidden">
            <InputLabel name={t('form.collectionAddress')} />
            <CopyToClipboard
              className="w-full"
              takeAll
              value={collectionAddress ?? ''}
            />
          </div>
        )}

        <Button
          className="self-end"
          disabled={!file}
          loading={uploading}
          onClick={async () => {
            if (!validateUpload || (await validateUpload())) {
              upload()
            }
          }}
          size="lg"
        >
          {t('button.upload')}
        </Button>
      </div>
    </div>
  )
}
