import { InformationCircleIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'

import {
  ImageSelector,
  InputLabel,
  TextInput,
  InputErrorMessage,
  TextAreaInput,
  Tooltip,
  FormSwitch,
} from '@dao-dao/ui'
import { validateUrl, validateRequired } from '@dao-dao/utils'

import { TemplateCard, TemplateComponent } from './common'

export const UpdateInfoComponent: TemplateComponent = ({
  getLabel,
  errors,
  onRemove,
  readOnly,
}) => {
  const { register, watch, setValue } = useFormContext()

  return (
    <TemplateCard
      emoji={<Emoji label="Info" symbol="ℹ️" />}
      onRemove={onRemove}
      title="Update Info"
    >
      <div className="flex flex-row flex-wrap gap-6 justify-center items-center">
        <div className="flex flex-col gap-4 pl-2">
          <ImageSelector
            center={false}
            disabled={readOnly}
            error={errors?.name}
            label={getLabel('image_url')}
            register={register}
            validation={[validateUrl]}
            watch={watch}
          />
          <InputLabel name="Select an image" />
        </div>

        <div className="flex flex-col grow gap-3">
          <div>
            <TextInput
              disabled={readOnly}
              error={errors?.name}
              label={getLabel('name')}
              placeholder="DAO name"
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors?.name} />
          </div>
          <div>
            <TextAreaInput
              disabled={readOnly}
              error={errors?.description}
              label={getLabel('description')}
              placeholder="DAO description"
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors?.description} />
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <div className="flex flex-row grow gap-4 justify-between items-center py-2 px-3 bg-card rounded-md">
              <div className="flex flex-row gap-1">
                <Tooltip label="Should tokens sent to the DAO get added to the treasury?">
                  <InformationCircleIcon className="w-4 h-4 secondary-text" />
                </Tooltip>

                <p className="w-max secondary-text">Automatically add tokens</p>
              </div>
              <FormSwitch
                disabled={readOnly}
                label={getLabel('automatically_add_cw20s')}
                setValue={setValue}
                sizing="sm"
                watch={watch}
              />
            </div>
            <div className="flex flex-row grow gap-4 justify-between items-center py-2 px-3 bg-card rounded-md">
              <div className="flex flex-row gap-1">
                <Tooltip label="Should NFTs sent to the DAO get added to the treasury?">
                  <InformationCircleIcon className="w-4 h-4 secondary-text" />
                </Tooltip>

                <p className="w-max secondary-text">Automatically add NFTs</p>
              </div>
              <FormSwitch
                disabled={readOnly}
                label={getLabel('automatically_add_cw721s')}
                setValue={setValue}
                sizing="sm"
                watch={watch}
              />
            </div>
          </div>
        </div>
      </div>
    </TemplateCard>
  )
}
