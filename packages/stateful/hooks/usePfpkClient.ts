import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { profileQueries } from '@dao-dao/state'
import { useDependencyTrackedQueryClient } from '@dao-dao/stateless'
import {
  FollowingDaosKvpkClient,
  HiddenBalancesKvpkClient,
  KvpkClient,
  PfpkClient,
  PfpkClientOptions,
  TransactionSavesKvpkClient,
  getChainForChainId,
} from '@dao-dao/utils'

import { useWallet } from './useWallet'

export type UsePfpkClientOptions = {
  /**
   * Optionally provide an API URL to use as a prefix for all requests.
   */
  apiUrl?: string
  /**
   * The default signature type to use. This can be overriden per-request.
   *
   * Defaults to 'DAO DAO Auth'.
   */
  defaultSignatureType?: string
  /**
   * Optionally override the current chain context.
   */
  chainId?: string
}

/**
 * Hook that gets the options to set up a `PfpkClient` instance with the
 * currently connected wallet that makes it easy to interact with various
 * off-chain services that use the core PFPK auth system.
 */
export const usePfpkClientOptions = ({
  apiUrl,
  defaultSignatureType = 'DAO DAO Auth',
  chainId,
}: UsePfpkClientOptions = {}) => {
  const { t } = useTranslation()
  const queryClient = useDependencyTrackedQueryClient()
  const {
    chain: currentChain,
    chainWallet: currentChainWallet,
    isWalletConnected,
  } = useWallet({
    chainId,
    loadAccount: true,
  })

  const pfpkClientOptions: PfpkClientOptions = useMemo(
    () => ({
      urlPrefix: apiUrl,
      defaultChainId: currentChain.chainId,
      defaultSignatureType,
      getOfflineSignerAmino: async (chainId) => {
        const chainWallet =
          chainId === currentChain.chainId
            ? currentChainWallet
            : currentChainWallet?.mainWallet.getChainWallet(
                getChainForChainId(chainId).chainName
              )

        // If hex public key not loaded, load it from the wallet.
        if (!chainWallet) {
          throw new Error(t('error.logInToContinue'))
        }

        // Attempt to connect if needed.
        if (!chainWallet.isWalletConnected) {
          await chainWallet.connect(false)
        }

        // If still disconnected, throw.
        if (!chainWallet.isWalletConnected) {
          throw new Error(t('error.logInToContinue'))
        }

        const offlineSignerAmino =
          (await chainWallet.client.getOfflineSignerAmino?.bind(
            chainWallet.client
          )?.(chainWallet.chainId)) ||
          // Fallback to normal signer function in case amino signer getter is
          // undefined. This may still return an amino signer, so let's check.
          (await chainWallet.client.getOfflineSigner?.bind(
            chainWallet.client
          )?.(chainWallet.chainId))
        if (!offlineSignerAmino || !('signAmino' in offlineSignerAmino)) {
          throw new Error(
            t('error.unsupportedAminoWallet', {
              name: chainWallet.walletPrettyName,
            })
          )
        }

        return offlineSignerAmino
      },
      // Refresh query when profile is updated.
      onProfileUpdated: ({ address }) =>
        queryClient.refetch(
          profileQueries.pfpk({
            address,
          })
        ),
    }),
    // Reset when wallet changes since they may have switched chains/accounts.
    [
      apiUrl,
      currentChain.chainId,
      currentChainWallet,
      defaultSignatureType,
      queryClient,
      t,
    ]
  )

  return {
    isWalletConnected,
    pfpkClientOptions,
  }
}

/**
 * Hook that sets up a `PfpkClient` instance with the currently connected wallet
 * that makes it easy to interact with various off-chain services that use the
 * core PFPK auth system.
 */
export const usePfpkClient = (options?: UsePfpkClientOptions) => {
  const { isWalletConnected, pfpkClientOptions } = usePfpkClientOptions(options)

  const pfpkClient = useMemo(
    () => new PfpkClient(pfpkClientOptions),
    [pfpkClientOptions]
  )

  // Tear down the client when it changes or the component unmounts.
  useEffect(() => {
    return () => pfpkClient.teardown()
  }, [pfpkClient])

  return {
    isWalletConnected,
    pfpkClient,
  }
}

