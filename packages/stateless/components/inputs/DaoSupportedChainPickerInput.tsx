import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ChainPickerPopupProps } from '@dao-dao/types'

import { useChainContext, useDaoInfoContextIfAvailable } from '../../hooks'
import { ChainPickerPopup } from '../popup'
import { InputLabel } from './InputLabel'

export type DaoSupportedChainPickerInputProps = {
  /**
   * The name of the chain ID form field.
   */
  fieldName: string
  /**
   * Handler for when the selected chain changes.
   */
  onChange?: (chainId: string) => void | Promise<void>
  /**
   * If defined, only include these chains.
   */
  includeChainIds?: string[] | readonly string[]
  /**
   * If defined, exclude these chains.
   */
  excludeChainIds?: string[]
  /**
   * Whether to include only the chains the DAO has an account on (its native
   * chain or one of its polytone chains).
   * Defaults to false.
   */
  onlyDaoChainIds?: boolean
  /**
   * Whether to hide the form label.
   */
  hideFormLabel?: boolean
  /**
   * Class name applied to container.
   */
  className?: string
} & Omit<ChainPickerPopupProps, 'chains' | 'selectedChainId' | 'onSelect'>

/**
 * A form picker that is intended to be used in DAO actions to choose a
 * supported chain to execute a message from. This should include the DAO native
 * chain and current or potential cross-chain (polytone) accounts.
 */
export const DaoSupportedChainPickerInput = ({
  fieldName,
  onChange,
  includeChainIds: _includeChainIds,
  excludeChainIds,
  onlyDaoChainIds = false,
  hideFormLabel = false,
  className,
  labelMode = 'chain',
  ...pickerProps
}: DaoSupportedChainPickerInputProps) => {
  const { t } = useTranslation()
  const {
    chain: { chain_id: chainId },
    config,
  } = useChainContext()
  const { watch, setValue } = useFormContext()
  const daoInfo = useDaoInfoContextIfAvailable()

  const includeChainIds =
    onlyDaoChainIds && daoInfo
      ? [daoInfo.chainId, ...Object.keys(daoInfo.polytoneProxies)]
      : _includeChainIds

  // Only works on supported chains, so don't render if no supported chain
  // config.
  if (!config) {
    return null
  }

  const chainIds = [
    chainId,
    // Other chains with Polytone connections to this one.
    ...Object.keys(config.polytone || {}),
  ].filter(
    (chainId) =>
      !excludeChainIds?.includes(chainId) &&
      (!includeChainIds || includeChainIds.includes(chainId))
  )

  // Don't show if no chains to show or only showing the current chain.
  if (
    chainIds.length === 0 ||
    (chainIds.length === 1 && chainIds[0] === chainId)
  ) {
    return null
  }

  const selectedChainId = watch(fieldName)

  return (
    <div className={clsx('flex flex-col items-start gap-1', className)}>
      {!hideFormLabel && (
        <InputLabel
          name={labelMode === 'chain' ? t('title.chain') : t('title.token')}
        />
      )}

      <ChainPickerPopup
        {...pickerProps}
        chains={{
          type: 'custom',
          chainIds,
        }}
        labelMode={labelMode}
        onSelect={(chainId) => {
          // Type-check. None option is disabled so should not be possible.
          if (!chainId) {
            return
          }

          setValue(fieldName, chainId)
          onChange?.(chainId)
        }}
        selectedChainId={selectedChainId}
      />
    </div>
  )
}
