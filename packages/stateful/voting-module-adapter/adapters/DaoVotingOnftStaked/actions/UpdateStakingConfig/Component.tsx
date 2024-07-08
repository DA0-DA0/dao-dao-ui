import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FormSwitchCard,
  InputErrorMessage,
  NumberInput,
  SelectInput,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  BooleanFieldNames,
  DurationUnitsValues,
  DurationWithUnits,
} from '@dao-dao/types'
import { validatePositive, validateRequired } from '@dao-dao/utils'

export type UpdateStakingConfigData = {
  unstakingDurationEnabled: boolean
  unstakingDuration: DurationWithUnits
}

export const UpdateStakingConfigComponent: ActionComponent = ({
  fieldNamePrefix,
  errors,
  isCreating,
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue } =
    useFormContext<UpdateStakingConfigData>()

  const unstakingDurationEnabled = watch(
    (fieldNamePrefix + 'unstakingDurationEnabled') as 'unstakingDurationEnabled'
  )
  const unstakingDuration = watch(
    (fieldNamePrefix + 'unstakingDuration') as 'unstakingDuration'
  )

  return (
    <>
      <FormSwitchCard<
        UpdateStakingConfigData,
        BooleanFieldNames<UpdateStakingConfigData>
      >
        containerClassName="self-start"
        fieldName={
          (fieldNamePrefix +
            'unstakingDurationEnabled') as 'unstakingDurationEnabled'
        }
        label={t('form.unstakingDurationTitle')}
        readOnly={!isCreating}
        setValue={setValue}
        tooltip={t('form.unstakingDurationDescription')}
        value={unstakingDurationEnabled}
      />

      {unstakingDurationEnabled && (
        <>
          <div className="flex flex-row gap-2">
            <NumberInput
              disabled={!isCreating}
              error={errors?.unstakingDuration?.value}
              fieldName={
                (fieldNamePrefix +
                  'unstakingDuration.value') as 'unstakingDuration.value'
              }
              min={1}
              register={register}
              setValue={setValue}
              sizing="md"
              step={1}
              unit={
                !isCreating
                  ? t(`unit.${unstakingDuration.units}`, {
                      count: unstakingDuration.value,
                    }).toLocaleLowerCase()
                  : undefined
              }
              validation={[validatePositive, validateRequired]}
              watch={watch}
            />

            {isCreating && (
              <SelectInput
                error={errors?.unstakingDuration?.units}
                fieldName={
                  (fieldNamePrefix +
                    'unstakingDuration.units') as 'unstakingDuration.units'
                }
                register={register}
                validation={[validateRequired]}
              >
                {DurationUnitsValues.map((type, idx) => (
                  <option key={idx} value={type}>
                    {t(`unit.${type}`, {
                      count: unstakingDuration.value,
                    }).toLocaleLowerCase()}
                  </option>
                ))}
              </SelectInput>
            )}
          </div>

          <InputErrorMessage
            className="-mt-2"
            error={errors?.unstakingDuration?.value}
          />
        </>
      )}
    </>
  )
}
