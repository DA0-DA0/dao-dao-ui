import { ibc } from 'chain-registry'
import { useMemo } from 'react'
import { useDeepCompareMemoize } from 'use-deep-compare-effect'

import {
  getChainForChainId,
  getChainForChainName,
  maybeGetChainForChainName,
} from '@dao-dao/utils'

import { ChainPickerPopup, ChainPickerPopupProps } from './popup'

export type IbcDestinationChainPickerProps = {
  /**
   * The source chain.
   */
  sourceChainId: string
  /**
   * Whether or not to include the source chain in the list.
   */
  includeSourceChain: boolean
  /**
   * Optional chain IDs to exclude.
   */
  excludeChainIds?: string[]
} & Omit<ChainPickerPopupProps, 'chains' | 'labelMode'>

// This component shows a picker for all destination chains that a source chain
// has an established IBC transfer channel with.
//
// Example usecases:
// - Spend action when choosing a destination chain for a transfer.
// - Create interchain account action.
export const IbcDestinationChainPicker = ({
  sourceChainId,
  includeSourceChain,
  excludeChainIds,
  ...pickerProps
}: IbcDestinationChainPickerProps) => {
  const chainIds = useMemo(() => {
    const sourceChain = getChainForChainId(sourceChainId)

    return [
      // Source chain.
      ...(includeSourceChain ? [sourceChain.chain_id] : []),
      // IBC destination chains.
      ...ibc
        .filter(
          ({ chain_1, chain_2, channels }) =>
            // Either chain is the source chain.
            (chain_1.chain_name === sourceChain.chain_name ||
              chain_2.chain_name === sourceChain.chain_name) &&
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
            chain_1.chain_name === sourceChain.chain_name ? chain_2 : chain_1
          return getChainForChainName(otherChain.chain_name).chain_id
        })
        // Remove nonexistent osmosis testnet chain.
        .filter((chainId) => chainId !== 'osmo-test-4'),
    ].filter((chainId) => !excludeChainIds?.includes(chainId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, useDeepCompareMemoize([excludeChainIds, includeSourceChain, sourceChainId]))

  return (
    <ChainPickerPopup
      chains={{
        type: 'custom',
        chainIds,
      }}
      labelMode="chain"
      {...pickerProps}
    />
  )
}
