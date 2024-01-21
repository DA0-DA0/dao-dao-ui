import { ArrowDropDown } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import {
  getConfiguredChains,
  getDisplayNameForChainId,
  getFallbackImage,
  getImageUrlForChainId,
  getNativeTokenForChainId,
  getSupportedChains,
  toAccessibleImageUrl,
} from '@dao-dao/utils'

import { FilterableItem, FilterableItemPopup } from '.'

export type ChainPickerPopupProps = {
  /**
   * The chains to include in the picker.
   */
  chains:
    | {
        /**
         * Supported chains have native DAO DAO deployments.
         */
        type: 'supported'
        /**
         * Chain IDs to exclude.
         */
        excludeChainIds?: string[]
      }
    | {
        /**
         * Configured chains include supported chains and others which show up
         * in the UI in various places, such as the governance UI.
         */
        type: 'configured'
        /**
         * Chain IDs to exclude.
         */
        excludeChainIds?: string[]
        /**
         * Only include chains with a governance module. This uses the `noGov`
         * flag in chain config.
         */
        onlyGov?: boolean
      }
    | {
        /**
         * Set any chains explicitly
         */
        type: 'custom'
        chainIds: string[]
      }
  /**
   * The selected chain ID. If undefined, will select the none option if exists.
   */
  selectedChainId?: string
  /**
   * Handler for when a chain is selected. If the none option is selected, the
   * handler will be called with `undefined`.
   */
  onSelect: (chainId?: string) => void | Promise<void>
  /**
   * Whether to use the chain name or the native token symbol as the label.
   * Defaults to 'chain'.
   */
  labelMode?: 'chain' | 'token'
  /**
   * Whether or not to show a loading indicator.
   */
  loading?: boolean
  /**
   * Whether or not chain selection is disabled.
   */
  disabled?: boolean
  /**
   * Optional class name applied to the button.
   */
  buttonClassName?: string
  /**
   * If true, a button will be shown at the top that represents none.
   */
  showNone?: boolean
  /**
   * If defined, this will be the label of the none button.
   */
  noneLabel?: string
  /**
   * If defined, this will be the icon of the none button.
   */
  noneIcon?: ComponentType<{ className?: string }>
}

/**
 * A form picker that is intended to be used in DAO actions to choose a
 * supported chain to execute a message from. This should include the DAO native
 * chain and current or potential cross-chain (polytone) accounts.
 */
export const ChainPickerPopup = ({
  chains,
  selectedChainId,
  onSelect,
  labelMode = 'chain',
  loading,
  disabled,
  buttonClassName,
  showNone,
  noneLabel,
  noneIcon,
}: ChainPickerPopupProps) => {
  const { t } = useTranslation()

  const chainIds =
    chains.type === 'supported'
      ? getSupportedChains()
          .filter(({ chainId }) => !chains.excludeChainIds?.includes(chainId))
          .map(({ chain: { chain_id } }) => chain_id)
      : chains.type === 'configured'
      ? getConfiguredChains()
          .filter(
            ({ chainId, noGov }) =>
              !chains.excludeChainIds?.includes(chainId) &&
              (!chains.onlyGov || !noGov)
          )
          .map(({ chain: { chain_id } }) => chain_id)
      : chains.chainIds

  const chainOptions = chainIds.map(
    (chainId): FilterableItem => ({
      key: chainId,
      label:
        labelMode === 'chain'
          ? getDisplayNameForChainId(chainId)
          : getNativeTokenForChainId(chainId).symbol,
      iconUrl: toAccessibleImageUrl(
        (labelMode === 'chain'
          ? getImageUrlForChainId(chainId)
          : getNativeTokenForChainId(chainId).imageUrl) ||
          getFallbackImage(chainId)
      ),
      ...commonOptionClassFields,
    })
  )

  // Add none option to the top.
  if (showNone) {
    chainOptions.splice(0, 0, {
      key: NONE_KEY,
      label: noneLabel || t('info.none'),
      Icon: noneIcon,
      ...commonOptionClassFields,
    })
  }

  const selectedChain = selectedChainId
    ? chainOptions.find(({ key }) => key === selectedChainId)
    : undefined

  if (selectedChain) {
    selectedChain.selected = true
  }

  return (
    <FilterableItemPopup
      filterableItemKeys={FILTERABLE_KEYS}
      items={chainOptions}
      onSelect={({ key }) =>
        onSelect(key === NONE_KEY ? undefined : (key as string))
      }
      searchPlaceholder={
        labelMode === 'chain'
          ? t('info.searchForChain')
          : t('info.searchForToken')
      }
      trigger={{
        type: 'button',
        props: {
          className: buttonClassName,
          contentContainerClassName: 'justify-between text-icon-primary !gap-4',
          loading,
          disabled,
          size: 'lg',
          variant: 'ghost_outline',
          children: (
            <>
              <div className="flex flex-row items-center gap-2">
                {!!selectedChain?.iconUrl && (
                  <div
                    className="h-6 w-6 shrink-0 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${selectedChain.iconUrl})`,
                    }}
                  />
                )}

                <p className={clsx(!selectedChain && 'text-text-tertiary')}>
                  {selectedChain?.label ||
                    (labelMode === 'chain'
                      ? t('button.selectChain')
                      : t('button.selectToken'))}
                </p>
              </div>

              {!disabled && <ArrowDropDown className="!h-6 !w-6" />}
            </>
          ),
        },
      }}
    />
  )
}

const NONE_KEY = '_none_'
const FILTERABLE_KEYS = ['key', 'label']

const commonOptionClassFields = {
  iconClassName: '!h-8 !w-8',
  className: '!py-2',
  contentContainerClassName: '!gap-3',
}
