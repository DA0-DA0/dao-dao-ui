import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { signingCosmWasmClientAtom } from '@dao-dao/state/recoil'

import { useWallet } from './useWallet'

// Save wallet signer in recoil atom so it can be used by contract selectors.
export const useSyncWalletSigner = () => {
  const {
    chain: { chain_id: chainId },
    getSigningCosmWasmClient,
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
      const signingCosmWasmClient = await getSigningCosmWasmClient()
      setSigningCosmWasmClient(
        // cosmos-kit has an older version of the package. This is a workaround.
        signingCosmWasmClient as unknown as SigningCosmWasmClient
      )
    })()
  }, [
    setSigningCosmWasmClient,
    address,
    isWalletConnected,
    getSigningCosmWasmClient,
  ])
}
