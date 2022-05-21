import { TrashIcon } from '@heroicons/react/outline'
import { FC, useCallback } from 'react'
import {
  Control,
  FormState,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

import { Button, NumberInput, TextInput } from '@dao-dao/ui'

import { NewOrg } from '@/atoms/org'

interface CreateOrgGroupProps {
  groupIndex: number
  control: Control<Partial<NewOrg>, any>
  register: UseFormRegister<Partial<NewOrg>>
  errors: FormState<Partial<NewOrg>>['errors']
  watch: UseFormWatch<Partial<NewOrg>>
  setValue: UseFormSetValue<Partial<NewOrg>>
  remove: () => void
}

export const CreateOrgGroup: FC<CreateOrgGroupProps> = ({
  // Don't pass along to member.
  remove,
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

  const addNewMember = useCallback(() => {
    const totalMembers = members.length + 1
    const proportion = Math.round(100 / totalMembers)

    // Update existing members proportions.
    members.forEach((_, idx) =>
      setValue(`groups.${groupIndex}.members.${idx}.proportion`, proportion)
    )
    // Add new member.
    appendMember({ proportion })
  }, [members, appendMember, setValue, groupIndex])

  const removeMember = useCallback(
    (index: number) => {
      const totalMembers = members.length - 1
      const proportion = totalMembers === 0 ? 0 : Math.round(100 / totalMembers)

      // Update existing members proportions.
      members.forEach((_, idx) =>
        setValue(`groups.${groupIndex}.members.${idx}.proportion`, proportion)
      )
      // Remove member.
      _removeMember(index)
    },
    [members, _removeMember, setValue, groupIndex]
  )

  return (
    <div className="p-6 bg-disabled rounded-lg">
      <div className="flex flex-row gap-8 justify-between items-center">
        <TextInput
          className="flex-1"
          error={errors.groups?.[groupIndex]?.name}
          label={`groups.${groupIndex}.name`}
          placeholder="Group's name..."
          register={register}
        />

        <div className="flex flex-row gap-2 justify-between items-center">
          <p className="caption-text">
            Voting
            <br />
            Power
          </p>

          <NumberInput
            className="w-10"
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
            step={1}
          />
          <p className="primary-text">%</p>
        </div>
      </div>

      <p className="mt-6 mb-2 primary-text">Members</p>

      <div className="flex flex-col gap-2 items-stretch">
        {members.map(({ id }, idx) => (
          <CreateOrgGroupMember
            key={id}
            memberIndex={idx}
            remove={() => removeMember(idx)}
            {...props}
          />
        ))}

        <div className="flex flex-row justify-between items-center">
          <Button onClick={addNewMember} variant="secondary">
            Add member
          </Button>
          <Button className="!text-error" onClick={remove} variant="secondary">
            Remove group
          </Button>
        </div>
      </div>
    </div>
  )
}

interface CreateOrgGroupMemberProps extends CreateOrgGroupProps {
  memberIndex: number
}

const CreateOrgGroupMember: FC<CreateOrgGroupMemberProps> = ({
  groupIndex,
  memberIndex,
  register,
  errors,
  watch,
  remove,
}) => (
  <div className="grid grid-cols-[5fr_2fr_2rem] grid-rows-1 gap-8 items-center p-3 bg-card rounded-md">
    <TextInput
      error={errors.groups?.[groupIndex]?.members?.[memberIndex]?.address}
      label={`groups.${groupIndex}.members.${memberIndex}.address`}
      placeholder="Member's address..."
      register={register}
    />

    <p className="text-xs text-center sm:text-sm">
      Proportion:{' '}
      {watch(`groups.${groupIndex}.members.${memberIndex}.proportion`)}%
    </p>

    <button onClick={remove}>
      <TrashIcon className="text-error" height="1.4rem" width="1.4rem" />
    </button>
  </div>
)
