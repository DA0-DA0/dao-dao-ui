import { useWallet } from '@noahsaso/cosmodal'
import clsx from 'clsx'
import { GetStaticProps, NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { useTranslation } from '@dao-dao/i18n'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { PlaceholderToken } from '@dao-dao/icons'
import { Cw20BaseSelectors } from '@dao-dao/state'
import {
  Button,
  ImageSelector,
  InputErrorMessage,
  InputLabel,
  Modal,
  NumberInput,
  RadioInput,
  Switch,
  TextInput,
  TokenInfoDisplay,
} from '@dao-dao/ui'
import {
  CHAIN_BECH32_PREFIX,
  formatPercentOf100,
  isValidContractAddress,
  validateContractAddress,
  validatePercent,
  validatePositive,
  validateRequired,
  validateTokenSymbol,
} from '@dao-dao/utils'

import {
  DEFAULT_NEW_DAO_GOV_TOKEN_INITIAL_TIER_WEIGHT,
  DEFAULT_NEW_DAO_SIMPLE_INITIAL_TIER_WEIGHT,
  DefaultNewDAO,
  GovernanceTokenType,
  NEW_DAO_CW20_DECIMALS,
  NewDAOStructure,
} from '@/atoms'
import {
  CreateDAOAllowRevotingCard,
  CreateDAOConfigCardSharedProps,
  CreateDAOConfigCardWrapper,
  CreateDAOFormWrapper,
  CreateDAOProposalDepositCard,
  CreateDAOQuorumCard,
  CreateDAORefundFailedProposalDepositCard,
  CreateDAOThresholdCard,
  CreateDAOTier,
  CreateDAOUnstakingDurationCard,
  CreateDAOVotingDurationCard,
  SmallScreenNav,
  VotingPowerChart,
  useVotingPowerDistributionData,
} from '@/components'
import { useCreateDAOForm } from '@/hooks'

const CreateDAOVotingPage: NextPage = () => {
  const { t } = useTranslation()
  const { address: walletAddress } = useWallet()
  const {
    watchedNewDAO,
    tiersAreUntouched,
    control,
    register,
    watch,
    errors,
    clearErrors,
    setError,
    setValue,
    getValues,
    formWrapperProps,
  } = useCreateDAOForm(1)

  const {
    fields: tiers,
    append: appendTier,
    remove: removeTier,
  } = useFieldArray({
    control,
    name: 'tiers',
  })

  // Fill in default first tier info if tiers not yet edited.
  const [loadedPage, setLoadedPage] = useState(false)
  useEffect(() => {
    if (loadedPage) return
    setLoadedPage(true)

    if (!tiersAreUntouched) return

    setValue('tiers.0.name', t('form.defaultTierName'))
    if (walletAddress) {
      setValue('tiers.0.members.0.address', walletAddress)
    }
  }, [loadedPage, setValue, t, tiersAreUntouched, walletAddress])

  const [showAdvancedVotingConfigWarning, setShowAdvancedVotingConfigWarning] =
    useState(false)
  const [showQuorumDisabledWarning, setShowQuorumDisabledWarning] =
    useState(false)

  const newTokenImageUrl = watchedNewDAO.governanceTokenOptions.newInfo.imageUrl

  const governanceTokenEnabled =
    watchedNewDAO.structure === NewDAOStructure.GovernanceToken
  const govTokenInitialSupply =
    watchedNewDAO.governanceTokenOptions.newInfo.initialSupply
  const govTokenTreasuryPercent =
    watchedNewDAO.governanceTokenOptions.newInfo.initialTreasuryPercent
  const govTokenMemberPercent = useMemo(
    () => watchedNewDAO.tiers.reduce((acc, { weight }) => acc + weight, 0) || 0,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // Tiers reference does not change even if contents do, so we need a
      // primitive to use for memoization comparison.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      watchedNewDAO.tiers
        .map(
          ({ weight, members }, idx) =>
            `${idx}:${weight}:${members.length}:${members
              .map(({ address }) => address)
              .join('_')}`
        )
        .join(),
    ]
  )
  const govTokenPercentsSumTo100 =
    govTokenTreasuryPercent + govTokenMemberPercent === 100

  const { onlyOneTier, entries } = useVotingPowerDistributionData(
    watchedNewDAO,
    false
  )

  // Validate existing governance token.
  const existingGovernanceTokenAddress =
    governanceTokenEnabled &&
    watchedNewDAO.governanceTokenOptions.type === GovernanceTokenType.Existing
      ? watchedNewDAO.governanceTokenOptions.existingGovernanceTokenAddress
      : undefined
  const existingGovernanceTokenInfoLoadable = useRecoilValueLoadable(
    existingGovernanceTokenAddress &&
      isValidContractAddress(
        existingGovernanceTokenAddress,
        CHAIN_BECH32_PREFIX
      )
      ? Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: existingGovernanceTokenAddress,
          params: [],
        })
      : constSelector(undefined)
  )
  useEffect(() => {
    setValue(
      'governanceTokenOptions.existingGovernanceTokenInfo',
      existingGovernanceTokenInfoLoadable.state === 'hasValue'
        ? existingGovernanceTokenInfoLoadable.contents
        : undefined
    )

    if (existingGovernanceTokenInfoLoadable.state !== 'hasError') {
      if (errors?.governanceTokenOptions?.existingGovernanceTokenInfo) {
        clearErrors('governanceTokenOptions.existingGovernanceTokenInfo._error')
      }
      return
    }

    if (!errors?.governanceTokenOptions?.existingGovernanceTokenInfo) {
      setError('governanceTokenOptions.existingGovernanceTokenInfo._error', {
        type: 'manual',
        message: t('error.failedToGetTokenInfo'),
      })
    }
  }, [
    clearErrors,
    errors?.governanceTokenOptions?.existingGovernanceTokenInfo,
    existingGovernanceTokenInfoLoadable,
    setError,
    setValue,
    t,
  ])

  const configCardProps: CreateDAOConfigCardSharedProps = {
    errors,
    newDAO: watchedNewDAO,
    register,
    setValue,
    watch,
  }

  return (
    <>
      <SmallScreenNav />

      <CreateDAOFormWrapper
        containerClassName="flex flex-col gap-8"
        {...formWrapperProps}
      >
        {governanceTokenEnabled && (
          <div className="space-y-3">
            <RadioInput
              fieldName="governanceTokenOptions.type"
              options={[
                {
                  label: t('button.createAToken'),
                  value: GovernanceTokenType.New,
                },
                {
                  label: t('button.useExistingToken'),
                  value: GovernanceTokenType.Existing,
                },
              ]}
              setValue={setValue}
              watch={watch}
            />

            <CreateDAOConfigCardWrapper className="mb-9 gap-8">
              {watchedNewDAO.governanceTokenOptions.type ===
              GovernanceTokenType.New ? (
                <div className="flex flex-col items-stretch gap-2">
                  <div className="mb-4 grid grid-cols-[2fr_3fr_4fr] items-stretch gap-2 sm:gap-4">
                    <div className="flex flex-col items-start justify-between gap-2">
                      <InputLabel mono name={t('form.tokenImage')} />
                      <div className="flex flex-row items-center justify-start gap-2 justify-self-start">
                        <ImageSelector
                          error={
                            errors.governanceTokenOptions?.newInfo?.imageUrl
                          }
                          fieldName="governanceTokenOptions.newInfo.imageUrl"
                          register={register}
                          size={36}
                          watch={watch}
                        />
                        <p className="hidden text-disabled sm:block">
                          {t('info.setAnImage')}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between gap-2">
                      <InputLabel
                        mono
                        name={t('form.governanceTokenSymbolTitle')}
                      />

                      <div>
                        <div className="flex flex-row items-center gap-2">
                          <p className="flex items-center justify-center rounded-full text-base text-disabled">
                            $
                          </p>
                          <TextInput
                            error={
                              errors.governanceTokenOptions?.newInfo?.symbol
                            }
                            fieldName="governanceTokenOptions.newInfo.symbol"
                            placeholder={t(
                              'form.governanceTokenSymbolPlaceholder'
                            )}
                            register={register}
                            validation={[validateRequired, validateTokenSymbol]}
                          />
                        </div>

                        <InputErrorMessage
                          error={errors.governanceTokenOptions?.newInfo?.symbol}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-between gap-2">
                      <InputLabel
                        mono
                        name={t('form.governanceTokenNameTitle')}
                      />

                      <div>
                        <TextInput
                          error={errors.governanceTokenOptions?.newInfo?.name}
                          fieldName="governanceTokenOptions.newInfo.name"
                          placeholder={t('form.governanceTokenNamePlaceholder')}
                          register={register}
                          validation={[validateRequired]}
                        />
                        <InputErrorMessage
                          error={errors.governanceTokenOptions?.newInfo?.name}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-[2fr_3fr_auto] items-center gap-x-4 gap-y-2">
                    <p className="primary-text">{t('form.initialSupply')}</p>

                    <div className="pl-8">
                      <NumberInput
                        containerClassName="grow"
                        error={
                          errors.governanceTokenOptions?.newInfo?.initialSupply
                        }
                        fieldName="governanceTokenOptions.newInfo.initialSupply"
                        onPlusMinus={[
                          () =>
                            setValue(
                              'governanceTokenOptions.newInfo.initialSupply',
                              Math.max(
                                govTokenInitialSupply + 1,
                                1 / 10 ** NEW_DAO_CW20_DECIMALS
                              )
                            ),
                          () =>
                            setValue(
                              'governanceTokenOptions.newInfo.initialSupply',
                              Math.max(
                                govTokenInitialSupply - 1,
                                1 / 10 ** NEW_DAO_CW20_DECIMALS
                              )
                            ),
                        ]}
                        register={register}
                        step={1 / 10 ** NEW_DAO_CW20_DECIMALS}
                        validation={[validatePositive, validateRequired]}
                      />

                      <InputErrorMessage
                        error={
                          errors.governanceTokenOptions?.newInfo?.initialSupply
                        }
                      />
                    </div>

                    <div className="flex flex-row items-center gap-2 text-tertiary">
                      {newTokenImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          alt=""
                          className="h-9 w-9 rounded-full object-cover"
                          src={newTokenImageUrl}
                        />
                      ) : (
                        <PlaceholderToken
                          className="rounded-full border border-default p-2"
                          color="rgba(var(--dark), 0.3)"
                          height="2.25rem"
                          width="2.25rem"
                        />
                      )}
                      <p className="hidden sm:flex">
                        $
                        {watchedNewDAO.governanceTokenOptions.newInfo.symbol ||
                          t('info.tokens')}
                      </p>
                    </div>

                    <p className="primary-text">{t('info.treasuryPercent')}</p>

                    <div className="pl-8">
                      <NumberInput
                        containerClassName="grow"
                        error={
                          errors.governanceTokenOptions?.newInfo
                            ?.initialTreasuryPercent
                        }
                        fieldName="governanceTokenOptions.newInfo.initialTreasuryPercent"
                        onPlusMinus={[
                          () =>
                            setValue(
                              'governanceTokenOptions.newInfo.initialTreasuryPercent',
                              Math.min(
                                Math.max(govTokenTreasuryPercent + 1, 0),
                                100
                              )
                            ),
                          () =>
                            setValue(
                              'governanceTokenOptions.newInfo.initialTreasuryPercent',
                              Math.min(
                                Math.max(govTokenTreasuryPercent - 1, 0),
                                100
                              )
                            ),
                        ]}
                        register={register}
                        step={0.001}
                        validation={[
                          validatePercent,
                          validateRequired,
                          // Error displayed in place of description.
                          () => govTokenPercentsSumTo100,
                        ]}
                      />

                      <InputErrorMessage
                        error={
                          errors.governanceTokenOptions?.newInfo
                            ?.initialTreasuryPercent
                        }
                      />
                    </div>

                    <p className="flex h-9 w-9 items-center justify-center rounded-full p-2 text-base text-disabled">
                      %
                    </p>
                  </div>

                  <p
                    className={clsx('secondary-text mt-2', {
                      'text-error': !govTokenPercentsSumTo100,
                    })}
                  >
                    {govTokenPercentsSumTo100
                      ? t('info.treasuryBalanceDescription', {
                          numberOfTokensMinted: govTokenInitialSupply,
                          memberPercent: formatPercentOf100(
                            govTokenMemberPercent
                          ),
                          treasuryPercent: formatPercentOf100(
                            govTokenTreasuryPercent
                          ),
                        })
                      : t('error.govTokenBalancesDoNotSumTo100', {
                          totalPercent: formatPercentOf100(
                            govTokenTreasuryPercent + govTokenMemberPercent
                          ),
                        })}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="primary-text">
                    {t('form.tokenContractAddressTitle')}
                  </p>

                  <TextInput
                    error={
                      errors.governanceTokenOptions
                        ?.existingGovernanceTokenAddress
                    }
                    fieldName="governanceTokenOptions.existingGovernanceTokenAddress"
                    register={register}
                    validation={[
                      validateContractAddress,
                      validateRequired,
                      () =>
                        existingGovernanceTokenInfoLoadable.state !==
                          'loading' ||
                        !!watchedNewDAO.governanceTokenOptions
                          .existingGovernanceTokenInfo ||
                        t('info.verifyingGovernanceToken'),
                    ]}
                  />
                  <InputErrorMessage
                    error={
                      errors.governanceTokenOptions
                        ?.existingGovernanceTokenAddress ||
                      errors.governanceTokenOptions?.existingGovernanceTokenInfo
                        ?._error
                    }
                  />

                  <TokenInfoDisplay
                    loadingTokenInfo={
                      existingGovernanceTokenInfoLoadable.state === 'loading'
                    }
                    tokenInfo={
                      watchedNewDAO.governanceTokenOptions
                        .existingGovernanceTokenInfo
                    }
                  />
                </div>
              )}
            </CreateDAOConfigCardWrapper>
          </div>
        )}
        {(!governanceTokenEnabled ||
          // Only allow token distribution if creating a new token.
          watchedNewDAO.governanceTokenOptions.type ===
            GovernanceTokenType.New) && (
          <>
            <div className="flex flex-col items-stretch gap-4">
              {governanceTokenEnabled && (
                <p>{t('form.tokenDistributionTitle')}</p>
              )}

              {tiers.map(({ id }, idx) => (
                <CreateDAOTier
                  key={id}
                  control={control}
                  errors={errors}
                  newDAO={watchedNewDAO}
                  register={register}
                  remove={onlyOneTier ? undefined : () => removeTier(idx)}
                  setValue={setValue}
                  showColorDotOnMember={onlyOneTier}
                  tierIndex={idx}
                />
              ))}

              <div className="flex flex-col">
                <Button
                  className="self-start"
                  onClick={() =>
                    appendTier({
                      name: '',
                      weight:
                        getValues('structure') ===
                        NewDAOStructure.GovernanceToken
                          ? DEFAULT_NEW_DAO_GOV_TOKEN_INITIAL_TIER_WEIGHT
                          : DEFAULT_NEW_DAO_SIMPLE_INITIAL_TIER_WEIGHT,
                      members: [
                        {
                          address: '',
                        },
                      ],
                    })
                  }
                  variant="secondary"
                >
                  {t('button.addTier')}
                </Button>

                <InputErrorMessage error={errors._tiersError} />
              </div>
            </div>

            <div className="mx-auto w-full max-w-md">
              <VotingPowerChart data={entries} />
            </div>
          </>
        )}

        <CreateDAOVotingDurationCard {...configCardProps} />

        {governanceTokenEnabled && (
          <div className="-mt-5 space-y-3">
            <CreateDAOProposalDepositCard {...configCardProps} />

            {!!watchedNewDAO.governanceTokenOptions.proposalDeposit.value && (
              <CreateDAORefundFailedProposalDepositCard {...configCardProps} />
            )}

            <CreateDAOUnstakingDurationCard {...configCardProps} />
          </div>
        )}

        <div className="flex flex-row items-center gap-4">
          <Switch
            enabled={watchedNewDAO.showAdvancedVotingConfig}
            onClick={() => {
              if (!watchedNewDAO.showAdvancedVotingConfig) {
                // Set to true once accepting modal.
                setShowAdvancedVotingConfigWarning(true)
              } else {
                setValue('showAdvancedVotingConfig', false)
                // Set advanced voting config options to defaults so any
                // values modified while the config was showing are undone.
                setValue(
                  'advancedVotingConfig',
                  DefaultNewDAO.advancedVotingConfig
                )
              }
            }}
          />

          <div className="flex flex-col gap-1">
            <InputLabel
              className="!body-text"
              name={t('form.advancedVotingConfigTitle')}
            />
            <p className="caption-text">
              {t('form.advancedVotingConfigDescription')}
            </p>
          </div>
        </div>

        {watchedNewDAO.showAdvancedVotingConfig && (
          <div className="space-y-3">
            <CreateDAOAllowRevotingCard {...configCardProps} />
            <CreateDAOThresholdCard {...configCardProps} />
            <CreateDAOQuorumCard
              {...configCardProps}
              showWarningModal={() => setShowQuorumDisabledWarning(true)}
            />
          </div>
        )}
      </CreateDAOFormWrapper>

      {showAdvancedVotingConfigWarning && (
        <Modal
          containerClassName="flex flex-col gap-4"
          onClose={() => setShowAdvancedVotingConfigWarning(false)}
        >
          <p className="header-text">{t('title.watchOut')}</p>

          <p className="body-text">{t('info.advancedVotingConfigWarning')}</p>

          <a
            className="block underline"
            href="https://docs.daodao.zone/docs/voting-config"
            rel="noreferrer"
            target="_blank"
          >
            {t('button.learnMore')}
          </a>

          <Button
            className="self-end"
            onClick={() => {
              setValue('showAdvancedVotingConfig', true)
              setShowAdvancedVotingConfigWarning(false)
            }}
          >
            {t('button.iAcceptDanger')}
          </Button>
        </Modal>
      )}

      {showQuorumDisabledWarning && (
        <Modal
          containerClassName="flex flex-col gap-4"
          onClose={() => setShowQuorumDisabledWarning(false)}
        >
          <p className="header-text">{t('title.watchOut')}</p>

          <p className="body-text">
            {t('info.advancedQuorumDisabledConfigWarning')}
          </p>

          <a
            className="block underline"
            href="https://docs.daodao.zone/docs/voting-config"
            rel="noreferrer"
            target="_blank"
          >
            {t('button.learnMore')}
          </a>

          <Button
            className="self-end"
            onClick={() => {
              setValue(
                'advancedVotingConfig.thresholdQuorum.quorumEnabled',
                false
              )
              setShowQuorumDisabledWarning(false)
            }}
          >
            {t('button.iAcceptDanger')}
          </Button>
        </Modal>
      )}
    </>
  )
}

export default CreateDAOVotingPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
