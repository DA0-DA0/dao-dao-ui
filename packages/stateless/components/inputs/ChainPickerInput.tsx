import { useFormContext } from 'react-hook-form'

import {
  CHAIN_ID,
  POLYTONE_NOTES,
  getDisplayNameForChainId,
  getNativeTokenForChainId,
} from '@dao-dao/utils'

import { RadioInput } from './RadioInput'

export type ChainPickerInputProps = {
  fieldName: string
  // Whether to use the chain name or the native token symbol as the label.
  // Defaults to 'chain'.
  labelMode?: 'chain' | 'token'
  disabled?: boolean
  onChange?: (chainId: string) => void
  className?: string
}

export const ChainPickerInput = ({
  fieldName,
  labelMode = 'chain',
  disabled,
  onChange,
  className,
}: ChainPickerInputProps) => {
  const { watch, setValue } = useFormContext()

  return (
    <div className={className}>
      <RadioInput
        disabled={disabled}
        fieldName={fieldName}
        onChange={onChange}
        options={[
          CHAIN_ID,
          // Other chains with Polytone.
          ...Object.keys(POLYTONE_NOTES),
        ].map((chainId) => ({
          label:
            labelMode === 'chain'
              ? getDisplayNameForChainId(chainId)
              : getNativeTokenForChainId(chainId).symbol,
          value: chainId,
        }))}
        setValue={setValue}
        watch={watch}
      />
    </div>
  )
}
