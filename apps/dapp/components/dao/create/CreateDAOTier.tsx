import { TrashIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { FC } from 'react'
import {
  Control,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  TextInput,
  TooltipIcon,
} from '@dao-dao/ui'
import {
  formatPercentOf100,
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { NEW_DAO_CW20_DECIMALS, NewDAO, NewDAOStructure } from '@/atoms'

import { CornerGradient } from './CornerGradient'
import { distributionColors } from './Distributions'

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
  ...props
}) => {
  const { t } = useTranslation()
  const {
    newDAO,
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
    newDAO.structure === NewDAOStructure.GovernanceToken

  const tierColor = distributionColors[tierIndex % distributionColors.length]
  const tierVotingWeight = newDAO.tiers?.[tierIndex]?.weight ?? 0

  return (
    <div className="relative p-6 bg-disabled rounded-lg">
      {!showColorDotOnMember && <CornerGradient color={`${tierColor}1A`} />}
      <div className="flex flex-col gap-4 items-stretch sm:flex-row sm:gap-8 sm:justify-between sm:items-center">
        <div className="grow">
          <div className="flex flex-col grow gap-1">
            <InputLabel
              containerProps={{
                className: clsx('grow', { 'ml-6': !showColorDotOnMember }),
              }}
              name={t('form.tierNameTitle')}
              tooltip={t('form.tierNameTooltip')}
            />

            <div className="flex flex-row grow gap-4 items-center">
              {!showColorDotOnMember && (
                <div
                  className="shrink-0 w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: tierColor,
                  }}
                ></div>
              )}

              <TextInput
                error={errors.tiers?.[tierIndex]?.name}
                fieldName={`tiers.${tierIndex}.name`}
                placeholder={t('form.tierNameTitle') + '...'}
                register={register}
                validation={[validateRequired]}
              />
            </div>
          </div>

          <InputErrorMessage
            className={clsx({ 'ml-6': !showColorDotOnMember })}
            error={errors.tiers?.[tierIndex]?.name}
          />
        </div>

        <div className="grow">
          <div className="flex flex-col gap-1">
            <InputLabel
              name={t('form.tierVotingWeight', {
                context: governanceTokenEnabled
                  ? 'tokenBased'
                  : 'membershipBased',
              })}
              tooltip={t('form.tierVotingWeightPrompt', {
                context: governanceTokenEnabled
                  ? 'tokenBased'
                  : 'membershipBased',
                weight: governanceTokenEnabled
                  ? formatPercentOf100(tierVotingWeight)
                  : tierVotingWeight.toLocaleString(),
              })}
            />

            <div className="flex flex-row gap-2 items-center">
              <NumberInput
                containerClassName="grow"
                error={errors.tiers?.[tierIndex]?.weight}
                fieldName={`tiers.${tierIndex}.weight`}
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
                step={
                  governanceTokenEnabled ? 1 / 10 ** NEW_DAO_CW20_DECIMALS : 1
                }
                validation={[validatePositive, validateRequired]}
              />
              {governanceTokenEnabled && <InputLabel name="%" />}
            </div>
          </div>

          <InputErrorMessage error={errors.tiers?.[tierIndex]?.weight} />
        </div>
      </div>

      <InputLabel
        containerProps={{ className: 'mt-4 mb-1' }}
        name={t('title.members')}
      />
      <div className="flex flex-col gap-2 items-stretch">
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
            {t('button.addMember')}
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

interface CreateDAOTierMemberProps extends CreateDAOTierProps {
  memberIndex: number
}

const CreateDAOTierMember: FC<CreateDAOTierMemberProps> = ({
  newDAO,
  tierIndex,
  memberIndex,
  register,
  errors,
  remove,
  showColorDotOnMember,
}) => {
  const { t } = useTranslation()

  const tier = newDAO.tiers?.[tierIndex]
  // Governance Token-based DAOs distribute tier weights evenly amongst
  // members.
  const govTokens =
    newDAO.governanceTokenOptions && tier
      ? (tier.weight / tier.members.length / 100) *
        newDAO.governanceTokenOptions.newInfo.initialSupply
      : undefined

  return (
    <div className="flex flex-row gap-4 items-center p-3 bg-card rounded-md">
      <div className="grow">
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
            fieldName={`tiers.${tierIndex}.members.${memberIndex}.address`}
            placeholder={t('form.membersAddress')}
            register={register}
            validation={[validateAddress, validateRequired]}
          />
        </div>

        <InputErrorMessage
          error={errors.tiers?.[tierIndex]?.members?.[memberIndex]?.address}
        />
      </div>

      {govTokens !== undefined && (
        <TooltipIcon
          label={t('info.tierMemberGovTokenAllocationTooltip', {
            tokens: govTokens.toLocaleString(undefined, {
              maximumFractionDigits: NEW_DAO_CW20_DECIMALS,
            }),
            tokenSymbol:
              newDAO.governanceTokenOptions.newInfo.symbol || t('info.token'),
          })}
        />
      )}

      <button className="pr-1" onClick={remove}>
        <TrashIcon className="w-4 h-4 text-error" />
      </button>
    </div>
  )
}
