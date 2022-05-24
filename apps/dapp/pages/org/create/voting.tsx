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
import { useCreateOrgForm } from '@/hooks/useCreateOrgForm'

interface NewGroupNameForm {
  name: string
}

const CreateOrgVotingPage: FC = () => {
  const {
    control,
    register,
    formOnSubmit,
    watch,
    errors,
    setValue,
    resetField,
    Navigation,
  } = useCreateOrgForm(1)

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
      appendGroup({ name })
      setAddGroupModalOpen(false)
    },
    [appendGroup]
  )

  const variableVotingWeightsEnabled = watch('variableVotingWeightsEnabled')
  const distributeGroupVoteWeightEvenly = useCallback(
    (index?: number) => {
      watch('groups')
        ?.filter((_, idx) => index === undefined || index === idx)
        .forEach((group, groupIndex) => {
          // Evenly distributed so redistribute proportionally.
          const totalMembers = group.members?.length ?? 1
          const proportion = Math.round(100 / totalMembers)

          // Update members proportions.
          group.members?.forEach((_, memberIndex) =>
            setValue(
              `groups.${groupIndex}.members.${memberIndex}.proportion`,
              proportion
            )
          )
        })
    },
    [watch, setValue]
  )
  // When variable voting weights is disabled, reset group member weights.
  useEffect(() => {
    if (!variableVotingWeightsEnabled) distributeGroupVoteWeightEvenly()
  }, [distributeGroupVoteWeightEvenly, variableVotingWeightsEnabled])

  const [showThresholdQuorumWarning, setShowThresholdQuorumWarning] =
    useState(false)
  const thresholdValue = watch('changeThresholdQuorumOptions.thresholdValue')
  const quorumValue = watch('changeThresholdQuorumOptions.quorumValue')

  const newTokenImageUrl = watch(
    'variableVotingWeightsOptions.governanceTokenOptions.newGovernanceToken.imageUrl'
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
              redistributeEvenly={() => distributeGroupVoteWeightEvenly(idx)}
              register={register}
              remove={() => removeGroup(idx)}
              setValue={setValue}
              watch={watch}
            />
          ))}

          <Button
            className="self-start"
            onClick={() => {
              newGroupNameReset()
              setAddGroupModalOpen(true)
            }}
            variant="secondary"
          >
            Add group
          </Button>
        </div>

        <CreateOrgConfigCard
          description="The amount of time that a proposal will remain open for voting. After this time elapses, the votes for a proposal will be final."
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
          />

          <SelectInput
            error={errors.votingDuration?.units}
            label="votingDuration.units"
            register={register}
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
            label="variableVotingWeightsEnabled"
            // Reset options.
            onToggle={(newValue) =>
              !newValue && resetField('variableVotingWeightsOptions')
            }
            setValue={setValue}
            watch={watch}
          />

          <div className="flex flex-col gap-1">
            <InputLabel
              className="!body-text"
              name="Enable varying voting weights"
            />
            <p className="caption-text">
              Allow group members to have varying voting weights.
            </p>
          </div>
        </div>

        {watch('variableVotingWeightsEnabled') && (
          <>
            <div className="flex flex-row gap-4 items-center">
              <FormSwitch
                label="variableVotingWeightsOptions.governanceTokenEnabled"
                // Reset options.
                onToggle={(newValue) =>
                  !newValue &&
                  resetField(
                    'variableVotingWeightsOptions.governanceTokenOptions'
                  )
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
          </>
        )}

        {watch('variableVotingWeightsOptions.governanceTokenEnabled') && (
          <div className="space-y-3">
            <RadioInput
              label="variableVotingWeightsOptions.governanceTokenOptions.type"
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
              {watch(
                'variableVotingWeightsOptions.governanceTokenOptions.type'
              ) === GovernanceTokenType.New ? (
                <>
                  <div className="flex flex-row gap-8 justify-between items-center">
                    <p className="primary-text">Total supply</p>

                    <div className="flex flex-row grow gap-4 items-center">
                      <NumberInput
                        containerClassName="grow"
                        error={
                          errors.variableVotingWeightsOptions
                            ?.governanceTokenOptions?.newGovernanceToken?.supply
                        }
                        label="variableVotingWeightsOptions.governanceTokenOptions.newGovernanceToken.supply"
                        onPlusMinus={[
                          () =>
                            setValue(
                              'variableVotingWeightsOptions.governanceTokenOptions.newGovernanceToken.supply',
                              Math.max(
                                watch(
                                  'variableVotingWeightsOptions.governanceTokenOptions.newGovernanceToken.supply'
                                ) + 1,
                                0
                              )
                            ),
                          () =>
                            setValue(
                              'variableVotingWeightsOptions.governanceTokenOptions.newGovernanceToken.supply',
                              Math.max(
                                watch(
                                  'variableVotingWeightsOptions.governanceTokenOptions.newGovernanceToken.supply'
                                ) - 1,
                                0
                              )
                            ),
                        ]}
                        register={register}
                        step={1}
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
                          'variableVotingWeightsOptions.governanceTokenOptions.newGovernanceToken.symbol'
                        ) || 'Token'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-[2fr_3fr_4fr] gap-2 items-stretch sm:gap-4">
                    <div className="flex flex-col gap-2 justify-between items-start">
                      <InputLabel mono name="Token image" />
                      <div className="flex flex-row gap-2 justify-start justify-self-start items-center">
                        <ImageSelector
                          error={
                            errors.variableVotingWeightsOptions
                              ?.governanceTokenOptions?.newGovernanceToken
                              ?.imageUrl
                          }
                          label="variableVotingWeightsOptions.governanceTokenOptions.newGovernanceToken.imageUrl"
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
                      <TextInput
                        error={
                          errors.variableVotingWeightsOptions
                            ?.governanceTokenOptions?.newGovernanceToken?.symbol
                        }
                        label="variableVotingWeightsOptions.governanceTokenOptions.newGovernanceToken.symbol"
                        placeholder="Define a symbol..."
                        register={register}
                      />
                      <InputErrorMessage
                        error={
                          errors.variableVotingWeightsOptions
                            ?.governanceTokenOptions?.newGovernanceToken?.symbol
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-2 justify-between">
                      <InputLabel mono name="Name" />
                      <TextInput
                        error={
                          errors.variableVotingWeightsOptions
                            ?.governanceTokenOptions?.newGovernanceToken?.name
                        }
                        label="variableVotingWeightsOptions.governanceTokenOptions.newGovernanceToken.name"
                        placeholder="Name your token..."
                        register={register}
                      />
                      <InputErrorMessage
                        error={
                          errors.variableVotingWeightsOptions
                            ?.governanceTokenOptions?.newGovernanceToken?.name
                        }
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <TextInput
                    error={
                      errors.variableVotingWeightsOptions
                        ?.governanceTokenOptions?.existingGovernanceTokenAddress
                    }
                    label="variableVotingWeightsOptions.governanceTokenOptions.existingGovernanceTokenAddress"
                    placeholder="Token contract address..."
                    register={register}
                  />
                  <InputErrorMessage
                    error={
                      errors.variableVotingWeightsOptions
                        ?.governanceTokenOptions?.existingGovernanceTokenAddress
                    }
                  />
                </div>
              )}
            </CreateOrgConfigCardWrapper>

            <CreateOrgConfigCard
              description="The number of governance tokens that must be deposited in order to create a proposal. Setting this high may deter spam, but setting it too high may limit broad participation."
              image={<Emoji label="banknote" symbol="💵" />}
              title="Proposal deposit"
            >
              <NumberInput
                error={
                  errors.variableVotingWeightsOptions?.governanceTokenOptions
                    ?.proposalDeposit?.value
                }
                label="variableVotingWeightsOptions.governanceTokenOptions.proposalDeposit.value"
                onPlusMinus={[
                  () =>
                    setValue(
                      'variableVotingWeightsOptions.governanceTokenOptions.proposalDeposit.value',
                      Math.max(
                        watch(
                          'variableVotingWeightsOptions.governanceTokenOptions.proposalDeposit.value'
                        ) + 1,
                        0
                      )
                    ),
                  () =>
                    setValue(
                      'variableVotingWeightsOptions.governanceTokenOptions.proposalDeposit.value',
                      Math.max(
                        watch(
                          'variableVotingWeightsOptions.governanceTokenOptions.proposalDeposit.value'
                        ) - 1,
                        0
                      )
                    ),
                ]}
                register={register}
                sizing="sm"
                step={1}
              />
            </CreateOrgConfigCard>

            <CreateOrgConfigCard
              description="This parameter determines whether a failed proposal will have its deposit refunded. (Proposals that pass will always have their deposit returned). Turning this on may encourage members to deliberate before creating specific proposals, particularly when proposal deposits are high."
              image={<Emoji label="finger pointing up" symbol="👆" />}
              title="Refund failed proposals"
            >
              <div className="flex flex-row gap-4 items-center py-2 px-3 bg-card rounded-md">
                <p className="w-[3ch] secondary-text">
                  {watch(
                    'variableVotingWeightsOptions.governanceTokenOptions.proposalDeposit.refundFailed'
                  )
                    ? 'Yes'
                    : 'No'}
                </p>

                <FormSwitch
                  label="variableVotingWeightsOptions.governanceTokenOptions.proposalDeposit.refundFailed"
                  setValue={setValue}
                  sizing="sm"
                  watch={watch}
                />
              </div>
            </CreateOrgConfigCard>

            <CreateOrgConfigCard
              description="In order to vote, members must register their tokens with the org. Members who would like to leave the org or trade their governance tokens must first unregister them. This setting configures how long members have to wait after unregistering their tokens for those tokens to become available. The longer you set this duration, the more sure you can be that people who register their tokens are keen to participate in your org's governance."
              image={<Emoji label="alarm clock" symbol="⏰" />}
              title="Unregister duration"
            >
              <NumberInput
                error={
                  errors.variableVotingWeightsOptions?.governanceTokenOptions
                    ?.unregisterDuration?.value
                }
                label="variableVotingWeightsOptions.governanceTokenOptions.unregisterDuration.value"
                onPlusMinus={[
                  () =>
                    setValue(
                      'variableVotingWeightsOptions.governanceTokenOptions.unregisterDuration.value',
                      Math.max(
                        watch(
                          'variableVotingWeightsOptions.governanceTokenOptions.unregisterDuration.value'
                        ) + 1,
                        0
                      )
                    ),
                  () =>
                    setValue(
                      'variableVotingWeightsOptions.governanceTokenOptions.unregisterDuration.value',
                      Math.max(
                        watch(
                          'variableVotingWeightsOptions.governanceTokenOptions.unregisterDuration.value'
                        ) - 1,
                        0
                      )
                    ),
                ]}
                register={register}
                sizing="sm"
                step={1}
              />

              <SelectInput
                error={
                  errors.variableVotingWeightsOptions?.governanceTokenOptions
                    ?.unregisterDuration?.units
                }
                label="variableVotingWeightsOptions.governanceTokenOptions.unregisterDuration.units"
                register={register}
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
                />
              )}

              <SelectInput
                onChange={({ target: { value } }) =>
                  setValue(
                    'changeThresholdQuorumOptions.thresholdValue',
                    value === 'majority' ? 'majority' : 75
                  )
                }
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
            <TextInput autoFocus label="name" register={newGroupNameRegister} />
            <SubmitButton className="w-full" label="Add group" />
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
