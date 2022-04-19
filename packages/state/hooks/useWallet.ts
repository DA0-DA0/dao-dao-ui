import { useCallback, useEffect, useState } from 'react'

import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'

import { getOfflineSignerAuto, isKeplrInstalled } from '@dao-dao/utils'

import { keplrKeystoreIdAtom } from '../recoil/atoms/keplr'
import { accountNameAtom, walletAddressAtom } from '../recoil/selectors/keplr'

export const useWallet = () => {
  const setKeplrKeystoreId = useSetRecoilState(keplrKeystoreIdAtom)
  const [error, setError] = useState<string>()

  // Wallet address
  const { state: walletAddressState, contents: walletAddressContents } =
    useRecoilValueLoadable(walletAddressAtom)
  const address =
    walletAddressState === 'hasValue' ? walletAddressContents : undefined
  // Wallet account name
  const { state: accountNameState, contents: accountNameContents } =
    useRecoilValueLoadable(accountNameAtom)
  const name = accountNameState === 'hasValue' ? accountNameContents : undefined

  const refresh = useCallback(
    () => setKeplrKeystoreId((id) => id + 1),
    [setKeplrKeystoreId]
  )

  const connect = useCallback(async () => {
    // Set install message error if keplr not installed.
    if (!isKeplrInstalled()) {
      setKeplrKeystoreId(-1)
      return setError('Keplr is not installed.')
    }

    setError(undefined)

    // Attempt to connect and update keystore accordingly.
    try {
      await getOfflineSignerAuto()
      // If connection succeeds, propagate client to selector dependencies.
      refresh()
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : `${error}`)

      // Set disconnected so we don't try to connect again without manual action.
      setKeplrKeystoreId(-1)
    }
  }, [setKeplrKeystoreId, setError, refresh])

  // Listen for keplr keystore changes and update as needed.
  useEffect(() => {
    const keplrListener = () => {
      console.log('Keplr keystore changed, reloading client.')
      connect()
    }
    window.addEventListener('keplr_keystorechange', keplrListener)

    return () =>
      window.removeEventListener('keplr_keystorechange', keplrListener)
  }, [connect])

  return {
    connect,
    refresh,
    error,
    address,
    name,
    connected: !!address,
    installed: isKeplrInstalled(),
    loading: walletAddressState === 'loading',
  }
}
