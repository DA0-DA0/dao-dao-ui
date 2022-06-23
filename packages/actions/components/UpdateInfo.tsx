import { InformationCircleIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'

import { useTranslation } from '@dao-dao/i18n'
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
      emoji={<Emoji label={t('info')} symbol="ℹ️" />}
      onRemove={onRemove}
      title={t('updateInfo')}
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
          <InputLabel name={t('selectAnImage')} />
        </div>

        <div className="flex flex-col grow gap-3">
          <div>
            <TextInput
              disabled={readOnly}
              error={errors?.name}
              fieldName={getFieldName('name')}
              placeholder={t('Name')}
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
              placeholder={t('Description')}
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors?.description} />
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <div className="flex flex-row grow gap-4 justify-between items-center py-2 px-3 bg-card rounded-md">
              <div className="flex flex-row gap-1">
                <Tooltip label={t('automaticallyAddTokensExplanation')}>
                  <InformationCircleIcon className="w-4 h-4 secondary-text" />
                </Tooltip>

                <p className="w-max secondary-text">
                  {t('automaticallyAddTokens')}
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
                <Tooltip label={t('automaticallyAddNFTsExplanation')}>
                  <InformationCircleIcon className="w-4 h-4 secondary-text" />
                </Tooltip>

                <p className="w-max secondary-text">
                  {t('automaticallyAddNFTs')}
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
