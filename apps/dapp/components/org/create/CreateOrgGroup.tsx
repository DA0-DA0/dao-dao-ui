import { TrashIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { FC, useCallback } from 'react'
import {
  Control,
  FormState,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

import {
  AddressInput,
  Button,
  InputErrorMessage,
  NumberInput,
} from '@dao-dao/ui'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { NewOrg } from '@/atoms/org'

interface CreateOrgGroupProps {
  groupIndex: number
  control: Control<NewOrg, any>
  register: UseFormRegister<NewOrg>
  errors: FormState<NewOrg>['errors']
  watch: UseFormWatch<NewOrg>
  setValue: UseFormSetValue<NewOrg>
  remove: () => void
  redistributeEvenly: () => void
}

export const CreateOrgGroup: FC<CreateOrgGroupProps> = ({
  // Don't pass along to member.
  remove,
  redistributeEvenly,
  ...props
}) => {
  const { groupIndex, control, register, errors, setValue, watch } = props
  const {
    fields: members,
    append: appendMember,
    remove: _removeMember,
  } = useFieldArray({
    control,
    name: `groups.${groupIndex}.members`,
  })

  const variableVotingWeightsEnabled = watch('variableVotingWeightsEnabled')

  const addNewMember = useCallback(() => {
    let proportion = 0
    if (members.length === 0) {
      proportion = 100
    } else if (variableVotingWeightsEnabled) {
      // If there are already members, give the new member the remainder
      // of the voting weight.
      if (members.length > 0) {
        const totalWeight = members.reduce(
          (acc, member) => acc + member.proportion,
          0
        )
        proportion = 100 - totalWeight
      }
    } else {
      // Evenly distributed so redistribute proportionally.
      const totalMembers = members.length + 1
      proportion = Math.round(100 / totalMembers)

      // Update existing members proportions.
      members.forEach((_, idx) =>
        setValue(`groups.${groupIndex}.members.${idx}.proportion`, proportion)
      )
    }

    // Add new member.
    appendMember({ proportion })
  }, [
    members,
    appendMember,
    setValue,
    groupIndex,
    variableVotingWeightsEnabled,
  ])

  const removeMember = useCallback(
    (index: number) => {
      // If evenly distributed, redistribute proportionally.
      if (!variableVotingWeightsEnabled) {
        const totalMembers = members.length - 1
        const proportion =
          totalMembers === 0 ? 0 : Math.round(100 / totalMembers)

        // Update existing members proportions.
        members.forEach((_, idx) =>
          setValue(`groups.${groupIndex}.members.${idx}.proportion`, proportion)
        )
      }

      // Remove member.
      _removeMember(index)
    },
    [members, _removeMember, setValue, groupIndex, variableVotingWeightsEnabled]
  )

  return (
    <div className="p-6 bg-disabled rounded-lg">
      <div className="flex flex-row gap-8 justify-between items-center">
        <div>
          <p className="title-text">
            {watch(`groups.${groupIndex}.name`)} members
          </p>
          <InputErrorMessage error={errors.groups?.[groupIndex]?._error} />
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-2 justify-between items-center">
            <p className="text-right caption-text">Voting power</p>
            <div>
              <NumberInput
                error={errors.groups?.[groupIndex]?.weight}
                label={`groups.${groupIndex}.weight`}
                onPlusMinus={[
                  () =>
                    setValue(
                      `groups.${groupIndex}.weight`,
                      Math.max(
                        Math.min(watch(`groups.${groupIndex}.weight`) + 1, 100),
                        0
                      )
                    ),
                  () =>
                    setValue(
                      `groups.${groupIndex}.weight`,
                      Math.max(
                        Math.min(watch(`groups.${groupIndex}.weight`) - 1, 100),
                        0
                      )
                    ),
                ]}
                register={register}
                sizing="sm"
                step={1}
                validation={[validatePositive, validateRequired]}
              />
            </div>
            <p className="primary-text">%</p>
          </div>

          <InputErrorMessage error={errors.groups?.[groupIndex]?.weight} />
        </div>
      </div>

      <div className="flex flex-col gap-2 items-stretch mt-4">
        {members.map(({ id }, idx) => (
          <CreateOrgGroupMember
            key={id}
            memberIndex={idx}
            remove={() => removeMember(idx)}
            {...props}
          />
        ))}

        <div className="flex flex-row gap-2 justify-between items-center">
          <Button onClick={addNewMember} variant="secondary">
            Add member
          </Button>
          <div className="flex flex-row gap-2 items-center">
            {variableVotingWeightsEnabled && (
              <Button onClick={redistributeEvenly} variant="secondary">
                Distribute evenly
              </Button>
            )}

            <Button
              className="!text-error"
              onClick={remove}
              variant="secondary"
            >
              Remove group
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CreateOrgGroupMemberProps
  extends Omit<CreateOrgGroupProps, 'redistributeEvenly'> {
  memberIndex: number
}

const CreateOrgGroupMember: FC<CreateOrgGroupMemberProps> = ({
  groupIndex,
  memberIndex,
  register,
  errors,
  watch,
  remove,
  setValue,
}) => {
  const variableVotingWeightsEnabled = watch('variableVotingWeightsEnabled')

  return (
    <div
      className={clsx('gap-4  p-3 bg-card rounded-md sm:gap-8', {
        'grid grid-cols-[5fr_2fr_2rem] grid-rows-1 items-center':
          !variableVotingWeightsEnabled,
        'grid grid-cols-2 grid-rows-2 sm:flex sm:flex-row sm:justify-between sm:items-center':
          variableVotingWeightsEnabled,
      })}
    >
      <div
        className={clsx('grow', { 'col-span-2': variableVotingWeightsEnabled })}
      >
        <AddressInput
          error={errors.groups?.[groupIndex]?.members?.[memberIndex]?.address}
          label={`groups.${groupIndex}.members.${memberIndex}.address`}
          placeholder="Member's address..."
          register={register}
          validation={[validateAddress, validateRequired]}
        />
        <InputErrorMessage
          error={errors.groups?.[groupIndex]?.members?.[memberIndex]?.address}
        />
      </div>

      {variableVotingWeightsEnabled ? (
        <div className="flex flex-row gap-2 justify-between items-center">
          <p className="text-right caption-text">Proportion:</p>

          <div>
            <NumberInput
              error={
                errors.groups?.[groupIndex]?.members?.[memberIndex]?.proportion
              }
              label={`groups.${groupIndex}.members.${memberIndex}.proportion`}
              onPlusMinus={[
                () =>
                  setValue(
                    `groups.${groupIndex}.members.${memberIndex}.proportion`,
                    Math.max(
                      Math.min(
                        watch(
                          `groups.${groupIndex}.members.${memberIndex}.proportion`
                        ) + 1,
                        100
                      ),
                      0
                    )
                  ),
                () =>
                  setValue(
                    `groups.${groupIndex}.members.${memberIndex}.proportion`,
                    Math.max(
                      Math.min(
                        watch(
                          `groups.${groupIndex}.members.${memberIndex}.proportion`
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
              validation={[validatePositive, validateRequired]}
            />
            <InputErrorMessage
              error={
                errors.groups?.[groupIndex]?.members?.[memberIndex]?.proportion
              }
            />
          </div>
          <p className="primary-text">%</p>
        </div>
      ) : (
        <p className="text-xs text-center sm:text-sm">
          Proportion:{' '}
          {watch(`groups.${groupIndex}.members.${memberIndex}.proportion`)}%
        </p>
      )}

      <button className="justify-self-end" onClick={remove}>
        <TrashIcon className="text-error" height="1.4rem" width="1.4rem" />
      </button>
    </div>
  )
}
