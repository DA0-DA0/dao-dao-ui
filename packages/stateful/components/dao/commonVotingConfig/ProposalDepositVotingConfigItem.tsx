import { useEffect, useMemo, useState } from 'react'
import { UseFormWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { genericTokenSelector } from '@dao-dao/state/recoil'
import {
  DaoCreationConfig as DaoVotingCw20StakedConfig,
  GovernanceTokenType,
} from '@dao-dao/stateful/voting-module-adapter/adapters/DaoVotingCw20Staked/types'
import {
  AddressInput,
  FormSwitchCard,
  InputErrorMessage,
  InputLabel,
  Loader,
  MoneyEmoji,
  SelectInput,
  TokenInput,
  TokenInputOption,
  useChainContext,
} from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DaoCreationVotingConfigWithProposalDeposit,
  DepositRefundPolicy,
  GenericToken,
  TokenType,
} from '@dao-dao/types'
import {
  DaoVotingCw20StakedAdapterId,
  NEW_DAO_CW20_DECIMALS,
  convertMicroDenomToDenomWithDecimals,
  ibcAssets,
  isValidContractAddress,
  makeValidateContractAddress,
} from '@dao-dao/utils'

const DepositRefundPolicyValues = Object.values(DepositRefundPolicy)

const ProposalDepositInput = ({
  newDao: { votingModuleAdapter },
  data: {
    proposalDeposit: { enabled, type, denomOrAddress, token },
  },
  register,
  setValue,
  watch,
  errors,
}: DaoCreationVotingConfigItemInputProps<DaoCreationVotingConfigWithProposalDeposit>) => {
  const { t } = useTranslation()
  const {
    chain: { chain_id: chainId, bech32_prefix: bech32Prefix },
    nativeToken,
  } = useChainContext()

  const isDaoVotingCw20StakedAdapter =
    votingModuleAdapter.id === DaoVotingCw20StakedAdapterId
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
      isValidContractAddress(denomOrAddress, bech32Prefix)
      ? genericTokenSelector({
          chainId,
          type: TokenType.Cw20,
          denomOrAddress,
        })
      : type === 'native'
      ? genericTokenSelector({
          chainId,
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

  const availableTokens: TokenInputOption[] = [
    // Governance token first.
    ...(cw20GovernanceTokenSymbol
      ? [
          {
            type: 'voting_module_token',
            denomOrAddress: 'voting_module_token',
            symbol: cw20GovernanceTokenSymbol,
            description: t('title.governanceToken'),
            imageUrl: cw20GovernanceTokenImageUrl,
          },
        ]
      : []),
    // Then native.
    nativeToken,
    // Then other CW20.
    {
      type: TokenType.Cw20,
      denomOrAddress: 'other_cw20',
      symbol:
        (type === TokenType.Cw20 && tokenLoaded?.symbol) || t('form.cw20Token'),
      imageUrl: (type === TokenType.Cw20 && tokenLoaded?.imageUrl) || undefined,
    },
    // Then the IBC assets.
    ...ibcAssets,
  ]
  const selectedToken = availableTokens.find(
    (token) =>
      // `voting_module_token` and `cw20` only correspond to one token above.
      // `native` can be multiple, so match on denom.
      token.type === type &&
      (type !== TokenType.Native || token.denomOrAddress === denomOrAddress)
  )

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
            <TokenInput
              amountError={errors?.proposalDeposit?.amount}
              amountFieldName="proposalDeposit.amount"
              amountStep={minimum}
              onSelectToken={({ type, denomOrAddress }) => {
                // Type-check, should never happen.
                if (
                  type !== 'voting_module_token' &&
                  type !== TokenType.Native &&
                  type !== TokenType.Cw20
                ) {
                  return
                }

                setValue('proposalDeposit.type', type)

                if (type === TokenType.Native) {
                  setValue('proposalDeposit.denomOrAddress', denomOrAddress)
                } else {
                  // `voting_module_token` doesn't need one set, and cw20 shows
                  // an address input, so clear for both.
                  setValue('proposalDeposit.denomOrAddress', '')
                }
              }}
              register={register}
              required={false}
              selectedToken={selectedToken}
              setValue={setValue}
              tokenFallback={
                type === 'cw20'
                  ? !isValidContractAddress(denomOrAddress, bech32Prefix)
                    ? t('form.cw20Token')
                    : tokenLoadable.state === 'loading' && <Loader size={24} />
                  : undefined
              }
              tokens={{ loading: false, data: availableTokens }}
              watch={
                watch as UseFormWatch<DaoCreationVotingConfigWithProposalDeposit>
              }
            />

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
                validation={[makeValidateContractAddress(bech32Prefix)]}
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

const ProposalDepositReview = ({
  data: {
    proposalDeposit: { enabled, amount, token },
  },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationVotingConfigWithProposalDeposit>) => {
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

export const makeProposalDepositVotingConfigItem =
  (): DaoCreationVotingConfigItem<DaoCreationVotingConfigWithProposalDeposit> => ({
    Icon: MoneyEmoji,
    nameI18nKey: 'form.proposalDepositTitle',
    descriptionI18nKey: 'form.proposalDepositDescription',
    Input: ProposalDepositInput,
    getInputError: () => undefined,
    Review: ProposalDepositReview,
  })
