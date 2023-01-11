import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { Cw20BaseSelectors } from '@dao-dao/state'
import {
  AddressInput,
  FormSwitchCard,
  FormattedJsonDisplay,
  InputErrorMessage,
  InputLabel,
  MoneyEmoji,
  NumberInput,
  SelectInput,
} from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DepositRefundPolicy,
} from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  NATIVE_DENOM,
  NEW_DAO_CW20_DECIMALS,
  isValidContractAddress,
  nativeTokenDecimals,
  nativeTokenLabel,
  validateContractAddress,
  validatePositive,
} from '@dao-dao/utils'

import { DaoVotingCw20StakedAdapter } from '../../../../voting-module-adapter'
import {
  DaoCreationConfig as DaoVotingCw20StakedConfig,
  GovernanceTokenType,
} from '../../../../voting-module-adapter/adapters/DaoVotingCw20Staked/types'
import { DaoCreationConfig } from '../types'

const DepositRefundPolicyValues = Object.values(DepositRefundPolicy)

export const ProposalDepositInput = ({
  newDao: { votingModuleAdapter },
  data: {
    proposalDeposit: { enabled, type, cw20Address, cw20TokenInfo },
  },
  register,
  setValue,
  errors,
}: DaoCreationVotingConfigItemInputProps<DaoCreationConfig>) => {
  const { t } = useTranslation()

  const isDaoVotingCw20StakedAdapter =
    votingModuleAdapter.id === DaoVotingCw20StakedAdapter.id
  const cw20StakedBalanceVotingAdapterData =
    votingModuleAdapter.data as DaoVotingCw20StakedConfig

  const cw20GovernanceTokenSymbol = isDaoVotingCw20StakedAdapter
    ? cw20StakedBalanceVotingAdapterData.tokenType === GovernanceTokenType.New
      ? cw20StakedBalanceVotingAdapterData.newInfo.symbol
      : cw20StakedBalanceVotingAdapterData.existingGovernanceTokenInfo?.symbol
    : undefined
  const cw20GovernanceTokenDecimals = isDaoVotingCw20StakedAdapter
    ? cw20StakedBalanceVotingAdapterData.tokenType === GovernanceTokenType.New
      ? NEW_DAO_CW20_DECIMALS
      : cw20StakedBalanceVotingAdapterData.existingGovernanceTokenInfo?.decimals
    : undefined

  const cw20TokenInfoLoadable = useRecoilValueLoadable(
    type === 'cw20' &&
      cw20Address &&
      isValidContractAddress(cw20Address, CHAIN_BECH32_PREFIX)
      ? Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: cw20Address,
          params: [],
        })
      : constSelector(undefined)
  )
  const cw20TokenInfoLoaded =
    cw20TokenInfoLoadable.state === 'hasValue'
      ? cw20TokenInfoLoadable.contents
      : undefined

  // Update cw20 token info and address error.
  const [cw20AddressError, setCw20AddressError] = useState<string>()
  useEffect(() => {
    // Update token info so we can use symbol and decimals later.
    if (
      cw20TokenInfoLoadable.state === 'hasValue' &&
      cw20TokenInfo !== cw20TokenInfoLoadable.contents
    ) {
      setValue('proposalDeposit.cw20TokenInfo', cw20TokenInfoLoadable.contents)
    }

    if (cw20TokenInfoLoadable.state !== 'hasError') {
      if (cw20AddressError) {
        setCw20AddressError(undefined)
      }
      return
    }

    if (!cw20AddressError) {
      setCw20AddressError(t('error.notCw20Address'))
    }
  }, [
    cw20TokenInfoLoadable.state,
    cw20TokenInfoLoadable.contents,
    setValue,
    t,
    cw20AddressError,
    cw20TokenInfo,
  ])

  const decimals =
    type === 'native'
      ? nativeTokenDecimals(NATIVE_DENOM) ?? 0
      : type === 'voting_module_token'
      ? cw20GovernanceTokenDecimals ?? 0
      : // type === 'cw20'
        cw20TokenInfoLoaded?.decimals ?? 0
  const minimum = 1 / Math.pow(10, decimals)

  return (
    <div className="flex flex-col gap-2">
      <FormSwitchCard
        fieldName="proposalDeposit.enabled"
        setValue={setValue}
        sizing="sm"
        value={enabled}
      />

      {enabled && (
        <>
          <div className="space-y-1">
            <div className="flex flex-row items-stretch gap-2">
              <NumberInput
                containerClassName="grow"
                error={errors?.proposalDeposit?.amount}
                fieldName="proposalDeposit.amount"
                register={register}
                sizing="sm"
                step={minimum}
                validation={[validatePositive]}
              />

              <SelectInput
                error={errors?.proposalDeposit?.type}
                fieldName="proposalDeposit.type"
                register={register}
              >
                <option value="native">
                  ${nativeTokenLabel(NATIVE_DENOM)}
                </option>
                {cw20GovernanceTokenSymbol && (
                  <option value="voting_module_token">
                    ${cw20GovernanceTokenSymbol}
                  </option>
                )}
                <option value="cw20">{t('form.cw20Token')}</option>
              </SelectInput>
            </div>

            <InputErrorMessage error={errors?.proposalDeposit?.amount} />
          </div>

          {type === 'cw20' && (
            <>
              <div className="flex flex-col gap-1">
                <AddressInput
                  error={
                    errors?.proposalDeposit?.cw20Address ?? cw20AddressError
                  }
                  fieldName="proposalDeposit.cw20Address"
                  placeholder={t('form.tokenAddress')}
                  register={register}
                  type="contract"
                  validation={[validateContractAddress]}
                />

                <InputErrorMessage
                  error={
                    errors?.proposalDeposit?.cw20Address ??
                    (cw20AddressError
                      ? { type: 'validate', message: cw20AddressError }
                      : undefined)
                  }
                />
              </div>

              <FormattedJsonDisplay jsonLoadable={cw20TokenInfoLoadable} />
            </>
          )}

          <InputLabel className="mt-1" name={t('form.refundPolicyTitle')} />
          <SelectInput
            error={errors?.proposalDeposit?.refundPolicy}
            fieldName="proposalDeposit.refundPolicy"
            register={register}
          >
            {DepositRefundPolicyValues.map((depositRefundPolicy) => (
              <option key={depositRefundPolicy} value={depositRefundPolicy}>
                {t(`depositRefundPolicy.${depositRefundPolicy}`)}
              </option>
            ))}
          </SelectInput>
        </>
      )}
    </div>
  )
}

