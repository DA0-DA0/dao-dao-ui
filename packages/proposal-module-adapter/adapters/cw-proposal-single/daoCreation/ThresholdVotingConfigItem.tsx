import Emoji from 'a11y-react-emoji'
import { useTranslation } from 'react-i18next'

import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
} from '@dao-dao/tstypes'
import { NumberInput, SelectInput } from '@dao-dao/ui'
import { validatePositive, validateRequired } from '@dao-dao/utils'

import { DaoCreationConfig } from '../types'

export const ThresholdIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.ballotBox')} symbol="🗳️" />
}

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

export const ThresholdVotingConfigItem: DaoCreationVotingConfigItem<DaoCreationConfig> =
  {
    Icon: ThresholdIcon,
    nameI18nKey: 'form.passingThresholdTitle',
    descriptionI18nKey: 'form.passingThresholdDescription',
    Input: ThresholdInput,
  }
