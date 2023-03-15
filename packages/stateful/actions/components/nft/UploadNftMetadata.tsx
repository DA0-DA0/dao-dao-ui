import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
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
import { ActionComponent } from '@dao-dao/types'
import {
  processError,
  uploadNft,
  validateRequired,
  validateUrlWithIpfs,
} from '@dao-dao/utils'

import { Trans } from '../../../components/Trans'
import { MintNftData } from './types'

// Form displayed when the user is uploading NFT metadata.
export const UploadNftMetadata: ActionComponent = ({
  fieldNamePrefix,
  errors,
}) => {
  const { t } = useTranslation()

  const { register, watch, setValue, trigger } = useFormContext<MintNftData>()

  const collectionAddress = watch(
    (fieldNamePrefix + 'collectionAddress') as 'collectionAddress'
  )
  const metadata = watch((fieldNamePrefix + 'metadata') as 'metadata')

  const [showAdvanced, setShowAdvanced] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File>()

  const upload = async () => {
    if (!file) {
      toast.error(t('error.noImageSelected'))
      return
    }
    if (!metadata) {
      toast.error(t('error.loadingData'))
      return
    }

    setUploading(true)
    try {
      const extra =
        !showAdvanced || (!metadata.audio && !metadata.video)
          ? undefined
          : {
              properties:
                metadata.audio || metadata.video
                  ? {
                      // Override properties with audio and video if specified.
                      ...(metadata.audio && {
                        audio: metadata.audio,
                      }),
                      ...(metadata.video && {
                        video: metadata.video,
                      }),
                    }
                  : undefined,
            }

      const { metadataUrl, imageUrl } = await uploadNft(
        metadata.name,
        metadata.description,
        file,
        extra && JSON.stringify(extra)
      )

      setValue(
        (fieldNamePrefix + 'mintMsg.token_uri') as 'mintMsg.token_uri',
        metadataUrl
      )
      setValue((fieldNamePrefix + 'imageUrl') as 'imageUrl', imageUrl)
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
              error={errors?.metadata?.name}
              fieldName={(fieldNamePrefix + 'metadata.name') as 'metadata.name'}
              register={register}
              validation={[validateRequired]}
            />

            <InputErrorMessage error={errors?.metadata?.name} />
          </div>

          <div className="space-y-2">
            <InputLabel name={t('form.description')} />

            <TextInput
              error={errors?.metadata?.description}
              fieldName={
                (fieldNamePrefix +
                  'metadata.description') as 'metadata.description'
              }
              register={register}
            />

            <InputErrorMessage error={errors?.metadata?.description} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <SwitchCard
          containerClassName="self-start"
          enabled={showAdvanced}
          label={t('form.showAdvancedNftFields')}
          onClick={() => setShowAdvanced((s) => !s)}
          sizing="sm"
          tooltip={t('form.showAdvancedNftFieldsTooltip')}
          tooltipIconSize="sm"
        />

        {showAdvanced && (
          <div className="mt-2 space-y-4">
            <div className="space-y-1">
              <InputLabel name={t('form.audioUrl')} />

              <TextInput
                error={errors?.metadata?.audio}
                fieldName={
                  (fieldNamePrefix + 'metadata.audio') as 'metadata.audio'
                }
                register={register}
                validation={[(v) => !v || validateUrlWithIpfs(v)]}
              />

              <InputErrorMessage error={errors?.metadata?.audio} />
            </div>

            <div className="space-y-1">
              <InputLabel name={t('form.videoUrl')} />

              <TextInput
                error={errors?.metadata?.video}
                fieldName={
                  (fieldNamePrefix + 'metadata.video') as 'metadata.video'
                }
                register={register}
                validation={[(v) => !v || validateUrlWithIpfs(v)]}
              />

              <InputErrorMessage error={errors?.metadata?.video} />
            </div>
          </div>
        )}
      </div>

      <div className="mt-2 flex min-w-0 flex-col gap-x-6 gap-y-2 overflow-hidden sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 max-w-full space-y-1 overflow-hidden">
          <InputLabel name={t('form.collectionAddress')} />
          <CopyToClipboard
            className="w-full"
            takeAll
            value={collectionAddress ?? ''}
          />
        </div>

        <Button
          className="self-end"
          disabled={!file}
          loading={uploading}
          onClick={async () => {
            // Manually validate just the metadata fields we will upload.
            const valid = await trigger(
              (fieldNamePrefix + 'metadata') as 'metadata'
            )
            valid && upload()
          }}
          size="lg"
        >
          {t('button.upload')}
        </Button>
      </div>
    </div>
  )
}
