import { useWallet } from '@cosmos-kit/react-lite'
import { useRecoilState } from 'recoil'

import { walletChainIdAtom } from '@dao-dao/state/recoil'
import { ChainPickerPopup } from '@dao-dao/stateless'
import { WalletChainSwitcherProps } from '@dao-dao/types'

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
          ?.connect(false)
          .catch(console.error)
      }}
      selectedChainId={chainId}
    />
  )
}
