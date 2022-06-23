import clsx from 'clsx'
import { GetStaticProps, NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray } from 'react-hook-form'

import { useTranslation } from '@dao-dao/i18n'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { PlaceholderToken } from '@dao-dao/icons'
import { useWallet } from '@dao-dao/state'
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
} from '@dao-dao/ui'
import {
  validateContractAddress,
  validatePercent,
  validatePositive,
  validateRequired,
  validateTokenSymbol,
} from '@dao-dao/utils'

import {
  DEFAULT_NEW_DAO_GOV_TOKEN_INITIAL_TIER_WEIGHT,
  DEFAULT_NEW_DAO_SIMPLE_INITIAL_TIER_WEIGHT,
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
    setValue,
    resetField,
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

    setValue('tiers.0.name', t('defaultTierName'))
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
                  label: t('Create a token'),
                  value: GovernanceTokenType.New,
                },
                {
                  label: t('Use existing token'),
                  value: GovernanceTokenType.Existing,
                },
              ]}
              setValue={setValue}
              watch={watch}
            />

            <CreateDAOConfigCardWrapper className="gap-8 mb-9">
              {watchedNewDAO.governanceTokenOptions.type ===
              GovernanceTokenType.New ? (
                <div className="flex flex-col gap-2 items-stretch">
                  <div className="grid grid-cols-[2fr_3fr_4fr] gap-2 items-stretch mb-4 sm:gap-4">
                    <div className="flex flex-col gap-2 justify-between items-start">
                      <InputLabel mono name={t('Token image')} />
                      <div className="flex flex-row gap-2 justify-start justify-self-start items-center">
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
                          {t('setAnImage')}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 justify-between">
                      <InputLabel mono name={t('tickerSymbol')} />

                      <div>
                        <div className="flex flex-row gap-2 items-center">
                          <p className="flex justify-center items-center text-base text-disabled rounded-full">
                            $
                          </p>
                          <TextInput
                            error={
                              errors.governanceTokenOptions?.newInfo?.symbol
                            }
                            fieldName="governanceTokenOptions.newInfo.symbol"
                            placeholder={t('tickerSymbolPlaceholder')}
                            register={register}
                            validation={[validateRequired, validateTokenSymbol]}
                          />
                        </div>

                        <InputErrorMessage
                          error={errors.governanceTokenOptions?.newInfo?.symbol}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 justify-between">
                      <InputLabel mono name={t('Governance token name')} />

                      <div>
                        <TextInput
                          error={errors.governanceTokenOptions?.newInfo?.name}
                          fieldName="governanceTokenOptions.newInfo.name"
                          placeholder={t('Governance token placeholder')}
                          register={register}
                          validation={[validateRequired]}
                        />
                        <InputErrorMessage
                          error={errors.governanceTokenOptions?.newInfo?.name}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-[2fr_3fr_auto] gap-x-4 gap-y-2 items-center">
                    <p className="primary-text">{t('initialSupply')}</p>

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

                    <div className="flex flex-row gap-2 items-center text-tertiary">
                      {newTokenImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          alt=""
                          className="w-9 h-9 rounded-full"
                          src={newTokenImageUrl}
                        />
                      ) : (
                        <PlaceholderToken
                          className="p-2 rounded-full border border-default"
                          color="rgba(var(--dark), 0.3)"
                          height="2.25rem"
                          width="2.25rem"
                        />
                      )}
                      <p className="hidden sm:flex">
                        $
                        {watchedNewDAO.governanceTokenOptions.newInfo.symbol ||
                          t('token')}
                      </p>
                    </div>

                    <p className="primary-text">{t('treasuryPercent')}</p>

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

                    <p className="flex justify-center items-center p-2 w-9 h-9 text-base text-disabled rounded-full">
                      %
                    </p>
                  </div>

                  <p
                    className={clsx('mt-2 secondary-text', {
                      'text-error': !govTokenPercentsSumTo100,
                    })}
                  >
                    {govTokenPercentsSumTo100
                      ? t('Treasury balance description', {
                          numberOfTokensMinted: govTokenInitialSupply,
                          memberPercent: govTokenMemberPercent,
                          treasuryPercent: govTokenTreasuryPercent,
                        })
                      : t('govTokenBalancesDoNotSumTo100', {
                          totalPercent:
                            govTokenTreasuryPercent + govTokenMemberPercent,
                        })}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="primary-text">{t('Token contract address')}</p>

                  <TextInput
                    error={
                      errors.governanceTokenOptions
                        ?.existingGovernanceTokenAddress
                    }
                    fieldName="governanceTokenOptions.existingGovernanceTokenAddress"
                    register={register}
                    validation={[validateContractAddress, validateRequired]}
                  />
                  <InputErrorMessage
                    error={
                      errors.governanceTokenOptions
                        ?.existingGovernanceTokenAddress
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
            <div className="flex flex-col gap-4 items-stretch">
              {governanceTokenEnabled && <p>{t('Token distribution')}</p>}

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
                  {t('Add tier')}
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

        <div className="flex flex-row gap-4 items-center">
          <Switch
            on={watchedNewDAO._changeThresholdQuorumEnabled}
            onClick={() => {
              const newValue = !watchedNewDAO._changeThresholdQuorumEnabled
              if (newValue) {
                // Set to true once accepting modal.
                setShowAdvancedVotingConfigWarning(true)
              } else {
                setValue('_changeThresholdQuorumEnabled', false)
                // Reset threshold and quorum.
                resetField('thresholdQuorum')
              }
            }}
          />

          <div className="flex flex-col gap-1">
            <InputLabel
              className="!body-text"
              name={t('advancedVotingConfig')}
            />
            <p className="caption-text">
              {t('advancedVotingConfigDescription')}
            </p>
          </div>
        </div>

        {watchedNewDAO._changeThresholdQuorumEnabled && (
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
          <p className="header-text">{t('watchOut')}</p>

          <p className="body-text">{t('advancedVotingConfigWarning')}</p>

          <a
            className="block underline"
            href="https://docs.daodao.zone/docs/voting-config"
            rel="noreferrer"
            target="_blank"
          >
            {t('learnMore')}
          </a>

          <Button
            className="self-end"
            onClick={() => {
              setValue('_changeThresholdQuorumEnabled', true)
              setShowAdvancedVotingConfigWarning(false)
            }}
          >
            {t('iAcceptDanger')}
          </Button>
        </Modal>
      )}

      {showQuorumDisabledWarning && (
        <Modal
          containerClassName="flex flex-col gap-4"
          onClose={() => setShowQuorumDisabledWarning(false)}
        >
          <p className="header-text">{t('watchOut')}</p>

          <p className="body-text">
            {t('advancedQuorumDisabledConfigWarning')}
          </p>

          <a
            className="block underline"
            href="https://docs.daodao.zone/docs/voting-config"
            rel="noreferrer"
            target="_blank"
          >
            {t('learnMore')}
          </a>

          <Button
            className="self-end"
            onClick={() => {
              setValue('thresholdQuorum.quorumEnabled', false)
              setShowQuorumDisabledWarning(false)
            }}
          >
            {t('iAcceptDanger')}
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
