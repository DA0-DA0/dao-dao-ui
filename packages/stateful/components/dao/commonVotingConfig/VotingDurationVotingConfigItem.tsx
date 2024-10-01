import { useTranslation } from 'react-i18next'

import {
  HourglassEmoji,
  HugeDecimalInput,
  SelectInput,
} from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DaoCreationVotingConfigWithVotingDuration,
  DurationUnits,
  DurationUnitsValues,
} from '@dao-dao/types'
import {
  convertDurationWithUnitsToHumanReadableString,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

export const VotingDurationInput = ({
  data: { votingDuration },
  register,
  setValue,
  getValues,
  errors,
}: DaoCreationVotingConfigItemInputProps<DaoCreationVotingConfigWithVotingDuration>) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row gap-2">
      <HugeDecimalInput
        containerClassName="grow"
        error={errors?.votingDuration?.value}
        fieldName="votingDuration.value"
        getValues={getValues}
        min={1}
        numericValue
        register={register}
        setValue={setValue}
        sizing="sm"
        step={1}
        validation={[
          validatePositive,
          validateRequired,
          // Prevent < 60 second voting duration since DAOs will brick if the
          // voting duration is shorter than 1 block.
          (value) =>
            votingDuration?.units !== DurationUnits.Seconds ||
            value >= 60 ||
            t('error.mustBeAtLeastSixtySeconds'),
        ]}
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
}: DaoCreationVotingConfigItemReviewProps<DaoCreationVotingConfigWithVotingDuration>) => {
  const { t } = useTranslation()
  return <>{convertDurationWithUnitsToHumanReadableString(t, votingDuration)}</>
}

export const makeVotingDurationVotingConfigItem =
  (): DaoCreationVotingConfigItem<DaoCreationVotingConfigWithVotingDuration> => ({
    Icon: HourglassEmoji,
    nameI18nKey: 'form.votingDurationTitle',
    descriptionI18nKey: 'form.votingDurationDescription',
    tooltipI18nKey: 'info.votingDurationTooltip',
    Input: VotingDurationInput,
    getInputError: ({ votingDuration } = {}) =>
      votingDuration?.value || votingDuration?.units,
    Review: VotingDurationReview,
  })
