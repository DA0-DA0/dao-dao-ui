import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  DaoImage,
  FormSwitch,
  ImageSelector,
  InfoEmoji,
  InputErrorMessage,
  InputLabel,
  TextAreaInput,
  TextInput,
  TooltipInfoIcon,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import { ConfigResponse as ConfigV1Response } from '@dao-dao/types/contracts/CwCore.v1'
import { ConfigResponse as ConfigV2Response } from '@dao-dao/types/contracts/CwdCore.v2'
import {
  DAO_STATIC_PROPS_CACHE_SECONDS,
  validateRequired,
  validateUrl,
} from '@dao-dao/utils'

import { ActionCard } from './ActionCard'

export type UpdateInfoData = ConfigV1Response | ConfigV2Response

export const UpdateInfoComponent: ActionComponent<
  undefined,
  UpdateInfoData
> = ({ fieldNamePrefix, errors, onRemove, isCreating, data }) => {
  const { coreAddress } = useDaoInfoContext()
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext()

  return (
    <ActionCard
      Icon={InfoEmoji}
      onRemove={onRemove}
      title={t('title.updateInfo')}
    >
      <div className="flex flex-row flex-wrap items-center justify-center gap-4">
        {isCreating ? (
          <div className="flex flex-col gap-4 pl-2">
            <ImageSelector
              error={errors?.name}
              fieldName={fieldNamePrefix + 'image_url'}
              register={register}
              validation={[validateUrl]}
              watch={watch}
            />
            <InputLabel name={t('form.selectAnImage')} />
          </div>
        ) : (
          <DaoImage
            className="ml-2"
            coreAddress={coreAddress}
            imageUrl={data.image_url}
            size="lg"
          />
        )}

        <div className="flex grow flex-col gap-3">
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
            <div className="flex grow flex-row items-center justify-between gap-4 rounded-md bg-background-secondary py-2 px-3">
              <div className="flex flex-row items-center gap-1">
                <TooltipInfoIcon
                  size="sm"
                  title={t('form.automaticallyAddTokensTooltip')}
                />

                <p className="secondary-text w-max">
                  {t('form.automaticallyAddTokensTitle')}
                </p>
              </div>
              <FormSwitch
                fieldName={fieldNamePrefix + 'automatically_add_cw20s'}
                readOnly={!isCreating}
                setValue={setValue}
                sizing="sm"
                value={watch(fieldNamePrefix + 'automatically_add_cw20s')}
              />
            </div>
            <div className="flex grow flex-row items-center justify-between gap-4 rounded-md bg-background-secondary py-2 px-3">
              <div className="flex flex-row items-center gap-1">
                <TooltipInfoIcon
                  size="sm"
                  title={t('form.automaticallyAddNFTsTooltip')}
                />

                <p className="secondary-text w-max">
                  {t('form.automaticallyAddNFTsTitle')}
                </p>
              </div>
              <FormSwitch
                fieldName={fieldNamePrefix + 'automatically_add_cw721s'}
                readOnly={!isCreating}
                setValue={setValue}
                sizing="sm"
                value={watch(fieldNamePrefix + 'automatically_add_cw721s')}
              />
            </div>
          </div>
          {!isCreating && (
            <p className="text-xs italic text-text-tertiary">
              {t('info.daoInfoWillRefresh', {
                minutes: DAO_STATIC_PROPS_CACHE_SECONDS / 60,
              })}
            </p>
          )}
        </div>
      </div>
    </ActionCard>
  )
}
