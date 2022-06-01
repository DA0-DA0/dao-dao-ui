import { TrashIcon } from '@heroicons/react/outline'
import { FC } from 'react'
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
  validatePercent,
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
  remove?: () => void
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
    remove: removeMember,
  } = useFieldArray({
    control,
    name: `groups.${groupIndex}.members`,
  })

  return (
    <div className="p-6 bg-disabled rounded-lg">
      <div className="flex flex-row gap-8 justify-between items-center">
        <div>
          <p className="title-text">{watch(`groups.${groupIndex}.name`)}</p>
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
                step={0.001}
                validation={[
                  validatePositive,
                  validatePercent,
                  validateRequired,
                ]}
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
          <Button
            onClick={() => appendMember({ address: '' })}
            variant="secondary"
          >
            Add member
          </Button>
          {remove && (
            <Button
              className="!text-error"
              onClick={remove}
              variant="secondary"
            >
              Remove group
            </Button>
          )}
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
  <div className="grid grid-cols-[5fr_2fr_2rem] grid-rows-1 gap-4 items-center p-3 bg-card rounded-md sm:gap-8">
    <div className="grow">
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

    <p className="text-xs text-center sm:text-sm">
      Proportion:{' '}
      <span className="font-mono">
        1/{(watch(`groups.${groupIndex}.members`) || []).length}
      </span>
    </p>

    <button className="justify-self-end" onClick={remove}>
      <TrashIcon className="text-error" height="1.4rem" width="1.4rem" />
    </button>
  </div>
)
