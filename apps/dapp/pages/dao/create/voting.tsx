import { GetStaticProps, NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray } from 'react-hook-form'

import { useTranslation } from '@dao-dao/i18n'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { PlaceholderToken } from '@dao-dao/icons'
import { useWallet } from '@dao-dao/state'
import {
  Button,
  FormSwitch,
  ImageSelector,
  InputErrorMessage,
  InputLabel,
  Modal,
  NumberInput,
  RadioInput,
  TextInput,
} from '@dao-dao/ui'
import {
  validateContractAddress,
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

  // If wallet connected and empty tiers, fill in as first default.
  const [loadedPage, setLoadedPage] = useState(false)
  useEffect(() => {
    if (loadedPage) return
    setLoadedPage(true)

    if (!tiersAreUntouched || !walletAddress) return
    setValue('tiers.0.members.0.address', walletAddress)
  }, [loadedPage, setValue, tiersAreUntouched, walletAddress])

  const [showThresholdQuorumWarning, setShowThresholdQuorumWarning] =
    useState(false)

  const newTokenImageUrl = watchedNewDAO.governanceTokenOptions.newInfo.imageUrl

  const governanceTokenEnabled =
    watchedNewDAO.structure === NewDAOStructure.GovernanceToken
  // Only count treasury balance when creating new governance token.
  const initialTreasuryBalance =
    governanceTokenEnabled &&
    watchedNewDAO.governanceTokenOptions.type === GovernanceTokenType.New
      ? watchedNewDAO.governanceTokenOptions.newInfo.initialTreasuryBalance || 0
      : 0
  const memberWeightAllocated = useMemo(
    () =>
      watchedNewDAO.tiers.reduce(
        (acc, { weight, members }) => acc + weight * members.length,
        0
      ) || 0,
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
  const totalWeightAllocated = memberWeightAllocated + initialTreasuryBalance

  const { onlyOneTier, entries } = useVotingPowerDistributionData(
    watchedNewDAO,
    false,
    false,
    false
  )

  const configCardProps = {
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
                <>
                  <div className="flex flex-col gap-2 items-stretch">
                    <div className="grid grid-cols-[2fr_3fr] gap-12 items-center sm:grid-cols-[1fr_3fr]">
                      <p className="primary-text">{t('Treasury balance')}</p>

                      <div>
                        <div className="flex flex-row grow gap-4 items-center">
                          <NumberInput
                            containerClassName="grow"
                            error={
                              errors.governanceTokenOptions?.newInfo
                                ?.initialTreasuryBalance
                            }
                            fieldName="governanceTokenOptions.newInfo.initialTreasuryBalance"
                            onPlusMinus={[
                              () =>
                                setValue(
                                  'governanceTokenOptions.newInfo.initialTreasuryBalance',
                                  Math.max(
                                    initialTreasuryBalance + 1,
                                    1 / 10 ** NEW_DAO_CW20_DECIMALS
                                  )
                                ),
                              () =>
                                setValue(
                                  'governanceTokenOptions.newInfo.initialTreasuryBalance',
                                  Math.max(
                                    initialTreasuryBalance - 1,
                                    1 / 10 ** NEW_DAO_CW20_DECIMALS
                                  )
                                ),
                            ]}
                            register={register}
                            step={1 / 10 ** NEW_DAO_CW20_DECIMALS}
                            validation={[validatePositive, validateRequired]}
                          />

                          <div className="hidden flex-row gap-2 items-center text-tertiary sm:flex">
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
                            $
                            {watchedNewDAO.governanceTokenOptions.newInfo
                              .symbol || t('token')}
                          </div>
                        </div>

                        <InputErrorMessage
                          error={
                            errors.governanceTokenOptions?.newInfo
                              ?.initialTreasuryBalance
                          }
                        />
                      </div>
                    </div>

                    <p className="my-2 secondary-text">
                      {t('Treasury balance description', {
                        numberOfTokensMinted: totalWeightAllocated,
                        memberPercent:
                          totalWeightAllocated === 0
                            ? 0
                            : (memberWeightAllocated / totalWeightAllocated) *
                              100,
                        treasuryPercent:
                          totalWeightAllocated === 0
                            ? 0
                            : (initialTreasuryBalance / totalWeightAllocated) *
                              100,
                      })}
                    </p>
                  </div>

                  <div className="grid grid-cols-[2fr_3fr_4fr] gap-2 items-stretch sm:gap-4">
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
                          {t('Add an image')}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 justify-between">
                      <InputLabel mono name={t('Ticker symbol')} />

                      <div>
                        <TextInput
                          error={errors.governanceTokenOptions?.newInfo?.symbol}
                          fieldName="governanceTokenOptions.newInfo.symbol"
                          placeholder={t('Ticker symbol placeholder')}
                          register={register}
                          validation={[validateRequired, validateTokenSymbol]}
                        />
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
                </>
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
          <FormSwitch
            fieldName="_changeThresholdQuorumEnabled"
            onToggle={(newValue) => {
              if (newValue) {
                setShowThresholdQuorumWarning(true)
              } else {
                // Reset threshold and quorum.
                resetField('thresholdQuorum')
              }
            }}
            setValue={setValue}
            watch={watch}
          />

          <div className="flex flex-col gap-1">
            <InputLabel
              className="!body-text"
              name={t('Advanced voting configuration')}
            />
            <p className="caption-text">
              {t('Advanced voting configuration description')}
            </p>
          </div>
        </div>

        {watchedNewDAO._changeThresholdQuorumEnabled && (
          <div className="space-y-3">
            <CreateDAOThresholdCard {...configCardProps} />
            <CreateDAOQuorumCard {...configCardProps} />
          </div>
        )}
      </CreateDAOFormWrapper>

      {showThresholdQuorumWarning && (
        <Modal
          containerClassName="flex flex-col gap-4"
          onClose={() => setShowThresholdQuorumWarning(false)}
        >
          <p className="header-text">{t('Watch out!')}</p>

          <p className="body-text">{t('Advanced configuration warning')}</p>

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
            onClick={() => setShowThresholdQuorumWarning(false)}
          >
            {t('I accept the danger')}
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
