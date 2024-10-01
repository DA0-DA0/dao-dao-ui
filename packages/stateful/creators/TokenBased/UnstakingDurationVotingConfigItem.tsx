import { useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { contractQueries } from '@dao-dao/state/query'
import {
  ClockEmoji,
  HugeDecimalInput,
  InputErrorMessage,
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
  TokenType,
} from '@dao-dao/types'
import {
  convertDurationWithUnitsToHumanReadableString,
  isSecretNetwork,
  isValidBech32Address,
  makeValidateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { AddressInput } from '../../components/AddressInput'
import { useQueryLoadingDataWithError } from '../../hooks'
import { CreatorData, GovernanceTokenType } from './types'

export const UnstakingDurationInput = ({
  data: {
    govTokenType,
    selectedTokenType,
    unstakingDuration,
    customStakingAddress,
  },
  register,
  setValue,
  getValues,
  watch,
  errors,
}: DaoCreationVotingConfigItemInputProps<CreatorData>) => {
  const { t } = useTranslation()

  const holdingAltForCustomStaking = useHoldingKey({ key: 'alt' })

  const {
    chainId,
    chain: { bech32_prefix: bech32Prefix },
  } = useSupportedChainContext()

  const showCustomStakingAddress =
    selectedTokenType === TokenType.Cw20 && customStakingAddress !== undefined

  // Load custom staking contract code hash on Secret Network.
  const customStakingCodeHash = useQueryLoadingDataWithError(
    isSecretNetwork(chainId) &&
      customStakingAddress &&
      isValidBech32Address(customStakingAddress, bech32Prefix)
      ? contractQueries.secretCodeHash({
          chainId,
          address: customStakingAddress,
        })
      : undefined
  )
  useEffect(() => {
    if (!isSecretNetwork(chainId)) {
      return
    }

    setValue(
      'customStakingCodeHash',
      customStakingCodeHash.loading ||
        customStakingCodeHash.updating ||
        customStakingCodeHash.errored
        ? undefined
        : customStakingCodeHash.data
    )
  }, [setValue, chainId, customStakingCodeHash])

  return (
    <>
      {selectedTokenType === TokenType.Cw20 &&
        govTokenType === GovernanceTokenType.Existing &&
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

          <InputErrorMessage
            error={
              errors?.customStakingAddress ||
              (customStakingCodeHash.errored
                ? customStakingCodeHash.error
                : undefined)
            }
          />
        </div>
      ) : (
        <div className="flex flex-row gap-2">
          <HugeDecimalInput
            containerClassName="grow"
            error={errors?.unstakingDuration?.value}
            fieldName="unstakingDuration.value"
            getValues={getValues}
            min={1}
            numericValue
            register={register}
            setValue={setValue}
            sizing="sm"
            step={1}
            validation={[validatePositive, validateRequired]}
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
