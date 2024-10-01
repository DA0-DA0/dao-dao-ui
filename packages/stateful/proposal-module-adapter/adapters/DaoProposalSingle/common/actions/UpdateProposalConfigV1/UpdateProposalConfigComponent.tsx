import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  ChartEmoji,
  ClockEmoji,
  FormSwitchCard,
  HugeDecimalInput,
  InputErrorMessage,
  KeyEmoji,
  MoneyEmoji,
  PeopleEmoji,
  RecycleEmoji,
  SelectInput,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  DurationUnits,
  DurationUnitsValues,
  DurationWithUnits,
  GenericToken,
} from '@dao-dao/types'
import {
  validatePercent,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

export type UpdateProposalConfigData = {
  onlyMembersExecute: boolean

  depositRequired: boolean
  depositInfo?: {
    deposit: string
    refundFailedProposals: boolean
  }

  thresholdType: '%' | 'majority'
  thresholdPercentage?: number

  quorumEnabled: boolean
  quorumType: '%' | 'majority'
  quorumPercentage?: number

  votingDuration: DurationWithUnits

  allowRevoting: boolean
}

export type UpdateProposalConfigOptions = {
  commonGovernanceTokenInfo?: GenericToken
}

export const UpdateProposalConfigComponent: ActionComponent<
  UpdateProposalConfigOptions
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { commonGovernanceTokenInfo },
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch, getValues } =
    useFormContext<UpdateProposalConfigData>()

  const onlyMembersExecute = watch(
    (fieldNamePrefix + 'onlyMembersExecute') as 'onlyMembersExecute'
  )
  const allowRevoting = watch(
    (fieldNamePrefix + 'allowRevoting') as 'allowRevoting'
  )
  const depositRequired = watch(
    (fieldNamePrefix + 'depositRequired') as 'depositRequired'
  )
  const depositInfo = watch((fieldNamePrefix + 'depositInfo') as 'depositInfo')
  const thresholdType = watch(
    (fieldNamePrefix + 'thresholdType') as 'thresholdType'
  )
  const quorumType = watch((fieldNamePrefix + 'quorumType') as 'quorumType')
  const votingDuration = watch(
    (fieldNamePrefix + 'votingDuration') as 'votingDuration'
  )
  const quorumEnabled = watch(
    (fieldNamePrefix + 'quorumEnabled') as 'quorumEnabled'
  )

  const percentageThresholdSelected = thresholdType === '%'
  const percentageQuorumSelected = quorumType === '%'

  return (
    <div className="flex flex-col gap-2">
      {/* If governance token info, allow specifying deposit. */}
      {commonGovernanceTokenInfo && (
        <div className="flex flex-col gap-4 rounded-lg bg-background-secondary max-w-2xl p-3">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-start justify-between flex-wrap gap-2">
              <div className="flex flex-row items-center basis-1/2 gap-1 grow">
                <MoneyEmoji className="text-base" />
                <p className="primary-text">{t('form.proposalDepositTitle')}</p>
              </div>

              <FormSwitchCard
                fieldName={
                  (fieldNamePrefix + 'depositRequired') as 'depositRequired'
                }
                readOnly={!isCreating}
                setValue={setValue}
                sizing="sm"
                value={depositRequired}
              />
            </div>

            <p className="secondary-text max-w-prose">
              {t('form.proposalDepositDescription')}
            </p>
          </div>

          {depositRequired && (
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <HugeDecimalInput
                  disabled={!isCreating}
                  error={errors?.depositInfo?.deposit}
                  fieldName={
                    (fieldNamePrefix +
                      'depositInfo.deposit') as 'depositInfo.deposit'
                  }
                  getValues={getValues}
                  min={HugeDecimal.one.toHumanReadableString(
                    commonGovernanceTokenInfo.decimals
                  )}
                  register={register}
                  step={HugeDecimal.one.toHumanReadableString(
                    commonGovernanceTokenInfo.decimals
                  )}
                  unit={'$' + commonGovernanceTokenInfo.symbol}
                  validation={[validateRequired, validatePositive]}
                />
                <InputErrorMessage error={errors?.depositInfo?.deposit} />
              </div>

              <FormSwitchCard
                containerClassName="grow"
                fieldName={
                  (fieldNamePrefix +
                    'depositInfo.refundFailedProposals') as 'depositInfo.refundFailedProposals'
                }
                label={t('form.refundFailedProposalsTitle')}
                readOnly={!isCreating}
                setValue={setValue}
                sizing="sm"
                tooltip={t('form.refundFailedProposalsTooltip')}
                tooltipIconSize="sm"
                value={depositInfo?.refundFailedProposals}
              />
            </div>
          )}
        </div>
      )}

      <div className="flex flex-row flex-wrap items-end justify-between gap-x-12 gap-y-4 rounded-lg bg-background-secondary max-w-2xl p-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-1">
            <ChartEmoji className="text-base" />
            <p className="primary-text">{t('form.passingThresholdTitle')}</p>
          </div>
          <p className="secondary-text">
            {t('form.passingThresholdDescription')}
          </p>
        </div>
        <div className="flex grow flex-row flex-wrap gap-2">
          {percentageThresholdSelected && (
            <div className="flex flex-col gap-1">
              <HugeDecimalInput
                disabled={!isCreating}
                error={errors?.thresholdPercentage}
                fieldName={
                  (fieldNamePrefix +
                    'thresholdPercentage') as 'thresholdPercentage'
                }
                getValues={getValues}
                max={100}
                min={0}
                numericValue
                register={register}
                setValue={setValue}
                sizing="sm"
                validation={[
                  validateRequired,
                  validatePercent,
                  validatePositive,
                ]}
              />
              <InputErrorMessage error={errors?.thresholdPercentage} />
            </div>
          )}
          <SelectInput
            disabled={!isCreating}
            error={errors?.thresholdType}
            fieldName={(fieldNamePrefix + 'thresholdType') as 'thresholdType'}
            register={register}
            validation={[validateRequired]}
          >
            <option value="majority">{t('info.majority')}</option>
            <option value="%">%</option>
          </SelectInput>
        </div>
      </div>

      <div className="flex flex-row flex-wrap items-end justify-between gap-x-12 gap-y-4 rounded-lg bg-background-secondary max-w-2xl p-3">
        <div className="flex flex-col gap-2 grow">
          <div className="flex flex-row items-start justify-between flex-wrap gap-2">
            <div className="flex flex-row items-center basis-1/2 gap-1 grow">
              <PeopleEmoji className="text-base" />
              <p className="primary-text">{t('form.quorumTitle')}</p>
            </div>

            <FormSwitchCard
              fieldName={(fieldNamePrefix + 'quorumEnabled') as 'quorumEnabled'}
              readOnly={!isCreating}
              setValue={setValue}
              sizing="sm"
              value={quorumEnabled}
            />
          </div>

          <p className="secondary-text max-w-prose">
            {t('form.quorumDescription')}
          </p>
        </div>

        {quorumEnabled && (
          <div className="flex grow flex-row flex-wrap gap-2">
            {percentageQuorumSelected && (
              <div className="flex flex-col gap-1">
                <HugeDecimalInput
                  disabled={!isCreating}
                  error={errors?.quorumPercentage}
                  fieldName={
                    (fieldNamePrefix + 'quorumPercentage') as 'quorumPercentage'
                  }
                  getValues={getValues}
                  max={100}
                  min={0}
                  numericValue
                  register={register}
                  setValue={setValue}
                  sizing="sm"
                  validation={[
                    validateRequired,
                    validatePercent,
                    validatePositive,
                  ]}
                />
                <InputErrorMessage error={errors?.quorumPercentage} />
              </div>
            )}
            <SelectInput
              disabled={!isCreating}
              error={errors?.quorumType}
              fieldName={(fieldNamePrefix + 'quorumType') as 'quorumType'}
              register={register}
            >
              <option value="majority">{t('info.majority')}</option>
              <option value="%">%</option>
            </SelectInput>
          </div>
        )}
      </div>

      <div className="flex flex-row flex-wrap items-end justify-between gap-x-12 gap-y-4 rounded-lg bg-background-secondary max-w-2xl p-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-1">
            <ClockEmoji className="text-base" />
            <p className="primary-text">{t('form.votingDurationTitle')}</p>
          </div>

          <p className="secondary-text max-w-prose">
            {t('form.votingDurationDescription')}
          </p>
        </div>
        <div className="flex grow flex-row flex-wrap gap-2">
          <div className="flex flex-col gap-1">
            <HugeDecimalInput
              disabled={!isCreating}
              error={errors?.proposalDuration}
              fieldName={
                (fieldNamePrefix +
                  'votingDuration.value') as 'votingDuration.value'
              }
              getValues={getValues}
              min={1}
              numericValue
              register={register}
              setValue={setValue}
              sizing="sm"
              step={1}
              validation={[
                validatePositive,
                validateRequired,
                // Prevent < 60 second voting duration since DAOs will brick if
                // the voting duration is shorter than 1 block.
                (value) =>
                  votingDuration?.units !== DurationUnits.Seconds ||
                  value >= 60 ||
                  t('error.mustBeAtLeastSixtySeconds'),
              ]}
            />
            <InputErrorMessage error={errors?.proposalDuration} />
          </div>
          <SelectInput
            disabled={!isCreating}
            error={errors?.votingDuration?.units}
            fieldName={
              (fieldNamePrefix +
                'votingDuration.units') as 'votingDuration.units'
            }
            register={register}
            validation={[validateRequired]}
          >
            {DurationUnitsValues.map((type, idx) => (
              <option key={idx} value={type}>
                {t(`unit.${type}`, {
                  count: votingDuration?.value,
                }).toLocaleLowerCase()}
              </option>
            ))}
          </SelectInput>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-lg bg-background-secondary max-w-2xl p-3">
        <div className="flex flex-row items-start justify-between flex-wrap gap-2">
          <div className="flex flex-row items-center basis-1/2 gap-1 grow">
            <KeyEmoji className="text-base" />
            <p className="primary-text">{t('form.onlyMembersExecuteTitle')}</p>
          </div>

          <FormSwitchCard
            fieldName={
              (fieldNamePrefix + 'onlyMembersExecute') as 'onlyMembersExecute'
            }
            readOnly={!isCreating}
            setValue={setValue}
            sizing="sm"
            value={onlyMembersExecute}
          />
        </div>

        <p className="secondary-text max-w-prose">
          {t('form.onlyMembersExecuteDescription')}
        </p>
      </div>

      <div className="flex flex-col gap-2 rounded-lg bg-background-secondary max-w-2xl p-3">
        <div className="flex flex-row items-start justify-between flex-wrap gap-2">
          <div className="flex flex-row items-center basis-1/2 gap-1 grow">
            <RecycleEmoji className="text-base" />
            <p className="primary-text">{t('form.allowRevotingTitle')}</p>
          </div>

          <FormSwitchCard
            fieldName={(fieldNamePrefix + 'allowRevoting') as 'allowRevoting'}
            readOnly={!isCreating}
            setValue={setValue}
            sizing="sm"
            value={allowRevoting}
          />
        </div>
        <p className="secondary-text max-w-prose">
          {t('form.allowRevotingDescription')}
        </p>
      </div>
    </div>
  )
}
