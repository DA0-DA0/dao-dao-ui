import clsx from 'clsx'
import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ChartEmoji,
  ClockEmoji,
  FormSwitch,
  FormSwitchCard,
  InputErrorMessage,
  NumberInput,
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
  TransProps,
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
  Trans: ComponentType<TransProps>
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
    Trans,
  },
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch } =
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
      <p className="secondary-text mb-2 max-w-prose">
        <Trans i18nKey="form.updateVotingConfigDescription">
          This will update the voting configuration for this DAO. A bad
          configuration can lock the DAO or create unexpected voting outcomes.
          Take care. If you have questions, please feel free to ask in the{' '}
          <a
            className="underline"
            href="https://discord.gg/sAaGuyW3D2"
            rel="noreferrer"
            target="_blank"
          >
            DAO DAO Discord
          </a>
          .
        </Trans>
      </p>

      <FormSwitchCard
        containerClassName="self-start"
        fieldName={
          (fieldNamePrefix + 'onlyMembersExecute') as 'onlyMembersExecute'
        }
        label={t('form.onlyMembersExecuteTitle')}
        readOnly={!isCreating}
        setValue={setValue}
        sizing="sm"
        tooltip={t('form.onlyMembersExecuteTooltip')}
        tooltipIconSize="sm"
        value={onlyMembersExecute}
      />

      <div className="flex flex-row flex-wrap items-center justify-between gap-4 rounded-lg bg-background-secondary p-3">
        <div className="flex max-w-prose flex-col gap-2 lg:basis-1/2">
          <h3 className="primary-text">
            <ChartEmoji /> {t('form.passingThresholdTitle')}
          </h3>
          <p className="secondary-text">
            {t('form.passingThresholdDescription')}
          </p>
        </div>
        <div className="flex grow flex-row flex-wrap justify-center gap-2">
          {percentageThresholdSelected && (
            <div className="flex flex-col gap-1">
              <NumberInput
                disabled={!isCreating}
                error={errors?.thresholdPercentage}
                fieldName={
                  (fieldNamePrefix +
                    'thresholdPercentage') as 'thresholdPercentage'
                }
                min={1}
                register={register}
                setValue={setValue}
                sizing="sm"
                validation={[validateRequired, validatePercent]}
                watch={watch}
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

      <div className="flex flex-row flex-wrap items-center justify-between gap-4 rounded-lg bg-background-secondary p-3">
        <div className="flex max-w-prose flex-col gap-2 lg:basis-1/2">
          <div className="flex flex-col items-stretch gap-2 xs:flex-row xs:items-start xs:justify-between">
            <h3 className="primary-text">
              <PeopleEmoji /> {t('form.quorumTitle')}
            </h3>

            <FormSwitchCard
              fieldName={(fieldNamePrefix + 'quorumEnabled') as 'quorumEnabled'}
              readOnly={!isCreating}
              setValue={setValue}
              sizing="sm"
              value={quorumEnabled}
            />
          </div>

          <p className="secondary-text">{t('form.quorumDescription')}</p>
        </div>
        {quorumEnabled && (
          <div className="flex grow flex-row flex-wrap justify-center gap-2">
            {percentageQuorumSelected && (
              <div className="flex flex-col gap-1">
                <NumberInput
                  disabled={!isCreating}
                  error={errors?.quorumPercentage}
                  fieldName={
                    (fieldNamePrefix + 'quorumPercentage') as 'quorumPercentage'
                  }
                  min={1}
                  register={register}
                  setValue={setValue}
                  sizing="sm"
                  validation={[validateRequired, validatePercent]}
                  watch={watch}
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

      <div className="flex flex-row flex-wrap items-center justify-between gap-4 rounded-lg bg-background-secondary p-3">
        <div className="flex max-w-prose flex-col gap-2 lg:basis-1/2">
          <h3 className="primary-text">
            <ClockEmoji /> {t('form.votingDurationTitle')}
          </h3>
          <p className="secondary-text">
            {t('form.votingDurationDescription')}
          </p>
        </div>
        <div className="flex grow flex-row flex-wrap justify-center gap-2">
          <div className="flex flex-col gap-1">
            <NumberInput
              disabled={!isCreating}
              error={errors?.proposalDuration}
              fieldName={
                (fieldNamePrefix +
                  'votingDuration.value') as 'votingDuration.value'
              }
              min={1}
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
              watch={watch}
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

      <div className="flex flex-row flex-wrap items-center justify-between gap-4 rounded-lg bg-background-secondary p-3">
        <div className="flex max-w-prose flex-col gap-2 lg:basis-1/2">
          <h3 className="primary-text">
            <RecycleEmoji /> {t('form.allowRevotingTitle')}
          </h3>
          <p className="secondary-text">{t('form.allowRevotingDescription')}</p>
        </div>
        <div className="flex grow items-center justify-center">
          <FormSwitch
            fieldName={(fieldNamePrefix + 'allowRevoting') as 'allowRevoting'}
            readOnly={!isCreating}
            setValue={setValue}
            sizing="md"
            value={allowRevoting}
          />
        </div>
      </div>

      {version && isFeatureSupportedByVersion(Feature.Veto, version) && (
        <div className="flex flex-col gap-4 rounded-lg bg-background-secondary p-3">
          <div className="flex max-w-prose flex-col gap-2 lg:basis-1/2">
            <div className="flex flex-col items-stretch gap-2 xs:flex-row xs:items-start xs:justify-between">
              <h3 className="primary-text">
                <ThumbDownEmoji /> {t('title.veto')}
              </h3>

              <FormSwitchCard
                fieldName={(fieldNamePrefix + 'veto.enabled') as 'veto.enabled'}
                readOnly={!isCreating}
                setValue={setValue}
                sizing="sm"
                value={veto.enabled}
              />
            </div>

            <p className="secondary-text">{t('info.vetoDescription')}</p>
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
