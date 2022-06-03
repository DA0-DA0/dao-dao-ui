import { XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

import { AddressInput, InputErrorMessage, InputLabel } from '@dao-dao/ui'
import {
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils/validation'

import {
  TemplateComponent,
  TokenInfoDisplay,
  TokenInfoDisplayProps,
} from './common'

export const AddTokenComponent: TemplateComponent<TokenInfoDisplayProps> = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  options,
}) => {
  const { register } = useFormContext()

  return (
    <div className="flex flex-col p-3 my-2 gap-2 rounded-lg bg-primary">
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-2 items-center">
          <h2 className="text-3xl">🔘</h2>
          <h2>Add Treasury Token</h2>
        </div>
        {onRemove && (
          <button onClick={onRemove} type="button">
            <XIcon className="h-4" />
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <InputLabel name="Token address" />
        <AddressInput
          disabled={readOnly}
          error={errors?.address}
          label={getLabel('address')}
          register={register}
          validation={[validateRequired, validateContractAddress]}
        />
        <InputErrorMessage error={errors?.address} />
      </div>

      <TokenInfoDisplay {...options} />
    </div>
  )
}
