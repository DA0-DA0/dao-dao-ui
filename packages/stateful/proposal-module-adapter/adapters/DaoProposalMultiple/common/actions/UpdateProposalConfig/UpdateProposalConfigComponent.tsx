import clsx from 'clsx'
import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ClockEmoji,
  FormSwitch,
  FormSwitchCard,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  PeopleEmoji,
  RecycleEmoji,
  SelectInput,
  ThumbDownEmoji,
  useChain,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  AddressInputProps,
  ContractVersion,
  DurationUnits,
  DurationUnitsValues,
  DurationWithUnits,
  Feature,
  ProposalVetoConfig,
  TransProps,
} from '@dao-dao/types'
import {
  isFeatureSupportedByVersion,
  makeValidateAddress,
  validateNonNegative,
  validatePercent,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

export type UpdateProposalConfigData = {
  onlyMembersExecute: boolean

  quorumType: '%' | 'majority'
  quorumPercentage?: number

  votingDuration: DurationWithUnits

  allowRevoting: boolean

  veto: ProposalVetoConfig
}

export type UpdateProposalConfigOptions = {
  version: ContractVersion | null
  AddressInput: ComponentType<AddressInputProps<UpdateProposalConfigData>>
  Trans: ComponentType<TransProps>
}

export const UpdateProposalConfigComponent: ActionComponent<
  UpdateProposalConfigOptions
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { version, AddressInput, Trans },
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch } =
    useFormContext<UpdateProposalConfigData>()
  const { bech32_prefix: bech32Prefix } = useChain()

  const onlyMembersExecute = watch(
    (fieldNamePrefix + 'onlyMembersExecute') as 'onlyMembersExecute'
  )
  const allowRevoting = watch(
    (fieldNamePrefix + 'allowRevoting') as 'allowRevoting'
  )
  const quorumType = watch((fieldNamePrefix + 'quorumType') as 'quorumType')
  const votingDuration = watch(
    (fieldNamePrefix + 'votingDuration') as 'votingDuration'
  )
  const veto = watch((fieldNamePrefix + 'veto') as 'veto')

  const percentageQuorumSelected = quorumType === '%'

  return (
    <div className="flex flex-col gap-2">
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
            fieldName={(fieldNamePrefix + 'quorumType') as 'quorumType'}
            register={register}
          >
            <option value="majority">{t('info.majority')}</option>
            <option value="%">%</option>
          </SelectInput>
        </div>
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
              error={errors?.votingDuration?.value}
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
                  votingDuration.units !== DurationUnits.Seconds ||
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
            <div
              className={clsx(
                'flex flex-col gap-2',
                isCreating ? 'max-w-xl' : 'max-w-xs'
              )}
            >
              <div className="space-y-1">
                <InputLabel name={t('form.whoCanVetoProposals')} />

                <AddressInput
                  disabled={!isCreating}
                  error={errors?.veto?.address}
                  fieldName={
                    (fieldNamePrefix + 'veto.address') as 'veto.address'
                  }
                  register={register}
                  setValue={setValue}
                  type="contract"
                  validation={[makeValidateAddress(bech32Prefix)]}
                  watch={watch}
                />

                <InputErrorMessage error={errors?.veto?.address} />
              </div>

              <div className="space-y-1">
                <InputLabel
                  name={t('form.timelockDuration')}
                  tooltip={t('form.timelockDurationTooltip')}
                />

                <div className="flex flex-row gap-2">
                  <NumberInput
                    containerClassName="grow"
                    disabled={!isCreating}
                    error={errors?.veto?.timelockDuration?.value}
                    fieldName={
                      (fieldNamePrefix +
                        'veto.timelockDuration.value') as 'veto.timelockDuration.value'
                    }
                    min={0}
                    register={register}
                    setValue={setValue}
                    sizing="sm"
                    step={1}
                    validation={[validateNonNegative, validateRequired]}
                    watch={watch}
                  />

                  <SelectInput
                    disabled={!isCreating}
                    error={errors?.veto?.timelockDuration?.units}
                    fieldName={
                      (fieldNamePrefix +
                        'veto.timelockDuration.units') as 'veto.timelockDuration.units'
                    }
                    register={register}
                    validation={[validateRequired]}
                  >
                    {DurationUnitsValues.map((type, idx) => (
                      <option key={idx} value={type}>
                        {t(`unit.${type}`, {
                          count: veto.timelockDuration?.value,
                        }).toLocaleLowerCase()}
                      </option>
                    ))}
                  </SelectInput>
                </div>
              </div>

              <FormSwitchCard
                containerClassName="self-start"
                fieldName={
                  (fieldNamePrefix + 'veto.earlyExecute') as 'veto.earlyExecute'
                }
                label={t('form.earlyExecute')}
                readOnly={!isCreating}
                setValue={setValue}
                sizing="sm"
                tooltip={t('form.earlyExecuteTooltip')}
                value={veto.earlyExecute}
              />

              <FormSwitchCard
                containerClassName="self-start"
                fieldName={
                  (fieldNamePrefix +
                    'veto.vetoBeforePassed') as 'veto.vetoBeforePassed'
                }
                label={t('form.vetoBeforePassed')}
                readOnly={!isCreating}
                setValue={setValue}
                sizing="sm"
                tooltip={t('form.vetoBeforePassedTooltip')}
                value={veto.vetoBeforePassed}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
