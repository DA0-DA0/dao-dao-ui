import { XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { Button } from '@dao-dao/ui'
import { AddressInput, InputErrorMessage, InputLabel } from '@dao-dao/ui'
import { validateContractAddress, validateRequired } from '@dao-dao/utils'

import {
  TemplateComponent,
  TokenInfoDisplay,
  TokenInfoDisplayProps,
} from './common'

interface Token {
  address: string
  info: TokenInfoResponse
}

interface AddressSelectorProps {
  onSelect: (address: string) => void
  selectedAddress: string
  tokenOptions: Token[]
  readOnly?: boolean
}

const AddressSelector = ({
  onSelect,
  selectedAddress,
  tokenOptions,
  readOnly,
}: AddressSelectorProps) => (
  <div className="grid grid-cols-5 gap-1">
    {tokenOptions.map(({ address, info }) => (
      <Button
        key={address}
        className={`${
          address === selectedAddress ? '' : 'bg-transparent text-secondary'
        }`}
        disabled={readOnly}
        onClick={() => onSelect(address)}
        size="sm"
        type="button"
        variant="secondary"
      >
        ${info.symbol}
      </Button>
    ))}
  </div>
)

type RemoveTokenOptions = TokenInfoDisplayProps & {
  existingTokens: Token[]
}

export const RemoveTokenComponent: TemplateComponent<RemoveTokenOptions> = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  options: { existingTokens, ...options },
}) => {
  const { register, watch, setValue } = useFormContext()

  const tokenAddress = watch(getLabel('address'))

  const validateIsTreasuryToken = (v: string) =>
    existingTokens.some(({ address }) => address === v) ||
    'This token is not in the DAO treasury.'

  return (
    <div className="flex flex-col p-3 my-2 gap-2 rounded-lg bg-primary">
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-2 items-center">
          <h2 className="text-3xl">⭕️</h2>
          <h2>Remove Treasury Token</h2>
        </div>
        {onRemove && (
          <button onClick={onRemove} type="button">
            <XIcon className="h-4" />
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1 my-3">
        <AddressSelector
          onSelect={(address) => setValue(getLabel('address'), address)}
          readOnly={readOnly}
          selectedAddress={tokenAddress}
          tokenOptions={existingTokens}
        />
      </div>
      <div className="flex flex-col gap-2 mb-3">
        <InputLabel name="Token address" />
        <AddressInput
          disabled={readOnly}
          error={errors?.address}
          label={getLabel('address')}
          register={register}
          validation={[
            validateRequired,
            validateContractAddress,
            validateIsTreasuryToken,
          ]}
        />
        <InputErrorMessage error={errors?.address} />
      </div>

      <TokenInfoDisplay {...options} />
    </div>
  )
}
