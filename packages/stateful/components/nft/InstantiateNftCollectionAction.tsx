import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ChainPickerInput,
  FormSwitchCard,
  ImageSelector,
  InputErrorMessage,
  InputLabel,
  InputThemedText,
  NumberInput,
  SegmentedControlsTitle,
  TextAreaInput,
  TextInput,
  useChain,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ChainId,
  TransProps,
} from '@dao-dao/types'
import {
  formatDateTimeTz,
  makeValidateDate,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../actions'

export type InstantiateNftCollectionOptions = {
  Trans: ComponentType<TransProps>
}

export type InstantiateNftCollectionData = {
  chainId: string
  name: string
  symbol: string
  // Stargaze only
  collectionInfo?: {
    type: 'base' | 'vending'
    description: string
    explicitContent: boolean
    externalLink?: string
    image: string
    royalties?: number
    startTradingDate?: string
  }
}

// Form displayed when the user is instantiating a new NFT collection.
export const InstantiateNftCollectionAction: ActionComponent<
  InstantiateNftCollectionOptions
> = ({ isCreating, fieldNamePrefix, errors, options: { Trans } }) => {
  const { t } = useTranslation()
  const { context } = useActionOptions()
  const { chain_id: chainId } = useChain()
  const { register, setValue, watch } =
    useFormContext<InstantiateNftCollectionData>()

  const parsedStartTradingDate = Date.parse(
    watch(
      (fieldNamePrefix +
        'collectionInfo.startTradingDate') as 'collectionInfo.startTradingDate'
    ) || ''
  )
  const startTradingDate = !isNaN(parsedStartTradingDate)
    ? new Date(parsedStartTradingDate)
    : undefined
  const formattedStartTradingDate =
    startTradingDate && formatDateTimeTz(startTradingDate)

  return (
    <div className="flex flex-col gap-4">
      {context.type === ActionContextType.Dao && (
        <ChainPickerInput
          disabled={!isCreating}
          fieldName={fieldNamePrefix + 'chainId'}
        />
      )}

      <div className="space-y-2">
        <InputLabel name={t('form.collectionName')} />
        <TextInput
          disabled={!isCreating}
          error={errors?.name}
          fieldName={(fieldNamePrefix + 'name') as 'name'}
          register={register}
          validation={[validateRequired]}
        />
        <InputErrorMessage error={errors?.name} />
      </div>

      <div className="space-y-2">
        <InputLabel name={t('form.collectionSymbol')} />
        <TextInput
          disabled={!isCreating}
          error={errors?.symbol}
          fieldName={(fieldNamePrefix + 'symbol') as 'symbol'}
          register={register}
          validation={[validateRequired]}
        />
        <InputErrorMessage error={errors?.symbol} />
      </div>

      {/* Stargaze collection info */}
      {(chainId === ChainId.StargazeMainnet ||
        chainId === ChainId.StargazeTestnet) && (
        <>
          {/* TODO(stargaze): add explanations */}
          <SegmentedControlsTitle
            editable={isCreating}
            fieldName={fieldNamePrefix + 'type'}
            tabs={[
              {
                label: t('form.standardCollection'),
                value: 'vending',
              },
              {
                label: t('form.oneOneCollection'),
                value: 'base',
              },
            ]}
          />

          <div className="space-y-2">
            <InputLabel name={t('form.description')} />
            <TextAreaInput
              disabled={!isCreating}
              error={errors?.collectionInfo?.description}
              fieldName={
                (fieldNamePrefix +
                  'collectionInfo.description') as 'collectionInfo.description'
              }
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors?.collectionInfo?.description} />
          </div>

          <div className="flex flex-col items-center gap-1">
            <InputLabel name={t('form.image')} />
            <ImageSelector
              Trans={Trans}
              disabled={!isCreating}
              error={errors?.collectionInfo?.image}
              fieldName={
                (fieldNamePrefix +
                  'collectionInfo.image') as 'collectionInfo.image'
              }
              register={register}
              setValue={setValue}
              watch={watch}
            />
          </div>

          <div className="space-y-2">
            <InputLabel name={t('form.externalLink')} />
            <TextInput
              disabled={!isCreating}
              error={errors?.collectionInfo?.externalLink}
              fieldName={
                (fieldNamePrefix +
                  'collectionInfo.externalLink') as 'collectionInfo.externalLink'
              }
              register={register}
            />
            <InputErrorMessage error={errors?.collectionInfo?.externalLink} />
          </div>

          <div className="space-y-2">
            <InputLabel name={t('form.royalties')} />
            <NumberInput
              disabled={!isCreating}
              error={errors?.collectionInfo?.royalties}
              fieldName={
                (fieldNamePrefix +
                  'collectionInfo.royalties') as 'collectionInfo.royalties'
              }
              max={100}
              min={0}
              register={register}
              step={1}
              unit="%"
            />
            <InputErrorMessage error={errors?.collectionInfo?.royalties} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-end gap-2">
              <InputLabel name={t('form.allowsTradingAfter')} optional />

              {/* Date Preview */}
              {formattedStartTradingDate && isCreating && (
                <p className="caption-text">{formattedStartTradingDate}</p>
              )}
            </div>

            {isCreating ? (
              <div className="flex grow flex-col gap-1">
                <TextInput
                  className="grow"
                  error={errors?.collectionInfo?.startTradingDate}
                  fieldName={
                    (fieldNamePrefix +
                      'collectionInfo.startTradingDate') as 'collectionInfo.startTradingDate'
                  }
                  // eslint-disable-next-line i18next/no-literal-string
                  placeholder="YYYY-MM-DD HH:mm"
                  register={register}
                  validation={[makeValidateDate(t, true, false)]}
                />
                <InputErrorMessage
                  error={errors?.collectionInfo?.startTradingDate}
                />
              </div>
            ) : (
              <InputThemedText className="grow">
                {formattedStartTradingDate}
              </InputThemedText>
            )}
          </div>

          <FormSwitchCard
            fieldName={
              (fieldNamePrefix +
                'collectionInfo.explicitContent') as 'collectionInfo.explicitContent'
            }
            label={t('form.explicitContent')}
            readOnly={!isCreating}
            setValue={setValue}
            sizing="lg"
            value={watch(
              (fieldNamePrefix +
                'collectionInfo.explicitContent') as 'collectionInfo.explicitContent'
            )}
          />
        </>
      )}
    </div>
  )
}
