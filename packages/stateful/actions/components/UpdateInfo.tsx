import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  DaoImage,
  FormSwitchCard,
  ImageSelector,
  InfoEmoji,
  InputErrorMessage,
  InputLabel,
  TextAreaInput,
  TextInput,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import { ConfigResponse as ConfigV1Response } from '@dao-dao/types/contracts/CwCore.v1'
import { ConfigResponse as ConfigV2Response } from '@dao-dao/types/contracts/DaoCore.v2'
import {
  DAO_STATIC_PROPS_CACHE_SECONDS,
  validateRequired,
} from '@dao-dao/utils'

import { LinkWrapper, Trans } from '../../components'
import { useActionOptions } from '../react'
import { ActionCard } from './ActionCard'

export type UpdateInfoData = ConfigV1Response | ConfigV2Response

export const UpdateInfoComponent: ActionComponent<
  undefined,
  UpdateInfoData
> = ({ fieldNamePrefix, errors, onRemove, isCreating, data }) => {
  const { name } = useDaoInfoContext()
  const { address } = useActionOptions()
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext()

  return (
    <ActionCard
      Icon={InfoEmoji}
      childrenContainerClassName="flex flex-row flex-wrap items-center justify-center gap-4"
      onRemove={onRemove}
      title={t('title.updateInfo')}
    >
      {isCreating ? (
        <div className="flex flex-col gap-4 pl-2">
          <ImageSelector
            Trans={Trans}
            error={errors?.image_url}
            fieldName={fieldNamePrefix + 'image_url'}
            register={register}
            setValue={setValue}
            watch={watch}
          />
          <InputLabel name={t('form.selectAnImage')} />
        </div>
      ) : (
        <DaoImage
          LinkWrapper={LinkWrapper}
          className="ml-2"
          coreAddress={address}
          daoName={name}
          imageUrl={data.image_url}
          size="lg"
        />
      )}

      <div className="flex grow flex-col gap-2">
        <div>
          <TextInput
            disabled={!isCreating}
            error={errors?.name}
            fieldName={fieldNamePrefix + 'name'}
            placeholder={t('form.name')}
            register={register}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors?.name} />
        </div>

        <div>
          <TextAreaInput
            disabled={!isCreating}
            error={errors?.description}
            fieldName={fieldNamePrefix + 'description'}
            placeholder={t('form.description')}
            register={register}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors?.description} />
        </div>

        <div className="flex flex-row flex-wrap gap-2">
          <FormSwitchCard
            containerClassName="grow"
            fieldName={fieldNamePrefix + 'automatically_add_cw20s'}
            label={t('form.automaticallyAddTokensTitle')}
            readOnly={!isCreating}
            setValue={setValue}
            sizing="sm"
            tooltip={t('form.automaticallyAddTokensTooltip')}
            tooltipIconSize="sm"
            value={watch(fieldNamePrefix + 'automatically_add_cw20s')}
          />

          <FormSwitchCard
            containerClassName="grow"
            fieldName={fieldNamePrefix + 'automatically_add_cw721s'}
            label={t('form.automaticallyAddNFTsTitle')}
            readOnly={!isCreating}
            setValue={setValue}
            sizing="sm"
            tooltip={t('form.automaticallyAddNFTsTooltip')}
            tooltipIconSize="sm"
            value={watch(fieldNamePrefix + 'automatically_add_cw721s')}
          />
        </div>
        {!isCreating && (
          <p className="text-xs italic text-text-tertiary">
            {t('info.daoInfoWillRefresh', {
              minutes: DAO_STATIC_PROPS_CACHE_SECONDS / 60,
            })}
          </p>
        )}
      </div>
    </ActionCard>
  )
}
