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
  TextInput,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'
import { processError, uploadNft, validateRequired } from '@dao-dao/utils'

import { Trans } from '../../../components/Trans'

// Form displayed when the user is uploading NFT metadata.
export const UploadNftMetadata: ActionComponent = ({
  fieldNamePrefix,
  errors,
}) => {
  const { t } = useTranslation()

  const { register, watch, setValue, trigger } = useFormContext()
  const collectionAddress = watch(fieldNamePrefix + 'collectionAddress')
  const watchMetadata = watch(fieldNamePrefix + 'metadata')

  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File>()

  const upload = async () => {
    if (!file) {
      toast.error(t('error.noImageSelected'))
      return
    }

    setUploading(true)
    try {
      const { metadataUrl, imageUrl } = await uploadNft(
        watchMetadata.name,
        watchMetadata.description,
        file
      )

      setValue(fieldNamePrefix + 'mintMsg.token_uri', metadataUrl)
      setValue(fieldNamePrefix + 'imageUrl', imageUrl)
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
              fieldName={fieldNamePrefix + 'metadata.name'}
              register={register}
              validation={[validateRequired]}
            />

            <InputErrorMessage error={errors?.metadata?.name} />
          </div>

          <div className="space-y-2">
            <InputLabel name={t('form.description')} />

            <TextInput
              error={errors?.metadata?.description}
              fieldName={fieldNamePrefix + 'metadata.description'}
              register={register}
            />

            <InputErrorMessage error={errors?.metadata?.description} />
          </div>
        </div>
      </div>

      <div className="mt-2 flex min-w-0 flex-col gap-x-6 gap-y-2 overflow-hidden sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 max-w-full space-y-1 overflow-hidden">
          <InputLabel name={t('form.collectionAddress')} />
          <CopyToClipboard
            className="w-full"
            takeAll
            value={collectionAddress}
          />
        </div>

        <Button
          className="self-end"
          disabled={!file}
          loading={uploading}
          onClick={async () => {
            // Manually validate just the instantiation fields.
            const valid = await trigger(fieldNamePrefix + 'metadata')
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
