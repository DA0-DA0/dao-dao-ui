// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { Add, Close } from '@mui/icons-material'
import {
  Control,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { NewDao } from '@dao-dao/tstypes'
import {
  AddressInput,
  Button,
  IconButton,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  TextInput,
  VOTING_POWER_DISTRIBUTION_COLORS,
} from '@dao-dao/ui'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { DaoCreationConfig } from '../types'

export interface TierCardProps {
  data: DaoCreationConfig
  tierIndex: number
  // Display color dots next to each member instead of each tier.
  // When there is only one tier, all members are displayed on the chart,
  // so the colors correspond to members instead of tiers.
  showColorDotOnMember: boolean
  control: Control<NewDao<DaoCreationConfig>>
  register: UseFormRegister<NewDao<DaoCreationConfig>>
  errors: FormState<NewDao<DaoCreationConfig>>['errors']
  setValue: UseFormSetValue<NewDao<DaoCreationConfig>>
  remove?: () => void
}

export const TierCard = ({
  // Don't pass along to member.
  remove,

  ...props
}: TierCardProps) => {
  const { t } = useTranslation()
  const {
    data,
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
    name: `votingModuleAdapter.data.tiers.${tierIndex}.members`,
  })

  const tierColor =
    VOTING_POWER_DISTRIBUTION_COLORS[
      tierIndex % VOTING_POWER_DISTRIBUTION_COLORS.length
    ]
  const tierVotingWeight = data.tiers?.[tierIndex]?.weight ?? 0

  return (
    <div className="rounded-lg bg-background-tertiary">
      <div className="flex flex-row justify-between items-center p-4 h-14 border-b border-border-base">
        <div className="flex flex-row gap-3 items-center">
          {!showColorDotOnMember && (
            <div
              className="shrink-0 w-3 h-3 rounded-full"
              style={{
                backgroundColor: tierColor,
              }}
            ></div>
          )}

          <p className="primary-text text-text-body">
            {data.tiers[tierIndex].name.trim() ||
              t('title.tierNum', { tier: tierIndex + 1 })}
          </p>
        </div>

        {remove && (
          <IconButton
            Icon={Close}
            iconClassName="text-icon-secondary"
            onClick={remove}
            variant="ghost"
          />
        )}
      </div>

      <div className="flex flex-col items-stretch sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col grow p-6 border-b sm:border-r sm:border-b-0 border-border-secondary">
          <InputLabel
            containerProps={{ className: 'mb-2' }}
            name={t('form.tierNameTitle')}
            tooltip={t('form.tierNameTooltip')}
          />

          <TextInput
            error={errors.votingModuleAdapter?.data?.tiers?.[tierIndex]?.name}
            fieldName={`votingModuleAdapter.data.tiers.${tierIndex}.name`}
            placeholder={t('form.tierNameTitle') + '...'}
            register={register}
            validation={[validateRequired]}
          />

          <InputErrorMessage
            error={errors.votingModuleAdapter?.data?.tiers?.[tierIndex]?.name}
          />
        </div>

        <div className="flex flex-col grow p-6">
          <InputLabel
            containerProps={{ className: 'mb-2' }}
            name={t('form.votingWeightPerMember')}
            tooltip={t('form.votingWeightPerMemberTooltip', {
              weight: tierVotingWeight.toLocaleString(),
            })}
          />

          <NumberInput
            error={errors.votingModuleAdapter?.data?.tiers?.[tierIndex]?.weight}
            fieldName={`votingModuleAdapter.data.tiers.${tierIndex}.weight`}
            onMinus={() =>
              setValue(
                `votingModuleAdapter.data.tiers.${tierIndex}.weight`,
                Math.max((data.tiers?.[tierIndex]?.weight ?? 0) - 1, 1)
              )
            }
            onPlus={() =>
              setValue(
                `votingModuleAdapter.data.tiers.${tierIndex}.weight`,
                Math.max((data.tiers?.[tierIndex]?.weight ?? 0) + 1, 1)
              )
            }
            register={register}
            step={1}
            validation={[validatePositive, validateRequired]}
          />

          <InputErrorMessage
            error={errors.votingModuleAdapter?.data?.tiers?.[tierIndex]?.weight}
          />
        </div>
      </div>

      <div className="flex flex-col p-6 border-t border-border-secondary">
        <InputLabel
          containerProps={{ className: 'mb-2' }}
          name={t('title.members')}
        />

        <div className="flex flex-col gap-1 items-stretch">
          {members.map(({ id }, memberIndex) => (
            <div
              key={id}
              className="flex flex-row gap-4 items-center p-4 rounded-lg bg-background-secondary"
            >
              <div className="grow">
                <div className="flex flex-row gap-4 items-center">
                  {showColorDotOnMember && (
                    <div
                      className="shrink-0 w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          VOTING_POWER_DISTRIBUTION_COLORS[
                            memberIndex %
                              VOTING_POWER_DISTRIBUTION_COLORS.length
                          ],
                      }}
                    ></div>
                  )}

                  <AddressInput
                    containerClassName="grow"
                    error={
                      errors.votingModuleAdapter?.data?.tiers?.[tierIndex]
                        ?.members?.[memberIndex]?.address
                    }
                    fieldName={`votingModuleAdapter.data.tiers.${tierIndex}.members.${memberIndex}.address`}
                    placeholder={t('form.membersAddress')}
                    register={register}
                    validation={[validateAddress, validateRequired]}
                  />
                </div>

                <InputErrorMessage
                  error={
                    errors.votingModuleAdapter?.data?.tiers?.[tierIndex]
                      ?.members?.[memberIndex]?.address
                  }
                />
              </div>

              <IconButton
                Icon={Close}
                iconClassName="text-icon-secondary"
                onClick={() => removeMember(memberIndex)}
                size="sm"
                variant="ghost"
              />
            </div>
          ))}

          <Button
            className="self-start mt-1"
            onClick={() => appendMember({ address: '' })}
            variant="ghost"
          >
            <Add className="!w-6 !h-6 text-icon-secondary" />
            <p>{t('button.addMember')}</p>
          </Button>

          <InputErrorMessage
            error={errors.votingModuleAdapter?.data?.tiers?.[tierIndex]?._error}
          />
        </div>
      </div>
    </div>
  )
}
