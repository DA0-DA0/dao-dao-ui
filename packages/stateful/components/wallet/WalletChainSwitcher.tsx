import { useWallet } from '@cosmos-kit/react-lite'
import { useRecoilState } from 'recoil'

import { walletChainIdAtom } from '@dao-dao/state/recoil'
import { ChainPickerPopup, ChainPickerPopupProps } from '@dao-dao/stateless'

export type WalletChainSwitcherProps = {
  /**
   * The chain type to show. Supported chains have native DAO DAO deployments,
   * whereas configured chains include supported chains and others which show up
   * in the UI in various places, such as the governance UI.
   */
  type?: 'supported' | 'configured'
  /**
   * Chain IDs to exclude.
   */
  excludeChainIds?: string[]
} & Omit<
  ChainPickerPopupProps,
  | 'chains'
  | 'selectedChainId'
  | 'onSelect'
  | 'labelMode'
  | 'showNone'
  | 'noneLabel'
  | 'noneIcon'
> &
  Partial<Pick<ChainPickerPopupProps, 'onSelect'>>

/**
 * A chain switcher that shows only supported chains and controls the global
 * wallet chain ID atom state.
 */
export const WalletChainSwitcher = ({
  type = 'supported',
  excludeChainIds,
  onSelect,
  ...props
}: WalletChainSwitcherProps) => {
  const [chainId, setChainId] = useRecoilState(walletChainIdAtom)

  const wallet = useWallet()

  return (
    <ChainPickerPopup
      {...props}
      chains={{
        type,
        excludeChainIds,
      }}
      onSelect={async (chainId) => {
        // Type-check. None option is disabled so should not be possible.
        if (!chainId) {
          return
        }

        setChainId(chainId)
        onSelect?.(chainId)

        // Try to connect to chain with wallet.
        wallet.chainWallets
          .find(
            (wallet) => wallet.chainId === chainId && !wallet.isWalletConnected
          )
          ?.connect()
          .catch(console.error)
      }}
      selectedChainId={chainId}
    />
  )
}

export const WalletAllConfiguredChainSwitcher = (
  props: Omit<WalletChainSwitcherProps, 'type'>
) => <WalletChainSwitcher {...props} type="configured" />
