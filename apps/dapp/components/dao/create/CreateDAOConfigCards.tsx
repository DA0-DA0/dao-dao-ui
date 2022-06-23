import Emoji from 'a11y-react-emoji'
import { FC } from 'react'
import {
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

import { useTranslation } from '@dao-dao/i18n'
import {
  FormSwitchCard,
  InputThemedText,
  NumberInput,
  SelectInput,
} from '@dao-dao/ui'
import {
  formatPercentOf100,
  validateNonNegative,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { CreateDAOConfigCard } from './CreateDAOConfigCard'
import {
  DEFAULT_NEW_DAO_THRESHOLD_PERCENT,
  DefaultNewDAO,
  DurationUnitsValues,
  GovernanceTokenType,
  NewDAO,
} from '@/atoms'

export interface CreateDAOConfigCardSharedProps {
  newDAO: NewDAO
  register: UseFormRegister<NewDAO>
  setValue: UseFormSetValue<NewDAO>
  watch: UseFormWatch<NewDAO>
  errors?: FormState<NewDAO>['errors']
  readOnly?: boolean
}

export const CreateDAOThresholdCard: FC<CreateDAOConfigCardSharedProps> = ({
  newDAO: {
    thresholdQuorum: { threshold },
  },
  register,
  setValue,
  errors,
  readOnly,
}) => {
  const { t } = useTranslation()

  return (
    <CreateDAOConfigCard
      accentColor="rgba(95, 94, 254, 0.1)"
      description={t('Passing threshold description')}
      error={errors?.thresholdQuorum?.threshold}
      image={<Emoji label="ballot box" symbol="🗳️" />}
      title={t('Passing threshold')}
    >
      {readOnly ? (
        <InputThemedText>
          {threshold === 'majority'
            ? t('majority')
            : formatPercentOf100(threshold)}
        </InputThemedText>
      ) : (
        <>
          {threshold !== 'majority' && (
            <NumberInput
              error={errors?.thresholdQuorum?.threshold}
              fieldName="thresholdQuorum.threshold"
              onPlusMinus={[
                () =>
                  setValue(
                    'thresholdQuorum.threshold',
                    Math.max(threshold + 1, 1)
                  ),
                () =>
                  setValue(
                    'thresholdQuorum.threshold',
                    Math.max(threshold - 1, 1)
                  ),
              ]}
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
                'thresholdQuorum.threshold',
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
            <option value="majority">{t('majority')}</option>
          </SelectInput>
        </>
      )}
    </CreateDAOConfigCard>
  )
}

interface CreateDAOQuorumCardProps extends CreateDAOConfigCardSharedProps {
  showWarningModal?: () => void
}

export const CreateDAOQuorumCard: FC<CreateDAOQuorumCardProps> = ({
  newDAO: {
    thresholdQuorum: { quorumEnabled, quorum },
  },
  register,
  setValue,
  errors,
  readOnly,
  watch,
  showWarningModal,
}) => {
  const { t } = useTranslation()

  return (
    <CreateDAOConfigCard
      accentColor="#fefe891a"
      childContainerClassName={readOnly ? undefined : 'self-stretch'}
      description={t('Quorum description')}
      error={errors?.thresholdQuorum?.quorum}
      image={<Emoji label="megaphone" symbol="📣" />}
      title={t('Quorum')}
    >
      {readOnly ? (
        <InputThemedText>
          {quorumEnabled
            ? quorum === 'majority'
              ? t('majority')
              : formatPercentOf100(quorum)
            : t('disabled')}
        </InputThemedText>
      ) : (
        <div className="flex flex-row flex-wrap grow gap-x-8 gap-y-4 justify-between items-stretch">
          <FormSwitchCard
            disabled={readOnly}
            fieldName="thresholdQuorum.quorumEnabled"
            onToggle={
              showWarningModal && ((enabled) => !enabled && showWarningModal())
            }
            setValue={setValue}
            sizing="sm"
            watch={watch}
          />

          {quorumEnabled && (
            <div className="flex flex-row gap-2 items-stretch">
              {quorum !== 'majority' && (
                <NumberInput
                  disabled={readOnly}
                  error={errors?.thresholdQuorum?.quorum}
                  fieldName="thresholdQuorum.quorum"
                  onPlusMinus={[
                    () =>
                      setValue(
                        'thresholdQuorum.quorum',
                        Math.max(quorum + 1, 0)
                      ),
                    () =>
                      setValue(
                        'thresholdQuorum.quorum',
                        Math.max(quorum - 1, 0)
                      ),
                  ]}
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
                    'thresholdQuorum.quorum',
                    value === 'majority'
                      ? 'majority'
                      : // value === '%'
                        DefaultNewDAO.thresholdQuorum.quorum
                  )
                }
                validation={[validateRequired]}
                value={quorum === 'majority' ? 'majority' : '%'}
              >
                <option value="%">%</option>
                <option value="majority">{t('majority')}</option>
              </SelectInput>
            </div>
          )}
        </div>
      )}
    </CreateDAOConfigCard>
  )
}

export const CreateDAOVotingDurationCard: FC<
  CreateDAOConfigCardSharedProps
> = ({ newDAO: { votingDuration }, register, setValue, errors, readOnly }) => {
  const { t } = useTranslation()

  return (
    <CreateDAOConfigCard
      accentColor="#c3935e1a"
      description={t('Voting duration description')}
      error={errors?.votingDuration?.value ?? errors?.votingDuration?.units}
      image={<Emoji label="hourglass" symbol="⏳" />}
      title={t('Voting duration')}
    >
      {readOnly ? (
        <InputThemedText>
          {votingDuration.value} {votingDuration.units}
        </InputThemedText>
      ) : (
        <>
          <NumberInput
            disabled={readOnly}
            error={errors?.votingDuration?.value}
            fieldName="votingDuration.value"
            onPlusMinus={[
              () =>
                setValue(
                  'votingDuration.value',
                  Math.max(votingDuration.value + 1, 1)
                ),
              () =>
                setValue(
                  'votingDuration.value',
                  Math.max(votingDuration.value - 1, 1)
                ),
            ]}
            register={register}
            sizing="sm"
            step={1}
            validation={[validatePositive, validateRequired]}
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
                {/* TODO: i18n */}
                {type}
              </option>
            ))}
          </SelectInput>
        </>
      )}
    </CreateDAOConfigCard>
  )
}

export const CreateDAOProposalDepositCard: FC<
  CreateDAOConfigCardSharedProps
> = ({
  newDAO: {
    governanceTokenOptions: {
      type,
      newInfo: { symbol },
      proposalDeposit: { value },
    },
  },
  register,
  setValue,
  errors,
  readOnly,
}) => {
  const { t } = useTranslation()

  return (
    <CreateDAOConfigCard
      accentColor="#fccd031a"
      description={t('Proposal deposit description')}
      error={errors?.governanceTokenOptions?.proposalDeposit?.value}
      image={<Emoji label="banknote" symbol="💵" />}
      title={t('Proposal deposit')}
    >
      {readOnly ? (
        <InputThemedText>
          {value}{' '}
          {type === GovernanceTokenType.New ? '$' + symbol : t('tokens')}
        </InputThemedText>
      ) : (
        <NumberInput
          disabled={readOnly}
          error={errors?.governanceTokenOptions?.proposalDeposit?.value}
          fieldName="governanceTokenOptions.proposalDeposit.value"
          onPlusMinus={[
            () =>
              setValue(
                'governanceTokenOptions.proposalDeposit.value',
                Math.max(value + 1, 0)
              ),
            () =>
              setValue(
                'governanceTokenOptions.proposalDeposit.value',
                Math.max(value - 1, 0)
              ),
          ]}
          register={register}
          sizing="sm"
          step={1}
          validation={[validateNonNegative]}
        />
      )}
    </CreateDAOConfigCard>
  )
}

export const CreateDAORefundFailedProposalDepositCard: FC<
  CreateDAOConfigCardSharedProps
> = ({
  newDAO: {
    governanceTokenOptions: {
      proposalDeposit: { refundFailed },
    },
  },
  errors,
  setValue,
  watch,
  readOnly,
}) => {
  const { t } = useTranslation()

  return (
    <CreateDAOConfigCard
      accentColor="#fed3581a"
      description={t('Proposal deposit refund description')}
      error={errors?.governanceTokenOptions?.proposalDeposit?.refundFailed}
      image={<Emoji label="finger pointing up" symbol="👆" />}
      title={t('Proposal deposit refund')}
    >
      {readOnly ? (
        <InputThemedText>{refundFailed ? t('yes') : t('no')}</InputThemedText>
      ) : (
        <FormSwitchCard
          disabled={readOnly}
          fieldName="governanceTokenOptions.proposalDeposit.refundFailed"
          offLabel={t('no')}
          onLabel={t('yes')}
          setValue={setValue}
          sizing="sm"
          watch={watch}
        />
      )}
    </CreateDAOConfigCard>
  )
}

export const CreateDAOUnstakingDurationCard: FC<
  CreateDAOConfigCardSharedProps
> = ({
  newDAO: {
    governanceTokenOptions: { unregisterDuration },
  },
  errors,
  setValue,
  register,
  readOnly,
}) => {
  const { t } = useTranslation()

  return (
    <CreateDAOConfigCard
      accentColor="#cf434b1a"
      description={t('Unstaking period description')}
      error={
        errors?.governanceTokenOptions?.unregisterDuration?.value ??
        errors?.governanceTokenOptions?.unregisterDuration?.units
      }
      image={<Emoji label="alarm clock" symbol="⏰" />}
      title={t('Unstaking period')}
    >
      {readOnly ? (
        <InputThemedText>
          {unregisterDuration.value} {unregisterDuration.units}
        </InputThemedText>
      ) : (
        <>
          <NumberInput
            disabled={readOnly}
            error={errors?.governanceTokenOptions?.unregisterDuration?.value}
            fieldName="governanceTokenOptions.unregisterDuration.value"
            onPlusMinus={[
              () =>
                setValue(
                  'governanceTokenOptions.unregisterDuration.value',
                  Math.max(unregisterDuration.value + 1, 0)
                ),
              () =>
                setValue(
                  'governanceTokenOptions.unregisterDuration.value',
                  Math.max(unregisterDuration.value - 1, 0)
                ),
            ]}
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
                {type}
              </option>
            ))}
          </SelectInput>
        </>
      )}
    </CreateDAOConfigCard>
  )
}

export const CreateDAOAllowRevotingCard: FC<CreateDAOConfigCardSharedProps> = ({
  errors,
  setValue,
  watch,
  readOnly,
}) => {
  const { t } = useTranslation()

  return (
    <CreateDAOConfigCard
      accentColor="#1cae121a"
      description={t('allowRevotingDescription')}
      error={errors?.allowRevoting}
      image={<Emoji label="recycle" symbol="♻️" />}
      title={t('allowRevoting')}
    >
      <FormSwitchCard
        disabled={readOnly}
        fieldName="allowRevoting"
        offLabel={t('no')}
        onLabel={t('yes')}
        setValue={setValue}
        sizing="sm"
        watch={watch}
      />
    </CreateDAOConfigCard>
  )
}