export type UseKvpkClientOptions = {
  /**
   * The default signature type to use. This can be overriden per-request.
   */
  defaultSignatureType?: string
  /**
   * Optionally override the current chain context.
   */
  chainId?: string
  /**
   * Optionally provide a prefix for all keys.
   */
  keyPrefix?: string
}

/**
 * Hook that sets up a `KvpkClient` with the currently connected wallet.
 */
export const useKvpkClient = ({
  keyPrefix,
  ...options
}: UseKvpkClientOptions = {}) => {
  const queryClient = useDependencyTrackedQueryClient()
  const { isWalletConnected, pfpkClientOptions } = usePfpkClientOptions(options)

  const client = useMemo(
    () =>
      new KvpkClient({
        ...pfpkClientOptions,
        queryClient,
        keyPrefix,
      }),
    [keyPrefix, pfpkClientOptions, queryClient]
  )

  // Tear down the client when it changes or the component unmounts.
  useEffect(() => {
    return () => client.teardown()
  }, [client])

  return {
    isWalletConnected,
    client,
  }
}

export type UseFollowingDaosKvpkClientOptions = Omit<
  UseKvpkClientOptions,
  'defaultSignatureType' | 'keyPrefix'
>

/**
 * Hook that sets up a `FollowingDaosKvpkClient` with the currently connected
 * wallet.
 */
export const useFollowingDaosKvpkClient = (
  options?: UseFollowingDaosKvpkClientOptions
) => {
  const queryClient = useDependencyTrackedQueryClient()
  const { isWalletConnected, pfpkClientOptions } = usePfpkClientOptions(options)

  const client = useMemo(
    () =>
      new FollowingDaosKvpkClient({
        ...pfpkClientOptions,
        queryClient,
      }),
    [pfpkClientOptions, queryClient]
  )

  // Tear down the client when it changes or the component unmounts.
  useEffect(() => {
    return () => client.teardown()
  }, [client])

  return {
    isWalletConnected,
    client,
  }
}

export type UseHiddenBalancesKvpkClientOptions = Omit<
  UseKvpkClientOptions,
  'defaultSignatureType' | 'keyPrefix'
>

/**
 * Hook that sets up a `HiddenBalancesKvpkClient` with the currently connected
 * wallet.
 */
export const useHiddenBalancesKvpkClient = (
  options?: UseHiddenBalancesKvpkClientOptions
) => {
  const queryClient = useDependencyTrackedQueryClient()
  const { isWalletConnected, pfpkClientOptions } = usePfpkClientOptions(options)

  const client = useMemo(
    () =>
      new HiddenBalancesKvpkClient({
        ...pfpkClientOptions,
        queryClient,
      }),
    [pfpkClientOptions, queryClient]
  )

  // Tear down the client when it changes or the component unmounts.
  useEffect(() => {
    return () => client.teardown()
  }, [client])

  return {
    isWalletConnected,
    client,
  }
}

export type UseTransactionSavesKvpkClientOptions = Omit<
  UseKvpkClientOptions,
  'defaultSignatureType' | 'keyPrefix'
>

/**
 * Hook that sets up a `TransactionSavesKvpkClient` with the currently connected
 * wallet.
 */
export const useTransactionSavesKvpkClient = (
  options?: UseTransactionSavesKvpkClientOptions
) => {
  const queryClient = useDependencyTrackedQueryClient()
  const { isWalletConnected, pfpkClientOptions } = usePfpkClientOptions(options)

  const client = useMemo(
    () =>
      new TransactionSavesKvpkClient({
        ...pfpkClientOptions,
        queryClient,
      }),
    [pfpkClientOptions, queryClient]
  )

  // Tear down the client when it changes or the component unmounts.
  useEffect(() => {
    return () => client.teardown()
  }, [client])

  return {
    isWalletConnected,
    client,
  }
}
