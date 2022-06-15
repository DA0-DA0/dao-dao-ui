import Emoji from 'a11y-react-emoji'
import { FC, useMemo, useState } from 'react'
import { useFieldArray } from 'react-hook-form'

import i18n from '@dao-dao/i18n'
import { PlaceholderToken } from '@dao-dao/icons'
import {
  Button,
  FormSwitch,
  ImageSelector,
  InputErrorMessage,
  InputLabel,
  Modal,
  NumberInput,
  RadioInput,
  SelectInput,
  TextInput,
} from '@dao-dao/ui'
import {
  validateContractAddress,
  validateNonNegative,
  validatePositive,
  validateRequired,
  validateTokenSymbol,
} from '@dao-dao/utils'

import {
  DEFAULT_NEW_DAO_GOV_TOKEN_INITIAL_TIER_WEIGHT,
  DEFAULT_NEW_DAO_SIMPLE_INITIAL_TIER_WEIGHT,
  DurationUnitsValues,
  GovernanceTokenType,
  NEW_DAO_CW20_DECIMALS,
  NewDAOStructure,
} from '@/atoms'
import {
  CreateDAOConfigCard,
  CreateDAOConfigCardWrapper,
  CreateDAOFormWrapper,
  CreateDAOQuorumCard,
  CreateDAOThresholdCard,
  CreateDAOTier,
  SmallScreenNav,
  VotingPowerChart,
  useVotingPowerDistributionData,
} from '@/components'
import { useCreateDAOForm } from '@/hooks'

