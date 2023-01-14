import { Add, Close } from '@mui/icons-material'
import {
  Control,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  IconButton,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  TextInput,
  TooltipInfoIcon,
  VOTING_POWER_DISTRIBUTION_COLORS,
} from '@dao-dao/stateless'
import { NewDao } from '@dao-dao/types'
import {
  NEW_DAO_CW20_DECIMALS,
  formatPercentOf100,
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components/AddressInput'
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
  watch: UseFormWatch<NewDao<DaoCreationConfig>>
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
    watch,
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
      <div className="flex h-14 flex-row items-center justify-between border-b border-border-base p-4">
        <div className="flex flex-row items-center gap-3">
          {!showColorDotOnMember && (
            <div
              className="h-3 w-3 shrink-0 rounded-full"
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

      <div className="flex flex-col items-stretch sm:flex-row sm:items-center sm:justify-between">
        <div className="flex grow flex-col border-b border-border-secondary p-6 sm:border-r sm:border-b-0">
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

        <div className="flex grow flex-col p-6">
          <InputLabel
            containerProps={{ className: 'mb-2' }}
            name={t('form.percentOfTotalSupply')}
            tooltip={t('form.percentOfTotalSupplyTooltip', {
              weight: formatPercentOf100(tierVotingWeight),
            })}
          />

          <div className="flex flex-row items-center gap-2">
            <NumberInput
              containerClassName="grow"
              error={
                errors.votingModuleAdapter?.data?.tiers?.[tierIndex]?.weight
              }
              fieldName={`votingModuleAdapter.data.tiers.${tierIndex}.weight`}
              onMinus={() =>
                setValue(
                  `votingModuleAdapter.data.tiers.${tierIndex}.weight`,
                  Math.max(
                    (data.tiers?.[tierIndex]?.weight ?? 0) - 1,
                    1 / 10 ** NEW_DAO_CW20_DECIMALS
                  )
                )
              }
              onPlus={() =>
                setValue(
                  `votingModuleAdapter.data.tiers.${tierIndex}.weight`,
                  Math.max(
                    (data.tiers?.[tierIndex]?.weight ?? 0) + 1,
                    1 / 10 ** NEW_DAO_CW20_DECIMALS
                  )
                )
              }
              register={register}
              step={1 / 10 ** NEW_DAO_CW20_DECIMALS}
              validation={[validatePositive, validateRequired]}
            />
            <InputLabel name="%" />
          </div>

          <InputErrorMessage
            error={errors.votingModuleAdapter?.data?.tiers?.[tierIndex]?.weight}
          />
        </div>
      </div>

      <div className="flex flex-col border-t border-border-secondary p-6">
        <InputLabel
          containerProps={{ className: 'mb-2' }}
          name={t('title.members')}
        />

        <div className="flex flex-col items-stretch gap-1">
          {members.map(({ id }, memberIndex) => (
            <div
              key={id}
              className="flex flex-row items-center gap-4 rounded-lg bg-background-secondary p-4"
            >
              <div className="grow">
                <div className="flex flex-row items-center gap-4">
                  {showColorDotOnMember && (
                    <div
                      className="h-2 w-2 shrink-0 rounded-full"
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
                    setValue={setValue}
                    validation={[validateAddress, validateRequired]}
                    watch={watch}
                  />
                </div>

                <InputErrorMessage
                  error={
                    errors.votingModuleAdapter?.data?.tiers?.[tierIndex]
                      ?.members?.[memberIndex]?.address
                  }
                />
              </div>

              <TooltipInfoIcon
                title={t('info.tierMemberGovTokenAllocationTooltip', {
                  tokens: (
                    (tierVotingWeight / members.length / 100) *
                    data.newInfo.initialSupply
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: NEW_DAO_CW20_DECIMALS,
                  }),
                  tokenSymbol: data.newInfo.symbol || t('info.tokens'),
                })}
              />

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
            className="mt-1 self-start"
            onClick={() => appendMember({ address: '' })}
            variant="ghost"
          >
            <Add className="!h-6 !w-6 text-icon-secondary" />
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
