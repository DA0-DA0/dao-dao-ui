import { FC, useCallback, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import {
  Button,
  FormSwitch,
  InputLabel,
  Modal,
  NumberInput,
  SelectInput,
  SubmitButton,
  TextInput,
} from '@dao-dao/ui'

import { DurationUnitsValues } from '@/atoms/org'
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

  const [showThresholdQuorumWarning, setShowThresholdQuorumWarning] =
    useState(false)

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

        <div className="flex flex-col items-stretch p-6 bg-disabled rounded-lg">
          <div className="flex flex-row gap-6 items-start">
            <p className="mt-4 text-[42px]">&#x231b;</p>

            <div>
              <p className="primary-text">Voting duration</p>
              <p className="mt-1 secondary-text">
                The amount of time that a proposal will remain open for voting.
                After this time elapses, the votes for a proposal will be final.
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-2 items-center self-end mt-4">
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
              small
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
          </div>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <FormSwitch
            label="variableVotingWeightsEnabled"
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
                label="governanceTokenEnabled"
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

        <div className="flex flex-row gap-4 items-center">
          <FormSwitch
            label="changeThresholdQuorumEnabled"
            onToggle={(newValue) =>
              newValue && setShowThresholdQuorumWarning(true)
            }
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
