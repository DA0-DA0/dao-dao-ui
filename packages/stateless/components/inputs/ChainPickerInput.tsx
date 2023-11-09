import { useFormContext } from 'react-hook-form'

import {
  getDisplayNameForChainId,
  getNativeTokenForChainId,
} from '@dao-dao/utils'

import {
  useDaoInfoContextIfAvailable,
  useSupportedChainContext,
} from '../../hooks'
import { RadioInput } from './RadioInput'

export type ChainPickerInputProps = {
  fieldName: string
  // Whether to use the chain name or the native token symbol as the label.
  // Defaults to 'chain'.
  labelMode?: 'chain' | 'token'
  disabled?: boolean
  onChange?: (chainId: string) => void
  excludeChainIds?: string[]
  // Whether to include only the chains the DAO has an account on (its native
  // chain or one of its polytone chains).
  // Defaults to false.
  onlyDaoChainIds?: boolean
  className?: string
}

export const ChainPickerInput = ({
  fieldName,
  labelMode = 'chain',
  disabled,
  onChange,
  excludeChainIds,
  onlyDaoChainIds = false,
  className,
}: ChainPickerInputProps) => {
  const {
    chain: { chain_id: chainId },
    config: { polytone },
  } = useSupportedChainContext()
  const { watch, setValue } = useFormContext()
  const daoInfo = useDaoInfoContextIfAvailable()

  const includeChainIds =
    onlyDaoChainIds && daoInfo
      ? [daoInfo.chainId, ...Object.keys(daoInfo.polytoneProxies)]
      : undefined

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
          .filter(
            (chainId) =>
              (!includeChainIds || includeChainIds.includes(chainId)) &&
              !excludeChainIds?.includes(chainId)
          )
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
