import Emoji from 'a11y-react-emoji'
import { FC } from 'react'
import {
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

import i18n from '@dao-dao/i18n'
import { FormSwitch, NumberInput, SelectInput } from '@dao-dao/ui'
import {
  validateNonNegative,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { CreateDAOConfigCard } from './CreateDAOConfigCard'
import {
  DEFAULT_NEW_DAO_THRESHOLD_PERCENT,
  DefaultNewDAO,
  DurationUnitsValues,
  NewDAO,
} from '@/atoms'

interface CreateDAOConfigCardSharedProps {
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
}) => (
  <CreateDAOConfigCard
    accentColor="rgba(95, 94, 254, 0.1)"
    description={i18n.t('Passing threshold description')}
    error={errors?.thresholdQuorum?.threshold}
    image={<Emoji label="ballot box" symbol="🗳️" />}
    title={i18n.t('Passing threshold')}
  >
    {threshold !== 'majority' && (
      <NumberInput
        disabled={readOnly}
        error={errors?.thresholdQuorum?.threshold}
        label="thresholdQuorum.threshold"
        onPlusMinus={[
          () =>
            setValue('thresholdQuorum.threshold', Math.max(threshold + 1, 1)),
          () =>
            setValue('thresholdQuorum.threshold', Math.max(threshold - 1, 1)),
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
      disabled={readOnly}
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
      <option value="majority">{i18n.t('Majority')}</option>
    </SelectInput>
  </CreateDAOConfigCard>
)

export const CreateDAOQuorumCard: FC<CreateDAOConfigCardSharedProps> = ({
  newDAO: {
    thresholdQuorum: { quorum },
  },
  register,
  setValue,
  errors,
  readOnly,
}) => (
  <CreateDAOConfigCard
    accentColor="#fefe891a"
    description={i18n.t('Quorum description')}
    error={errors?.thresholdQuorum?.quorum}
    image={<Emoji label="megaphone" symbol="📣" />}
    title={i18n.t('Quorum')}
  >
    {quorum !== 'majority' && (
      <NumberInput
        disabled={readOnly}
        error={errors?.thresholdQuorum?.quorum}
        label="thresholdQuorum.quorum"
        onPlusMinus={[
          () => setValue('thresholdQuorum.quorum', Math.max(quorum + 1, 0)),
          () => setValue('thresholdQuorum.quorum', Math.max(quorum - 1, 0)),
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
      <option value="majority">{i18n.t('Majority')}</option>
    </SelectInput>
  </CreateDAOConfigCard>
)

export const CreateDAOVotingDurationCard: FC<
  CreateDAOConfigCardSharedProps
> = ({ newDAO: { votingDuration }, register, setValue, errors, readOnly }) => (
  <CreateDAOConfigCard
    accentColor="#c3935e1a"
    description={i18n.t('Voting duration description')}
    error={errors?.votingDuration?.value ?? errors?.votingDuration?.units}
    image={<Emoji label="hourglass" symbol="⏳" />}
    title={i18n.t('Voting duration')}
  >
    <NumberInput
      disabled={readOnly}
      error={errors?.votingDuration?.value}
      label="votingDuration.value"
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
      label="votingDuration.units"
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
  </CreateDAOConfigCard>
)

export const CreateDAOProposalDepositCard: FC<
  CreateDAOConfigCardSharedProps
> = ({
  newDAO: {
    governanceTokenOptions: {
      proposalDeposit: { value },
    },
  },
  register,
  setValue,
  errors,
  readOnly,
}) => (
  <CreateDAOConfigCard
    accentColor="#fccd031a"
    description={i18n.t('Proposal deposit description')}
    error={errors?.governanceTokenOptions?.proposalDeposit?.value}
    image={<Emoji label="banknote" symbol="💵" />}
    title={i18n.t('Proposal deposit')}
  >
    <NumberInput
      disabled={readOnly}
      error={errors?.governanceTokenOptions?.proposalDeposit?.value}
      label="governanceTokenOptions.proposalDeposit.value"
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
  </CreateDAOConfigCard>
)

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
}) => (
  <CreateDAOConfigCard
    accentColor="#fed3581a"
    description={i18n.t('Proposal deposit refund description')}
    error={errors?.governanceTokenOptions?.proposalDeposit?.refundFailed}
    image={<Emoji label="finger pointing up" symbol="👆" />}
    title={i18n.t('Proposal deposit refund')}
  >
    <div className="flex flex-row gap-4 items-center py-2 px-3 bg-card rounded-md">
      <p className="w-[3ch] secondary-text">
        {refundFailed ? i18n.t('Yes') : i18n.t('No')}
      </p>

      <FormSwitch
        disabled={readOnly}
        label="governanceTokenOptions.proposalDeposit.refundFailed"
        setValue={setValue}
        sizing="sm"
        watch={watch}
      />
    </div>
  </CreateDAOConfigCard>
)

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
}) => (
  <CreateDAOConfigCard
    accentColor="#cf434b1a"
    description={i18n.t('Unstaking period description')}
    error={
      errors?.governanceTokenOptions?.unregisterDuration?.value ??
      errors?.governanceTokenOptions?.unregisterDuration?.units
    }
    image={<Emoji label="alarm clock" symbol="⏰" />}
    title={i18n.t('Unstaking period')}
  >
    <NumberInput
      disabled={readOnly}
      error={errors?.governanceTokenOptions?.unregisterDuration?.value}
      label="governanceTokenOptions.unregisterDuration.value"
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
      label="governanceTokenOptions.unregisterDuration.units"
      register={register}
      validation={[validateRequired]}
    >
      {DurationUnitsValues.map((type, idx) => (
        <option key={idx} value={type}>
          {type}
        </option>
      ))}
    </SelectInput>
  </CreateDAOConfigCard>
)
