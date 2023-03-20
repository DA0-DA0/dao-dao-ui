import { useTranslation } from 'react-i18next'

import { HourglassEmoji, NumberInput, SelectInput } from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DurationUnits,
  DurationUnitsValues,
} from '@dao-dao/types'
import {
  convertDurationWithUnitsToHumanReadableString,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { DaoCreationConfigWithVotingDuration } from './types'

export const VotingDurationInput = ({
  data: { votingDuration },
  register,
  setValue,
  watch,
  errors,
}: DaoCreationVotingConfigItemInputProps<DaoCreationConfigWithVotingDuration>) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row gap-2">
      <NumberInput
        containerClassName="grow"
        error={errors?.votingDuration?.value}
        fieldName="votingDuration.value"
        min={1}
        register={register}
        setValue={setValue}
        sizing="sm"
        step={1}
        validation={[
          validatePositive,
          validateRequired,
          // Prevent < 60 second voting duration since DAOs will brick
          // if the voting duration is shorter tahn 1 block.
          (value) =>
            votingDuration?.units !== DurationUnits.Seconds ||
            value >= 60 ||
            'Cannot be shorter than 60 seconds.',
        ]}
        watch={watch}
      />

      <SelectInput
        error={errors?.votingDuration?.units}
        fieldName="votingDuration.units"
        register={register}
        validation={[validateRequired]}
      >
        {DurationUnitsValues.map((type, idx) => (
          <option key={idx} value={type}>
            {t(`unit.${type}`, {
              count: votingDuration?.value,
            }).toLocaleLowerCase()}
          </option>
        ))}
      </SelectInput>
    </div>
  )
}

export const VotingDurationReview = ({
  data: { votingDuration },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationConfigWithVotingDuration>) => {
  const { t } = useTranslation()
  return <>{convertDurationWithUnitsToHumanReadableString(t, votingDuration)}</>
}

export const VotingDurationVotingConfigItem: DaoCreationVotingConfigItem<DaoCreationConfigWithVotingDuration> =
  {
    Icon: HourglassEmoji,
    nameI18nKey: 'form.votingDurationTitle',
    descriptionI18nKey: 'form.votingDurationDescription',
    Input: VotingDurationInput,
    getInputError: ({ votingDuration } = {}) =>
      votingDuration?.value || votingDuration?.units,
    Review: VotingDurationReview,
  }
