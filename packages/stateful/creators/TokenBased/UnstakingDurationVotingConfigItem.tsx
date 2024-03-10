import { UseFormWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ClockEmoji,
  InputErrorMessage,
  NumberInput,
  SelectInput,
  SwitchCard,
  useHoldingKey,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DurationUnitsValues,
} from '@dao-dao/types'
import {
  convertDurationWithUnitsToHumanReadableString,
  makeValidateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { AddressInput } from '../../components/AddressInput'
import { CreatorData, GovernanceTokenType } from './types'

export const UnstakingDurationInput = ({
  data: { tokenType, unstakingDuration, customStakingAddress },
  register,
  setValue,
  watch,
  errors,
}: DaoCreationVotingConfigItemInputProps<CreatorData>) => {
  const { t } = useTranslation()

  const holdingAltForCustomStaking = useHoldingKey({ key: 'alt' })

  const {
    chain: { bech32_prefix: bech32Prefix },
    config: { createWithCw20 },
  } = useSupportedChainContext()

  const showCustomStakingAddress =
    createWithCw20 && customStakingAddress !== undefined

  return (
    <>
      {createWithCw20 &&
        tokenType === GovernanceTokenType.Existing &&
        (holdingAltForCustomStaking || showCustomStakingAddress) && (
          <SwitchCard
            containerClassName="mb-4"
            enabled={customStakingAddress !== undefined}
            label={t('form.customStakingContract')}
            onClick={() =>
              setValue(
                'customStakingAddress',
                customStakingAddress === undefined ? '' : undefined
              )
            }
            sizing="sm"
          />
        )}

      {showCustomStakingAddress ? (
        <div className="space-y-1">
          <AddressInput
            containerClassName="grow"
            error={errors?.customStakingAddress}
            fieldName="customStakingAddress"
            hideEntity
            placeholder={bech32Prefix + '...'}
            register={register}
            setValue={setValue}
            type="contract"
            validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
            watch={watch as UseFormWatch<CreatorData>}
          />

          <InputErrorMessage error={errors?.customStakingAddress} />
        </div>
      ) : (
        <div className="flex flex-row gap-2">
          <NumberInput
            containerClassName="grow"
            error={errors?.unstakingDuration?.value}
            fieldName="unstakingDuration.value"
            min={1}
            register={register}
            setValue={setValue}
            sizing="sm"
            step={1}
            validation={[validatePositive, validateRequired]}
            watch={watch}
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
      )}
    </>
  )
}

export const UnstakingDurationReview = ({
  data: { unstakingDuration },
}: DaoCreationVotingConfigItemReviewProps<CreatorData>) => {
  const { t } = useTranslation()
  return (
    <>{convertDurationWithUnitsToHumanReadableString(t, unstakingDuration)}</>
  )
}

export const UnstakingDurationVotingConfigItem: DaoCreationVotingConfigItem<CreatorData> =
  {
    Icon: ClockEmoji,
    nameI18nKey: 'form.unstakingDurationTitle',
    descriptionI18nKey: 'form.unstakingDurationDescription',
    tooltipI18nKey: 'info.unstakingPeriodTooltip_noToken',
    Input: UnstakingDurationInput,
    getInputError: ({ unstakingDuration } = {}) =>
      unstakingDuration?.value || unstakingDuration?.units,
    Review: UnstakingDurationReview,
  }
