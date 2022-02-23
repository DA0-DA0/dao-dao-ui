import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { InputLabel } from '@components/input/InputLabel'
import { NumberInput } from '@components/input/NumberInput'
import { TextInput } from '@components/input/TextInput'
import { ToggleInput } from '@components/input/ToggleInput'
import { Config as DAOConfig } from '@dao-dao/types/contracts/cw3-dao'
import { InformationCircleIcon, XIcon } from '@heroicons/react/outline'
import {
  DEFAULT_MAX_VOTING_PERIOD_SECONDS,
  DEFAULT_UNSTAKING_DURATION_SECONDS,
  secondsToHms,
} from 'pages/dao/create'
import { useState } from 'react'
import { FieldErrors, useFormContext } from 'react-hook-form'
import { Config } from 'util/contractConfigWrapper'
import {
  validatePercent,
  validatePositive,
  validateRequired,
  validateUrl,
} from 'util/formValidation'
import { makeWasmMessage } from 'util/messagehelpers'
import { ToCosmosMsgProps } from './templateList'

export interface DAOConfigUpdateData {
  name: string
  description: string
  image_url: string
  // The proposal voting duration in seconds. Technically we also support a
  // duration in blocks but this isn't supported anywhere in the UI.
  max_voting_period: number
  proposal_deposit: number
  refund_failed_proposals: boolean
  // The threshold in terms of `absolute_percentage` which is all we
  // support in the UI.
  threshold: number
}

export const DAOConfigUpdateDefaults = (
  _walletAddress: string,
  contractConfig: Config
): DAOConfigUpdateData => {
  const config = contractConfig.config as DAOConfig

  let max_voting_period = Number(DEFAULT_MAX_VOTING_PERIOD_SECONDS)
  if ('time' in config.max_voting_period) {
    max_voting_period = config.max_voting_period.time
  }
  let threshold = 75
  if ('absolute_percentage' in config.threshold) {
    threshold = Number(config.threshold.absolute_percentage.percentage) * 100
  }

  return {
    name: config.name,
    description: config.description,
    image_url: config.image_url as string,
    max_voting_period,
    proposal_deposit: Number(config.proposal_deposit),
    threshold,
    refund_failed_proposals: !!config.refund_failed_proposals,
  }
}

export const DAOUpdateConfigComponent = ({
  contractAddress,
  getLabel,
  onRemove,
  errors,
  multisig,
}: {
  contractAddress: string
  getLabel: (field: string) => string
  onRemove: () => void
  errors: FieldErrors
  multisig?: boolean
}) => {
  const { register } = useFormContext()

  const [votingPeriodSeconds, setVotingPeriodSeconds] = useState(
    DEFAULT_MAX_VOTING_PERIOD_SECONDS
  )
  const [unstakingDurationSeconds, setUnstakingDurationSeconds] = useState(
    DEFAULT_UNSTAKING_DURATION_SECONDS
  )

  return (
    <div className="flex flex flex-col py-2 px-3 rounded-lg my-2 bg-base-300">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-4xl">🎭</h2>
          <h2>Update Config</h2>
        </div>
        <button onClick={() => onRemove()} type="button">
          <XIcon className="h-4" />
        </button>
      </div>
      <div className="px-3">
        <div className="form-control">
          <InputLabel name="Name" />
          <TextInput
            label={getLabel('name')}
            register={register}
            error={errors.name}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors.name} />
        </div>

        <div className="form-control">
          <InputLabel name="Description" />
          <TextInput
            label={getLabel('description')}
            register={register}
            error={errors.description}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors.description} />
        </div>

        <div className="form-control">
          <InputLabel name="Image URL (optional)" />
          <TextInput
            label={getLabel('image_url')}
            register={register}
            error={errors.imageUrl}
            validation={[validateUrl]}
          />
          <InputErrorMessage error={errors.imageUrl} />
        </div>

        <div className="grid grid-cols-2 gap-x-3 mt-1">
          <div className="form-control">
            <InputLabel name="Passing Threshold (%)" />
            <NumberInput
              label={getLabel('threshold')}
              register={register}
              error={errors.threshold}
              validation={[validateRequired, validatePercent]}
              defaultValue="75"
              step="any"
            />
            <InputErrorMessage error={errors.threshold} />
          </div>

          <div className="form-control">
            <InputLabel name="Voting Duration (seconds)" />
            <NumberInput
              label={getLabel('duration')}
              register={register}
              error={errors.duration}
              validation={[validateRequired, validatePositive]}
              onChange={(e) => setVotingPeriodSeconds(e?.target?.value)}
              defaultValue={DEFAULT_MAX_VOTING_PERIOD_SECONDS}
            />
            <InputErrorMessage error={errors.duration} />
            <div
              style={{
                textAlign: 'end',
                padding: '5px 0 0 17px',
                fontSize: ' 12px',
                color: 'grey',
              }}
            >
              {secondsToHms(votingPeriodSeconds)}
            </div>
          </div>

          <div className="form-control">
            <InputLabel name="Proposal Deposit" />
            <NumberInput
              label={getLabel('proposal_deposit')}
              register={register}
              error={errors.deposit}
              validation={[validateRequired]}
              step={0.000001}
              defaultValue="0"
            />
            <InputErrorMessage error={errors.deposit} />
          </div>

          <div className="form-control">
            <InputLabel name="Refund Failed Proposal Deposits" />
            <ToggleInput
              label={getLabel('refund_failed_proposals')}
              register={register}
            />
            <InputErrorMessage error={errors.refund} />
          </div>
        </div>
      </div>
      <div className="p-2 rounded-lg my-3 flex items-center gap-2 bg-base-200">
        <InformationCircleIcon className="h-4" />
        <p>
          This message will change the configuration of your DAO. Take Care.
        </p>
      </div>
    </div>
  )
}

export const transformDAOToConfigUpdateCosmos = (
  self: DAOConfigUpdateData,
  props: ToCosmosMsgProps
) => {
  const config: DAOConfig = {
    name: self.name,
    description: self.description,
    ...(self.image_url && { image_url: self.image_url }),
    max_voting_period: { time: self.max_voting_period },
    proposal_deposit: self.proposal_deposit.toString(),
    ...(self.refund_failed_proposals && {
      refund_failed_proposals: self.refund_failed_proposals,
    }),
    threshold: {
      absolute_percentage: { percentage: (self.threshold / 100).toString() },
    },
  }
  const message = makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: props.sigAddress,
        funds: [],
        msg: {
          update_config: config,
        },
      },
    },
  })
  return message
}
