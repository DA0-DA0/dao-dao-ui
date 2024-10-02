import { useTranslation } from 'react-i18next'

import {
  FilmSlateEmoji,
  FormSwitchCard,
  HugeDecimalInput,
  SelectInput,
} from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DaoCreationVotingConfigWithActiveThreshold,
} from '@dao-dao/types'
import {
  formatPercentOf100,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

const ActiveThresholdInput = ({
  data: {
    activeThreshold: { enabled, type } = {
      enabled: false,
      type: 'percent',
      value: '10',
    },
  },
  register,
  setValue,
  getValues,
  errors,
}: DaoCreationVotingConfigItemInputProps<DaoCreationVotingConfigWithActiveThreshold>) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-2">
      <FormSwitchCard
        fieldName="activeThreshold.enabled"
        setValue={setValue}
        sizing="sm"
        value={enabled}
      />

      {enabled && (
        <>
          <div className="flex flex-row gap-2">
            <HugeDecimalInput
              containerClassName="grow min-w-[8rem]"
              error={errors?.activeThreshold?.value}
              fieldName="activeThreshold.value"
              getValues={getValues}
              min={1}
              register={register}
              setValue={setValue}
              sizing="sm"
              step={type === 'percent' ? 0.001 : 1}
              validation={[validateRequired, validatePositive]}
            />

            <SelectInput
              containerClassName={type === 'absolute' ? 'grow' : undefined}
              onChange={(newType) =>
                setValue('activeThreshold.type', newType as any)
              }
              validation={[validateRequired]}
              value={type}
            >
              <option value="percent">%</option>
              <option value="absolute">{t('info.count')}</option>
            </SelectInput>
          </div>
        </>
      )}
    </div>
  )
}

const ActiveThresholdReview = ({
  data: {
    activeThreshold: { enabled, type, value } = {
      enabled: false,
      type: 'percent',
      value: '10',
    },
  },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationVotingConfigWithActiveThreshold>) => {
  const { t } = useTranslation()
  return enabled ? (
    <>
      {type === 'absolute'
        ? value.toLocaleString() + ' ' + t('info.tokens')
        : formatPercentOf100(value)}
    </>
  ) : (
    <>{t('info.none')}</>
  )
}

export const makeActiveThresholdVotingConfigItem =
  (): DaoCreationVotingConfigItem<DaoCreationVotingConfigWithActiveThreshold> => ({
    Icon: FilmSlateEmoji,
    nameI18nKey: 'title.activeThreshold',
    descriptionI18nKey: 'info.activeThresholdDescription',
    tooltipI18nKey: 'info.activeThresholdDescription',
    Input: ActiveThresholdInput,
    getInputError: ({ activeThreshold } = {}) =>
      activeThreshold?.type || activeThreshold?.value,
    Review: ActiveThresholdReview,
  })
