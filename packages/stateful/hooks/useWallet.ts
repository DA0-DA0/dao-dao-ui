import { Chain } from '@chain-registry/types'
import { toHex } from '@cosmjs/encoding'
import { ChainContext, WalletAccount } from '@cosmos-kit/core'
import { useChain as useWalletChain } from '@cosmos-kit/react-lite'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { walletChainIdAtom } from '@dao-dao/state/recoil'
import { useChainContextIfAvailable } from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'
import { getChainForChainId } from '@dao-dao/utils'

export type UseWalletOptions = {
  chainId?: string
  // If true, will return `account` and `hexPublicKey` in response.
  loadAccount?: boolean
}

export type UseWalletReturn = Omit<ChainContext, 'chain'> & {
  // Use chain from our version of the chain-registry.
  chain: Chain
  account: WalletAccount | undefined
  hexPublicKey: LoadingData<string>
}

export const useWallet = ({
  chainId,
  loadAccount = false,
}: UseWalletOptions = {}): UseWalletReturn => {
  const walletChainId = useRecoilValue(walletChainIdAtom)
  const { chain } = useChainContextIfAvailable() ?? {}

  // If chainId passed, use that. Otherwise, use current chain context. If not
  // in a chain context, fallback to global wallet chain setting.
  const _walletChain = useWalletChain(
    chainId
      ? getChainForChainId(chainId).chain_name
      : chain
      ? chain.chain_name
      : getChainForChainId(walletChainId).chain_name
  )
  // Memoize wallet chain since it changes every render. The hook above forces
  // re-render when address changes, so this is safe.
  const walletChainRef = useRef(_walletChain)
  walletChainRef.current = _walletChain

  const [account, setAccount] = useState<WalletAccount>()
  const [hexPublicKeyData, setHexPublicKeyData] = useState<string>()

  useEffect(() => {
    if (!loadAccount) {
      return
    }

    if (!walletChainRef.current.isWalletConnected) {
      setAccount(undefined)
      setHexPublicKeyData(undefined)
      return
    }

    // If connected and account not loaded, set state.
    if (account?.address !== walletChainRef.current.address) {
      ;(async () => {
        const account = await walletChainRef.current.getAccount()
        setAccount(account)
        setHexPublicKeyData(toHex(account.pubkey))
      })()
    }
  }, [
    account?.address,
    loadAccount,
    walletChainRef.current.address,
    walletChainRef.current.chain.chain_id,
    walletChainRef.current.status,
  ])

  const response = useMemo(
    (): UseWalletReturn => ({
      ...walletChainRef.current,
      // Use chain from our version of the chain-registry.
      chain: getChainForChainId(walletChainRef.current.chain.chain_id),
      account,
      hexPublicKey: !hexPublicKeyData
        ? { loading: true }
        : { loading: false, data: hexPublicKeyData },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      account,
      hexPublicKeyData,
      walletChainRef.current.address,
      walletChainRef.current.chain.chain_id,
      walletChainRef.current.status,
    ]
  )

  return response
}
