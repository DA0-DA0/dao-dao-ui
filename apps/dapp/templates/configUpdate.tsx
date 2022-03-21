import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { InputLabel } from '@components/input/InputLabel'
import { NumberInput } from '@components/input/NumberInput'
import { TextInput } from '@components/input/TextInput'
import { ToggleInput } from '@components/input/ToggleInput'
import { Config as DAOConfig } from '@dao-dao/types/contracts/cw3-dao'
import { InformationCircleIcon, XIcon } from '@heroicons/react/outline'
import { DEFAULT_MAX_VOTING_PERIOD_SECONDS } from 'pages/dao/create'
import { useState } from 'react'
import { FieldErrors, useFormContext } from 'react-hook-form'
import { Config } from 'util/contractConfigWrapper'
import {
  secondsToHms,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  getThresholdAndQuorum,
} from 'util/conversion'
import {
  validatePercent,
  validatePositive,
  validateRequired,
  validateUrl,
} from 'util/formValidation'
import { makeWasmMessage } from 'util/messagehelpers'
import { ToCosmosMsgProps } from './templateList'

enum ThresholdMode {
  Threshold,
  ThresholdQuorum,
}

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
  threshold: string
  quorum: string | undefined

  defaultQuorum: string
}

export const DAOConfigUpdateDefaults = (
  _walletAddress: string,
  contractConfig: Config,
  govTokenDecimals: number
): DAOConfigUpdateData => {
  const config = contractConfig.config as DAOConfig

  let max_voting_period = Number(DEFAULT_MAX_VOTING_PERIOD_SECONDS)
  if ('time' in config.max_voting_period) {
    max_voting_period = config.max_voting_period.time
  }
  let [threshold, quorum] = getThresholdAndQuorum(config.threshold)

  const processedQuorum = quorum ? (Number(quorum) * 100).toString() : '33'

  return {
    name: config.name,
    description: config.description,
    image_url: config.image_url as string,
    max_voting_period,
    proposal_deposit: convertMicroDenomToDenomWithDecimals(
      config.proposal_deposit,
      govTokenDecimals
    ),
    threshold: (Number(threshold) * 100).toString(),
    quorum: processedQuorum,
    refund_failed_proposals: !!config.refund_failed_proposals,

    // Store the default quorum in addition to the currently selected
    // quorum. This allows us to restore the value of the quorum if the absolute
    // threshold tab is selected (clearing it).
    defaultQuorum: processedQuorum,
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
  const { register, setValue, watch } = useFormContext()

  const defaultQuorum = watch(getLabel('defaultQuorum'))

  const [votingPeriodSeconds, setVotingPeriodSeconds] = useState(
    DEFAULT_MAX_VOTING_PERIOD_SECONDS
  )
  const [thresholdMode, setThresholdMode] = useState(
    ThresholdMode.ThresholdQuorum
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

        <div className="tabs mt-8">
          <button
            className={
              'tab tab-lifted tab-lg' +
              (thresholdMode == ThresholdMode.ThresholdQuorum
                ? ' tab-active'
                : '')
            }
            onClick={() => {
              setThresholdMode(ThresholdMode.ThresholdQuorum)
              setValue(getLabel('quorum'), defaultQuorum)
            }}
            type="button"
          >
            Threshold and quorum
          </button>
          <button
            className={
              'tab tab-lifted tab-lg' +
              (thresholdMode == ThresholdMode.Threshold ? ' tab-active' : '')
            }
            onClick={() => {
              setThresholdMode(ThresholdMode.Threshold)
              // Clear the quorum value.
              setValue(getLabel('quorum'), undefined)
            }}
            type="button"
          >
            Absolute threshold
          </button>
          <div className="flex-1 cursor-default tab tab-lifted"></div>
        </div>

        <div className="border-r border-b border-l border-solid p-3 border-base-300 rounded-b-lg bg-base-100">
          {thresholdMode == ThresholdMode.ThresholdQuorum ? (
            <div className="grid grid-cols-2 gap-x-3">
              <div className="form-control">
                <InputLabel name="Passing Threshold (%)" />
                <NumberInput
                  label={getLabel('threshold')}
                  register={register}
                  error={errors.threshold}
                  validation={[validateRequired, validatePercent]}
                  defaultValue="51"
                  step="any"
                />
                <InputErrorMessage error={errors.threshold} />
              </div>
              <div className="form-control">
                <InputLabel name="Quorum (%)" />
                <NumberInput
                  label={getLabel('quorum')}
                  register={register}
                  error={errors.quorum}
                  validation={[validateRequired, validatePercent]}
                  defaultValue="33"
                  step="any"
                />
                <InputErrorMessage error={errors.quorum} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-3">
              <div className="form-control">
                <InputLabel name="Passing Threshold (%)" />
                <NumberInput
                  label="threshold"
                  register={register}
                  error={errors.threshold}
                  validation={[validateRequired, validatePercent]}
                  defaultValue="51"
                  step="any"
                />
                <InputErrorMessage error={errors.threshold} />
              </div>
            </div>
          )}
        </div>

        <div className="form-control">
          <InputLabel name="Voting Duration (seconds)" />
          <NumberInput
            label={getLabel('max_voting_period')}
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
  let decimalThreshold = `${Number(self.threshold) / 100}`
  let decimalQuorum = `${Number(self.quorum) / 100}`

  const thresholdObj = self.quorum
    ? {
        threshold_quorum: {
          threshold: decimalThreshold,
          quorum: decimalQuorum,
        },
      }
    : { absolute_percentage: { percentage: decimalThreshold } }

  const config: DAOConfig = {
    name: self.name,
    description: self.description,
    ...(self.image_url && { image_url: self.image_url }),
    max_voting_period: { time: Number(self.max_voting_period) },
    proposal_deposit: convertDenomToMicroDenomWithDecimals(
      self.proposal_deposit,
      props.govDecimals
    ).toString(),
    ...(self.refund_failed_proposals && {
      refund_failed_proposals: self.refund_failed_proposals,
    }),
    threshold: thresholdObj,
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
