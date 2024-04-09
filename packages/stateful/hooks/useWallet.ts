import { Chain } from '@chain-registry/types'
import { toHex } from '@cosmjs/encoding'
import { ChainContext, WalletAccount } from '@cosmos-kit/core'
import { useChain, useManager } from '@cosmos-kit/react-lite'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { chainQueries } from '@dao-dao/state/query'
import {
  walletChainIdAtom,
  walletHexPublicKeySelector,
} from '@dao-dao/state/recoil'
import {
  useCachedLoading,
  useChainContextIfAvailable,
  useUpdatingRef,
} from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'
import { getSupportedChains, maybeGetChainForChainId } from '@dao-dao/utils'

export type UseWalletOptions = {
  /**
   * If undefined, defaults to current chain context. If not in a chain context,
   * falls back to first supported chain.
   */
  chainId?: string
  /**
   * If true, will return `account` and `hexPublicKey` in response.
   */
  loadAccount?: boolean
  /**
   * If true, attempt connection if wallet is connected to a different chain but
   * not the current one.
   */
  attemptConnection?: boolean
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
  attemptConnection = false,
}: UseWalletOptions = {}): UseWalletReturn => {
  const walletChainId = useRecoilValue(walletChainIdAtom)
  const { chain: currentChain } = useChainContextIfAvailable() ?? {}
  const { getWalletRepo } = useManager()

  // If chainId passed, use that. Otherwise, use current chain context. If not
  // in a chain context, fallback to global wallet chain setting. If chain
  // invalid, fallback to first supported.
  const chain =
    (chainId
      ? maybeGetChainForChainId(chainId)
      : currentChain || maybeGetChainForChainId(walletChainId)) ||
    getSupportedChains()[0].chain

  const _walletChain = useChain(chain.chain_name, false)
  // Memoize wallet chain since it changes every render. The hook above forces
  // re-render when address changes, so this is safe.
  const walletChainRef = useUpdatingRef(_walletChain)

  // Chain of main wallet connection.
  const mainWalletChainId = useRecoilValue(walletChainIdAtom)
  // Get main wallet connection.
  const mainWallet = getWalletRepo(
    maybeGetChainForChainId(mainWalletChainId)?.chain_name || chain.chain_name
  )?.current
  const mainWalletConnected = !!mainWallet?.isWalletConnected
  // Memoize wallet chain since it changes every render. The hook above forces
  // re-render when address changes, so this is safe.
  const mainWalletRef = useUpdatingRef(mainWallet)

  // Only attempt connection once per enable.
  const attemptedConnection = useRef(false)
  // Reset so that we re-attempt connection if this becomes enabled again.
  useEffect(() => {
    if (!attemptConnection) {
      attemptedConnection.current = false
    }
  }, [attemptConnection])

  const connect = useCallback(() => {
    if (mainWalletConnected && mainWalletRef.current) {
      return walletChainRef.current.walletRepo
        .connect(mainWalletRef.current.walletName, false)
        .catch(console.error)
    } else {
      return walletChainRef.current.connect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mainWalletConnected,
    chain.chain_name,
    walletChainRef.current.wallet?.name,
    walletChainRef.current.status,
  ])

  // Attempt auto-connection if main wallet is connected, we are not, and we
  // haven't attempted it before.
  useEffect(() => {
    if (
      attemptConnection &&
      !attemptedConnection.current &&
      !_walletChain.isWalletConnected &&
      mainWalletConnected &&
      mainWalletRef.current
    ) {
      attemptedConnection.current = true
      connect()
    }
  }, [
    mainWalletConnected,
    attemptConnection,
    connect,
    _walletChain.isWalletConnected,
    mainWalletRef,
  ])

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

  // Load account and public key data when wallet is connected or it changes.
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
    walletChainRef,
    walletChainRef.current.address,
    walletChainRef.current.chain.chain_id,
    walletChainRef.current.status,
  ])

  // Pre-fetch dynamic gas price for this chain when the wallet is used.
  const queryClient = useQueryClient()
  useEffect(() => {
    queryClient.prefetchQuery({
      ...chainQueries.dynamicGasPrice({ chainId: chain.chain_id }),
      // Make stale in less than a minute so it refreshes in the
      // `useAutoRefreshData` hook that runs every minute.
      staleTime: 50 * 1000,
    })
  }, [queryClient, chain.chain_id])

  const response = useMemo(
    (): UseWalletReturn => ({
      ...walletChainRef.current,
      chainWallet:
        walletChainRef.current.chainWallet ||
        // Fallback to getting chain wallet from repo if not set on walletChain.
        // This won't be set if the walletChain is disconnected.
        (mainWalletRef.current
          ? getWalletRepo(chain.chain_name).getWallet(
              mainWalletRef.current.walletName
            )
          : undefined),
      connect,
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
      connect,
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
