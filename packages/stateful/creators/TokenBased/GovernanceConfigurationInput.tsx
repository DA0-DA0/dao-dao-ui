import { Add } from '@mui/icons-material'
import clsx from 'clsx'
import cloneDeep from 'lodash.clonedeep'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import {
  Cw20BaseSelectors,
  genericTokenSelector,
  nativeSupplySelector,
  tokenFactoryDenomCreationFeeSelector,
} from '@dao-dao/state'
import {
  Button,
  ImageSelector,
  InputErrorMessage,
  InputLabel,
  Loader,
  NumberInput,
  SegmentedControls,
  TextInput,
  VotingPowerDistribution,
  VotingPowerDistributionEntry,
  useCachedLoading,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  CreateDaoCustomValidator,
  DaoCreationGovernanceConfigInputProps,
  TokenType,
} from '@dao-dao/types'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import {
  DISTRIBUTION_COLORS,
  NEW_DAO_TOKEN_DECIMALS,
  convertDenomToMicroDenomWithDecimals,
  formatPercentOf100,
  isValidBech32Address,
  isValidNativeTokenDenom,
  makeValidateAddress,
  validateNativeTokenDenom,
  validatePercent,
  validatePositive,
  validateRequired,
  validateTokenSymbol,
} from '@dao-dao/utils'

import { TokenBasedCreator } from '.'
import { EntityDisplay } from '../../components/EntityDisplay'
import { Trans } from '../../components/Trans'
import { useWallet } from '../../hooks/useWallet'
import { TierCard } from './TierCard'
import { CreatorData, GovernanceTokenType } from './types'

