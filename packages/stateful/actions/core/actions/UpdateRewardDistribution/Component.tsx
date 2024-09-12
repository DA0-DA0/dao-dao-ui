import { ArrowDropDown } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FilterableItemPopup,
  InputErrorMessage,
  InputLabel,
  InputThemedText,
  MarkdownRenderer,
  NumberInput,
  SegmentedControls,
  SelectInput,
  StatusCard,
} from '@dao-dao/stateless'
import {
  DaoRewardDistribution,
  DurationUnitsValues,
  DurationWithUnits,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  convertDurationToDurationWithUnits,
  convertMicroDenomToDenomWithDecimals,
  getFallbackImage,
  getHumanReadableRewardDistributionLabel,
  toAccessibleImageUrl,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

export type UpdateRewardDistributionData = {
  address: string
  id: number
  immediate: boolean
  rate: {
    amount: number
    duration: DurationWithUnits
  }
}

export type UpdateRewardDistributionOptions = {
  /**
   * Existing reward distributions.
   */
  distributions: DaoRewardDistribution[]
}

export const UpdateRewardDistributionComponent: ActionComponent<
  UpdateRewardDistributionOptions
> = ({ fieldNamePrefix, errors, isCreating, options: { distributions } }) => {
  const { t } = useTranslation()
  const { register, setValue, watch } =
    useFormContext<UpdateRewardDistributionData>()

  const address = watch((fieldNamePrefix + 'address') as 'address')
  const id = watch((fieldNamePrefix + 'id') as 'id')
  const immediate = watch((fieldNamePrefix + 'immediate') as 'immediate')
  const rateDuration = watch(
    (fieldNamePrefix + 'rate.duration') as 'rate.duration'
  )

  const selectedDistribution = distributions.find(
    (distribution) => distribution.address === address && distribution.id === id
  )

  const minAmount = convertMicroDenomToDenomWithDecimals(
    1,
    selectedDistribution?.token.decimals ?? 0
  )

  const selectedDistributionDisplay = selectedDistribution && (
    <>
      <div
        className="h-6 w-6 shrink-0 rounded-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${toAccessibleImageUrl(
            selectedDistribution.token.imageUrl ||
              getFallbackImage(selectedDistribution.token.denomOrAddress)
          )})`,
        }}
      ></div>

      {getHumanReadableRewardDistributionLabel(t, selectedDistribution)}
    </>
  )

  return (
    <>
      <div className="flex flex-col gap-2 self-start">
        <InputLabel name={t('title.distribution')} primary />

        {isCreating ? (
          <FilterableItemPopup
            filterableItemKeys={FILTERABLE_KEYS}
            items={distributions.map((distribution) => ({
              key: distribution.address + distribution.id,
              selected: selectedDistribution === distribution,
              iconUrl:
                distribution.token.imageUrl ||
                getFallbackImage(distribution.token.denomOrAddress),
              label: getHumanReadableRewardDistributionLabel(t, distribution),
              ...distribution,
            }))}
            onSelect={({ address, id, active_epoch, token }) => {
              setValue((fieldNamePrefix + 'address') as 'address', address)
              setValue((fieldNamePrefix + 'id') as 'id', id)
              setValue(
                (fieldNamePrefix + 'immediate') as 'immediate',
                'immediate' in active_epoch.emission_rate
              )
              if ('linear' in active_epoch.emission_rate) {
                setValue(
                  (fieldNamePrefix + 'rate.amount') as 'rate.amount',
                  convertMicroDenomToDenomWithDecimals(
                    active_epoch.emission_rate.linear.amount,
                    token.decimals
                  )
                )
                setValue(
                  (fieldNamePrefix + 'rate.duration') as 'rate.duration',
                  convertDurationToDurationWithUnits(
                    active_epoch.emission_rate.linear.duration
                  )
                )
              }
            }}
            trigger={{
              type: 'button',
              props: {
                className: 'self-start',
                variant: !address ? 'primary' : 'ghost_outline',
                size: 'lg',
                children: selectedDistribution ? (
                  <>
                    {selectedDistributionDisplay}
                    <ArrowDropDown className="!h-6 !w-6 text-icon-primary" />
                  </>
                ) : (
                  t('button.chooseDistribution')
                ),
              },
            }}
          />
        ) : (
          <InputThemedText className="!py-2 !px-3">
            {selectedDistributionDisplay}
          </InputThemedText>
        )}
      </div>

      {selectedDistribution && (
        <>
          <div className="flex flex-col gap-2 max-w-prose">
            <InputLabel name={t('form.distributionRate')} primary />
            <MarkdownRenderer
              className="body-text text-text-secondary text-sm -mt-1"
              markdown={t('form.rewardDistributionRateDescription')}
            />
            <SegmentedControls<boolean>
              disabled={!isCreating}
              onSelect={(value) =>
                setValue((fieldNamePrefix + 'immediate') as 'immediate', value)
              }
              selected={immediate}
              tabs={[
                {
                  label: t('form.recurring'),
                  value: false,
                },
                {
                  label: t('title.immediate'),
                  value: true,
                },
              ]}
            />

            {immediate && (
              <StatusCard
                className="max-w-prose"
                content={t('info.immediateDistributesAllFundedRewards')}
                style="warning"
              />
            )}

            {!immediate && (
              <div className="flex flex-wrap flex-row gap-x-4 gap-y-2 px-4 py-3 bg-background-tertiary rounded-md max-w-prose">
                <NumberInput
                  containerClassName="grow"
                  disabled={!isCreating}
                  error={errors?.rate?.amount}
                  fieldName={(fieldNamePrefix + 'rate.amount') as 'rate.amount'}
                  min={minAmount}
                  register={register}
                  setValue={setValue}
                  step={minAmount}
                  unit={
                    selectedDistribution?.token
                      ? '$' + selectedDistribution.token.symbol
                      : t('info.tokens')
                  }
                  validation={[validateRequired, validatePositive]}
                  watch={watch}
                />

                <div className="flex flex-row grow gap-4 justify-between items-center">
                  <p className="primary-text">{t('info.every')}</p>

                  <div className="flex grow flex-row gap-2">
                    <div className="flex flex-col gap-1 grow">
                      <NumberInput
                        disabled={!isCreating}
                        error={errors?.rate?.duration?.value}
                        fieldName={
                          (fieldNamePrefix +
                            'rate.duration.value') as 'rate.duration.value'
                        }
                        min={1}
                        register={register}
                        setValue={setValue}
                        sizing="none"
                        step={1}
                        validation={[validatePositive, validateRequired]}
                        watch={watch}
                      />
                      <InputErrorMessage
                        error={errors?.rate?.duration?.value}
                      />
                    </div>

                    <SelectInput
                      containerClassName="shrink-0"
                      disabled={!isCreating}
                      fieldName={
                        (fieldNamePrefix +
                          'rate.duration.units') as 'rate.duration.units'
                      }
                      register={register}
                    >
                      {DurationUnitsValues.map((type, idx) => (
                        <option key={idx} value={type}>
                          {t(`unit.${type}`, {
                            count: rateDuration?.value,
                          }).toLocaleLowerCase()}
                        </option>
                      ))}
                    </SelectInput>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

const FILTERABLE_KEYS = [
  'label',
  'address',
  'id',
  'chainId',
  'token.symbol',
  'token.denomOrAddress',
]