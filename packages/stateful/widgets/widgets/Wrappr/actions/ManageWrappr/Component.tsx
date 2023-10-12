import { ArrowBackIosRounded } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Trans, useTranslation } from 'react-i18next'

import {
  Button,
  ImageDropInput,
  InputErrorMessage,
  InputLabel,
  Loader,
  SelectInput,
  SwitchCard,
  TextAreaInput,
  TextInput,
} from '@dao-dao/stateless'
import { ActionComponent, ActionKey, LoadingData } from '@dao-dao/types'
import {
  processError,
  transformIpfsUrlToHttpsIfNecessary,
  uploadNft,
  validateRequired,
} from '@dao-dao/utils'

import { WrapprMarkdown } from '../../components/WrapprMarkdown'
import { Wrappr } from '../../types'

export type ManageWrapprData = {
  updateId?: string
  tokenId: string
  tokenUri: string
  // Used while creating, uploaded to IPFS.
  uploaded: boolean
  data?: {
    title: string
    description: string
    content: string
  }
}

type ManageWrapprOptions = {
  wrapprLoading: LoadingData<Wrappr | undefined>
  wrapprsLoading: LoadingData<Wrappr[]>
}

export const ManageWrapprComponent: ActionComponent<ManageWrapprOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { wrapprLoading, wrapprsLoading },
  addAction,
  allActionsWithData,
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext<ManageWrapprData>()

  const uploaded = watch((fieldNamePrefix + 'uploaded') as 'uploaded')
  const data = watch((fieldNamePrefix + 'data') as 'data')

  const [image, setImage] = useState<File>()
  const [imageUrl, setImageUrl] = useState<string>()
  const [showPreview, setShowPreview] = useState(false)
  const [uploading, setUploading] = useState(false)

  const updateId = watch((fieldNamePrefix + 'updateId') as 'updateId')
  const updatingWrappr = wrapprsLoading.loading
    ? undefined
    : wrapprsLoading.data.find(({ id }) => id === updateId)
  // When updatingWrappr changes, update form values.
  useEffect(() => {
    if (updatingWrappr) {
      setValue((fieldNamePrefix + 'data') as 'data', {
        title: updatingWrappr.title,
        description: updatingWrappr.description || '',
        content: updatingWrappr.content,
      })
      setImageUrl(updatingWrappr.image)
      setImage(undefined)
    }
  }, [fieldNamePrefix, setValue, updatingWrappr])

  // If updateId is undefined and wrapprs finish loading, set to first wrappr.
  useEffect(() => {
    if (!updateId && !wrapprsLoading.loading && wrapprsLoading.data.length > 0) {
      setValue(
        (fieldNamePrefix + 'updateId') as 'updateId',
        wrapprsLoading.data[0].id
      )
    }
  }, [fieldNamePrefix, wrapprsLoading, setValue, updateId])

  const upload = async () => {
    if (!data || !updatingWrappr) {
      toast.error(t('error.loadingData'))
      return
    }

    setUploading(true)
    try {
      const now = new Date()
      const { cid, metadataUrl } = await uploadNft(
        data.title,
        data.description,
        image,
        JSON.stringify({
          // If no image but imageUrl, set image to existing imageUrl.
          ...(imageUrl &&
            !image && {
              image: imageUrl,
            }),

          properties: {
            content: data.content,
            created: now.toISOString(),
            pastVersions: [
              ...updatingWrappr.pastVersions,
              {
                id: updatingWrappr.id,
                created: updatingWrappr.created.toISOString(),
              },
            ],
          },
        })
      )

      setValue((fieldNamePrefix + 'tokenId') as 'tokenId', cid)
      setValue((fieldNamePrefix + 'tokenUri') as 'tokenUri', metadataUrl)
      setValue((fieldNamePrefix + 'uploaded') as 'uploaded', true)

      // Add action to delete old wrappr if does not already exist.
      if (
        !allActionsWithData.some(
          ({ actionKey, data }) =>
            actionKey === ActionKey.DeleteWrappr && data.id === updatingWrappr.id
        )
      ) {
        addAction?.({
          actionKey: ActionKey.DeleteWrappr,
          data: {
            id: updatingWrappr.id,
          },
        })
      }
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setUploading(false)
    }
  }

  const continueEditing = () => {
    setValue((fieldNamePrefix + 'tokenId') as 'tokenId', '')
    setValue((fieldNamePrefix + 'tokenUri') as 'tokenUri', '')
    setValue((fieldNamePrefix + 'uploaded') as 'uploaded', false)
  }

  const now = new Date()

  return isCreating && !uploaded ? (
    <>
      <div className="flex flex-col gap-2">
        <InputLabel name={t('form.wrapprToManage')} />
        <SelectInput
          error={errors?.updateId}
          fieldName={(fieldNamePrefix + 'updateId') as 'updateId'}
          register={register}
          validation={[validateRequired]}
        >
          {!wrapprsLoading.loading &&
            wrapprsLoading.data.map(({ id, title }) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
        </SelectInput>
        <InputErrorMessage error={errors?.updateId} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      
      </div>
      <div className="flex flex-col gap-1">

      </div>
      <div className="flex flex-row items-end justify-between">
        <SwitchCard
          enabled={showPreview}
          label={t('title.preview')}
          onClick={() => setShowPreview((s) => !s)}
          sizing="sm"
        />

        <Button loading={uploading} onClick={upload} variant="primary">
          {t('button.save')}
        </Button>
      </div>

      {showPreview && (
        <div className="mt-6 rounded-md border border-dashed border-border-primary p-20">
          <WrapprMarkdown
            wrappr={{
              id: 'new',
              title: data?.title ?? '',
              content: data?.content ?? '',
              image: imageUrl,
              created: now,
              pastVersions: [],
              initiallyCreated: now,
            }}
          />
        </div>
      )}
    </>
  ) : wrapprLoading.loading || !wrapprLoading.data ? (
    <Loader />
  ) : (
    <>
      {isCreating && (
        <Button
          className="self-start"
          onClick={continueEditing}
          variant="secondary"
        >
          <ArrowBackIosRounded className="!h-4 !w-4" />
          {t('button.continueEditing')}
        </Button>
      )}

      <WrapprMarkdown wrappr={wrapprLoading.data} />
    </>
  )
}
