import clsx from 'clsx'
import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ChartEmoji,
  ClockEmoji,
  FormSwitchCard,
  HugeDecimalInput,
  InputErrorMessage,
  KeyEmoji,
  PeopleEmoji,
  ProposalVetoConfigurer,
  RecycleEmoji,
  SelectInput,
  ThumbDownEmoji,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  AddressInputProps,
  ContractVersion,
  CreateCw1Whitelist,
  DurationUnits,
  DurationUnitsValues,
  DurationWithUnits,
  Feature,
  ProposalVetoConfig,
} from '@dao-dao/types'
import {
  isFeatureSupportedByVersion,
  validatePercent,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

export type UpdateProposalConfigData = {
  onlyMembersExecute: boolean

  thresholdType: '%' | 'majority'
  thresholdPercentage?: number

  quorumEnabled: boolean
  quorumType: '%' | 'majority'
  quorumPercentage?: number

  votingDuration: DurationWithUnits

  allowRevoting: boolean

  veto: ProposalVetoConfig
}

export type UpdateProposalConfigOptions = {
  version: ContractVersion | null
  createCw1WhitelistVetoers: CreateCw1Whitelist
  creatingCw1WhitelistVetoers: boolean
  AddressInput: ComponentType<AddressInputProps<ProposalVetoConfig>>
}

export const UpdateProposalConfigComponent: ActionComponent<
  UpdateProposalConfigOptions
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: {
    version,
    createCw1WhitelistVetoers,
    creatingCw1WhitelistVetoers,
    AddressInput,
  },
}) => {
  const { t } = useTranslation()
  const { register, setValue, getValues, watch } =
    useFormContext<UpdateProposalConfigData>()

  const onlyMembersExecute = watch(
    (fieldNamePrefix + 'onlyMembersExecute') as 'onlyMembersExecute'
  )
  const allowRevoting = watch(
    (fieldNamePrefix + 'allowRevoting') as 'allowRevoting'
  )
  const thresholdType = watch(
    (fieldNamePrefix + 'thresholdType') as 'thresholdType'
  )
  const quorumType = watch((fieldNamePrefix + 'quorumType') as 'quorumType')
  const quorumEnabled = watch(
    (fieldNamePrefix + 'quorumEnabled') as 'quorumEnabled'
  )
  const votingDuration = watch(
    (fieldNamePrefix + 'votingDuration') as 'votingDuration'
  )
  const veto = watch((fieldNamePrefix + 'veto') as 'veto')

  const percentageThresholdSelected = thresholdType === '%'
  const percentageQuorumSelected = quorumType === '%'

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4 rounded-lg bg-background-secondary max-w-2xl p-3">
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
            fieldName={(fieldNamePrefix + 'thresholdType') as 'thresholdType'}
            register={register}
          >
            <option value="majority">{t('info.majority')}</option>
            <option value="%">%</option>
          </SelectInput>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-lg bg-background-secondary max-w-2xl p-3">
        <div className="flex flex-col gap-2">
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

      <div className="flex flex-col gap-4 rounded-lg bg-background-secondary max-w-2xl p-3">
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
            fieldName={
              (fieldNamePrefix +
                'votingDuration.units') as 'votingDuration.units'
            }
            register={register}
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

      {version && isFeatureSupportedByVersion(Feature.Veto, version) && (
        <div className="flex flex-col gap-4 rounded-lg bg-background-secondary max-w-2xl p-3">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-start justify-between flex-wrap gap-2">
              <div className="flex flex-row items-center basis-1/2 gap-1 grow">
                <ThumbDownEmoji className="text-base" />
                <p className="primary-text">{t('title.veto')}</p>
              </div>

              <FormSwitchCard
                fieldName={(fieldNamePrefix + 'veto.enabled') as 'veto.enabled'}
                readOnly={!isCreating}
                setValue={setValue}
                sizing="sm"
                value={veto.enabled}
              />
            </div>

            <p className="secondary-text max-w-prose">
              {t('info.vetoDescription')}
            </p>
          </div>

          {veto.enabled && (
            <ProposalVetoConfigurer
              AddressInput={AddressInput}
              className={clsx(
                'flex flex-col gap-2',
                isCreating ? 'max-w-xl' : 'max-w-xs'
              )}
              createCw1WhitelistVetoers={createCw1WhitelistVetoers}
              creatingCw1WhitelistVetoers={creatingCw1WhitelistVetoers}
              disabled={!isCreating}
              errors={errors?.veto}
              fieldNamePrefix={fieldNamePrefix + 'veto.'}
              veto={veto}
            />
          )}
        </div>
      )}
    </div>
  )
}
