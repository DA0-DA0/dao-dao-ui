import { useTranslation } from 'react-i18next'

import { ClockEmoji, NumberInput, SelectInput } from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DurationUnitsValues,
} from '@dao-dao/types'
import {
  convertDurationWithUnitsToHumanReadableString,
  validateNonNegative,
  validateRequired,
} from '@dao-dao/utils'

import { VotingModuleCreatorConfig } from './types'

export const UnstakingDurationInput = ({
  data: { unstakingDuration },
  register,
  setValue,
  watch,
  errors,
}: DaoCreationVotingConfigItemInputProps<VotingModuleCreatorConfig>) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row gap-2">
      <NumberInput
        containerClassName="grow"
        error={errors?.unstakingDuration?.value}
        fieldName="unstakingDuration.value"
        min={0}
        register={register}
        setValue={setValue}
        sizing="sm"
        step={1}
        validation={[validateNonNegative, validateRequired]}
        watch={watch}
      />

      <SelectInput
        error={errors?.unstakingDuration?.units}
        fieldName="unstakingDuration.units"
        register={register}
        validation={[validateRequired]}
      >
        {DurationUnitsValues.map((type, idx) => (
          <option key={idx} value={type}>
            {t(`unit.${type}`, {
              count: unstakingDuration?.value,
            }).toLocaleLowerCase()}
          </option>
        ))}
      </SelectInput>
    </div>
  )
}

export const UnstakingDurationReview = ({
  data: { unstakingDuration },
}: DaoCreationVotingConfigItemReviewProps<VotingModuleCreatorConfig>) => {
  const { t } = useTranslation()
  return (
    <>{convertDurationWithUnitsToHumanReadableString(t, unstakingDuration)}</>
  )
}

export const UnstakingDurationVotingConfigItem: DaoCreationVotingConfigItem<VotingModuleCreatorConfig> =
  {
    Icon: ClockEmoji,
    nameI18nKey: 'form.unstakingDurationTitle',
    descriptionI18nKey: 'form.unstakingDurationDescription',
    Input: UnstakingDurationInput,
    getInputError: ({ unstakingDuration } = {}) =>
      unstakingDuration?.value || unstakingDuration?.units,
    Review: UnstakingDurationReview,
  }
