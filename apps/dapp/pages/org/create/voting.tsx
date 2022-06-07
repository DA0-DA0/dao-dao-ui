import Emoji from 'a11y-react-emoji'
import { FC, useCallback, useMemo, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

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
  SubmitButton,
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
  DefaultNewOrg,
  DEFAULT_NEW_ORG_GOV_TOKEN_INITIAL_GROUP_WEIGHT,
  DEFAULT_NEW_ORG_SIMPLE_INITIAL_GROUP_WEIGHT,
  DEFAULT_NEW_ORG_THRESHOLD_PERCENT,
  DurationUnitsValues,
  GovernanceTokenType,
  NewOrgStructure,
  NEW_ORG_CW20_DECIMALS,
} from '@/atoms/newOrg'
import {
  CreateOrgConfigCard,
  CreateOrgConfigCardWrapper,
} from '@/components/org/create/CreateOrgConfigCard'
import { CreateOrgFormWrapper } from '@/components/org/create/CreateOrgFormWrapper'
import { CreateOrgGroup } from '@/components/org/create/CreateOrgGroup'
import {
  useVotingPowerDistributionData,
  VotingPowerChart,
} from '@/components/org/create/Distributions'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { useCreateOrgForm } from '@/hooks/useCreateOrgForm'

interface NewGroupNameForm {
  name: string
}

