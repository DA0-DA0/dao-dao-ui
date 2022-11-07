import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ChartEmoji,
  ClockEmoji,
  FormSwitch,
  FormSwitchCard,
  GearEmoji,
  InputErrorMessage,
  InputLabel,
  MoneyEmoji,
  NumberInput,
  PeopleEmoji,
  RecycleEmoji,
  SelectInput,
  TooltipInfoIcon,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'
import {
  validatePercent,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { ActionCard } from '../../../../../../actions'
import { Trans } from '../../../../../../components/Trans'

export interface UpdateProposalConfigOptions {
  governanceTokenSymbol?: string
}

export const UpdateProposalConfigComponent: ActionComponent<
  UpdateProposalConfigOptions
> = ({
  fieldNamePrefix,
  errors,
  onRemove,
  isCreating,
  options: { governanceTokenSymbol },
  Loader,
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch } = useFormContext()

  const depositRequired = watch(fieldNamePrefix + 'depositRequired')
  const thresholdType = watch(fieldNamePrefix + 'thresholdType')
  const quorumType = watch(fieldNamePrefix + 'quorumType')
  const proposalDuration = watch(fieldNamePrefix + 'proposalDuration')
  const proposalDurationUnits = watch(fieldNamePrefix + 'proposalDurationUnits')
  const thresholdPercentage = watch(fieldNamePrefix + 'thresholdPercentage')
  const quorumPercentage = watch(fieldNamePrefix + 'quorumPercentage')
  const quorumEnabled = watch(fieldNamePrefix + 'quorumEnabled')

  const percentageThresholdSelected = thresholdType === '%'
  const percentageQuorumSelected = quorumType === '%'

  return (
    <ActionCard
      Icon={GearEmoji}
      onRemove={onRemove}
      title={t('form.updateVotingConfigTitle')}
    >
      <p className="secondary-text mb-3 max-w-prose">
        <Trans Loader={Loader} i18nKey="form.updateVotingConfigDescription">
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
      <div className="flex flex-row flex-wrap gap-2">
        {governanceTokenSymbol !== undefined && (
          <div className="flex grow flex-row items-center justify-between gap-4 rounded-md bg-background-secondary py-2 px-3 md:w-min">
            <div className="flex flex-row items-center gap-2">
              <TooltipInfoIcon
                size="sm"
                title={t('form.requireProposalDepositTooltip')}
              />

              <p className="secondary-text w-max">
                {t('form.requireProposalDepositTitle')}
              </p>
            </div>
            <FormSwitch
              fieldName={fieldNamePrefix + 'depositRequired'}
              readOnly={!isCreating}
              setValue={setValue}
              sizing="sm"
              value={watch(fieldNamePrefix + 'depositRequired')}
            />
          </div>
        )}
        <div className="flex grow flex-row items-center justify-between gap-4 rounded-md bg-background-secondary py-2 px-3 md:w-min">
          <div className="flex flex-row items-center gap-2">
            <TooltipInfoIcon
              size="sm"
              title={t('form.onlyMembersExecuteTooltip')}
            />

            <p className="secondary-text w-max">
              {t('form.onlyMembersExecuteTitle')}
            </p>
          </div>
          <FormSwitch
            fieldName={fieldNamePrefix + 'onlyMembersExecute'}
            readOnly={!isCreating}
            setValue={setValue}
            sizing="sm"
            value={watch(fieldNamePrefix + 'onlyMembersExecute')}
          />
        </div>
      </div>

      {depositRequired && (
        <div className="flex flex-row flex-wrap justify-between gap-4 rounded-lg border border-border-primary p-3 md:gap-1">
          <div className="flex max-w-prose flex-col gap-2 lg:basis-1/2">
            <h3 className="primary-text">
              <MoneyEmoji /> {t('form.proposalDepositTitle')}
            </h3>
            <p className="secondary-text">
              {t('form.proposalDepositDescription')}
            </p>
          </div>
          <div className="flex grow flex-col gap-1">
            <div className="flex flex-col gap-1">
              <InputLabel
                name={`${t('form.proposalDepositTitle')}${
                  governanceTokenSymbol ? ` ($${governanceTokenSymbol})` : ''
                }`}
              />
              <NumberInput
                disabled={!isCreating}
                error={errors?.depositInfo?.deposit}
                fieldName={fieldNamePrefix + 'depositInfo.deposit'}
                register={register}
                step={0.000001}
                validation={[validateRequired, validatePositive]}
              />
              <InputErrorMessage error={errors?.depositInfo?.deposit} />
            </div>
            <div className="flex grow flex-row items-center justify-between gap-4 rounded-md bg-background-secondary py-2 px-3">
              <div className="flex flex-row items-center gap-2">
                <TooltipInfoIcon
                  size="sm"
                  title={t('form.refundFailedProposalsTooltip')}
                />

                <p className="secondary-text w-max">
                  {t('form.refundFailedProposalsTitle')}
                </p>
              </div>
              <FormSwitch
                fieldName={
                  fieldNamePrefix + 'depositInfo.refundFailedProposals'
                }
                readOnly={!isCreating}
                setValue={setValue}
                sizing="sm"
                value={watch(
                  fieldNamePrefix + 'depositInfo.refundFailedProposals'
                )}
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-row flex-wrap items-center justify-between gap-4 rounded-lg border border-border-primary p-3 md:gap-1">
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
                fieldName={fieldNamePrefix + 'thresholdPercentage'}
                onMinus={() =>
                  setValue(
                    fieldNamePrefix + 'thresholdPercentage',
                    Math.max(thresholdPercentage - 1, 1)
                  )
                }
                onPlus={() =>
                  setValue(
                    fieldNamePrefix + 'thresholdPercentage',
                    Math.max(thresholdPercentage + 1, 1)
                  )
                }
                register={register}
                sizing="sm"
                validation={[validateRequired, validatePercent]}
              />
              <InputErrorMessage error={errors?.thresholdPercentage} />
            </div>
          )}
          <SelectInput
            disabled={!isCreating}
            fieldName={fieldNamePrefix + 'thresholdType'}
            register={register}
          >
            <option value="majority">{t('info.majority')}</option>
            <option value="%">%</option>
          </SelectInput>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-between gap-4 rounded-lg border border-border-primary p-3 md:gap-1">
        <div className="flex max-w-prose flex-col gap-2 lg:basis-1/2">
          <div className="flex flex-row items-center justify-between gap-4">
            <h3 className="primary-text">
              <PeopleEmoji /> {t('form.quorumTitle')}
            </h3>

            <FormSwitchCard
              fieldName={fieldNamePrefix + 'quorumEnabled'}
              readOnly={!isCreating}
              setValue={setValue}
              sizing="sm"
              value={watch(fieldNamePrefix + 'quorumEnabled')}
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
                  fieldName={fieldNamePrefix + 'quorumPercentage'}
                  onMinus={() =>
                    setValue(
                      fieldNamePrefix + 'quorumPercentage',
                      Math.max(quorumPercentage - 1, 1)
                    )
                  }
                  onPlus={() =>
                    setValue(
                      fieldNamePrefix + 'quorumPercentage',
                      Math.max(quorumPercentage + 1, 1)
                    )
                  }
                  register={register}
                  sizing="sm"
                  validation={[validateRequired, validatePercent]}
                />
                <InputErrorMessage error={errors?.quorumPercentage} />
              </div>
            )}
            <SelectInput
              disabled={!isCreating}
              fieldName={fieldNamePrefix + 'quorumType'}
              register={register}
            >
              <option value="majority">{t('info.majority')}</option>
              <option value="%">%</option>
            </SelectInput>
          </div>
        )}
      </div>
      <div className="flex flex-row flex-wrap items-center justify-between gap-4 rounded-lg border border-border-primary p-3 md:gap-1">
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
              fieldName={fieldNamePrefix + 'proposalDuration'}
              onMinus={() =>
                setValue(
                  fieldNamePrefix + 'proposalDuration',
                  Math.max(proposalDuration - 1, 1)
                )
              }
              onPlus={() =>
                setValue(
                  fieldNamePrefix + 'proposalDuration',
                  Math.max(proposalDuration + 1, 1)
                )
              }
              register={register}
              sizing="sm"
              step={1}
              validation={[
                validatePositive,
                validateRequired,
                // Prevent < 60 second voting duration since DAOs will
                // brick if the voting duration is shorter tahn 1 block.
                (value) =>
                  proposalDurationUnits !== 'seconds' ||
                  value >= 60 ||
                  'Cannot be shorter than 60 seconds.',
              ]}
            />
            <InputErrorMessage error={errors?.proposalDuration} />
          </div>
          <SelectInput
            disabled={!isCreating}
            fieldName={fieldNamePrefix + 'proposalDurationUnits'}
            register={register}
          >
            <option value="weeks">
              {t('unit.weeks', { count: proposalDuration }).toLocaleLowerCase()}
            </option>
            <option value="days">
              {t('unit.days', { count: proposalDuration }).toLocaleLowerCase()}
            </option>
            <option value="hours">
              {t('unit.hours', { count: proposalDuration }).toLocaleLowerCase()}
            </option>
            <option value="minutes">
              {t('unit.minutes', {
                count: proposalDuration,
              }).toLocaleLowerCase()}
            </option>
            <option value="seconds">
              {t('unit.seconds', {
                count: proposalDuration,
              }).toLocaleLowerCase()}
            </option>
          </SelectInput>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-between gap-4 rounded-lg border border-border-primary p-3 md:gap-1">
        <div className="flex max-w-prose flex-col gap-2 lg:basis-1/2">
          <h3 className="primary-text">
            <RecycleEmoji /> {t('form.allowRevotingTitle')}
          </h3>
          <p className="secondary-text">{t('form.allowRevotingDescription')}</p>
        </div>
        <div className="flex grow items-center justify-center">
          <FormSwitch
            fieldName={fieldNamePrefix + 'allowRevoting'}
            readOnly={!isCreating}
            setValue={setValue}
            value={watch(fieldNamePrefix + 'allowRevoting')}
          />
        </div>
      </div>
    </ActionCard>
  )
}