export const GovernanceConfigurationInput = ({
  data,
  context: {
    form: {
      control,
      formState: { errors },
      register,
      setValue,
      setError,
      clearErrors,
      watch,
    },
    setCustomValidator,
  },
}: DaoCreationGovernanceConfigInputProps<CreatorData>) => {
  const { t } = useTranslation()
  const { address: walletAddress } = useWallet()

  const {
    chain: { chain_id: chainId, bech32_prefix: bech32Prefix },
    config: { createWithCw20 },
  } = useSupportedChainContext()
  const isCw20 = !!createWithCw20

  const {
    fields: tierFields,
    append: appendTier,
    remove: removeTier,
  } = useFieldArray({
    control,
    name: 'creator.data.tiers',
  })

  const addTierRef = useRef<HTMLButtonElement>(null)
  const addTier = useCallback(() => {
    appendTier(cloneDeep(TokenBasedCreator.defaultConfig.tiers[0]))
    // Scroll button to bottom of screen.
    addTierRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [appendTier])

  // Load token factory denom creation fee.
  const tokenFactoryDenomCreationFeeLoading = useCachedLoading(
    tokenFactoryDenomCreationFeeSelector(chainId),
    undefined
  )
  useEffect(() => {
    if (
      data.tokenType === GovernanceTokenType.New &&
      !tokenFactoryDenomCreationFeeLoading.loading
    ) {
      setValue(
        'creator.data.tokenFactoryDenomCreationFee',
        tokenFactoryDenomCreationFeeLoading.data
      )
    } else {
      // No fee for using existing token.
      setValue('creator.data.tokenFactoryDenomCreationFee', undefined)
    }
  }, [data.tokenType, setValue, tokenFactoryDenomCreationFeeLoading])

  // Fill in default first tier info if tiers not yet edited.
  const [loadedPage, setLoadedPage] = useState(false)
  useEffect(() => {
    if (loadedPage) return
    setLoadedPage(true)

    if (
      !(
        data.tiers.length === 1 &&
        data.tiers[0].name === '' &&
        data.tiers[0].members.length === 1 &&
        data.tiers[0].members[0].address === ''
      )
    )
      return

    setValue('creator.data.tiers.0.name', t('form.defaultTierName'))
    if (walletAddress) {
      setValue('creator.data.tiers.0.members.0.address', walletAddress)
    }
  }, [data.tiers, loadedPage, setValue, t, walletAddress])

  //! Validate tiers.
  // Custom validation function for this page. Called upon attempt to navigate
  // forward.
  const customValidator: CreateDaoCustomValidator = useCallback(
    (setNewErrors) => {
      let valid = true

      const totalWeight =
        data.tiers.reduce(
          (acc, { weight, members }) => acc + weight * members.length,
          0
        ) || 0
      // Ensure voting power has been given to at least one member.
      if (totalWeight === 0) {
        if (setNewErrors) {
          setError('creator.data._tiersError', {
            message: t('error.noVotingPower'),
          })
        }
        valid = false
      } else if (errors?.creator?.data?._tiersError) {
        clearErrors('creator.data._tiersError')
      }

      // Ensure each tier has at least one member.
      data.tiers.forEach((tier, tierIndex) => {
        if (tier.members.length === 0) {
          if (setNewErrors) {
            setError(`creator.data.tiers.${tierIndex}._error`, {
              message: t('error.noMembers'),
            })
          }
          valid = false
        } else if (errors?.creator?.data?.tiers?.[tierIndex]?._error) {
          clearErrors(`creator.data.tiers.${tierIndex}._error`)
        }
      })

      return valid
    },
    [
      clearErrors,
      data.tiers,
      errors?.creator?.data?._tiersError,
      errors?.creator?.data?.tiers,
      setError,
      t,
    ]
  )
  // Update with function reference as needed.
  useEffect(() => {
    setCustomValidator(customValidator)
  }, [customValidator, setCustomValidator])

  //! Validate new governance token.
  const { initialTreasuryPercent, initialSupply } = data.newInfo
  const totalMemberPercent = data.tiers.reduce(
    (acc, { weight }) => acc + weight,
    0
  )
  const govTokenPercentsSumTo100 =
    initialTreasuryPercent + totalMemberPercent === 100

  //! Validate existing governance token.
  const existingGovernanceTokenIsCw20 =
    isCw20 &&
    !!data.existingTokenDenomOrAddress &&
    isValidBech32Address(data.existingTokenDenomOrAddress, bech32Prefix)
  const existingGovernanceTokenIsNative =
    !isCw20 &&
    !!data.existingTokenDenomOrAddress &&
    isValidNativeTokenDenom(data.existingTokenDenomOrAddress)
  const existingGovernanceTokenIsValid =
    existingGovernanceTokenIsNative || existingGovernanceTokenIsCw20

  const existingGovernanceTokenLoadable = useRecoilValueLoadable(
    existingGovernanceTokenIsValid
      ? genericTokenSelector({
          chainId,
          type: existingGovernanceTokenIsNative
            ? TokenType.Native
            : TokenType.Cw20,
          denomOrAddress: data.existingTokenDenomOrAddress,
        })
      : constSelector(undefined)
  )
  const existingGovernanceTokenSupply = useRecoilValueLoadable<
    TokenInfoResponse | number | undefined
  >(
    existingGovernanceTokenLoadable.state === 'hasValue' &&
      existingGovernanceTokenLoadable.contents
      ? existingGovernanceTokenIsNative
        ? nativeSupplySelector({
            chainId,
            denom: data.existingTokenDenomOrAddress,
          })
        : Cw20BaseSelectors.tokenInfoSelector({
            chainId,
            contractAddress: data.existingTokenDenomOrAddress,
            params: [],
          })
      : constSelector(undefined)
  )
  useEffect(() => {
    setValue(
      'creator.data.existingToken',
      existingGovernanceTokenLoadable.state === 'hasValue'
        ? existingGovernanceTokenLoadable.contents
        : undefined
    )
    setValue(
      'creator.data.existingTokenSupply',
      existingGovernanceTokenSupply.state === 'hasValue'
        ? typeof existingGovernanceTokenSupply.contents === 'number'
          ? existingGovernanceTokenSupply.contents.toString()
          : existingGovernanceTokenSupply.contents?.total_supply
        : undefined
    )

    if (
      existingGovernanceTokenLoadable.state !== 'hasError' &&
      existingGovernanceTokenSupply.state !== 'hasError'
    ) {
      if (errors?.creator?.data?.existingToken?._error) {
        clearErrors('creator.data.existingToken._error')
      }
      return
    }

    if (!errors?.creator?.data?.existingToken?._error) {
      setError('creator.data.existingToken._error', {
        type: 'manual',
        message: existingGovernanceTokenIsNative
          ? t('error.failedToGetFactoryTokenInfo')
          : t('error.failedToGetTokenInfo', {
              tokenType: 'CW20',
            }),
      })
    }
  }, [
    clearErrors,
    errors?.creator?.data?.existingToken?._error,
    existingGovernanceTokenLoadable,
    setError,
    setValue,
    t,
    existingGovernanceTokenSupply.state,
    existingGovernanceTokenSupply.contents,
    existingGovernanceTokenIsNative,
  ])

  //! Bar chart data

  const barData: VotingPowerDistributionEntry[] = [
    ...(tierFields.length === 1
      ? // Displaying each member of the first tier as separate pie wedges.
        data.tiers[0].members.map(({ address }, memberIndex) => ({
          address: address.trim(),
          // Backup if address is empty.
          label: t('form.membersAddress'),
          // Governance token-based DAO tier weights are split amongst members.
          votingPowerPercent:
            data.tiers[0].weight / data.tiers[0].members.length,
          color: DISTRIBUTION_COLORS[memberIndex % DISTRIBUTION_COLORS.length],
        }))
      : // Displaying entire tier as one pie wedge.
        data.tiers.map(({ name, weight }, tierIndex) => ({
          label: name.trim() || t('title.tierNum', { tier: tierIndex + 1 }),
          // Governance token-based DAO tier weights are split amongst members.
          votingPowerPercent: weight,
          color: DISTRIBUTION_COLORS[tierIndex % DISTRIBUTION_COLORS.length],
        }))),
    {
      label: t('title.treasury'),
      color: 'var(--text-interactive-disabled)',
      section: 2,
      votingPowerPercent: data.newInfo.initialTreasuryPercent,
    },
  ]

  return (
    <>
      <SegmentedControls
        className="mt-8 mb-4 w-max"
        onSelect={(tokenType) => setValue('creator.data.tokenType', tokenType)}
        selected={data.tokenType}
        tabs={[
          {
            label: t('button.createAToken'),
            value: GovernanceTokenType.New,
          },
          {
            label: t('button.useExistingToken'),
            value: GovernanceTokenType.Existing,
          },
        ]}
      />

      {data.tokenType === GovernanceTokenType.New ? (
        <>
          <div className="mb-10 rounded-lg bg-background-tertiary">
            <div className="flex h-14 flex-row border-b border-border-base p-4">
              <p className="primary-text text-text-body">
                {t('form.tokenDefinition')}
              </p>
            </div>

            <div className="flex flex-col items-stretch sm:flex-row">
              <div className="flex flex-col items-stretch sm:flex-row">
                {/* TODO(tokenfactory-image): add back in once token factory  supports URI metadata */}
                {isCw20 && (
                  <div className="flex flex-col items-center gap-5 border-b border-border-secondary py-6 px-10 sm:border-r sm:border-b-0">
                    <InputLabel name={t('form.image')} />
                    <ImageSelector
                      Trans={Trans}
                      error={errors.creator?.data?.newInfo?.imageUrl}
                      fieldName="creator.data.newInfo.imageUrl"
                      register={register}
                      setValue={setValue}
                      size={40}
                      watch={watch}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-5 border-b border-border-secondary py-6 px-8 sm:border-b-0 sm:border-r">
                  <InputLabel name={t('form.symbol')} />
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-2">
                      <p className="flex items-center justify-center rounded-full text-base text-text-tertiary">
                        $
                      </p>
                      <TextInput
                        error={errors.creator?.data?.newInfo?.symbol}
                        fieldName="creator.data.newInfo.symbol"
                        placeholder={t('form.governanceTokenSymbolPlaceholder')}
                        register={register}
                        validation={[validateRequired, validateTokenSymbol]}
                      />
                    </div>

                    <InputErrorMessage
                      error={errors.creator?.data?.newInfo?.symbol}
                    />
                  </div>
                </div>
              </div>
              <div className="flex grow flex-col gap-5 py-6 px-8">
                <InputLabel name={t('form.name')} />
                <div className="flex flex-col">
                  <TextInput
                    error={errors.creator?.data?.newInfo?.name}
                    fieldName="creator.data.newInfo.name"
                    placeholder={t('form.governanceTokenNamePlaceholder')}
                    register={register}
                    validation={[validateRequired]}
                  />
                  <InputErrorMessage
                    error={errors.creator?.data?.newInfo?.name}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center gap-6 border-y border-border-secondary py-7 px-6">
              <p className="primary-text text-text-body">
                {t('form.initialSupply')}
              </p>

              <div className="flex grow flex-col">
                <div className="flex grow flex-row items-center gap-2">
                  <NumberInput
                    className="symbol-small-body-text font-mono leading-5 text-text-secondary"
                    containerClassName="grow"
                    error={errors.creator?.data?.newInfo?.initialSupply}
                    fieldName="creator.data.newInfo.initialSupply"
                    ghost
                    register={register}
                    step={convertDenomToMicroDenomWithDecimals(
                      1,
                      NEW_DAO_TOKEN_DECIMALS
                    )}
                    validation={[validatePositive, validateRequired]}
                  />
                  <p className="symbol-small-body-text font-mono leading-5 text-text-tertiary">
                    $
                    {data.newInfo.symbol.trim() ||
                      t('info.token').toLocaleUpperCase()}
                  </p>
                </div>

                <InputErrorMessage
                  className="self-end"
                  error={errors.creator?.data?.newInfo?.initialSupply}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 py-7 px-6">
              <div className="flex flex-row items-center gap-6">
                <p className="primary-text text-text-body">
                  {t('info.treasuryPercent')}
                </p>

                <div className="flex grow flex-col">
                  <div className="flex grow flex-row items-center gap-2">
                    <NumberInput
                      className="symbol-small-body-text font-mono leading-5 text-text-secondary"
                      containerClassName="grow"
                      error={
                        errors.creator?.data?.newInfo?.initialTreasuryPercent
                      }
                      fieldName="creator.data.newInfo.initialTreasuryPercent"
                      ghost
                      register={register}
                      step={0.0001}
                      validation={[
                        validatePercent,
                        validateRequired,
                        // Error displayed in place of description.
                        () => govTokenPercentsSumTo100,
                      ]}
                    />

                    <p className="symbol-small-body-text font-mono leading-5 text-text-tertiary">
                      %
                    </p>
                  </div>

                  <InputErrorMessage
                    className="self-end"
                    error={errors.creator?.data?.newInfo?.initialSupply}
                  />
                </div>
              </div>

              <p
                className={clsx(
                  'secondary-text',
                  !govTokenPercentsSumTo100 && 'text-text-interactive-error'
                )}
              >
                {govTokenPercentsSumTo100
                  ? t('info.treasuryBalanceDescription', {
                      numberOfTokensMinted: initialSupply,
                      memberPercent: formatPercentOf100(totalMemberPercent),
                      treasuryPercent: formatPercentOf100(
                        initialTreasuryPercent
                      ),
                    })
                  : t('error.govTokenBalancesDoNotSumTo100', {
                      totalPercent: formatPercentOf100(
                        initialTreasuryPercent + totalMemberPercent
                      ),
                    })}
              </p>
            </div>
          </div>

          <p className="title-text mb-8">
            {t('title.initialTokenDistribution')}
          </p>

          <VotingPowerDistribution
            key={tierFields.length === 1 ? 'member' : 'tier'}
            // Force re-render when switching between tier-view and member-view.
            EntityDisplay={EntityDisplay}
            className="mb-6"
            data={barData}
          />

          <div className="flex flex-col items-stretch gap-4">
            {tierFields.map(({ id }, idx) => (
              <TierCard
                key={id}
                control={control}
                data={data}
                errors={errors}
                register={register}
                remove={
                  tierFields.length === 1 ? undefined : () => removeTier(idx)
                }
                setValue={setValue}
                showColorDotOnMember={tierFields.length === 1}
                tierIndex={idx}
                watch={watch}
              />
            ))}

            <div className="flex flex-col">
              <Button
                className="self-start"
                onClick={addTier}
                ref={addTierRef}
                variant="secondary"
              >
                <Add className="!h-6 !w-6 text-icon-primary" />
                <p>{t('button.addTier')}</p>
              </Button>

              <InputErrorMessage error={errors.creator?.data?._tiersError} />
            </div>
          </div>
        </>
      ) : data.tokenType === GovernanceTokenType.Existing ? (
        <div className="rounded-lg bg-background-tertiary">
          <div className="flex h-14 flex-row items-center border-b border-border-base p-4">
            <p className="primary-text text-text-body">
              {t('form.tokenIdentifier')}
            </p>
          </div>

          <div className="space-y-2 p-4">
            <div>
              <TextInput
                className="symbol-small-body-text font-mono text-text-secondary"
                error={errors.creator?.data?.existingTokenDenomOrAddress}
                fieldName="creator.data.existingTokenDenomOrAddress"
                ghost
                placeholder={
                  isCw20
                    ? bech32Prefix + '...'
                    : `"denom" OR "ibc/HASH" OR "factory/${bech32Prefix}.../denom"`
                }
                register={register}
                validation={[
                  validateRequired,
                  ...(isCw20
                    ? [makeValidateAddress(bech32Prefix)]
                    : [validateNativeTokenDenom]),
                ]}
              />
              <InputErrorMessage
                error={
                  errors.creator?.data?.existingTokenDenomOrAddress ||
                  errors.creator?.data?.existingToken?._error
                }
              />
            </div>

            {existingGovernanceTokenLoadable.state === 'loading' ? (
              <Loader />
            ) : (
              existingGovernanceTokenLoadable.state === 'hasValue' &&
              !!existingGovernanceTokenLoadable.contents && (
                <p className="primary-text text-text-interactive-valid">
                  ${existingGovernanceTokenLoadable.contents?.symbol}
                </p>
              )
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
