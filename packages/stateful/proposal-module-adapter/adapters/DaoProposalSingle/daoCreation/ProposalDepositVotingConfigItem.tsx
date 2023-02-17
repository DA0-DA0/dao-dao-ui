import { ArrowDropDown } from '@mui/icons-material'
import { ComponentType, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { eitherTokenInfoSelector } from '@dao-dao/state'
import {
  AddressInput,
  Button,
  FilterableItemPopup,
  FormSwitchCard,
  InputErrorMessage,
  InputLabel,
  Loader,
  MoneyEmoji,
  NumberInput,
  SelectInput,
} from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DepositRefundPolicy,
  GenericToken,
  TokenType,
} from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  NATIVE_DENOM,
  NEW_DAO_CW20_DECIMALS,
  convertMicroDenomToDenomWithDecimals,
  getFallbackImage,
  ibcAssets,
  isValidContractAddress,
  nativeTokenLabel,
  nativeTokenLogoURI,
  toAccessibleImageUrl,
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
    proposalDeposit: { enabled, type, denomOrAddress, token },
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

  // Governance token may be new or existing, so we have to handle both cases.
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
  const cw20GovernanceTokenImageUrl = isDaoVotingCw20StakedAdapter
    ? cw20StakedBalanceVotingAdapterData.tokenType === GovernanceTokenType.New
      ? cw20StakedBalanceVotingAdapterData.newInfo.imageUrl
      : cw20StakedBalanceVotingAdapterData.existingGovernanceTokenLogoUrl
    : undefined

  const memoizedCw20GovernanceToken: GenericToken = useMemo(
    () => ({
      // Does not matter.
      type: TokenType.Cw20,
      // Does not matter.
      denomOrAddress: '',
      // Does not matter.
      symbol: cw20GovernanceTokenSymbol ?? '',
      decimals: cw20GovernanceTokenDecimals ?? 0,
      imageUrl: cw20GovernanceTokenImageUrl,
    }),
    [
      cw20GovernanceTokenDecimals,
      cw20GovernanceTokenImageUrl,
      cw20GovernanceTokenSymbol,
    ]
  )

  const tokenLoadable = useRecoilValueLoadable(
    type === 'cw20' &&
      denomOrAddress &&
      isValidContractAddress(denomOrAddress, CHAIN_BECH32_PREFIX)
      ? eitherTokenInfoSelector({
          type: TokenType.Cw20,
          denomOrAddress,
        })
      : type === 'native'
      ? eitherTokenInfoSelector({
          type: TokenType.Native,
          denomOrAddress,
        })
      : type === 'voting_module_token'
      ? constSelector(memoizedCw20GovernanceToken)
      : constSelector(undefined)
  )
  const tokenLoaded =
    tokenLoadable.state === 'hasValue' ? tokenLoadable.contents : undefined

  // Update token and cw20 address error.
  const [cw20AddressError, setCw20AddressError] = useState<string>()
  useEffect(() => {
    // Update token info so we can use symbol and decimals later.
    if (
      tokenLoadable.state === 'hasValue' &&
      token !== tokenLoadable.contents
    ) {
      setValue('proposalDeposit.token', tokenLoadable.contents)
    }

    if (tokenLoadable.state !== 'hasError' || type !== 'cw20') {
      if (cw20AddressError) {
        setCw20AddressError(undefined)
      }
      return
    }

    if (!cw20AddressError && type === 'cw20') {
      setCw20AddressError(t('error.notCw20Address'))
    }
  }, [
    tokenLoadable.state,
    tokenLoadable.contents,
    setValue,
    t,
    cw20AddressError,
    token,
    type,
  ])

  const decimals = tokenLoaded?.decimals ?? 0
  const minimum = convertMicroDenomToDenomWithDecimals(1, decimals)

  const availableTokens: {
    key: string
    type: 'native' | 'cw20' | 'voting_module_token'
    label: string
    description?: string
    Icon?: ComponentType
  }[] = [
    // Governance token first.
    ...(cw20GovernanceTokenSymbol
      ? [
          {
            key: 'voting_module_token',
            type: 'voting_module_token' as const,
            label: '$' + cw20GovernanceTokenSymbol,
            imageUrl: cw20GovernanceTokenImageUrl,
          },
        ]
      : []),
    // Then native.
    {
      key: NATIVE_DENOM,
      type: 'native' as const,
      label: nativeTokenLabel(NATIVE_DENOM),
      imageUrl: nativeTokenLogoURI(NATIVE_DENOM),
    },
    // Then the IBC assets.
    ...ibcAssets.tokens.map(({ juno_denom, symbol, name, logoURI }) => ({
      key: juno_denom,
      type: 'native' as const,
      label: symbol,
      description: symbol === name ? undefined : name,
      imageUrl: logoURI,
    })),
    // Then other CW20.
    {
      key: 'other_cw20',
      type: 'cw20' as const,
      label: t('form.cw20Token'),
    },
  ].map(({ imageUrl, ...rest }) => ({
    ...rest,
    Icon: imageUrl
      ? () => (
          <div
            className="h-8 w-8 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )
      : undefined,
  }))

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

              <FilterableItemPopup
                Trigger={({ open, ...props }) => (
                  <Button
                    contentContainerClassName="justify-between"
                    pressed={open}
                    variant="secondary"
                    {...props}
                  >
                    {tokenLoaded ? (
                      <div className="flex flex-row items-center gap-2">
                        <div
                          className="h-6 w-6 shrink-0 rounded-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${toAccessibleImageUrl(
                              tokenLoaded.imageUrl ||
                                getFallbackImage(tokenLoaded.denomOrAddress)
                            )})`,
                          }}
                        />

                        <p>${tokenLoaded.symbol}</p>
                      </div>
                    ) : type === 'cw20' &&
                      !isValidContractAddress(
                        denomOrAddress,
                        CHAIN_BECH32_PREFIX
                      ) ? (
                      t('form.cw20Token')
                    ) : (
                      tokenLoadable.state === 'loading' && <Loader size={24} />
                    )}

                    <ArrowDropDown className="ml-2 !h-6 !w-6" />
                  </Button>
                )}
                filterableItemKeys={FILTERABLE_KEYS}
                items={availableTokens}
                onSelect={({ key, type }) => {
                  setValue('proposalDeposit.type', type)

                  // `key` for native tokens is the denom.
                  if (type === 'native') {
                    setValue('proposalDeposit.denomOrAddress', key)
                  } else {
                    // `voting_module_token` doesn't need one set, and `cw20`
                    // shows an address input, so clear for both.
                    setValue('proposalDeposit.denomOrAddress', '')
                  }
                }}
                searchPlaceholder={t('info.searchForToken')}
              />
            </div>

            <InputErrorMessage error={errors?.proposalDeposit?.amount} />
          </div>

          {type === 'cw20' && (
            <div className="flex flex-col gap-1">
              <AddressInput
                error={
                  errors?.proposalDeposit?.denomOrAddress ?? cw20AddressError
                }
                fieldName="proposalDeposit.denomOrAddress"
                placeholder={t('form.tokenAddress')}
                register={register}
                type="contract"
                validation={[validateContractAddress]}
              />

              <InputErrorMessage
                error={
                  errors?.proposalDeposit?.denomOrAddress ??
                  (cw20AddressError
                    ? { type: 'validate', message: cw20AddressError }
                    : undefined)
                }
              />
            </div>
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
  data: {
    proposalDeposit: { enabled, amount, token },
  },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationConfig>) => {
  const { t } = useTranslation()

  const decimals = token?.decimals ?? 0
  const symbol = token?.symbol || t('info.tokens')

  return !enabled ? (
    <>{t('info.none')}</>
  ) : (
    <>
      {t('format.token', {
        amount: amount.toLocaleString(undefined, {
          maximumFractionDigits: decimals,
        }),
        symbol,
      })}
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

const FILTERABLE_KEYS = ['key', 'label', 'description']
