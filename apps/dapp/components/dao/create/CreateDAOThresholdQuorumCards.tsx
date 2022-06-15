import Emoji from 'a11y-react-emoji'
import { FC } from 'react'
import { FieldError, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import i18n from '@dao-dao/i18n'
import { NumberInput, SelectInput } from '@dao-dao/ui'
import {
  validateNonNegative,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { CreateDAOConfigCard } from './CreateDAOConfigCard'
import {
  DEFAULT_NEW_DAO_THRESHOLD_PERCENT,
  DefaultNewDAO,
  NewDAO,
  ThresholdValue,
} from '@/atoms'

interface CreateDAOThresholdQuorumCardProps {
  value: ThresholdValue
  register: UseFormRegister<NewDAO>
  setValue: UseFormSetValue<NewDAO>
  error?: FieldError
  readOnly?: boolean
}

export const CreateDAOThresholdCard: FC<CreateDAOThresholdQuorumCardProps> = ({
  value,
  register,
  setValue,
  error,
  readOnly,
}) => (
  <CreateDAOConfigCard
    accentColor="rgba(95, 94, 254, 0.1)"
    description={i18n.t('Passing threshold description')}
    error={error}
    image={<Emoji label="ballot box" symbol="🗳️" />}
    title={i18n.t('Passing threshold')}
  >
    {value !== 'majority' && (
      <NumberInput
        disabled={readOnly}
        error={error}
        label="thresholdQuorum.threshold"
        onPlusMinus={[
          () => setValue('thresholdQuorum.threshold', Math.max(value + 1, 1)),
          () => setValue('thresholdQuorum.threshold', Math.max(value - 1, 1)),
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
      value={value === 'majority' ? 'majority' : '%'}
    >
      <option value="%">%</option>
      <option value="majority">{i18n.t('Majority')}</option>
    </SelectInput>
  </CreateDAOConfigCard>
)

export const CreateDAOQuorumCard: FC<CreateDAOThresholdQuorumCardProps> = ({
  value,
  register,
  setValue,
  error,
  readOnly,
}) => (
  <CreateDAOConfigCard
    accentColor="#fefe891a"
    description={i18n.t('Quorum description')}
    error={error}
    image={<Emoji label="megaphone" symbol="📣" />}
    title={i18n.t('Quorum')}
  >
    {value !== 'majority' && (
      <NumberInput
        disabled={readOnly}
        error={error}
        label="thresholdQuorum.quorum"
        onPlusMinus={[
          () => setValue('thresholdQuorum.quorum', Math.max(value + 1, 0)),
          () => setValue('thresholdQuorum.quorum', Math.max(value - 1, 0)),
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
      value={value === 'majority' ? 'majority' : '%'}
    >
      <option value="%">%</option>
      <option value="majority">{i18n.t('Majority')}</option>
    </SelectInput>
  </CreateDAOConfigCard>
)
