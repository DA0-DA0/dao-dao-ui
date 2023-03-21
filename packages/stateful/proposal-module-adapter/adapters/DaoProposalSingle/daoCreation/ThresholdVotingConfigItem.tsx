import { useTranslation } from 'react-i18next'

import {
  BallotDepositEmoji,
  NumberInput,
  SelectInput,
} from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
} from '@dao-dao/types'
import {
  formatPercentOf100,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { DaoCreationExtraVotingConfig } from '../types'

const ThresholdInput = ({
  data: {
    threshold: { majority },
  },
  register,
  setValue,
  watch,
  errors,
}: DaoCreationVotingConfigItemInputProps<DaoCreationExtraVotingConfig>) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row gap-2">
      {!majority && (
        <NumberInput
          containerClassName="grow min-w-[9rem]"
          error={errors?.threshold?.value}
          fieldName="threshold.value"
          min={1}
          register={register}
          setValue={setValue}
          sizing="sm"
          step={0.001}
          validation={[validatePositive, validateRequired]}
          watch={watch}
        />
      )}

      <SelectInput
        containerClassName={majority ? 'grow' : undefined}
        onChange={(value) => setValue('threshold.majority', value === '1')}
        validation={[validateRequired]}
        value={majority ? '1' : '0'}
      >
        <option value="1">{t('info.majority')}</option>
        <option value="0">%</option>
      </SelectInput>
    </div>
  )
}

const ThresholdReview = ({
  data: {
    threshold: { majority, value },
  },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationExtraVotingConfig>) => {
  const { t } = useTranslation()
  return <>{majority ? t('info.majority') : formatPercentOf100(value)}</>
}

export const ThresholdVotingConfigItem: DaoCreationVotingConfigItem<DaoCreationExtraVotingConfig> =
  {
    Icon: BallotDepositEmoji,
    nameI18nKey: 'form.passingThresholdTitle',
    descriptionI18nKey: 'form.passingThresholdWithQuorumDescription',
    Input: ThresholdInput,
    getInputError: ({ threshold } = {}) =>
      threshold?.majority || threshold?.value,
    Review: ThresholdReview,
  }
