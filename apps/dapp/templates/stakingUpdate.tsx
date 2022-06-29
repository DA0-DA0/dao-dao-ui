import { XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

import {
  AddressInput,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  SelectInput,
} from '@dao-dao/ui'

import { TemplateComponent } from './templateList'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from '@/util/formValidation'
import { makeWasmMessage } from '@/util/messagehelpers'

interface StakingUpdateData {
  stakingContract: string
  // Owner of the staking contract. Leave empty to not set.
  owner: string
  // Manager of the staking contract. Leave empty to not set.
  manager: string
  // Unstakinig duration of the staking contract.
  duration: number
  units: 'none' | 'weeks' | 'days' | 'hours' | 'minutes'
}

export const stakingUpdateDefaults = () => ({
  stakingContract: '',
  owner: '',
  manager: '',
  duration: 0,
})

export const StakingUpdateComponent: TemplateComponent = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
}) => {
  const { register, watch, setValue } = useFormContext()

  const units = watch(getLabel('units'))
  const duration = watch(getLabel('duration'))

  return (
    <div className="flex flex-col p-3 my-2 bg-primary rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center mb-2">
          <h2 className="text-3xl">🌳</h2>
          <h2>Update Staking Config</h2>
        </div>
        {onRemove && (
          <button onClick={onRemove} type="button">
            <XIcon className="h-4" />
          </button>
        )}
      </div>
      <p className="mb-2 max-w-prose secondary-text">
        This will update the configuration of this DAO{"'"}s staking contract.
      </p>
      <p className="mb-4 max-w-prose secondary-text">
        This template only works with the{' '}
        <a
          className="underline"
          href="https://github.com/DA0-DA0/dao-contracts/releases/tag/v1.0.0"
          rel="noreferrer"
          target="_blank"
        >
          v1 staking contract
        </a>
        . If you have not already upgraded your staking contract consider using
        the {'"'}🐋 Migrate Contract{'"'} template to upgrade your staking
        contract. When doing this upgrade set the migrate message to{' '}
        <code>{'{"from_beta": {}}'}</code>.
      </p>
      <div className="flex flex-col gap-1 max-w-prose">
        <InputLabel name="Staking Contract" />
        <AddressInput
          disabled={readOnly}
          error={errors?.stakingContract}
          label={getLabel('stakingContract')}
          register={register}
          validation={[validateRequired, validateAddress]}
        />
        <InputErrorMessage error={errors?.stakingContract} />
      </div>
      <div className="flex flex-row flex-wrap gap-3 my-2 max-w-prose">
        <div className="flex flex-col grow gap-1">
          <InputLabel name="Owner" />
          <AddressInput
            disabled={readOnly}
            error={errors?.owner}
            label={getLabel('owner')}
            register={register}
            validation={[validateRequired, validateAddress]}
          />
          <InputErrorMessage error={errors?.owner} />
        </div>
        <div className="flex flex-col grow gap-1">
          <InputLabel name="Manager (optional)" />
          <AddressInput
            disabled={readOnly}
            error={errors?.manager}
            label={getLabel('manager')}
            register={register}
            validation={[(v: string) => (!v ? true : validateAddress(v))]}
          />
          <InputErrorMessage error={errors?.manager} />
        </div>
      </div>
      <InputLabel className="mb-1" name="Unstaking Duration" />
      <div className="flex flex-row flex-wrap gap-2">
        {units !== 'none' && (
          <div className="flex flex-col">
            <NumberInput
              disabled={readOnly}
              error={errors?.duration}
              label={getLabel('duration')}
              onPlusMinus={[
                () =>
                  setValue(
                    getLabel('duration'),
                    (Number(duration) + 1).toString()
                  ),
                () =>
                  setValue(
                    getLabel('duration'),
                    (Number(duration) - 1).toString()
                  ),
              ]}
              register={register}
              small
              step={0.001}
              validation={[validateRequired, validatePositive]}
            />
            <InputErrorMessage error={errors?.duration} />
          </div>
        )}
        <SelectInput
          defaultValue="days"
          disabled={readOnly}
          error={errors?.units}
          label={getLabel('units')}
          register={register}
        >
          <option>minutes</option>
          <option>hours</option>
          <option>days</option>
          <option>weeks</option>
          <option>none</option>
        </SelectInput>
      </div>
    </div>
  )
}

export const durationToSeconds = (
  duration: number,
  units: 'none' | 'weeks' | 'days' | 'hours' | 'minutes'
) => {
  switch (units) {
    case 'minutes':
      return duration * 60
    case 'hours':
      return durationToSeconds(duration * 60, 'minutes')
    case 'days':
      return durationToSeconds(duration * 24, 'hours')
    case 'weeks':
      return durationToSeconds(duration * 7, 'days')
    case 'none':
      return undefined
  }
}

export const transformStakingUpdateToCosmos = (self: StakingUpdateData) => {
  const time = durationToSeconds(self.duration, self.units)

  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: self.stakingContract,
        funds: [],
        msg: {
          update_config: {
            owner: self.owner || null,
            manager: self.manager || null,
            ...(time !== undefined && { duration: { time } }),
          },
        },
      },
    },
  })
}

export const transformCosmosToStakingUpdate = (msg: Record<string, any>) =>
  'wasm' in msg &&
  'execute' in msg.wasm &&
  'update_config' in msg.wasm.execute.msg &&
  'owner' in msg.wasm.execute.msg.update_config
    ? {
        stakingContract: msg.wasm.execute.contract_addr,
        ...msg.wasm.execute.msg.update_config,
        duration: msg.wasm.execute.msg.update_config.duration?.time / 60,
        units: msg.wasm.execute.msg.update_config.duration?.time
          ? 'minutes'
          : 'none',
      }
    : null
