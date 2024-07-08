import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { signingCosmWasmClientAtom } from '@dao-dao/state/recoil'

import { useWallet } from './useWallet'

// Save wallet signer in recoil atom so it can be used by contract selectors.
export const useSyncWalletSigner = () => {
  const {
    chain: { chain_id: chainId },
    getSigningClient,
    address,
    isWalletConnected,
  } = useWallet()

  const setSigningCosmWasmClient = useSetRecoilState(
    signingCosmWasmClientAtom({ chainId })
  )

  // Save signing client in recoil atom so it can be used by contract selectors.
  useEffect(() => {
    if (!isWalletConnected) {
      setSigningCosmWasmClient(undefined)
      return
    }

    ;(async () => {
      try {
        const signingCosmWasmClient = await getSigningClient()
        setSigningCosmWasmClient(signingCosmWasmClient)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [getSigningClient, address, isWalletConnected, setSigningCosmWasmClient])
}
