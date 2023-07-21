import { Close } from '@mui/icons-material'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { nftUriDataSelector } from '@dao-dao/state/recoil'
import {
  HorizontalNftCard,
  IconButton,
  InputErrorMessage,
  InputLabel,
  Loader,
  UploadNftMetadata,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { NewDao, NftCardInfo } from '@dao-dao/types'
import { makeValidateAddress, validateRequired } from '@dao-dao/utils'

import { AddressInput } from '../../components/AddressInput'
import { Trans } from '../../components/Trans'
import { CreatorData } from './types'

export type NewInitialNftCardProps = {
  index: number
  remove: () => void
}

type NewInitialNftData = {
  name: string
  description: string
  audio?: string
  video?: string
}

export const NewInitialNftCard = ({
  index,
  remove,
}: NewInitialNftCardProps) => {
  const { t } = useTranslation()
  const { bech32_prefix: bech32Prefix, chain_id: chainId } = useChain()
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<NewDao<CreatorData>>()

  const tokenUri = watch(`creator.data.newInfo.initialNfts.${index}.token_uri`)
  const collectionName = watch('creator.data.newInfo.name')
  const tokenUriData = useCachedLoading(
    tokenUri ? nftUriDataSelector(tokenUri) : undefined,
    undefined
  )

  const nftInfo: NftCardInfo | undefined =
    tokenUriData.loading || !tokenUriData.data
      ? undefined
      : {
          collection: {
            address: '',
            name: collectionName,
          },
          tokenId: index.toString(),
          imageUrl: tokenUriData.data.imageUrl,
          name: tokenUriData.data.name ?? '',
          description: tokenUriData.data.description ?? '',
          metadata: tokenUriData.data,
          chainId,
        }

  const metadataForm = useForm<NewInitialNftData>()

  return (
    <div className="flex flex-row items-start gap-2 rounded-md bg-background-tertiary p-6">
      <div className="grow">
        {tokenUri ? (
          <div className="flex flex-col gap-4">
            {!nftInfo ? (
              <Loader />
            ) : (
              <>
                <HorizontalNftCard {...nftInfo} />

                <div className="flex flex-col gap-1">
                  <InputLabel name={t('form.recipient')} />
                  <AddressInput
                    containerClassName="grow"
                    error={
                      errors?.creator?.data?.newInfo?.initialNfts?.[index]
                        ?.owner
                    }
                    fieldName={`creator.data.newInfo.initialNfts.${index}.owner`}
                    register={register}
                    validation={[
                      validateRequired,
                      makeValidateAddress(bech32Prefix),
                    ]}
                  />
                  <InputErrorMessage
                    error={
                      errors?.creator?.data?.newInfo?.initialNfts?.[index]
                        ?.owner
                    }
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <FormProvider {...metadataForm}>
            <UploadNftMetadata<NewInitialNftData>
              Trans={Trans}
              audioError={metadataForm.formState.errors?.audio}
              audioFieldName="audio"
              descriptionError={metadataForm.formState.errors?.description}
              descriptionFieldName="description"
              nameError={metadataForm.formState.errors?.name}
              nameFieldName="name"
              onUpload={(metadataUrl) =>
                setValue(
                  `creator.data.newInfo.initialNfts.${index}.token_uri`,
                  metadataUrl
                )
              }
              videoError={metadataForm.formState.errors?.video}
              videoFieldName="video"
            />
          </FormProvider>
        )}
      </div>

      <IconButton Icon={Close} circular onClick={remove} variant="ghost" />
    </div>
  )
}
