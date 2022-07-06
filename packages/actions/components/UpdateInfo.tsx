import { InformationCircleIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'

import {
  FormSwitch,
  ImageSelector,
  InputErrorMessage,
  InputLabel,
  TextAreaInput,
  TextInput,
  Tooltip,
} from '@dao-dao/ui'
import { validateRequired, validateUrl } from '@dao-dao/utils'

import { ActionCard, ActionComponent } from '..'

export const UpdateInfoComponent: ActionComponent = ({
  getFieldName,
  errors,
  onRemove,
  readOnly,
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext()

  return (
    <ActionCard
      emoji={<Emoji label={t('emoji.info')} symbol="ℹ️" />}
      onRemove={onRemove}
      title={t('title.updateInfo')}
    >
      <div className="flex flex-row flex-wrap gap-6 justify-center items-center">
        <div className="flex flex-col gap-4 pl-2">
          <ImageSelector
            center={false}
            disabled={readOnly}
            error={errors?.name}
            fieldName={getFieldName('image_url')}
            register={register}
            validation={[validateUrl]}
            watch={watch}
          />
          <InputLabel name={t('form.selectAnImage')} />
        </div>

        <div className="flex flex-col grow gap-3">
          <div>
            <TextInput
              disabled={readOnly}
              error={errors?.name}
              fieldName={getFieldName('name')}
              placeholder={t('form.name')}
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors?.name} />
          </div>
          <div>
            <TextAreaInput
              disabled={readOnly}
              error={errors?.description}
              fieldName={getFieldName('description')}
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
                fieldName={getFieldName('automatically_add_cw20s')}
                readOnly={readOnly}
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
                fieldName={getFieldName('automatically_add_cw721s')}
                readOnly={readOnly}
                setValue={setValue}
                sizing="sm"
                watch={watch}
              />
            </div>
          </div>
        </div>
      </div>
    </ActionCard>
  )
}
