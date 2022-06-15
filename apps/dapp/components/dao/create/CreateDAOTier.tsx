import { TrashIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import {
  Control,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
} from 'react-hook-form'

import {
  AddressInput,
  Button,
  InputErrorMessage,
  NumberInput,
  TextInput,
  TooltipIcon,
} from '@dao-dao/ui'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { CornerGradient } from './CornerGradient'
import { distributionColors } from './Distributions'
import { NEW_DAO_CW20_DECIMALS, NewDAO, NewDAOStructure } from '@/atoms'

interface CreateDAOTierProps {
  newDAO: NewDAO
  tierIndex: number
  // Display color dots next to each member instead of each tier.
  // When there is only one tier, all members are displayed on the chart,
  // so the colors correspond to members instead of tiers.
  showColorDotOnMember: boolean
  control: Control<NewDAO, any>
  register: UseFormRegister<NewDAO>
  errors: FormState<NewDAO>['errors']
  setValue: UseFormSetValue<NewDAO>
  remove?: () => void
}

export const CreateDAOTier: FC<CreateDAOTierProps> = ({
  // Don't pass along to member.
  remove,
  newDAO,
  ...props
}) => {
  const {
    tierIndex,
    control,
    register,
    errors,
    setValue,
    showColorDotOnMember,
  } = props

  const {
    fields: members,
    append: appendMember,
    remove: removeMember,
  } = useFieldArray({
    control,
    name: `tiers.${tierIndex}.members`,
  })

  const governanceTokenEnabled =
    newDAO.structure === NewDAOStructure.UsingGovToken

  const tierColor = distributionColors[tierIndex % distributionColors.length]

  return (
    <div className="relative p-6 bg-disabled rounded-lg">
      {!showColorDotOnMember && <CornerGradient color={`${tierColor}1A`} />}
      <div className="flex flex-row gap-8 justify-between items-center">
        <div className="grow">
          <div className="flex flex-row grow gap-4 items-center">
            {!showColorDotOnMember && (
              <div
                className="shrink-0 w-2 h-2 rounded-full"
                style={{
                  backgroundColor: tierColor,
                }}
              ></div>
            )}

            <div className="flex flex-row grow gap-2 items-center">
              <TooltipIcon label="This name is just for your reference when creating the DAO. For example: 'Core team' or 'Developers'." />

              <TextInput
                className="grow"
                error={errors.tiers?.[tierIndex]?.name}
                label={`tiers.${tierIndex}.name`}
                placeholder="Tier name..."
                register={register}
                validation={[validateRequired]}
              />
            </div>
          </div>
          <InputErrorMessage error={errors.tiers?.[tierIndex]?.name} />
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-right caption-text">
              {governanceTokenEnabled ? 'Tokens' : 'Voting power'}
            </p>
            <div>
              <NumberInput
                error={errors.tiers?.[tierIndex]?.weight}
                label={`tiers.${tierIndex}.weight`}
                onPlusMinus={[
                  () =>
                    setValue(
                      `tiers.${tierIndex}.weight`,
                      Math.max(
                        (newDAO.tiers?.[tierIndex]?.weight ?? 0) + 1,
                        governanceTokenEnabled
                          ? 1 / 10 ** NEW_DAO_CW20_DECIMALS
                          : 1
                      )
                    ),
                  () =>
                    setValue(
                      `tiers.${tierIndex}.weight`,
                      Math.max(
                        (newDAO.tiers?.[tierIndex]?.weight ?? 0) - 1,
                        governanceTokenEnabled
                          ? 1 / 10 ** NEW_DAO_CW20_DECIMALS
                          : 1
                      )
                    ),
                ]}
                register={register}
                sizing={governanceTokenEnabled ? 'md' : 'sm'}
                step={
                  governanceTokenEnabled ? 1 / 10 ** NEW_DAO_CW20_DECIMALS : 1
                }
                validation={[validatePositive, validateRequired]}
              />
            </div>
            <p className="secondary-text">
              per
              <br />
              member
            </p>
            <TooltipIcon label="Want to add members with different voting power? Add another tier." />
          </div>

          <InputErrorMessage error={errors.tiers?.[tierIndex]?.weight} />
        </div>
      </div>

      <div className="flex flex-col gap-2 items-stretch mt-4">
        {members.map(({ id }, idx) => (
          <CreateDAOTierMember
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
              <TrashIcon className="w-4 h-4" />
            </Button>
          )}
        </div>

        <InputErrorMessage error={errors.tiers?.[tierIndex]?._error} />
      </div>
    </div>
  )
}

interface CreateDAOTierMemberProps extends Omit<CreateDAOTierProps, 'newDAO'> {
  memberIndex: number
}

const CreateDAOTierMember: FC<CreateDAOTierMemberProps> = ({
  tierIndex,
  memberIndex,
  register,
  errors,
  remove,
  showColorDotOnMember,
}) => (
  <div className="grid grid-cols-[1fr_2rem] grid-rows-1 gap-4 items-center p-3 bg-card rounded-md sm:gap-8">
    <div>
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
          error={errors.tiers?.[tierIndex]?.members?.[memberIndex]?.address}
          label={`tiers.${tierIndex}.members.${memberIndex}.address`}
          placeholder="Member's address..."
          register={register}
          validation={[validateAddress, validateRequired]}
        />
      </div>

      <InputErrorMessage
        error={errors.tiers?.[tierIndex]?.members?.[memberIndex]?.address}
      />
    </div>

    <button className="justify-self-end p-1" onClick={remove}>
      <TrashIcon className="w-4 h-4 text-error" />
    </button>
  </div>
)
