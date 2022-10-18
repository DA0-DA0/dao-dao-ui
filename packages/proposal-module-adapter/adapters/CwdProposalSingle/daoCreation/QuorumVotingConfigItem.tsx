import Emoji from 'a11y-react-emoji'
import { useTranslation } from 'react-i18next'

import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
} from '@dao-dao/tstypes'
import { FormSwitchCard, NumberInput, SelectInput } from '@dao-dao/ui'
import {
  formatPercentOf100,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { DaoCreationConfig } from '../types'

export const QuorumIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.megaphone')} symbol="📣" />
}

// TODO: Quorum disabled warning?
export const QuorumInput = ({
  data: {
    quorumEnabled,
    quorum: { majority, value },
  },
  register,
  setValue,
  errors,
}: DaoCreationVotingConfigItemInputProps<DaoCreationConfig>) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-5">
      {quorumEnabled && (
        <div className="flex flex-row gap-2">
          {!majority && (
            <NumberInput
              containerClassName="grow"
              error={errors?.quorum?.value}
              fieldName="quorum.value"
              onMinus={() => setValue('quorum.value', Math.max(value - 1, 1))}
              onPlus={() => setValue('quorum.value', Math.max(value + 1, 1))}
              register={register}
              sizing="sm"
              step={0.001}
              validation={[validatePositive, validateRequired]}
            />
          )}

          <SelectInput
            className={majority ? 'grow' : undefined}
            onChange={({ target: { value } }) =>
              setValue('quorum.majority', value === '1')
            }
            validation={[validateRequired]}
            value={majority ? '1' : '0'}
          >
            <option value="1">{t('info.majority')}</option>
            <option value="0">%</option>
          </SelectInput>
        </div>
      )}

      <FormSwitchCard
        fieldName="quorumEnabled"
        setValue={setValue}
        sizing="sm"
        value={quorumEnabled}
      />
    </div>
  )
}

export const QuorumReview = ({
  data: {
    quorumEnabled,
    quorum: { majority, value },
  },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationConfig>) => {
  const { t } = useTranslation()
  return (
    <>
      {quorumEnabled
        ? majority
          ? t('info.majority')
          : formatPercentOf100(value)
        : t('info.disabled')}
    </>
  )
}

export const QuorumVotingConfigItem: DaoCreationVotingConfigItem<DaoCreationConfig> =
  {
    Icon: QuorumIcon,
    nameI18nKey: 'form.quorumTitle',
    descriptionI18nKey: 'form.quorumDescription',
    Input: QuorumInput,
    getInputError: ({ quorumEnabled, quorum } = {}) =>
      quorumEnabled || quorum?.majority || quorum?.value,
    Review: QuorumReview,
  }
