import { useState } from 'react'

import { Config as DAOConfig } from '@dao-dao/types/contracts/cw3-dao'
import { InformationCircleIcon, XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { InputLabel } from '@components/input/InputLabel'
import { NumberInput } from '@components/input/NumberInput'
import { TextInput } from '@components/input/TextInput'
import { ToggleInput } from '@components/input/ToggleInput'
import { DEFAULT_MAX_VOTING_PERIOD_SECONDS } from 'pages/dao/create'
import { Config } from 'util/contractConfigWrapper'
import {
  secondsToWdhms,
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

import {
  FromCosmosMsgProps,
  TemplateComponent,
  ToCosmosMsgProps,
} from './templateList'

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

export const daoConfigUpdateDefaults = (
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

export const DAOUpdateConfigComponent: TemplateComponent = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
}) => {
  const { register, watch } = useFormContext()

  const votingPeriodSeconds = watch(getLabel('max_voting_period'))

  return (
    <div className="flex flex-col p-3 rounded-lg my-2 bg-primary">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl">🎭</h2>
          <h2>Update Config</h2>
        </div>
        {onRemove && (
          <button onClick={onRemove} type="button">
            <XIcon className="h-4" />
          </button>
        )}
      </div>
      <div className="px-3">
        <div className="flex flex-col gap-1 my-3">
          <InputLabel name="Name" />
          <TextInput
            label={getLabel('name')}
            register={register}
            error={errors?.name}
            validation={[validateRequired]}
            disabled={readOnly}
          />
          <InputErrorMessage error={errors?.name} />
        </div>

        <div className="flex flex-col gap-1 my-3">
          <InputLabel name="Description" />
          <TextInput
            label={getLabel('description')}
            register={register}
            error={errors?.description}
            validation={[validateRequired]}
            disabled={readOnly}
          />
          <InputErrorMessage error={errors?.description} />
        </div>

        <div className="flex flex-col gap-1 my-3">
          <InputLabel name="Image URL (optional)" />
          <TextInput
            label={getLabel('image_url')}
            register={register}
            error={errors?.imageUrl}
            validation={[validateUrl]}
            disabled={readOnly}
          />
          <InputErrorMessage error={errors?.imageUrl} />
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1 col-span-1 basis-1/2">
            <InputLabel name="Passing Threshold (%)" />
            <NumberInput
              label={getLabel('threshold')}
              register={register}
              error={errors?.threshold}
              validation={[validateRequired, validatePercent]}
              defaultValue="51"
              step="any"
              disabled={readOnly}
            />
            <InputErrorMessage error={errors?.threshold} />
          </div>
          <div className="flex flex-col gap-1 col-span-1 basis-1/2">
            <InputLabel name="Quorum (%)" />
            <NumberInput
              label={getLabel('quorum')}
              register={register}
              error={errors?.quorum}
              validation={[validateRequired, validatePercent]}
              defaultValue="33"
              step="any"
              disabled={readOnly}
            />
            <InputErrorMessage error={errors?.quorum} />
          </div>
        </div>

        <div className="flex gap-3 my-3">
          <div className="flex flex-col gap-1 basis-1/2">
            <InputLabel name="Voting Duration (seconds)" />
            <NumberInput
              label={getLabel('max_voting_period')}
              register={register}
              error={errors?.duration}
              validation={[validateRequired, validatePositive]}
              defaultValue={DEFAULT_MAX_VOTING_PERIOD_SECONDS}
              disabled={readOnly}
            />
            <InputErrorMessage error={errors?.duration} />
            <div className="caption-text">
              {secondsToWdhms(votingPeriodSeconds)}
            </div>
          </div>

          <div className="flex flex-col gap-1 basis-1/2">
            <InputLabel name="Proposal Deposit" />
            <NumberInput
              label={getLabel('proposal_deposit')}
              register={register}
              error={errors?.deposit}
              validation={[validateRequired]}
              step={0.000001}
              disabled={readOnly}
            />
            <InputErrorMessage error={errors?.deposit} />
          </div>
        </div>

        <div className="flex gap-1">
          <ToggleInput
            label={getLabel('refund_failed_proposals')}
            register={register}
            disabled={readOnly}
          />
          <InputLabel name="Refund Failed Proposal Deposits" />
          <InputErrorMessage error={errors?.refund} />
        </div>
      </div>
      <div className="p-2 rounded-lg mt-3 flex items-center gap-2 bg-disabled">
        <InformationCircleIcon className="h-4" />
        <p>This will change the configuration of your DAO. Take Care.</p>
      </div>
    </div>
  )
}

export const transformDAOConfigUpdateToCosmos = (
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

export const transformCosmosToDAOConfigUpdate = (
  msg: Record<string, any>,
  { govDecimals }: FromCosmosMsgProps
): DAOConfigUpdateData | null => {
  if (
    !(
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'update_config' in msg.wasm.execute.msg &&
      'threshold' in msg.wasm.execute.msg.update_config &&
      ('threshold_quorum' in msg.wasm.execute.msg.update_config.threshold ||
        'absolute_percentage' in msg.wasm.execute.msg.update_config.threshold)
    )
  )
    return null

  const data = msg.wasm.execute.msg.update_config

  const threshold = (
    parseFloat(
      'threshold_quorum' in data.threshold
        ? data.threshold.threshold_quorum.threshold
        : data.threshold.absolute_percentage.percentage
    ) * 100
  ).toString()
  const quorum =
    'threshold_quorum' in data.threshold
      ? (parseFloat(data.threshold.threshold_quorum.quorum) * 100).toString()
      : undefined

  return {
    name: data.name,
    description: data.description,
    image_url: data.image_url,
    max_voting_period: data.max_voting_period.time,
    proposal_deposit: convertMicroDenomToDenomWithDecimals(
      data.proposal_deposit,
      govDecimals
    ),
    refund_failed_proposals: data.refund_failed_proposals,
    threshold,
    quorum,
    defaultQuorum: quorum || '33',
  }
}
