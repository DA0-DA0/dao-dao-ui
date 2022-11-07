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

import { DaoCreationConfig } from '../types'

export const ThresholdInput = ({
  data: {
    threshold: { majority, value },
  },
  register,
  setValue,
  errors,
}: DaoCreationVotingConfigItemInputProps<DaoCreationConfig>) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row gap-2">
      {!majority && (
        <NumberInput
          containerClassName="grow"
          error={errors?.threshold?.value}
          fieldName="threshold.value"
          onMinus={() => setValue('threshold.value', Math.max(value - 1, 1))}
          onPlus={() => setValue('threshold.value', Math.max(value + 1, 1))}
          register={register}
          sizing="sm"
          step={0.001}
          validation={[validatePositive, validateRequired]}
        />
      )}

      <SelectInput
        className={majority ? 'grow' : undefined}
        onChange={({ target: { value } }) =>
          setValue('threshold.majority', value === '1')
        }
        validation={[validateRequired]}
        value={majority ? '1' : '0'}
      >
        <option value="1">{t('info.majority')}</option>
        <option value="0">%</option>
      </SelectInput>
    </div>
  )
}

export const ThresholdReview = ({
  data: {
    threshold: { majority, value },
  },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationConfig>) => {
  const { t } = useTranslation()
  return <>{majority ? t('info.majority') : formatPercentOf100(value)}</>
}

export const ThresholdVotingConfigItem: DaoCreationVotingConfigItem<DaoCreationConfig> =
  {
    Icon: BallotDepositEmoji,
    nameI18nKey: 'form.passingThresholdTitle',
    descriptionI18nKey: 'form.passingThresholdDescription',
    Input: ThresholdInput,
    getInputError: ({ threshold } = {}) =>
      threshold?.majority || threshold?.value,
    Review: ThresholdReview,
  }
