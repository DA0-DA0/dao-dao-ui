import { XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

import { AddressInput, InputErrorMessage, NumberInput } from '@dao-dao/ui'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { TemplateComponent } from './common'

export interface MintOptions {
  govTokenSymbol: string
}

export const MintComponent: TemplateComponent<MintOptions> = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  options: { govTokenSymbol },
}) => {
  const { register, watch, setValue } = useFormContext()
  const amount = watch(getLabel('amount'))

  return (
    <div className="flex justify-between items-center p-3 my-2 rounded-lg bg-primary">
      <div className="flex flex-wrap gap-4 gap-y-2 items-center">
        <div className="flex flex-wrap gap-2 items-center w-24">
          <h2 className="text-3xl">🌿</h2>
          <h2>Mint</h2>
        </div>
        <div className="flex flex-col">
          <NumberInput
            disabled={readOnly}
            error={errors?.amount}
            label={getLabel('amount')}
            onPlusMinus={[
              () =>
                setValue(getLabel('amount'), (Number(amount) + 1).toString()),
              () =>
                setValue(getLabel('amount'), (Number(amount) - 1).toString()),
            ]}
            register={register}
            sizing="md"
            validation={[validateRequired, validatePositive]}
          />
          <InputErrorMessage error={errors?.amount} />
        </div>
        {govTokenSymbol && (
          <p className="font-mono text-sm uppercase text-secondary">
            ${govTokenSymbol}
          </p>
        )}
        <div className="flex gap-2 items-center">
          <p className="font-mono secondary-text">{'->'}</p>
          <div className="flex flex-col">
            <AddressInput
              disabled={readOnly}
              error={errors?.to}
              label={getLabel('to')}
              register={register}
              validation={[validateRequired, validateAddress]}
            />
            <InputErrorMessage error={errors?.to} />
          </div>
        </div>
      </div>
      {onRemove && (
        <button onClick={onRemove} type="button">
          <XIcon className="h-4" />
        </button>
      )}
    </div>
  )
}
