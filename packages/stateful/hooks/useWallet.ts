import { Chain } from '@chain-registry/types'
import { toHex } from '@cosmjs/encoding'
import { ChainContext, WalletAccount } from '@cosmos-kit/core'
import { useChain } from '@cosmos-kit/react-lite'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'

import {
  walletChainIdAtom,
  walletHexPublicKeySelector,
} from '@dao-dao/state/recoil'
import {
  useCachedLoading,
  useChainContextIfAvailable,
} from '@dao-dao/stateless'
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
  const { chain: currentChain } = useChainContextIfAvailable() ?? {}

  // If chainId passed, use that. Otherwise, use current chain context. If not
  // in a chain context, fallback to global wallet chain setting.
  const chain = chainId
    ? getChainForChainId(chainId)
    : currentChain || getChainForChainId(walletChainId)

  const _walletChain = useChain(chain.chain_name)

  // Memoize wallet chain since it changes every render. The hook above forces
  // re-render when address changes, so this is safe.
  const walletChainRef = useRef(_walletChain)
  walletChainRef.current = _walletChain

  const [account, setAccount] = useState<WalletAccount>()
  const [hexPublicKeyData, setHexPublicKeyData] = useState<string>()

  const hexPublicKeyFromChain = useCachedLoading(
    _walletChain.address && loadAccount
      ? walletHexPublicKeySelector({
          walletAddress: _walletChain.address,
          chainId: _walletChain.chain.chain_id,
        })
      : undefined,
    undefined
  )

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
        try {
          const account = await walletChainRef.current.getAccount()
          setAccount(account)
          setHexPublicKeyData(account && toHex(account.pubkey))
        } catch (err) {
          console.error('Wallet account loading error', err)
        }
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
      chain,
      account,
      hexPublicKey: hexPublicKeyData
        ? { loading: false, data: hexPublicKeyData }
        : !hexPublicKeyFromChain.loading && hexPublicKeyFromChain.data
        ? { loading: false, data: hexPublicKeyFromChain.data }
        : { loading: true },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      account,
      chain,
      hexPublicKeyData,
      walletChainRef.current?.address,
      walletChainRef.current?.chain.chain_id,
      walletChainRef.current?.status,
      hexPublicKeyFromChain,
    ]
  )

  return response
}
