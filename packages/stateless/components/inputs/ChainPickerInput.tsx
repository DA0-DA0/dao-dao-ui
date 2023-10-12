import { useFormContext } from 'react-hook-form'

import {
  getDisplayNameForChainId,
  getNativeTokenForChainId,
} from '@dao-dao/utils'

import { useSupportedChainContext } from '../../hooks'
import { RadioInput } from './RadioInput'

export type ChainPickerInputProps = {
  fieldName: string
  // Whether to use the chain name or the native token symbol as the label.
  // Defaults to 'chain'.
  labelMode?: 'chain' | 'token'
  disabled?: boolean
  onChange?: (chainId: string) => void
  excludeChainIds?: string[]
  className?: string
}

export const ChainPickerInput = ({
  fieldName,
  labelMode = 'chain',
  disabled,
  onChange,
  excludeChainIds,
  className,
}: ChainPickerInputProps) => {
  const {
    chain: { chain_id: chainId },
    config: { polytone },
  } = useSupportedChainContext()
  const { watch, setValue } = useFormContext()

  const polytoneChains = Object.keys(polytone || {})

  if (polytoneChains.length === 0) {
    return null
  }

  return (
    <div className={className}>
      <RadioInput
        disabled={disabled}
        fieldName={fieldName}
        onChange={onChange}
        options={[
          chainId,
          // Other chains with Polytone.
          ...polytoneChains,
        ]
          .filter((chainId) => !excludeChainIds?.includes(chainId))
          .map((chainId) => ({
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
