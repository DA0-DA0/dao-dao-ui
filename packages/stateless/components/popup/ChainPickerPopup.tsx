import { ArrowDropDown } from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import {
  getDisplayNameForChainId,
  getFallbackImage,
  getImageUrlForChainId,
  getNativeTokenForChainId,
  toAccessibleImageUrl,
} from '@dao-dao/utils'

import { FilterableItem, FilterableItemPopup } from '.'

export type ChainPickerPopupProps = {
  /**
   * The chain IDs to include in the picker.
   */
  chainIds: string[]
  /**
   * The selected chain ID.
   */
  selectedChainId?: string
  /**
   * Handler for when a chain is selected.
   */
  onSelect: (chainId: string) => void | Promise<void>
  /**
   * Whether to use the chain name or the native token symbol as the label.
   * Defaults to 'chain'.
   */
  labelMode?: 'chain' | 'token'
  /**
   * Whether or not chain selection is disabled.
   */
  disabled?: boolean
  /**
   * Optional class name applied to the button.
   */
  buttonClassName?: string
}

/**
 * A form picker that is intended to be used in DAO actions to choose a
 * supported chain to execute a message from. This should include the DAO native
 * chain and current or potential cross-chain (polytone) accounts.
 */
export const ChainPickerPopup = ({
  chainIds,
  selectedChainId,
  onSelect,
  labelMode = 'chain',
  disabled,
  buttonClassName,
}: ChainPickerPopupProps) => {
  const { t } = useTranslation()

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
      iconClassName: '!h-8 !w-8',
      contentContainerClassName: '!gap-3',
    })
  )

  const selectedChain = selectedChainId
    ? chainOptions.find(({ key }) => key === selectedChainId)
    : undefined

  return (
    <FilterableItemPopup
      filterableItemKeys={FILTERABLE_KEYS}
      items={chainOptions}
      onSelect={({ key }) => onSelect(key as string)}
      searchPlaceholder={t('info.searchForChain')}
      trigger={{
        type: 'button',
        props: {
          className: buttonClassName,
          contentContainerClassName: 'justify-between text-icon-primary !gap-4',
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

const FILTERABLE_KEYS = ['key', 'label']