export const ProposalDepositReview = ({
  newDao: { votingModuleAdapter },
  data: {
    proposalDeposit: { enabled, amount, type, cw20TokenInfo },
  },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationConfig>) => {
  const { t } = useTranslation()

  const isDaoVotingCw20StakedAdapter =
    votingModuleAdapter.id === DaoVotingCw20StakedAdapter.id
  const cw20StakedBalanceVotingAdapterData =
    votingModuleAdapter.data as DaoVotingCw20StakedConfig

  const cw20GovernanceTokenSymbol = isDaoVotingCw20StakedAdapter
    ? cw20StakedBalanceVotingAdapterData.tokenType === GovernanceTokenType.New
      ? cw20StakedBalanceVotingAdapterData.newInfo.symbol
      : cw20StakedBalanceVotingAdapterData.existingGovernanceTokenInfo?.symbol
    : undefined
  const cw20GovernanceTokenDecimals = isDaoVotingCw20StakedAdapter
    ? cw20StakedBalanceVotingAdapterData.tokenType === GovernanceTokenType.New
      ? NEW_DAO_CW20_DECIMALS
      : cw20StakedBalanceVotingAdapterData.existingGovernanceTokenInfo?.decimals
    : undefined

  const decimals =
    type === 'native'
      ? nativeTokenDecimals(NATIVE_DENOM) ?? 0
      : type === 'voting_module_token'
      ? cw20GovernanceTokenDecimals ?? 0
      : // type === 'cw20'
        cw20TokenInfo?.decimals ?? 0
  const symbol =
    (type === 'native'
      ? nativeTokenLabel(NATIVE_DENOM)
      : type === 'voting_module_token'
      ? cw20GovernanceTokenSymbol
      : // type === 'cw20'
        cw20TokenInfo?.symbol) || t('info.tokens')

  return !enabled ? (
    <>{t('info.none')}</>
  ) : (
    <>
      {amount.toLocaleString(undefined, {
        maximumFractionDigits: decimals,
      })}{' '}
      ${symbol}
    </>
  )
}

export const ProposalDepositVotingConfigItem: DaoCreationVotingConfigItem<DaoCreationConfig> =
  {
    Icon: MoneyEmoji,
    nameI18nKey: 'form.proposalDepositTitle',
    descriptionI18nKey: 'form.proposalDepositDescription',
    Input: ProposalDepositInput,
    getInputError: () => undefined,
    Review: ProposalDepositReview,
  }
