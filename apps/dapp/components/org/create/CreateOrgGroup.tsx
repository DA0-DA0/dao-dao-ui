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
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { distributionColors } from './Distributions'
import { NewOrg, NEW_ORG_CW20_DECIMALS } from '@/atoms/org'

interface CreateOrgGroupProps {
  groupIndex: number
  // Display color dots next to each member instead of each group.
  // When there is only one group, all members are displayed on the chart,
  // so the colors correspond to members instead of groups.
  showColorDotOnMember: boolean
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
  const {
    groupIndex,
    control,
    register,
    errors,
    setValue,
    watch,
    showColorDotOnMember,
  } = props
  const {
    fields: members,
    append: appendMember,
    remove: removeMember,
  } = useFieldArray({
    control,
    name: `groups.${groupIndex}.members`,
  })

  const governanceTokenEnabled = watch('governanceTokenEnabled')

  return (
    <div className="p-6 bg-disabled rounded-lg">
      <div className="flex flex-row gap-8 justify-between items-center">
        <div>
          <div className="flex flex-row gap-4 items-center">
            {!showColorDotOnMember && (
              <div
                className="shrink-0 w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    distributionColors[groupIndex % distributionColors.length],
                }}
              ></div>
            )}

            <p className="title-text">{watch(`groups.${groupIndex}.name`)}</p>
          </div>
          <InputErrorMessage error={errors.groups?.[groupIndex]?._error} />
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-right caption-text">
              {governanceTokenEnabled ? 'Tokens' : 'Voting power'}
            </p>
            <div>
              <NumberInput
                error={errors.groups?.[groupIndex]?.weight}
                label={`groups.${groupIndex}.weight`}
                onPlusMinus={[
                  () =>
                    setValue(
                      `groups.${groupIndex}.weight`,
                      Math.max(
                        watch(`groups.${groupIndex}.weight`) + 1,
                        governanceTokenEnabled
                          ? 1 / 10 ** NEW_ORG_CW20_DECIMALS
                          : 1
                      )
                    ),
                  () =>
                    setValue(
                      `groups.${groupIndex}.weight`,
                      Math.max(
                        watch(`groups.${groupIndex}.weight`) - 1,
                        governanceTokenEnabled
                          ? 1 / 10 ** NEW_ORG_CW20_DECIMALS
                          : 1
                      )
                    ),
                ]}
                register={register}
                sizing={governanceTokenEnabled ? 'md' : 'sm'}
                step={
                  governanceTokenEnabled ? 1 / 10 ** NEW_ORG_CW20_DECIMALS : 1
                }
                validation={[validatePositive, validateRequired]}
              />
            </div>
            <p className="secondary-text">
              per
              <br />
              member
            </p>
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
  remove,
  showColorDotOnMember,
}) => (
  <div className="grid grid-cols-[1fr_2rem] grid-rows-1 gap-4 items-center p-3 bg-card rounded-md sm:gap-8">
    <div className="flex flex-row gap-4 items-center">
      {showColorDotOnMember && (
        <div
          className="shrink-0 w-2 h-2 rounded-full"
          style={{
            backgroundColor:
              distributionColors[memberIndex % distributionColors.length],
          }}
        ></div>
      )}

      <AddressInput
        containerClassName="grow"
        error={errors.groups?.[groupIndex]?.members?.[memberIndex]?.address}
        label={`groups.${groupIndex}.members.${memberIndex}.address`}
        placeholder="Member's address..."
        register={register}
        validation={[validateAddress, validateRequired]}
      />
    </div>

    <InputErrorMessage
      error={errors.groups?.[groupIndex]?.members?.[memberIndex]?.address}
    />

    <button className="justify-self-end" onClick={remove}>
      <TrashIcon className="text-error" height="1.4rem" width="1.4rem" />
    </button>
  </div>
)
