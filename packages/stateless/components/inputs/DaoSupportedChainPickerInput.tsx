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

export type DaoSupportedChainPickerInputProps = {
  fieldName: string
  // Whether to use the chain name or the native token symbol as the label.
  // Defaults to 'chain'.
  labelMode?: 'chain' | 'token'
  disabled?: boolean
  onChange?: (chainId: string) => void
  // If defined, only include these chains.
  includeChainIds?: string[] | readonly string[]
  // If defined, exclude these chains.
  excludeChainIds?: string[]
  // Whether to include only the chains the DAO has an account on (its native
  // chain or one of its polytone chains).
  // Defaults to false.
  onlyDaoChainIds?: boolean
  className?: string
}

/**
 * A form picker that is intended to be used in DAO actions to choose a
 * supported chain to execute a message from. This should include the DAO native
 * chain and current or potential cross-chain (polytone) accounts.
 */
export const DaoSupportedChainPickerInput = ({
  fieldName,
  labelMode = 'chain',
  disabled,
  onChange,
  includeChainIds: _includeChainIds,
  excludeChainIds,
  onlyDaoChainIds = false,
  className,
}: DaoSupportedChainPickerInputProps) => {
  const {
    chain: { chain_id: chainId },
    config: { polytone },
  } = useSupportedChainContext()
  const { watch, setValue } = useFormContext()
  const daoInfo = useDaoInfoContextIfAvailable()

  const includeChainIds = [
    ...(onlyDaoChainIds && daoInfo
      ? [daoInfo.chainId, ...Object.keys(daoInfo.polytoneProxies)]
      : []),
    ...(_includeChainIds ?? []),
  ]

  const polytoneChains = Object.keys(polytone || {})

  if (polytoneChains.length === 0) {
    return null
  }

  const chainIds = [
    chainId,
    // Other chains with Polytone.
    ...polytoneChains,
  ]
    .filter(
      (chainId) =>
        !excludeChainIds?.includes(chainId) &&
        (!includeChainIds || includeChainIds.includes(chainId))
    )
    .map((chainId) => ({
      label:
        labelMode === 'chain'
          ? getDisplayNameForChainId(chainId)
          : getNativeTokenForChainId(chainId).symbol,
      value: chainId,
    }))

  return (
    <div className={className}>
      <RadioInput
        disabled={disabled}
        fieldName={fieldName}
        onChange={onChange}
        options={chainIds}
        setValue={setValue}
        watch={watch}
      />
    </div>
  )
}
