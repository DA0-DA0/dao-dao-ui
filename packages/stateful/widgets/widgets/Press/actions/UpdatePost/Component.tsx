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

import { PostMarkdown } from '../../components/PostMarkdown'
import { Post } from '../../types'

export type UpdatePostData = {
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

type UpdatePostOptions = {
  postLoading: LoadingData<Post | undefined>
  postsLoading: LoadingData<Post[]>
}

export const UpdatePostComponent: ActionComponent<UpdatePostOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { postLoading, postsLoading },
  addAction,
  allActionsWithData,
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext<UpdatePostData>()

  const uploaded = watch((fieldNamePrefix + 'uploaded') as 'uploaded')
  const data = watch((fieldNamePrefix + 'data') as 'data')

  const [image, setImage] = useState<File>()
  const [imageUrl, setImageUrl] = useState<string>()
  const [showPreview, setShowPreview] = useState(false)
  const [uploading, setUploading] = useState(false)

  const updateId = watch((fieldNamePrefix + 'updateId') as 'updateId')
  const updatingPost = postsLoading.loading
    ? undefined
    : postsLoading.data.find(({ id }) => id === updateId)
  // When updatingPost changes, update form values.
  useEffect(() => {
    if (updatingPost) {
      setValue((fieldNamePrefix + 'data') as 'data', {
        title: updatingPost.title,
        description: updatingPost.description || '',
        content: updatingPost.content,
      })
      setImageUrl(updatingPost.image)
      setImage(undefined)
    }
  }, [fieldNamePrefix, setValue, updatingPost])

  // If updateId is undefined and posts finish loading, set to first post.
  useEffect(() => {
    if (!updateId && !postsLoading.loading && postsLoading.data.length > 0) {
      setValue(
        (fieldNamePrefix + 'updateId') as 'updateId',
        postsLoading.data[0].id
      )
    }
  }, [fieldNamePrefix, postsLoading, setValue, updateId])

  const upload = async () => {
    if (!data || !updatingPost) {
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
              ...updatingPost.pastVersions,
              {
                id: updatingPost.id,
                created: updatingPost.created.toISOString(),
              },
            ],
          },
        })
      )

      setValue((fieldNamePrefix + 'tokenId') as 'tokenId', cid)
      setValue((fieldNamePrefix + 'tokenUri') as 'tokenUri', metadataUrl)
      setValue((fieldNamePrefix + 'uploaded') as 'uploaded', true)

      // Add action to delete old post if does not already exist.
      if (
        !allActionsWithData.some(
          ({ actionKey, data }) =>
            actionKey === ActionKey.DeletePost && data.id === updatingPost.id
        )
      ) {
        addAction?.({
          actionKey: ActionKey.DeletePost,
          data: {
            id: updatingPost.id,
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
        <InputLabel name={t('form.postToUpdate')} />
        <SelectInput
          error={errors?.updateId}
          fieldName={(fieldNamePrefix + 'updateId') as 'updateId'}
          register={register}
          validation={[validateRequired]}
        >
          {!postsLoading.loading &&
            postsLoading.data.map(({ id, title }) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
        </SelectInput>
        <InputErrorMessage error={errors?.updateId} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex flex-col gap-1">
          <InputLabel name={t('title.header')} optional />
          <ImageDropInput
            Trans={Trans}
            className="aspect-square w-full shrink-0 sm:h-40 sm:w-40"
            currentImage={
              imageUrl && transformIpfsUrlToHttpsIfNecessary(imageUrl)
            }
            onSelect={(image, imageUrl) => {
              setImage(image)
              setImageUrl(imageUrl)
            }}
          />
        </div>

        <div className="flex grow flex-col gap-4">
          <div className="flex flex-col gap-1">
            <InputLabel name={t('title.title')} />
            <TextInput
              disabled={!isCreating}
              error={errors?.data?.title}
              fieldName={(fieldNamePrefix + 'data.title') as 'data.title'}
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors?.data?.title} />
          </div>

          <div className="flex flex-col gap-1">
            <InputLabel
              name={t('title.description')}
              optional
              tooltip={t('info.pressDescriptionTooltip')}
            />
            <TextAreaInput
              disabled={!isCreating}
              error={errors?.data?.description}
              fieldName={
                (fieldNamePrefix + 'data.description') as 'data.description'
              }
              register={register}
              rows={2}
            />
            <InputErrorMessage error={errors?.data?.description} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <InputLabel name={t('title.content')} />
        <TextAreaInput
          disabled={!isCreating}
          error={errors?.data?.content}
          fieldName={(fieldNamePrefix + 'data.content') as 'data.content'}
          register={register}
          rows={20}
          validation={[validateRequired]}
        />
        <InputErrorMessage error={errors?.data?.content} />
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
          <PostMarkdown
            post={{
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
  ) : postLoading.loading || !postLoading.data ? (
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

      <PostMarkdown post={postLoading.data} />
    </>
  )
}
