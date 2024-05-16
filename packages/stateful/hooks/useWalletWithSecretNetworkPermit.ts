import { useCallback, useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { secretNetworkPermitAtom } from '@dao-dao/state/recoil'
import { PermitForPermitData } from '@dao-dao/types'
import { createSecretNetworkPermit, isSecretNetwork } from '@dao-dao/utils'

import { UseWalletOptions, UseWalletReturn, useWallet } from './useWallet'

export type UseWalletWithSecretNetworkPermitOptions = UseWalletOptions & {
  /**
   * DAO to fetch permit for.
   */
  dao: string
}

export type UseWalletWithSecretNetworkPermitReturn = UseWalletReturn & {
  /**
   * Whether or not the current chain is Secret Network.
   */
  isSecretNetwork: boolean
  /**
   * Permit saved for the given DAO, if exists.
   */
  permit: PermitForPermitData | undefined
  /**
   * Function to create and return a permit for the given DAO.
   */
  getPermit: () => Promise<PermitForPermitData>
}

/**
 * Hook to help manage Secret Network permits.
 */
export const useWalletWithSecretNetworkPermit = ({
  dao,
  ...options
}: UseWalletWithSecretNetworkPermitOptions): UseWalletWithSecretNetworkPermitReturn => {
  const wallet = useWallet(options)
  const [permit, setPermit] = useRecoilState(
    secretNetworkPermitAtom({
      walletAddress: wallet.address || '',
      dao,
    })
  )

  const getPermit = useCallback(async (): Promise<PermitForPermitData> => {
    // If permit exists, use it.
    if (permit) {
      return permit
    }

    if (!wallet.address || !wallet.isWalletConnected) {
      throw new Error('Log in to continue.')
    }

    const newPermit = await createSecretNetworkPermit({
      chainId: wallet.chain.chain_id,
      address: wallet.address,
      key: dao,
      offlineSignerAmino: wallet.getOfflineSignerAmino(),
    })

    setPermit(newPermit)

    return newPermit
  }, [dao, permit, setPermit, wallet])

  const response = useMemo(
    (): UseWalletWithSecretNetworkPermitReturn => ({
      ...wallet,
      isSecretNetwork: isSecretNetwork(wallet.chain.chain_id),
      permit,
      getPermit,
    }),
    [wallet, permit, getPermit]
  )

  return response
}
