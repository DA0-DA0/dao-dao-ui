import { InformationCircleIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ConfigResponse } from '@dao-dao/state/clients/cw-core/0.1.0'
import {
  FormSwitch,
  ImageSelector,
  InputErrorMessage,
  InputLabel,
  TextAreaInput,
  TextInput,
  Tooltip,
} from '@dao-dao/ui'
import {
  DAO_STATIC_PROPS_CACHE_SECONDS,
  validateRequired,
  validateUrl,
} from '@dao-dao/utils'

import { ActionCard, ActionComponent } from '..'

export type UpdateInfoData = ConfigResponse

export const UpdateInfoComponent: ActionComponent<
  undefined,
  UpdateInfoData
> = ({ fieldNamePrefix, errors, onRemove, isCreating, data, Logo }) => {
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext()

  return (
    <ActionCard
      Icon={UpdateInfoIcon}
      onRemove={onRemove}
      title={t('title.updateInfo')}
    >
      <div className="flex flex-row flex-wrap gap-6 justify-center items-center">
        <div className="flex flex-col gap-4 pl-2">
          {isCreating ? (
            <>
              <ImageSelector
                error={errors?.name}
                fieldName={fieldNamePrefix + 'image_url'}
                register={register}
                validation={[validateUrl]}
                watch={watch}
              />
              <InputLabel name={t('form.selectAnImage')} />
            </>
          ) : data.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={t('info.daosLogo')}
              className="object-cover w-24 h-24 rounded-full"
              src={data.image_url}
            />
          ) : (
            <Logo size={96} />
          )}
        </div>

        <div className="flex flex-col grow gap-3">
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
            <div className="flex flex-row grow gap-4 justify-between items-center py-2 px-3 bg-card rounded-md">
              <div className="flex flex-row gap-1">
                <Tooltip label={t('form.automaticallyAddTokensTooltip')}>
                  <InformationCircleIcon className="w-4 h-4 secondary-text" />
                </Tooltip>

                <p className="w-max secondary-text">
                  {t('form.automaticallyAddTokensTitle')}
                </p>
              </div>
              <FormSwitch
                fieldName={fieldNamePrefix + 'automatically_add_cw20s'}
                readOnly={!isCreating}
                setValue={setValue}
                sizing="sm"
                watch={watch}
              />
            </div>
            <div className="flex flex-row grow gap-4 justify-between items-center py-2 px-3 bg-card rounded-md">
              <div className="flex flex-row gap-1">
                <Tooltip label={t('form.automaticallyAddNFTsTooltip')}>
                  <InformationCircleIcon className="w-4 h-4 secondary-text" />
                </Tooltip>

                <p className="w-max secondary-text">
                  {t('form.automaticallyAddNFTsTitle')}
                </p>
              </div>
              <FormSwitch
                fieldName={fieldNamePrefix + 'automatically_add_cw721s'}
                readOnly={!isCreating}
                setValue={setValue}
                sizing="sm"
                watch={watch}
              />
            </div>
          </div>
          {!isCreating && (
            <p className="text-xs italic text-tertiary">
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

export const UpdateInfoIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.info')} symbol="ℹ️" />
}