const CreateDAOVotingPage: FC = () => {
  const {
    watchedNewDAO,
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

  const [showThresholdQuorumWarning, setShowThresholdQuorumWarning] =
    useState(false)
  const threshold = watchedNewDAO.thresholdQuorum.threshold
  const quorum = watchedNewDAO.thresholdQuorum.quorum

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
              label="governanceTokenOptions.type"
              options={[
                {
                  label: i18n.t('Create a token'),
                  value: GovernanceTokenType.New,
                },
                {
                  label: i18n.t('Use existing token'),
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
                      <p className="primary-text">
                        {i18n.t('Treasury balance')}
                      </p>

                      <div>
                        <div className="flex flex-row grow gap-4 items-center">
                          <NumberInput
                            containerClassName="grow"
                            error={
                              errors.governanceTokenOptions?.newInfo
                                ?.initialTreasuryBalance
                            }
                            label="governanceTokenOptions.newInfo.initialTreasuryBalance"
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

                            {watchedNewDAO.governanceTokenOptions.newInfo
                              .symbol || 'Token'}
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
                      {i18n.t('Treasury balance description', {
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
                      <InputLabel mono name={i18n.t('Token image')} />
                      <div className="flex flex-row gap-2 justify-start justify-self-start items-center">
                        <ImageSelector
                          error={
                            errors.governanceTokenOptions?.newInfo?.imageUrl
                          }
                          label="governanceTokenOptions.newInfo.imageUrl"
                          register={register}
                          size={36}
                          watch={watch}
                        />
                        <p className="hidden text-disabled sm:block">
                          {i18n.t('Add an image')}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 justify-between">
                      <InputLabel mono name={i18n.t('Ticker symbol')} />

                      <div>
                        <TextInput
                          error={errors.governanceTokenOptions?.newInfo?.symbol}
                          label="governanceTokenOptions.newInfo.symbol"
                          placeholder={i18n.t('Ticker symbol placeholder')}
                          register={register}
                          validation={[validateRequired, validateTokenSymbol]}
                        />
                        <InputErrorMessage
                          error={errors.governanceTokenOptions?.newInfo?.symbol}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 justify-between">
                      <InputLabel mono name={i18n.t('Governance token name')} />

                      <div>
                        <TextInput
                          error={errors.governanceTokenOptions?.newInfo?.name}
                          label="governanceTokenOptions.newInfo.name"
                          placeholder={i18n.t('Governance token placeholder')}
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
                  <p className="primary-text">
                    {i18n.t('Token contract address')}
                  </p>

                  <TextInput
                    error={
                      errors.governanceTokenOptions
                        ?.existingGovernanceTokenAddress
                    }
                    label="governanceTokenOptions.existingGovernanceTokenAddress"
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
              {governanceTokenEnabled && <p>Token distribution</p>}

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
                  {i18n.t('Add tier')}
                </Button>

                <InputErrorMessage error={errors._tiersError} />
              </div>
            </div>

            <div className="mx-auto w-full max-w-md">
              <VotingPowerChart data={entries} />
            </div>
          </>
        )}

        <CreateDAOConfigCard
          accentColor="#c3935e1a"
          description={i18n.t('Voting duration description')}
          error={errors.votingDuration?.value || errors.votingDuration?.units}
          image={<Emoji label="hourglass" symbol="⏳" />}
          title={i18n.t('Voting duration')}
        >
          <NumberInput
            error={errors.votingDuration?.value}
            label="votingDuration.value"
            onPlusMinus={[
              () =>
                setValue(
                  'votingDuration.value',
                  Math.max(watchedNewDAO.votingDuration.value + 1, 1)
                ),
              () =>
                setValue(
                  'votingDuration.value',
                  Math.max(watchedNewDAO.votingDuration.value - 1, 1)
                ),
            ]}
            register={register}
            sizing="sm"
            step={1}
            validation={[validatePositive, validateRequired]}
          />

          <SelectInput
            error={errors.votingDuration?.units}
            label="votingDuration.units"
            register={register}
            validation={[validateRequired]}
          >
            {DurationUnitsValues.map((type, idx) => (
              <option key={idx} value={type}>
                {/* TODO: i18n */}
                {type}
              </option>
            ))}
          </SelectInput>
        </CreateDAOConfigCard>

        {governanceTokenEnabled && (
          <div className="-mt-5 space-y-3">
            <CreateDAOConfigCard
              accentColor="#fccd031a"
              description="The number of governance tokens that must be deposited in order to create a proposal. Setting this high may deter spam, but setting it too high may limit broad participation."
              error={errors.governanceTokenOptions?.proposalDeposit?.value}
              image={<Emoji label="banknote" symbol="💵" />}
              title="Proposal deposit"
            >
              <NumberInput
                error={errors.governanceTokenOptions?.proposalDeposit?.value}
                label="governanceTokenOptions.proposalDeposit.value"
                onPlusMinus={[
                  () =>
                    setValue(
                      'governanceTokenOptions.proposalDeposit.value',
                      Math.max(
                        watchedNewDAO.governanceTokenOptions.proposalDeposit
                          .value + 1,
                        0
                      )
                    ),
                  () =>
                    setValue(
                      'governanceTokenOptions.proposalDeposit.value',
                      Math.max(
                        watchedNewDAO.governanceTokenOptions.proposalDeposit
                          .value - 1,
                        0
                      )
                    ),
                ]}
                register={register}
                sizing="sm"
                step={1}
                validation={[validateNonNegative]}
              />
            </CreateDAOConfigCard>

            {!!watchedNewDAO.governanceTokenOptions.proposalDeposit.value && (
              <CreateDAOConfigCard
                accentColor="#fed3581a"
                description={i18n.t('Proposal deposit refund description')}
                image={<Emoji label="finger pointing up" symbol="👆" />}
                title={i18n.t('Proposal deposit refund')}
              >
                <div className="flex flex-row gap-4 items-center py-2 px-3 bg-card rounded-md">
                  <p className="w-[3ch] secondary-text">
                    {watchedNewDAO.governanceTokenOptions.proposalDeposit
                      .refundFailed
                      ? 'Yes'
                      : 'No'}
                  </p>

                  <FormSwitch
                    label="governanceTokenOptions.proposalDeposit.refundFailed"
                    setValue={setValue}
                    sizing="sm"
                    watch={watch}
                  />
                </div>
              </CreateDAOConfigCard>
            )}

            <CreateDAOConfigCard
              accentColor="#cf434b1a"
              description={i18n.t('Unstaking period description')}
              error={
                errors.governanceTokenOptions?.unregisterDuration?.value ||
                errors.governanceTokenOptions?.unregisterDuration?.units
              }
              image={<Emoji label="alarm clock" symbol="⏰" />}
              title={i18n.t('Unstaking period')}
            >
              <NumberInput
                error={errors.governanceTokenOptions?.unregisterDuration?.value}
                label="governanceTokenOptions.unregisterDuration.value"
                onPlusMinus={[
                  () =>
                    setValue(
                      'governanceTokenOptions.unregisterDuration.value',
                      Math.max(
                        watchedNewDAO.governanceTokenOptions.unregisterDuration
                          .value + 1,
                        0
                      )
                    ),
                  () =>
                    setValue(
                      'governanceTokenOptions.unregisterDuration.value',
                      Math.max(
                        watchedNewDAO.governanceTokenOptions.unregisterDuration
                          .value - 1,
                        0
                      )
                    ),
                ]}
                register={register}
                sizing="sm"
                step={1}
                validation={[validateNonNegative, validateRequired]}
              />

              <SelectInput
                error={errors.governanceTokenOptions?.unregisterDuration?.units}
                label="governanceTokenOptions.unregisterDuration.units"
                register={register}
                validation={[validateRequired]}
              >
                {DurationUnitsValues.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </SelectInput>
            </CreateDAOConfigCard>
          </div>
        )}

        <div className="flex flex-row gap-4 items-center">
          <FormSwitch
            label="_changeThresholdQuorumEnabled"
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
              name={i18n.t('Advanced voting configuration')}
            />
            <p className="caption-text">
              {i18n.t('Advanced voting configuration description')}
            </p>
          </div>
        </div>

        {watchedNewDAO._changeThresholdQuorumEnabled && (
          <div className="space-y-3">
            <CreateDAOThresholdCard
              error={errors.thresholdQuorum?.threshold}
              register={register}
              setValue={setValue}
              value={threshold}
            />
            <CreateDAOQuorumCard
              error={errors.thresholdQuorum?.quorum}
              register={register}
              setValue={setValue}
              value={quorum}
            />
          </div>
        )}
      </CreateDAOFormWrapper>

      {showThresholdQuorumWarning && (
        <Modal
          containerClassName="flex flex-col gap-4"
          onClose={() => setShowThresholdQuorumWarning(false)}
        >
          <p className="header-text">{i18n.t('Watch out!')}</p>

          <p className="body-text">
            {i18n.t('Advanced configuration warning')}
          </p>

          <a
            className="block underline"
            href="https://docs.daodao.zone/docs/voting-config"
            rel="noreferrer"
            target="_blank"
          >
            Learn more
          </a>

          <Button
            className="self-end"
            onClick={() => setShowThresholdQuorumWarning(false)}
          >
            {i18n.t('I accept the danger')}
          </Button>
        </Modal>
      )}
    </>
  )
}

export default CreateDAOVotingPage
