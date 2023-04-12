import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Trans, useTranslation } from 'react-i18next'

import {
  Button,
  ImageDropInput,
  InputErrorMessage,
  InputLabel,
  Loader,
  SwitchCard,
  TextAreaInput,
  TextInput,
} from '@dao-dao/stateless'
import { ActionComponent, LoadingData } from '@dao-dao/types'
import { processError, uploadNft, validateRequired } from '@dao-dao/utils'

import { PostMarkdown } from '../../components/PostMarkdown'
import { CreatePostData, Post } from '../../types'

type CreatePostOptions = {
  postLoading: LoadingData<Post | undefined>
}

export const CreatePostComponent: ActionComponent<CreatePostOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { postLoading },
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext<CreatePostData>()

  const data = watch((fieldNamePrefix + 'data') as 'data')

  const [image, setImage] = useState<File>()
  const [imageUrl, setImageUrl] = useState<string>()
  const [showPreview, setShowPreview] = useState(false)
  const [uploading, setUploading] = useState(false)

  const upload = async () => {
    if (!data) {
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
          properties: {
            content: data.content,
            created: now.toISOString(),
            order: data.order === -1 ? now.getTime() : data.order,
          },
        })
      )

      setValue((fieldNamePrefix + 'tokenId') as 'tokenId', cid)
      setValue((fieldNamePrefix + 'tokenUri') as 'tokenUri', metadataUrl)
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setUploading(false)
    }
  }

  return isCreating ? (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex flex-col gap-1">
          <InputLabel name={t('title.header')} optional />
          <ImageDropInput
            Trans={Trans}
            className="aspect-square w-full shrink-0 sm:h-40 sm:w-40"
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
          {t('button.upload')}
        </Button>
      </div>

      {showPreview && (
        <div className="mt-6 rounded-md border border-dashed border-border-primary p-20">
          <PostMarkdown
            post={{
              id: 'new',
              title: data?.title ?? '',
              content: data?.content ?? '',
              headerImage: imageUrl,
              lastUpdated: new Date(),
            }}
          />
        </div>
      )}
    </>
  ) : postLoading.loading || !postLoading.data ? (
    <Loader />
  ) : (
    <PostMarkdown post={postLoading.data} />
  )
}
