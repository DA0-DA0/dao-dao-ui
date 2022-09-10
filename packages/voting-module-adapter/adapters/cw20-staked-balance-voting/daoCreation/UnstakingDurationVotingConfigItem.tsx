import Emoji from 'a11y-react-emoji'
import { useTranslation } from 'react-i18next'

import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DurationUnitsValues,
} from '@dao-dao/tstypes'
import { NumberInput, SelectInput } from '@dao-dao/ui'
import { validateNonNegative, validateRequired } from '@dao-dao/utils'

import { DaoCreationConfig } from '../types'

export const UnstakingDurationIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.clock')} symbol="⏰" />
}

export const UnstakingDurationInput = ({
  data: { unstakingDuration },
  register,
  setValue,
  errors,
}: DaoCreationVotingConfigItemInputProps<DaoCreationConfig>) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row gap-2">
      <NumberInput
        containerClassName="grow"
        error={errors?.unstakingDuration?.value}
        fieldName="unstakingDuration.value"
        onMinus={() =>
          setValue(
            'unstakingDuration.value',
            Math.max(unstakingDuration.value - 1, 0)
          )
        }
        onPlus={() =>
          setValue(
            'unstakingDuration.value',
            Math.max(unstakingDuration.value + 1, 0)
          )
        }
        register={register}
        sizing="sm"
        step={1}
        validation={[validateNonNegative, validateRequired]}
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

export const UnstakingDurationVotingConfigItem: DaoCreationVotingConfigItem<DaoCreationConfig> =
  {
    Icon: UnstakingDurationIcon,
    nameI18nKey: 'form.unstakingDurationTitle',
    descriptionI18nKey: 'form.unstakingDurationDescription',
    Input: UnstakingDurationInput,
  }
