import { XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

import {
  InputErrorMessage,
  InputLabel,
  NumberInput,
  SelectInput,
} from '@dao-dao/ui'
import { validatePositive, validateRequired } from '@dao-dao/utils'

import { TemplateComponent, ToCosmosMsgProps } from './templateList'
import { makeWasmMessage } from '@/util/messagehelpers'

interface PauseData {
  duration: number
  units: 'minutes' | 'hours' | 'days' | 'weeks' | 'never'

  // When we transform a pause wasm message to a component we fill this field in
  // instead of the other ones. This is because pause is specified in terms of an
  // expiration not a "time from now".
  expiration?: string
}

export const pauseDefaults = () => ({
  duration: 1,
  units: 'days',
})

export const CosmosMsgPauseComponent = ({
  expiration,
}: {
  expiration: string
}) => (
  <div className="flex flex-col p-3 my-2 bg-primary rounded-lg">
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center mb-2">
        <h2 className="text-3xl">🏖</h2>
        <h2>Pause DAO</h2>
      </div>
    </div>
    {expiration === 'forever' ? (
      <>
        <p className="mb-4 primary-text">
          This will pause this DAO <span className="underline">forever</span>.
        </p>
        <p className="mb-2 max-w-prose body-text">
          This means the DAO will never again be able to create a proposal and
          all assets in the treasury after this proposal passes will be locked.
        </p>
      </>
    ) : (
      <>
        <p className="mb-4 primary-text">
          This will pause the DAO until{' '}
          <span className="underline">
            {new Date(Number(expiration) * Math.pow(10, -6)).toLocaleString()}
          </span>
          .
        </p>
        <p className="max-w-prose body-text">
          While the DAO is paused it will not be able to take any actions until
          the pause completes.
        </p>
      </>
    )}
  </div>
)

export const PauseComponent: TemplateComponent = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
}) => {
  const { watch, register, setValue } = useFormContext()

  const duration = watch(getLabel('duration'))
  const units = watch(getLabel('units'))

  const expiration = watch(getLabel('expiration'))

  if (expiration !== undefined) {
    return <CosmosMsgPauseComponent expiration={expiration} />
  }

  return (
    <div className="flex flex-col p-3 my-2 bg-primary rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center mb-2">
          <h2 className="text-3xl">🏖</h2>
          <h2>Pause DAO</h2>
        </div>
        {onRemove && (
          <button onClick={onRemove} type="button">
            <XIcon className="h-4" />
          </button>
        )}
      </div>
      <p className="mb-4 max-w-prose secondary-text">
        This will pause the DAO for the specified duration. While the DAO is
        paused it will not be able to take any actions until the pause
        completes.
      </p>
      <InputLabel className="mb-1" name="Pause duration" />
      <div className="flex flex-row flex-wrap gap-2">
        {units !== 'never' && (
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
          <option value="never">forever</option>
        </SelectInput>
      </div>
    </div>
  )
}

export const pauseDataToExpiration = (p: PauseData) => {
  switch (p.units) {
    case 'minutes':
      return {
        at_time: (
          Date.now() * Math.pow(10, 6) +
          p.duration * 6 * Math.pow(10, 10)
        ).toString(),
      }
    case 'hours':
      return pauseDataToExpiration({
        duration: p.duration * 60,
        units: 'minutes',
      })
    case 'days':
      return pauseDataToExpiration({
        duration: p.duration * 24,
        units: 'hours',
      })
    case 'weeks':
      return pauseDataToExpiration({
        duration: p.duration * 24,
        units: 'days',
      })
    case 'never':
      return {
        never: {},
      }
  }
}

export const transformPauseToCosmos = (
  self: PauseData,
  props: ToCosmosMsgProps
) =>
  makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: props.sigAddress,
        funds: [],
        msg: {
          pause_d_a_o: {
            expiration: pauseDataToExpiration(self),
          },
        },
      },
    },
  })

export const transformCosmosToPause = (msg: Record<string, any>) =>
  'wasm' in msg &&
  'execute' in msg.wasm &&
  'contract_addr' in msg.wasm.execute &&
  'pause_d_a_o' in msg.wasm.execute.msg &&
  'expiration' in msg.wasm.execute.msg.pause_d_a_o
    ? {
        // Nonsense filler data - won't get shown.
        duration: 1,
        units: 'days',

        expiration:
          msg.wasm.execute.msg.pause_d_a_o.expiration.at_time || 'forever',
      }
    : null
