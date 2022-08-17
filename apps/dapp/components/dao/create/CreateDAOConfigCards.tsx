// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import Emoji from 'a11y-react-emoji'
import {
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FormSwitchCard,
  InputThemedText,
  NumberInput,
  SelectInput,
  SwitchCard,
} from '@dao-dao/ui'
import {
  formatPercentOf100,
  validateNonNegative,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import {
  DEFAULT_NEW_DAO_THRESHOLD_PERCENT,
  DurationUnits,
  DurationUnitsValues,
  GovernanceTokenType,
  NewDAO,
  generateDefaultNewDAO,
} from '@/atoms'

import { CreateDAOConfigCard } from './CreateDAOConfigCard'

export interface CreateDAOConfigCardSharedProps {
  newDAO: NewDAO
  register: UseFormRegister<NewDAO>
  setValue: UseFormSetValue<NewDAO>
  watch: UseFormWatch<NewDAO>
  errors?: FormState<NewDAO>['errors']
  readOnly?: boolean
}

export const CreateDAOThresholdCard = ({
  newDAO: {
    advancedVotingConfig: {
      thresholdQuorum: { threshold },
    },
  },

  register,
  setValue,
  errors,
  readOnly,
}: CreateDAOConfigCardSharedProps) => {
  const { t } = useTranslation()

  return (
    <CreateDAOConfigCard
      accentColor="rgba(95, 94, 254, 0.1)"
      description={t('form.passingThresholdDescription')}
      error={errors?.advancedVotingConfig?.thresholdQuorum?.threshold}
      image={<Emoji label="ballot box" symbol="🗳️" />}
      title={t('form.passingThresholdTitle')}
    >
      {readOnly ? (
        <InputThemedText>
          {threshold === 'majority'
            ? t('info.majority')
            : formatPercentOf100(threshold)}
        </InputThemedText>
      ) : (
        <>
          {threshold !== 'majority' && (
            <NumberInput
              error={errors?.advancedVotingConfig?.thresholdQuorum?.threshold}
              fieldName="advancedVotingConfig.thresholdQuorum.threshold"
              onMinus={() =>
                setValue(
                  'advancedVotingConfig.thresholdQuorum.threshold',
                  Math.max(threshold - 1, 1)
                )
              }
              onPlus={() =>
                setValue(
                  'advancedVotingConfig.thresholdQuorum.threshold',
                  Math.max(threshold + 1, 1)
                )
              }
              // Override numeric value setter since the select below
              // attempts to set 'majority', but registering the field
              // with the numeric setter causes validation issues.
              register={register}
              setValueAs={(value) =>
                value === 'majority' ? 'majority' : Number(value)
              }
              sizing="sm"
              step={0.001}
              validation={[validatePositive, validateRequired]}
            />
          )}

          <SelectInput
            onChange={({ target: { value } }) =>
              setValue(
                'advancedVotingConfig.thresholdQuorum.threshold',
                value === 'majority'
                  ? 'majority'
                  : // value === '%'
                    DEFAULT_NEW_DAO_THRESHOLD_PERCENT
              )
            }
            validation={[validateRequired]}
            value={threshold === 'majority' ? 'majority' : '%'}
          >
            <option value="%">%</option>
            <option value="majority">{t('info.majority')}</option>
          </SelectInput>
        </>
      )}
    </CreateDAOConfigCard>
  )
}

interface CreateDAOQuorumCardProps extends CreateDAOConfigCardSharedProps {
  showWarningModal?: () => void
}

export const CreateDAOQuorumCard = ({
  newDAO: {
    structure,
    advancedVotingConfig: {
      thresholdQuorum: { quorumEnabled, quorum },
    },
  },

  register,
  setValue,
  errors,
  readOnly,
  showWarningModal,
}: CreateDAOQuorumCardProps) => {
  const { t } = useTranslation()

  return (
    <CreateDAOConfigCard
      accentColor="#fefe891a"
      childContainerClassName={readOnly ? undefined : 'self-stretch'}
      description={t('form.quorumDescription')}
      error={errors?.advancedVotingConfig?.thresholdQuorum?.quorum}
      image={<Emoji label="megaphone" symbol="📣" />}
      title={t('form.quorumTitle')}
    >
      {readOnly ? (
        <InputThemedText>
          {quorumEnabled
            ? quorum === 'majority'
              ? t('info.majority')
              : formatPercentOf100(quorum)
            : t('info.disabled')}
        </InputThemedText>
      ) : (
        <div className="flex flex-row flex-wrap grow gap-x-8 gap-y-4 justify-between items-stretch">
          <SwitchCard
            enabled={quorumEnabled}
            onClick={() => {
              if (!quorumEnabled) {
                setValue(
                  'advancedVotingConfig.thresholdQuorum.quorumEnabled',
                  true
                )
              } else {
                // Set to false once accepting modal.
                showWarningModal?.()
              }
            }}
            readOnly={readOnly}
            sizing="sm"
          />

          {quorumEnabled && (
            <div className="flex flex-row gap-2 items-stretch">
              {quorum !== 'majority' && (
                <NumberInput
                  disabled={readOnly}
                  error={errors?.advancedVotingConfig?.thresholdQuorum?.quorum}
                  fieldName="advancedVotingConfig.thresholdQuorum.quorum"
                  onMinus={() =>
                    setValue(
                      'advancedVotingConfig.thresholdQuorum.quorum',
                      Math.max(quorum - 1, 0)
                    )
                  }
                  onPlus={() =>
                    setValue(
                      'advancedVotingConfig.thresholdQuorum.quorum',
                      Math.max(quorum + 1, 0)
                    )
                  }
                  register={register}
                  // Override numeric value setter since the select below
                  // attempts to set 'majority', but registering the field
                  // with the numeric setter causes validation issues.
                  setValueAs={(value) =>
                    value === 'majority' ? 'majority' : Number(value)
                  }
                  sizing="sm"
                  step={0.001}
                  validation={[validateNonNegative, validateRequired]}
                />
              )}

              <SelectInput
                disabled={readOnly}
                onChange={({ target: { value } }) =>
                  setValue(
                    'advancedVotingConfig.thresholdQuorum.quorum',
                    value === 'majority'
                      ? 'majority'
                      : // value === '%'
                        generateDefaultNewDAO(structure).advancedVotingConfig
                          .thresholdQuorum.quorum
                  )
                }
                validation={[validateRequired]}
                value={quorum === 'majority' ? 'majority' : '%'}
              >
                <option value="%">%</option>
                <option value="majority">{t('info.majority')}</option>
              </SelectInput>
            </div>
          )}
        </div>
      )}
    </CreateDAOConfigCard>
  )
}

export const CreateDAOVotingDurationCard = ({
  newDAO: { votingDuration },
  register,
  setValue,
  errors,
  readOnly,
}: CreateDAOConfigCardSharedProps) => {
  const { t } = useTranslation()

  return (
    <CreateDAOConfigCard
      accentColor="#c3935e1a"
      description={t('form.votingDurationDescription')}
      error={errors?.votingDuration?.value ?? errors?.votingDuration?.units}
      image={<Emoji label="hourglass" symbol="⏳" />}
      title={t('form.votingDurationTitle')}
    >
      {readOnly ? (
        <InputThemedText>
          {votingDuration.value}{' '}
          {t(`unit.${votingDuration.units}`, {
            count: votingDuration.value,
          }).toLocaleLowerCase()}
        </InputThemedText>
      ) : (
        <>
          <NumberInput
            disabled={readOnly}
            error={errors?.votingDuration?.value}
            fieldName="votingDuration.value"
            onMinus={() =>
              setValue(
                'votingDuration.value',
                Math.max(votingDuration.value - 1, 1)
              )
            }
            onPlus={() =>
              setValue(
                'votingDuration.value',
                Math.max(votingDuration.value + 1, 1)
              )
            }
            register={register}
            sizing="sm"
            step={1}
            validation={[
              validatePositive,
              validateRequired,
              // Prevent < 60 second voting duration since DAOs will brick
              // if the voting duration is shorter tahn 1 block.
              (value) =>
                votingDuration.units !== DurationUnits.Seconds ||
                value >= 60 ||
                'Cannot be shorter than 60 seconds.',
            ]}
          />

          <SelectInput
            disabled={readOnly}
            error={errors?.votingDuration?.units}
            fieldName="votingDuration.units"
            register={register}
            validation={[validateRequired]}
          >
            {DurationUnitsValues.map((type, idx) => (
              <option key={idx} value={type}>
                {t(`unit.${type}`, {
                  count: votingDuration.value,
                }).toLocaleLowerCase()}
              </option>
            ))}
          </SelectInput>
        </>
      )}
    </CreateDAOConfigCard>
  )
}

export const CreateDAOProposalDepositCard = ({
  newDAO: {
    governanceTokenOptions: {
      type,
      newInfo: { symbol: newSymbol },
      proposalDeposit: { value },
      existingGovernanceTokenInfo,
    },
  },
  register,
  setValue,
  errors,
  readOnly,
}: CreateDAOConfigCardSharedProps) => {
  const { t } = useTranslation()

  return (
    <CreateDAOConfigCard
      accentColor="#fccd031a"
      description={t('form.proposalDepositDescription')}
      error={errors?.governanceTokenOptions?.proposalDeposit?.value}
      image={<Emoji label="banknote" symbol="💵" />}
      title={t('form.proposalDepositTitle')}
    >
      {readOnly ? (
        <InputThemedText>
          {value} $
          {(type === GovernanceTokenType.New
            ? newSymbol
            : existingGovernanceTokenInfo?.symbol) || t('info.tokens')}
        </InputThemedText>
      ) : (
        <div className="flex flex-row gap-2 items-center">
          <NumberInput
            disabled={readOnly}
            error={errors?.governanceTokenOptions?.proposalDeposit?.value}
            fieldName="governanceTokenOptions.proposalDeposit.value"
            onMinus={() =>
              setValue(
                'governanceTokenOptions.proposalDeposit.value',
                Math.max(value - 1, 0)
              )
            }
            onPlus={() =>
              setValue(
                'governanceTokenOptions.proposalDeposit.value',
                Math.max(value + 1, 0)
              )
            }
            register={register}
            sizing="sm"
            step={1}
            validation={[validateNonNegative]}
          />

          <p className="text-tertiary">
            $
            {(type === GovernanceTokenType.New
              ? newSymbol
              : existingGovernanceTokenInfo?.symbol) || t('info.tokens')}
          </p>
        </div>
      )}
    </CreateDAOConfigCard>
  )
}

export const CreateDAORefundFailedProposalDepositCard = ({
  newDAO: {
    governanceTokenOptions: {
      proposalDeposit: { refundFailed },
    },
  },

  errors,
  setValue,
  watch,
  readOnly,
}: CreateDAOConfigCardSharedProps) => {
  const { t } = useTranslation()

  return (
    <CreateDAOConfigCard
      accentColor="#fed3581a"
      description={t('form.refundFailedProposalsDescription')}
      error={errors?.governanceTokenOptions?.proposalDeposit?.refundFailed}
      image={<Emoji label="finger pointing up" symbol="👆" />}
      title={t('form.refundFailedProposalsTitle')}
    >
      {readOnly ? (
        <InputThemedText>
          {refundFailed ? t('info.yes') : t('info.no')}
        </InputThemedText>
      ) : (
        <FormSwitchCard
          fieldName="governanceTokenOptions.proposalDeposit.refundFailed"
          offLabel={t('info.no')}
          onLabel={t('info.yes')}
          readOnly={readOnly}
          setValue={setValue}
          sizing="sm"
          watch={watch}
        />
      )}
    </CreateDAOConfigCard>
  )
}

export const CreateDAOUnstakingDurationCard = ({
  newDAO: {
    governanceTokenOptions: { unregisterDuration },
  },

  errors,
  setValue,
  register,
  readOnly,
}: CreateDAOConfigCardSharedProps) => {
  const { t } = useTranslation()

  return (
    <CreateDAOConfigCard
      accentColor="#cf434b1a"
      description={t('form.unstakingPeriodDescription')}
      error={
        errors?.governanceTokenOptions?.unregisterDuration?.value ??
        errors?.governanceTokenOptions?.unregisterDuration?.units
      }
      image={<Emoji label="alarm clock" symbol="⏰" />}
      title={t('form.unstakingPeriodTitle')}
    >
      {readOnly ? (
        <InputThemedText>
          {unregisterDuration.value}{' '}
          {t(`unit.${unregisterDuration.units}`, {
            count: unregisterDuration.value,
          }).toLocaleLowerCase()}
        </InputThemedText>
      ) : (
        <>
          <NumberInput
            disabled={readOnly}
            error={errors?.governanceTokenOptions?.unregisterDuration?.value}
            fieldName="governanceTokenOptions.unregisterDuration.value"
            onMinus={() =>
              setValue(
                'governanceTokenOptions.unregisterDuration.value',
                Math.max(unregisterDuration.value - 1, 0)
              )
            }
            onPlus={() =>
              setValue(
                'governanceTokenOptions.unregisterDuration.value',
                Math.max(unregisterDuration.value + 1, 0)
              )
            }
            register={register}
            sizing="sm"
            step={1}
            validation={[validateNonNegative, validateRequired]}
          />

          <SelectInput
            disabled={readOnly}
            error={errors?.governanceTokenOptions?.unregisterDuration?.units}
            fieldName="governanceTokenOptions.unregisterDuration.units"
            register={register}
            validation={[validateRequired]}
          >
            {DurationUnitsValues.map((type, idx) => (
              <option key={idx} value={type}>
                {t(`unit.${type}`, {
                  count: unregisterDuration.value,
                }).toLocaleLowerCase()}
              </option>
            ))}
          </SelectInput>
        </>
      )}
    </CreateDAOConfigCard>
  )
}

export const CreateDAOAllowRevotingCard = ({
  newDAO: {
    advancedVotingConfig: { allowRevoting },
  },

  errors,
  setValue,
  watch,
  readOnly,
}: CreateDAOConfigCardSharedProps) => {
  const { t } = useTranslation()

  return (
    <CreateDAOConfigCard
      accentColor="#1cae121a"
      description={t('form.allowRevotingDescription')}
      error={errors?.advancedVotingConfig?.allowRevoting}
      image={<Emoji label={t('emoji.recycle')} symbol="♻️" />}
      title={t('form.allowRevotingTitle')}
    >
      {readOnly ? (
        <InputThemedText>
          {allowRevoting ? t('info.yes') : t('info.no')}
        </InputThemedText>
      ) : (
        <FormSwitchCard
          fieldName="advancedVotingConfig.allowRevoting"
          offLabel={t('info.no')}
          onLabel={t('info.yes')}
          readOnly={readOnly}
          setValue={setValue}
          sizing="sm"
          watch={watch}
        />
      )}
    </CreateDAOConfigCard>
  )
}
