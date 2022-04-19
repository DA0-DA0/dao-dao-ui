import { useCallback, useEffect, useState } from 'react'

import { useSetRecoilState } from 'recoil'

import { getOfflineSignerAuto, isKeplrInstalled } from '@dao-dao/utils'

import { keplrKeystoreIdAtom } from '../recoil/atoms/keplr'

export const useKeplr = () => {
  const setKeplrKeystoreId = useSetRecoilState(keplrKeystoreIdAtom)
  const [error, setError] = useState<string>()

  const refreshKeplr = useCallback(
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
      refreshKeplr()
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : `${error}`)

      // Set disconnected so we don't try to connect again without manual action.
      setKeplrKeystoreId(-1)
    }
  }, [setKeplrKeystoreId, setError, refreshKeplr])

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
    error,
    refreshKeplr,
  }
}
