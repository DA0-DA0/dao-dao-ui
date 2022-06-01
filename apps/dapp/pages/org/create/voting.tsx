import Emoji from 'a11y-react-emoji'
import { FC, useCallback, useEffect, useState } from 'react'
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
} from '@dao-dao/utils'

import {
  DefaultNewOrg,
  DurationUnitsValues,
  GovernanceTokenType,
} from '@/atoms/org'
import {
  CreateOrgConfigCard,
  CreateOrgConfigCardWrapper,
} from '@/components/org/create/CreateOrgConfigCard'
import { CreateOrgGroup } from '@/components/org/create/CreateOrgGroup'
import { CreateOrgHeader } from '@/components/org/create/CreateOrgHeader'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { CustomValidation, useCreateOrgForm } from '@/hooks/useCreateOrgForm'

interface NewGroupNameForm {
  name: string
}

const CreateOrgVotingPage: FC = () => {
  // Validate group weights and member proportions add up to 100%.
  const _validateGroups: CustomValidation = useCallback(
    (
      { groups },
      errors,
      setError,
      clearErrors,
      // Only set or clear error if error is already set. This is useful
      // to ensure errors are up to date as values change without showing
      // errors for values that are still being input and are not ready for
      // validation.
      noNewErrors = false
    ) => {
      let valid = true

      if (!noNewErrors || errors._groupsError) {
        const totalWeight =
          groups.reduce((acc, { weight }) => acc + weight, 0) || 0
        if (totalWeight !== 100) {
          setError('_groupsError', {
            message:
              totalWeight === 0
                ? 'You have not given anyone voting power! Add some members to your org.'
                : `Total group voting power must be 100%, but is currently ${totalWeight.toLocaleString()}%`,
          })
          valid = false
        } else {
          clearErrors('_groupsError')
        }
      }

      groups.forEach((group, groupIndex) => {
        if (noNewErrors && !errors.groups?.[groupIndex]?._error) {
          return
        }

        if (group.members.length === 0) {
          setError(`groups.${groupIndex}._error`, {
            message: 'No members have been added.',
          })
          valid = false
        } else {
          clearErrors(`groups.${groupIndex}._error`)
        }
      })

      return valid
    },
    []
  )

  const {
    control,
    register,
    formOnSubmit,
    watch,
    errors,
    setValue,
    resetField,
    Navigation,
    getValues,
    setError,
    clearErrors,
  } = useCreateOrgForm(1, _validateGroups)

  // To call manually when changing data.
  const validateGroups = useCallback(
    (noNewErrors = false) =>
      _validateGroups(getValues(), errors, setError, clearErrors, noNewErrors),
    [_validateGroups, getValues, errors, setError, clearErrors]
  )
  // Check voting weights when any group weight changes, or groups/members
  // are added / removed. Only update existing errors, not creating any
  // new errors. New errors will be displayed on attempted submit/page
  // progression as usual.
  useEffect(() => {
    validateGroups(true)
  }, [
    validateGroups,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getValues('groups')
      .map(
        ({ weight, members }, idx) => `${idx}:${weight}:${members.join('_')}`
      )
      .join(),
  ])

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
      appendGroup({ name, weight: 20, members: [] })
      setAddGroupModalOpen(false)
    },
    [appendGroup]
  )

  const [showThresholdQuorumWarning, setShowThresholdQuorumWarning] =
    useState(false)
  const thresholdValue = watch('changeThresholdQuorumOptions.thresholdValue')
  const quorumValue = watch('changeThresholdQuorumOptions.quorumValue')

  const newTokenImageUrl = watch(
    'governanceTokenOptions.newGovernanceToken.imageUrl'
  )
  const initialTreasuryPercent = watch(
    'governanceTokenOptions.newGovernanceToken.initialTreasuryPercent'
  )

  return (
    <>
      <SmallScreenNav />
      <CreateOrgHeader />

      <form
        className="flex flex-col gap-8 p-6 pt-2 mx-auto max-w-[800px]"
        onSubmit={formOnSubmit}
      >
        <div>
          <p className="primary-text">Configure voting share</p>
          <p className="mt-1 secondary-text">
            This will determine how much voting share different members of the
            org have when they vote on proposals.
          </p>
        </div>

        <div className="flex flex-col gap-4 items-stretch">
          {groups.map(({ id }, idx) => (
            <CreateOrgGroup
              key={id}
              control={control}
              errors={errors}
              groupIndex={idx}
              register={register}
              remove={groups.length === 1 ? undefined : () => removeGroup(idx)}
              setValue={setValue}
              watch={watch}
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
              Add another group
            </Button>

            <InputErrorMessage error={errors._groupsError} />
          </div>
        </div>

        <CreateOrgConfigCard
          description="The amount of time that a proposal will remain open for voting. After this time elapses, the votes for a proposal will be final."
          error={errors.votingDuration?.value || errors.votingDuration?.units}
          image={<Emoji label="hourglass" symbol="⏳" />}
          title="Voting duration"
        >
          <NumberInput
            error={errors.votingDuration?.value}
            label="votingDuration.value"
            onPlusMinus={[
              () =>
                setValue(
                  'votingDuration.value',
                  Math.max(watch('votingDuration.value') + 1, 1)
                ),
              () =>
                setValue(
                  'votingDuration.value',
                  Math.max(watch('votingDuration.value') - 1, 1)
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

        <div className="flex flex-row gap-4 items-center">
          <FormSwitch
            label="governanceTokenEnabled"
            // Reset options.
            onToggle={(newValue) =>
              !newValue && resetField('governanceTokenOptions')
            }
            setValue={setValue}
            watch={watch}
          />

          <div className="flex flex-col gap-1">
            <InputLabel
              className="!body-text"
              name="(Advanced) Enable governance tokens"
            />
            <p className="caption-text">
              Use fungible governance tokens to assign voting weight.
            </p>
          </div>
        </div>

        {watch('governanceTokenEnabled') && (
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
              {watch('governanceTokenOptions.type') ===
              GovernanceTokenType.New ? (
                <>
                  <div className="flex flex-col gap-2 items-stretch">
                    <div className="flex flex-row gap-8 justify-between items-center">
                      <p className="primary-text">Total supply</p>

                      <div>
                        <div className="flex flex-row grow gap-4 items-center">
                          <NumberInput
                            containerClassName="grow"
                            error={
                              errors.governanceTokenOptions?.newGovernanceToken
                                ?.initialSupply
                            }
                            label="governanceTokenOptions.newGovernanceToken.initialSupply"
                            onPlusMinus={[
                              () =>
                                setValue(
                                  'governanceTokenOptions.newGovernanceToken.initialSupply',
                                  Math.max(
                                    watch(
                                      'governanceTokenOptions.newGovernanceToken.initialSupply'
                                    ) + 1,
                                    0
                                  )
                                ),
                              () =>
                                setValue(
                                  'governanceTokenOptions.newGovernanceToken.initialSupply',
                                  Math.max(
                                    watch(
                                      'governanceTokenOptions.newGovernanceToken.initialSupply'
                                    ) - 1,
                                    0
                                  )
                                ),
                            ]}
                            register={register}
                            step={1}
                            validation={[validatePositive, validateRequired]}
                          />

                          <div className="hidden flex-row gap-2 items-center text-tertiary xs:flex">
                            {newTokenImageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img alt="" src={newTokenImageUrl} />
                            ) : (
                              <PlaceholderToken
                                className="p-2 rounded-full border border-default"
                                color="rgba(var(--dark), 0.3)"
                                height="2.25rem"
                                width="2.25rem"
                              />
                            )}

                            {watch(
                              'governanceTokenOptions.newGovernanceToken.symbol'
                            ) || 'Token'}
                          </div>
                        </div>

                        <InputErrorMessage
                          error={
                            errors.governanceTokenOptions?.newGovernanceToken
                              ?.initialSupply
                          }
                        />
                      </div>
                    </div>

                    <div className="flex flex-row gap-8 justify-between items-center">
                      <p className="primary-text">Initial treasury size</p>

                      <div>
                        <div className="flex flex-row grow gap-2 items-center">
                          <NumberInput
                            containerClassName="grow"
                            error={
                              errors.governanceTokenOptions?.newGovernanceToken
                                ?.initialTreasuryPercent
                            }
                            label="governanceTokenOptions.newGovernanceToken.initialTreasuryPercent"
                            onPlusMinus={[
                              () =>
                                setValue(
                                  'governanceTokenOptions.newGovernanceToken.initialTreasuryPercent',
                                  Math.max(
                                    Math.min(
                                      watch(
                                        'governanceTokenOptions.newGovernanceToken.initialTreasuryPercent'
                                      ) + 1,
                                      100
                                    ),
                                    0
                                  )
                                ),
                              () =>
                                setValue(
                                  'governanceTokenOptions.newGovernanceToken.initialTreasuryPercent',
                                  Math.max(
                                    Math.min(
                                      watch(
                                        'governanceTokenOptions.newGovernanceToken.initialTreasuryPercent'
                                      ) - 1,
                                      100
                                    ),
                                    0
                                  )
                                ),
                            ]}
                            register={register}
                            sizing="sm"
                            step={1}
                            validation={[
                              (v: number) =>
                                isNaN(v) || v < 0 || v > 100
                                  ? 'Invalid percentage'
                                  : v === 100
                                  ? 'You cannot give 100% of the voting power to the treasury, as an org with no members cannot do anything. Decrease this value and ensure that the org has at least one member.'
                                  : true,
                            ]}
                          />

                          <p className="text-tertiary text-mono">%</p>
                        </div>

                        <InputErrorMessage
                          error={
                            errors.governanceTokenOptions?.newGovernanceToken
                              ?.initialTreasuryPercent
                          }
                        />
                      </div>
                    </div>

                    {typeof initialTreasuryPercent === 'number' &&
                      initialTreasuryPercent >= 0 &&
                      initialTreasuryPercent < 100 && (
                        <p className="self-end my-2 max-w-prose text-right caption-text">
                          The remaining{' '}
                          {(100 - (initialTreasuryPercent || 0)).toLocaleString(
                            undefined,
                            {
                              maximumFractionDigits: 3,
                            }
                          )}
                          % of the tokens will be distributed according to the
                          groups defined above. Tokens in the treasury do not
                          count against the voting power of members.
                        </p>
                      )}
                  </div>

                  <div className="grid grid-cols-[2fr_3fr_4fr] gap-2 items-stretch sm:gap-4">
                    <div className="flex flex-col gap-2 justify-between items-start">
                      <InputLabel mono name="Token image" />
                      <div className="flex flex-row gap-2 justify-start justify-self-start items-center">
                        <ImageSelector
                          error={
                            errors.governanceTokenOptions?.newGovernanceToken
                              ?.imageUrl
                          }
                          label="governanceTokenOptions.newGovernanceToken.imageUrl"
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
                          error={
                            errors.governanceTokenOptions?.newGovernanceToken
                              ?.symbol
                          }
                          label="governanceTokenOptions.newGovernanceToken.symbol"
                          placeholder="Define a symbol..."
                          register={register}
                          validation={[validateRequired]}
                        />
                        <InputErrorMessage
                          error={
                            errors.governanceTokenOptions?.newGovernanceToken
                              ?.symbol
                          }
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 justify-between">
                      <InputLabel mono name="Name" />

                      <div>
                        <TextInput
                          error={
                            errors.governanceTokenOptions?.newGovernanceToken
                              ?.name
                          }
                          label="governanceTokenOptions.newGovernanceToken.name"
                          placeholder="Name your token..."
                          register={register}
                          validation={[validateRequired]}
                        />
                        <InputErrorMessage
                          error={
                            errors.governanceTokenOptions?.newGovernanceToken
                              ?.name
                          }
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
            >
              <NumberInput
                error={errors.governanceTokenOptions?.proposalDeposit?.value}
                label="governanceTokenOptions.proposalDeposit.value"
                onPlusMinus={[
                  () =>
                    setValue(
                      'governanceTokenOptions.proposalDeposit.value',
                      Math.max(
                        watch('governanceTokenOptions.proposalDeposit.value') +
                          1,
                        0
                      )
                    ),
                  () =>
                    setValue(
                      'governanceTokenOptions.proposalDeposit.value',
                      Math.max(
                        watch('governanceTokenOptions.proposalDeposit.value') -
                          1,
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

            {!!watch('governanceTokenOptions.proposalDeposit.value') && (
              <CreateOrgConfigCard
                description="This parameter determines whether a failed proposal will have its deposit refunded. (Proposals that pass will always have their deposit returned). Turning this off may encourage members to deliberate before creating specific proposals, particularly when proposal deposits are high."
                image={<Emoji label="finger pointing up" symbol="👆" />}
                title="Refund failed proposals"
              >
                <div className="flex flex-row gap-4 items-center py-2 px-3 bg-card rounded-md">
                  <p className="w-[3ch] secondary-text">
                    {watch(
                      'governanceTokenOptions.proposalDeposit.refundFailed'
                    )
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
            >
              <NumberInput
                error={errors.governanceTokenOptions?.unregisterDuration?.value}
                label="governanceTokenOptions.unregisterDuration.value"
                onPlusMinus={[
                  () =>
                    setValue(
                      'governanceTokenOptions.unregisterDuration.value',
                      Math.max(
                        watch(
                          'governanceTokenOptions.unregisterDuration.value'
                        ) + 1,
                        0
                      )
                    ),
                  () =>
                    setValue(
                      'governanceTokenOptions.unregisterDuration.value',
                      Math.max(
                        watch(
                          'governanceTokenOptions.unregisterDuration.value'
                        ) - 1,
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
            label="changeThresholdQuorumEnabled"
            onToggle={(newValue) => {
              if (newValue) {
                setShowThresholdQuorumWarning(true)
              } else {
                // Reset options.
                resetField('changeThresholdQuorumOptions')
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

        {watch('changeThresholdQuorumEnabled') && (
          <div className="space-y-3">
            <CreateOrgConfigCard
              description="The percentage of votes that must be 'yes' in order for a proposal to pass. For example, with a 50% passing threshold, half of the voting power must be in favor of a proposal to pass it."
              error={errors.changeThresholdQuorumOptions?.thresholdValue}
              image={<Emoji label="ballot box" symbol="🗳️" />}
              title="Passing threshold"
            >
              {thresholdValue !== 'majority' && (
                <NumberInput
                  error={errors.changeThresholdQuorumOptions?.thresholdValue}
                  label="changeThresholdQuorumOptions.thresholdValue"
                  onPlusMinus={[
                    () =>
                      setValue(
                        'changeThresholdQuorumOptions.thresholdValue',
                        Math.max(thresholdValue + 1, 1)
                      ),
                    () =>
                      setValue(
                        'changeThresholdQuorumOptions.thresholdValue',
                        Math.max(thresholdValue - 1, 1)
                      ),
                  ]}
                  register={register}
                  sizing="sm"
                  step={1}
                  validation={[validatePositive, validateRequired]}
                />
              )}

              <SelectInput
                onChange={({ target: { value } }) =>
                  setValue(
                    'changeThresholdQuorumOptions.thresholdValue',
                    value === 'majority' ? 'majority' : 75
                  )
                }
                validation={[validateRequired]}
              >
                <option
                  selected={thresholdValue !== 'majority'}
                  value="percent"
                >
                  %
                </option>
                <option
                  selected={thresholdValue === 'majority'}
                  value="majority"
                >
                  Majority
                </option>
              </SelectInput>
            </CreateOrgConfigCard>

            <CreateOrgConfigCard
              description="The minumum percentage of voting power that must vote on a proposal for it to be considered. For example, in the US House of Representatives, 218 members must be present for a vote. If you have an org with many inactive members, setting this value too high may make it difficult to pass proposals."
              error={errors.changeThresholdQuorumOptions?.quorumValue}
              image={<Emoji label="megaphone" symbol="📣" />}
              title="Quorum"
            >
              {quorumValue !== 'majority' && (
                <NumberInput
                  error={errors.changeThresholdQuorumOptions?.quorumValue}
                  label="changeThresholdQuorumOptions.quorumValue"
                  onPlusMinus={[
                    () =>
                      setValue(
                        'changeThresholdQuorumOptions.quorumValue',
                        Math.max(quorumValue + 1, 1)
                      ),
                    () =>
                      setValue(
                        'changeThresholdQuorumOptions.quorumValue',
                        Math.max(quorumValue - 1, 1)
                      ),
                  ]}
                  register={register}
                  sizing="sm"
                  step={1}
                  validation={[validateNonNegative, validateRequired]}
                />
              )}

              <SelectInput
                onChange={({ target: { value } }) =>
                  setValue(
                    'changeThresholdQuorumOptions.quorumValue',
                    value === 'majority'
                      ? 'majority'
                      : DefaultNewOrg.changeThresholdQuorumOptions
                          ?.quorumValue ?? 'majority'
                  )
                }
                validation={[validateRequired]}
              >
                <option selected={quorumValue !== 'majority'} value="percent">
                  %
                </option>
                <option selected={quorumValue === 'majority'} value="majority">
                  Majority
                </option>
              </SelectInput>
            </CreateOrgConfigCard>
          </div>
        )}

        {Navigation}
      </form>

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
