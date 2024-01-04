import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ChartEmoji,
  ClockEmoji,
  FormSwitch,
  FormSwitchCard,
  InputErrorMessage,
  MoneyEmoji,
  NumberInput,
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

import { Trans } from '../../../../../../components/Trans'

export type UpdateProposalConfigData = {
  onlyMembersExecute: boolean

  depositRequired: boolean
  depositInfo?: {
    deposit: number
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
  const { register, setValue, watch } =
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

      <div className="flex flex-row flex-wrap gap-x-2 gap-y-1">
        {/* If governance token info, allow specifying deposit. */}
        {commonGovernanceTokenInfo && (
          <FormSwitchCard
            containerClassName="grow"
            fieldName={
              (fieldNamePrefix + 'depositRequired') as 'depositRequired'
            }
            label={t('form.requireProposalDepositTitle')}
            readOnly={!isCreating}
            setValue={setValue}
            sizing="sm"
            tooltip={t('form.requireProposalDepositTooltip')}
            tooltipIconSize="sm"
            value={depositRequired}
          />
        )}

        <FormSwitchCard
          containerClassName="grow"
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
      </div>

      {depositRequired && commonGovernanceTokenInfo && (
        <div className="flex flex-col gap-4 rounded-lg border border-border-primary bg-background-secondary p-3">
          <div className="flex max-w-prose flex-col gap-2 lg:basis-1/2">
            <h3 className="primary-text">
              <MoneyEmoji /> {t('form.proposalDepositTitle')}
            </h3>
            <p className="secondary-text">
              {t('form.proposalDepositDescription')}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <NumberInput
                disabled={!isCreating}
                error={errors?.depositInfo?.deposit}
                fieldName={
                  (fieldNamePrefix +
                    'depositInfo.deposit') as 'depositInfo.deposit'
                }
                min={1 / 10 ** commonGovernanceTokenInfo.decimals}
                register={register}
                step={1 / 10 ** commonGovernanceTokenInfo.decimals}
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
        </div>
      )}

      <div className="flex flex-row flex-wrap items-center justify-between gap-4 rounded-lg border border-border-primary bg-background-secondary p-3">
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

      <div className="flex flex-row flex-wrap items-center justify-between gap-4 rounded-lg border border-border-primary bg-background-secondary p-3">
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

      <div className="flex flex-row flex-wrap items-center justify-between gap-4 rounded-lg border border-border-primary bg-background-secondary p-3">
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

      <div className="flex flex-row flex-wrap items-center justify-between gap-4 rounded-lg border border-border-primary bg-background-secondary p-3">
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
            value={allowRevoting}
          />
        </div>
      </div>
    </div>
  )
}