const CreateOrgVotingPage: FC = () => {
  const {
    watchedNewOrg,
    control,
    register,
    watch,
    errors,
    setValue,
    resetField,
    getValues,
    formWrapperProps,
  } = useCreateOrgForm(2)

  const {
    fields: groups,
    append: appendGroup,
    remove: removeGroup,
  } = useFieldArray({
    control,
    name: 'groups',
  })

  const [addGroupModalOpen, setAddGroupModalOpen] = useState(false)
  const {
    handleSubmit: newGroupNameHandleSubmit,
    register: newGroupNameRegister,
    reset: newGroupNameReset,
  } = useForm<NewGroupNameForm>()
  const onSubmitNewGroupName: SubmitHandler<NewGroupNameForm> = useCallback(
    ({ name }) => {
      appendGroup({
        name,
        weight:
          getValues('structure') === NewOrgStructure.UsingGovToken
            ? DEFAULT_NEW_ORG_GOV_TOKEN_INITIAL_GROUP_WEIGHT
            : DEFAULT_NEW_ORG_SIMPLE_INITIAL_GROUP_WEIGHT,
        members: [
          {
            address: '',
          },
        ],
      })
      setAddGroupModalOpen(false)
    },
    [appendGroup, getValues]
  )

  const [showThresholdQuorumWarning, setShowThresholdQuorumWarning] =
    useState(false)
  const threshold = watchedNewOrg.thresholdQuorum.threshold
  const quorum = watchedNewOrg.thresholdQuorum.quorum

  const newTokenImageUrl = watchedNewOrg.governanceTokenOptions.newInfo.imageUrl

  const governanceTokenEnabled =
    watchedNewOrg.structure === NewOrgStructure.UsingGovToken
  // Only count treasury balance when creating new governance token.
  const initialTreasuryBalance =
    governanceTokenEnabled &&
    watchedNewOrg.governanceTokenOptions.type === GovernanceTokenType.New
      ? watchedNewOrg.governanceTokenOptions.newInfo.initialTreasuryBalance || 0
      : 0
  const memberWeightAllocated = useMemo(
    () =>
      watchedNewOrg.groups.reduce(
        (acc, { weight, members }) => acc + weight * members.length,
        0
      ) || 0,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // Groups reference does not change even if contents do, so we need a
      // primitive to use for memoization comparison.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      watchedNewOrg.groups
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

  const { onlyOneGroup, entries } = useVotingPowerDistributionData(
    watchedNewOrg,
    false,
    false,
    false
  )

  return (
    <>
      <SmallScreenNav />

      <CreateOrgFormWrapper
        containerClassName="flex flex-col gap-8"
        {...formWrapperProps}
      >
        <div className="mx-auto w-full max-w-md">
          <VotingPowerChart data={entries} />
        </div>

        <div className="flex flex-col gap-4 items-stretch">
          {groups.map(({ id }, idx) => (
            <CreateOrgGroup
              key={id}
              control={control}
              errors={errors}
              groupIndex={idx}
              newOrg={watchedNewOrg}
              register={register}
              remove={onlyOneGroup ? undefined : () => removeGroup(idx)}
              setValue={setValue}
              showColorDotOnMember={onlyOneGroup}
            />
          ))}

          <div className="flex flex-col">
            <Button
              className="self-start"
              onClick={() => {
                newGroupNameReset()
                setAddGroupModalOpen(true)
              }}
              variant="secondary"
            >
              Add a group
            </Button>

            <InputErrorMessage error={errors._groupsError} />
          </div>
        </div>

        <CreateOrgConfigCard
          description="The amount of time that a proposal will remain open for voting. After this time elapses, the votes for a proposal will be final."
          error={errors.votingDuration?.value || errors.votingDuration?.units}
          image={<Emoji label="hourglass" symbol="⏳" />}
          title="Voting duration"
          accentColor="#c3935e1a"
        >
          <NumberInput
            error={errors.votingDuration?.value}
            label="votingDuration.value"
            onPlusMinus={[
              () =>
                setValue(
                  'votingDuration.value',
                  Math.max(watchedNewOrg.votingDuration.value + 1, 1)
                ),
              () =>
                setValue(
                  'votingDuration.value',
                  Math.max(watchedNewOrg.votingDuration.value - 1, 1)
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
                {type}
              </option>
            ))}
          </SelectInput>
        </CreateOrgConfigCard>

        {governanceTokenEnabled && (
          <div className="space-y-3">
            <RadioInput
              label="governanceTokenOptions.type"
              options={[
                {
                  label: 'Create new token',
                  value: GovernanceTokenType.New,
                },
                {
                  label: 'Use existing token',
                  value: GovernanceTokenType.Existing,
                },
              ]}
              setValue={setValue}
              watch={watch}
            />
            <CreateOrgConfigCardWrapper className="gap-8 mb-9">
              {watchedNewOrg.governanceTokenOptions.type ===
              GovernanceTokenType.New ? (
                <>
                  <div className="flex flex-col gap-2 items-stretch">
                    <div className="grid grid-cols-[2fr_3fr] gap-12 items-center sm:grid-cols-[1fr_3fr]">
                      <p className="primary-text">Treasury balance</p>

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
                                    1 / 10 ** NEW_ORG_CW20_DECIMALS
                                  )
                                ),
                              () =>
                                setValue(
                                  'governanceTokenOptions.newInfo.initialTreasuryBalance',
                                  Math.max(
                                    initialTreasuryBalance - 1,
                                    1 / 10 ** NEW_ORG_CW20_DECIMALS
                                  )
                                ),
                            ]}
                            register={register}
                            step={1 / 10 ** NEW_ORG_CW20_DECIMALS}
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

                            {watchedNewOrg.governanceTokenOptions.newInfo
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
                      {totalWeightAllocated.toLocaleString(undefined, {
                        maximumFractionDigits: NEW_ORG_CW20_DECIMALS,
                      })}{' '}
                      tokens will be minted.{' '}
                      {totalWeightAllocated === 0
                        ? 0
                        : (
                            (memberWeightAllocated / totalWeightAllocated) *
                            100
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                      % will be sent to the members according to the
                      distribution above. The remaining{' '}
                      {totalWeightAllocated === 0
                        ? 0
                        : (
                            (initialTreasuryBalance / totalWeightAllocated) *
                            100
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                      % will begin in the treasury.
                    </p>
                  </div>

                  <div className="grid grid-cols-[2fr_3fr_4fr] gap-2 items-stretch sm:gap-4">
                    <div className="flex flex-col gap-2 justify-between items-start">
                      <InputLabel mono name="Token image" />
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
                          Add an image
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 justify-between">
                      <InputLabel mono name="Symbol" />

                      <div>
                        <TextInput
                          error={errors.governanceTokenOptions?.newInfo?.symbol}
                          label="governanceTokenOptions.newInfo.symbol"
                          placeholder="Define a symbol..."
                          register={register}
                          validation={[validateRequired, validateTokenSymbol]}
                        />
                        <InputErrorMessage
                          error={errors.governanceTokenOptions?.newInfo?.symbol}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 justify-between">
                      <InputLabel mono name="Name" />

                      <div>
                        <TextInput
                          error={errors.governanceTokenOptions?.newInfo?.name}
                          label="governanceTokenOptions.newInfo.name"
                          placeholder="Name your token..."
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
                <div>
                  <TextInput
                    error={
                      errors.governanceTokenOptions
                        ?.existingGovernanceTokenAddress
                    }
                    label="governanceTokenOptions.existingGovernanceTokenAddress"
                    placeholder="Token contract address..."
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
            </CreateOrgConfigCardWrapper>

            <CreateOrgConfigCard
              description="The number of governance tokens that must be deposited in order to create a proposal. Setting this high may deter spam, but setting it too high may limit broad participation."
              error={errors.governanceTokenOptions?.proposalDeposit?.value}
              image={<Emoji label="banknote" symbol="💵" />}
              title="Proposal deposit"
              accentColor="#fccd031a"
            >
              <NumberInput
                error={errors.governanceTokenOptions?.proposalDeposit?.value}
                label="governanceTokenOptions.proposalDeposit.value"
                onPlusMinus={[
                  () =>
                    setValue(
                      'governanceTokenOptions.proposalDeposit.value',
                      Math.max(
                        watchedNewOrg.governanceTokenOptions.proposalDeposit
                          .value + 1,
                        0
                      )
                    ),
                  () =>
                    setValue(
                      'governanceTokenOptions.proposalDeposit.value',
                      Math.max(
                        watchedNewOrg.governanceTokenOptions.proposalDeposit
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
            </CreateOrgConfigCard>

            {!!watchedNewOrg.governanceTokenOptions.proposalDeposit.value && (
              <CreateOrgConfigCard
                description="This parameter determines whether a failed proposal will have its deposit refunded. (Proposals that pass will always have their deposit returned). Turning this off may encourage members to deliberate before creating specific proposals, particularly when proposal deposits are high."
                image={<Emoji label="finger pointing up" symbol="👆" />}
                title="Refund failed proposals"
                accentColor="#fed3581a"
              >
                <div className="flex flex-row gap-4 items-center py-2 px-3 bg-card rounded-md">
                  <p className="w-[3ch] secondary-text">
                    {watchedNewOrg.governanceTokenOptions.proposalDeposit
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
              </CreateOrgConfigCard>
            )}

            <CreateOrgConfigCard
              description="In order to vote, members must register their tokens with the org. Members who would like to leave the org or trade their governance tokens must first unregister them. This setting configures how long members have to wait after unregistering their tokens for those tokens to become available. The longer you set this duration, the more sure you can be that people who register their tokens are keen to participate in your org's governance."
              error={
                errors.governanceTokenOptions?.unregisterDuration?.value ||
                errors.governanceTokenOptions?.unregisterDuration?.units
              }
              image={<Emoji label="alarm clock" symbol="⏰" />}
              title="Unregister duration"
              accentColor="#cf434b1a"
            >
              <NumberInput
                error={errors.governanceTokenOptions?.unregisterDuration?.value}
                label="governanceTokenOptions.unregisterDuration.value"
                onPlusMinus={[
                  () =>
                    setValue(
                      'governanceTokenOptions.unregisterDuration.value',
                      Math.max(
                        watchedNewOrg.governanceTokenOptions.unregisterDuration
                          .value + 1,
                        0
                      )
                    ),
                  () =>
                    setValue(
                      'governanceTokenOptions.unregisterDuration.value',
                      Math.max(
                        watchedNewOrg.governanceTokenOptions.unregisterDuration
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
            </CreateOrgConfigCard>
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
              name="(Advanced) Change threshold and quorum"
            />
            <p className="caption-text">
              Configure voting threshold and quorum.
            </p>
          </div>
        </div>

        {watchedNewOrg._changeThresholdQuorumEnabled && (
          <div className="space-y-3">
            <CreateOrgConfigCard
              description="The percentage of votes that must be 'yes' in order for a proposal to pass. For example, with a 50% passing threshold, half of the voting power must be in favor of a proposal to pass it."
              error={errors.thresholdQuorum?.threshold}
              image={<Emoji label="ballot box" symbol="🗳️" />}
              title="Passing threshold"
              accentColor="rgba(95, 94, 254, 0.1)"
            >
              {threshold !== 'majority' && (
                <NumberInput
                  error={errors.thresholdQuorum?.threshold}
                  label="thresholdQuorum.threshold"
                  onPlusMinus={[
                    () =>
                      setValue(
                        'thresholdQuorum.threshold',
                        Math.max(threshold + 1, 1)
                      ),
                    () =>
                      setValue(
                        'thresholdQuorum.threshold',
                        Math.max(threshold - 1, 1)
                      ),
                  ]}
                  register={register}
                  // Override numeric value setter since the select below
                  // attempts to set 'majority', but registering the field
                  // with the numeric setter causes validation issues.
                  setValueAs={(value) =>
                    value === 'majority' ? 'majority' : Number(value)
                  }
                  sizing="sm"
                  step={0.001}
                  validation={[validatePositive, validateRequired]}
                />
              )}

              <SelectInput
                onChange={({ target: { value } }) =>
                  setValue(
                    'thresholdQuorum.threshold',
                    value === 'majority'
                      ? 'majority'
                      : // value === '%'
                        DEFAULT_NEW_ORG_THRESHOLD_PERCENT
                  )
                }
                validation={[validateRequired]}
                value={threshold === 'majority' ? 'majority' : '%'}
              >
                <option value="%">%</option>
                <option value="majority">Majority</option>
              </SelectInput>
            </CreateOrgConfigCard>

            <CreateOrgConfigCard
              description="The minumum percentage of voting power that must vote on a proposal for it to be considered. For example, in the US House of Representatives, 218 members must be present for a vote. If you have an org with many inactive members, setting this value too high may make it difficult to pass proposals."
              error={errors.thresholdQuorum?.quorum}
              image={<Emoji label="megaphone" symbol="📣" />}
              title="Quorum"
              accentColor="#fefe891a"
            >
              {quorum !== 'majority' && (
                <NumberInput
                  error={errors.thresholdQuorum?.quorum}
                  label="thresholdQuorum.quorum"
                  onPlusMinus={[
                    () =>
                      setValue(
                        'thresholdQuorum.quorum',
                        Math.max(quorum + 1, 0)
                      ),
                    () =>
                      setValue(
                        'thresholdQuorum.quorum',
                        Math.max(quorum - 1, 0)
                      ),
                  ]}
                  register={register}
                  // Override numeric value setter since the select below
                  // attempts to set 'majority', but registering the field
                  // with the numeric setter causes validation issues.
                  setValueAs={(value) =>
                    value === 'majority' ? 'majority' : Number(value)
                  }
                  sizing="sm"
                  step={0.001}
                  validation={[validateNonNegative, validateRequired]}
                />
              )}

              <SelectInput
                onChange={({ target: { value } }) =>
                  setValue(
                    'thresholdQuorum.quorum',
                    value === 'majority'
                      ? 'majority'
                      : // value === '%'
                        DefaultNewOrg.thresholdQuorum.quorum
                  )
                }
                validation={[validateRequired]}
                value={quorum === 'majority' ? 'majority' : '%'}
              >
                <option value="%">%</option>
                <option value="majority">Majority</option>
              </SelectInput>
            </CreateOrgConfigCard>
          </div>
        )}
      </CreateOrgFormWrapper>

      {addGroupModalOpen && (
        <Modal onClose={() => setAddGroupModalOpen(false)}>
          <form
            className="flex flex-col gap-2 items-stretch"
            onSubmit={newGroupNameHandleSubmit(onSubmitNewGroupName)}
          >
            <InputLabel name="Group name" />
            <TextInput
              autoFocus
              label="name"
              register={newGroupNameRegister}
              validation={[validateRequired]}
            />
            <p className="caption-text">
              This name is just for your reference when creating the org.
              <br />
              For example: &apos;Core team&apos; or &apos;Developers&apos;.
            </p>

            <SubmitButton className="mt-4 w-full" label="Add group" />
          </form>
        </Modal>
      )}

      {showThresholdQuorumWarning && (
        <Modal
          containerClassName="flex flex-col gap-4"
          onClose={() => setShowThresholdQuorumWarning(false)}
        >
          <p className="header-text">Warning!</p>

          <p className="body-text">
            This is an advanced feature. Threshold and quorum can interact in
            counterintuitive ways. If you configure them without fully
            understanding how they work, you may end up locking your org, making
            it impossible to pass proposals.
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
            I understand the danger.
          </Button>
        </Modal>
      )}
    </>
  )
}

export default CreateOrgVotingPage
