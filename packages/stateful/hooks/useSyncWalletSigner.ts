import { useWallet } from '@noahsaso/cosmodal'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  signingCosmWasmClientAtom,
  walletChainIdAtom,
} from '@dao-dao/state/recoil'
import { useChainContextIfAvailable } from '@dao-dao/stateless'

// Save wallet signer in recoil atom so it can be used by contract selectors.
export const useSyncWalletSigner = () => {
  const { chain } = useChainContextIfAvailable() ?? {}
  const defaultChainId = useRecoilValue(walletChainIdAtom)
  const chainId = chain?.chain_id || defaultChainId

  const setSigningCosmWasmClient = useSetRecoilState(
    signingCosmWasmClientAtom({ chainId })
  )

  const { signingCosmWasmClient, address } = useWallet(chainId)

  // Save signing client in recoil atom so it can be used by contract selectors.
  useEffect(() => {
    setSigningCosmWasmClient(signingCosmWasmClient)
  }, [setSigningCosmWasmClient, signingCosmWasmClient, address])
}
