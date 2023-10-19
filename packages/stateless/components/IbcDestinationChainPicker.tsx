import { ArrowDropDown } from '@mui/icons-material'
import { ibc } from 'chain-registry'
import clsx from 'clsx'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  getChainForChainId,
  getChainForChainName,
  getImageUrlForChainId,
  maybeGetChainForChainName,
  toAccessibleImageUrl,
} from '@dao-dao/utils'

import { FilterableItemPopup } from './popup/FilterableItemPopup'

export type IbcDestinationChainPickerProps = {
  // The source chain.
  sourceChainId: string
  // Whether or not to include the source chain in the list.
  includeSourceChain: boolean
  // The selected destination chain.
  selectedChainId: string
  // Chain selection handler.
  onChainSelected: (chainId: string) => void
  // Whether or not selection is disabled.
  disabled?: boolean
  // Class to apply to the selector button.
  buttonClassName?: string
}

// This component shows a picker for all destination chains that a source chain
// has an established IBC transfer channel with.
//
// Example usecases:
// - Spend action when choosing a destination chain for a transfer.
// - Create interchain account action.
export const IbcDestinationChainPicker = ({
  sourceChainId,
  includeSourceChain,
  selectedChainId,
  onChainSelected,
  disabled,
  buttonClassName,
}: IbcDestinationChainPickerProps) => {
  const { t } = useTranslation()
  const chains = useMemo(() => {
    const spendChain = getChainForChainId(sourceChainId)
    return [
      // Source chain.
      ...(includeSourceChain ? [spendChain] : []),
      // IBC destination chains.
      ...ibc
        .filter(
          ({ chain_1, chain_2, channels }) =>
            // Either chain is the source spend chain.
            (chain_1.chain_name === spendChain.chain_name ||
              chain_2.chain_name === spendChain.chain_name) &&
            // Both chains exist in the registry.
            maybeGetChainForChainName(chain_1.chain_name) &&
            maybeGetChainForChainName(chain_2.chain_name) &&
            // An ics20 transfer channel exists.
            channels.some(
              ({ chain_1, chain_2, version }) =>
                version === 'ics20-1' &&
                chain_1.port_id === 'transfer' &&
                chain_2.port_id === 'transfer'
            )
        )
        .map(({ chain_1, chain_2 }) => {
          const otherChain =
            chain_1.chain_name === spendChain.chain_name ? chain_2 : chain_1
          return getChainForChainName(otherChain.chain_name)
        })
        // Remove nonexistent osmosis testnet chain.
        .filter((chain) => chain.chain_id !== 'osmo-test-4'),
    ]
  }, [includeSourceChain, sourceChainId])

  const selectedChain = selectedChainId
    ? getChainForChainId(selectedChainId)
    : undefined

  return (
    <FilterableItemPopup
      filterableItemKeys={FILTERABLE_KEYS}
      items={chains.map((chain) => ({
        key: chain.chain_id,
        label: chain.pretty_name,
        iconUrl: getImageUrlForChainId(chain.chain_id),
        iconClassName: '!h-8 !w-8',
        contentContainerClassName: '!gap-3',
      }))}
      onSelect={({ key }) => onChainSelected(key)}
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
                {selectedChain && (
                  <div
                    className="h-6 w-6 shrink-0 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${toAccessibleImageUrl(
                        getImageUrlForChainId(selectedChain.chain_id)
                      )})`,
                    }}
                  />
                )}

                <p className={clsx(!selectedChain && 'text-text-tertiary')}>
                  {selectedChain?.pretty_name || t('button.selectChain')}
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
