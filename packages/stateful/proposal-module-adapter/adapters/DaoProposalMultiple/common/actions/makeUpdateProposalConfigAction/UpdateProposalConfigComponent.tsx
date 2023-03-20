import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ClockEmoji,
  FormSwitch,
  FormSwitchCard,
  GearEmoji,
  InputErrorMessage,
  NumberInput,
  PeopleEmoji,
  RecycleEmoji,
  SelectInput,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'
import {
  validatePercent,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { ActionCard } from '../../../../../../actions'
import { Trans } from '../../../../../../components/Trans'

export const UpdateProposalConfigComponent: ActionComponent = ({
  fieldNamePrefix,
  errors,
  onRemove,
  isCreating,
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch } = useFormContext()

  const quorumType = watch(fieldNamePrefix + 'quorumType')
  const proposalDuration = watch(fieldNamePrefix + 'proposalDuration')
  const proposalDurationUnits = watch(fieldNamePrefix + 'proposalDurationUnits')

  const percentageQuorumSelected = quorumType === '%'

  return (
    <ActionCard
      Icon={GearEmoji}
      onRemove={onRemove}
      title={t('form.updateVotingConfigTitle')}
    >
      <p className="secondary-text mb-3 max-w-prose">
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
        containerClassName="grow"
        fieldName={fieldNamePrefix + 'onlyMembersExecute'}
        label={t('form.onlyMembersExecuteTitle')}
        readOnly={!isCreating}
        setValue={setValue}
        sizing="sm"
        tooltip={t('form.onlyMembersExecuteTooltip')}
        tooltipIconSize="sm"
        value={watch(fieldNamePrefix + 'onlyMembersExecute')}
      />

      <div className="flex flex-row flex-wrap items-center justify-between gap-4 rounded-lg border border-border-primary bg-background-secondary p-3">
        <div className="flex max-w-prose flex-col gap-2 lg:basis-1/2">
          <h3 className="primary-text">
            <PeopleEmoji /> {t('form.quorumTitle')}
          </h3>

          <p className="secondary-text">{t('form.quorumDescription')}</p>
        </div>
        <div className="flex grow flex-row flex-wrap justify-center gap-2">
          {percentageQuorumSelected && (
            <div className="flex flex-col gap-1">
              <NumberInput
                disabled={!isCreating}
                error={errors?.quorumPercentage}
                fieldName={fieldNamePrefix + 'quorumPercentage'}
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
            fieldName={fieldNamePrefix + 'quorumType'}
            register={register}
          >
            <option value="majority">{t('info.majority')}</option>
            <option value="%">%</option>
          </SelectInput>
        </div>
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
              fieldName={fieldNamePrefix + 'proposalDuration'}
              min={1}
              register={register}
              setValue={setValue}
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
              watch={watch}
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

      <div className="flex flex-row flex-wrap items-center justify-between gap-4 rounded-lg border border-border-primary bg-background-secondary p-3">
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
