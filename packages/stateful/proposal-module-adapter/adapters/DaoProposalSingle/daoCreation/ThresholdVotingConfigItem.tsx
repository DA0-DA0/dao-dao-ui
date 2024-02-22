import { useTranslation } from 'react-i18next'

import {
  BallotDepositEmoji,
  FormSwitchCard,
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
    quorumEnabled,
    threshold: { majority },
  },
  register,
  setValue,
  watch,
  errors,
}: DaoCreationVotingConfigItemInputProps<DaoCreationExtraVotingConfig>) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        {!majority && (
          <NumberInput
            containerClassName="grow min-w-[8rem]"
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

      <FormSwitchCard
        fieldName="quorumEnabled"
        label={t('form.useQuorum')}
        setValue={setValue}
        sizing="md"
        value={quorumEnabled}
      />
    </div>
  )
}

const ThresholdReview = ({
  data: {
    quorumEnabled,
    threshold: { majority, value },
  },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationExtraVotingConfig>) => {
  const { t } = useTranslation()
  return (
    <>
      {majority ? t('info.majority') : formatPercentOf100(value)}
      {!quorumEnabled && (
        <>
          <br />
          <span className="caption-text">{t('info.noQuorum')}</span>
        </>
      )}
    </>
  )
}

export const ThresholdVotingConfigItem: DaoCreationVotingConfigItem<DaoCreationExtraVotingConfig> =
  {
    Icon: BallotDepositEmoji,
    nameI18nKey: 'form.passingThresholdTitle',
    descriptionI18nKey: 'form.passingThresholdDescription',
    tooltipI18nKey: ({ quorumEnabled }) =>
      `info.passingThresholdTooltip_${quorumEnabled ? 'quorum' : 'noQuorum'}`,
    Input: ThresholdInput,
    getInputError: ({ threshold } = {}) =>
      threshold?.majority || threshold?.value,
    Review: ThresholdReview,
  }
