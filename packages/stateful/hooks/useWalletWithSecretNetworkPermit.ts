import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { DaoBase } from '@dao-dao/stateless'
import { PermitForPermitData } from '@dao-dao/types'
import { isSecretNetwork } from '@dao-dao/utils'

import { SecretCwDao, getDao } from '../clients/dao'
import { UseWalletOptions, UseWalletReturn, useWallet } from './useWallet'

export type UseWalletWithSecretNetworkPermitOptions = UseWalletOptions & {
  /**
   * DAO to fetch permit for. Must be on the current chain.
   */
  dao: string
}

export type UseWalletWithSecretNetworkPermitReturn = UseWalletReturn & {
  /**
   * Whether or not the current chain is Secret Network.
   */
  isSecretNetwork: boolean
  /**
   * DAO client.
   */
  dao: DaoBase
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
 *
 * TODO(dao-client): refactor this into a more general wallet / DAO client hook
 */
export const useWalletWithSecretNetworkPermit = ({
  dao,
  ...options
}: UseWalletWithSecretNetworkPermitOptions): UseWalletWithSecretNetworkPermitReturn => {
  const wallet = useWallet(options)
  const queryClient = useQueryClient()

  // Get DAO client for permit fetching.
  const daoClient = useMemo(() => {
    const client = getDao({
      queryClient,
      chainId: wallet.chain.chain_id,
      coreAddress: dao,
    })
    // Register for offline signer if Secret DAO.
    if (client instanceof SecretCwDao && wallet.isWalletConnected) {
      client.registerOfflineSignerAminoGetter(wallet.getOfflineSignerAmino)
    }
    return client
  }, [
    dao,
    queryClient,
    wallet.chain.chain_id,
    wallet.getOfflineSignerAmino,
    wallet.isWalletConnected,
  ])

  // Attempt to initialize with existing permit.
  const [permit, setPermit] = useState<PermitForPermitData | undefined>(() =>
    daoClient instanceof SecretCwDao &&
    wallet.isWalletConnected &&
    wallet.address
      ? daoClient.getExistingPermit(wallet.address)
      : undefined
  )

  // On wallet address change, re-fetch existing permit.
  useEffect(() => {
    if (
      daoClient instanceof SecretCwDao &&
      wallet.isWalletConnected &&
      wallet.address
    ) {
      setPermit(daoClient.getExistingPermit(wallet.address))
    }
  }, [daoClient, wallet.address, wallet.isWalletConnected])

  // On window event, attempt to fetch existing permit if not already set.
  useEffect(() => {
    if (typeof window === 'undefined' || !(daoClient instanceof SecretCwDao)) {
      return
    }

    const listener = () => {
      if (!permit && wallet.isWalletConnected && wallet.address) {
        setPermit(daoClient.getExistingPermit(wallet.address))
      }
    }

    window.addEventListener('secretPermitUpdate', listener)
    return () => {
      window.removeEventListener('secretPermitUpdate', listener)
    }
  }, [permit, daoClient, wallet.address, wallet.isWalletConnected])

  const getPermit = useCallback(async (): Promise<PermitForPermitData> => {
    if (!(daoClient instanceof SecretCwDao)) {
      throw new Error('Not a Secret DAO.')
    }

    if (!wallet.address || !wallet.isWalletConnected) {
      throw new Error('Log in to continue.')
    }

    const permit = await daoClient.getPermit(wallet.address)
    setPermit(permit)

    return permit
  }, [daoClient, wallet.address, wallet.isWalletConnected])

  const response = useMemo(
    (): UseWalletWithSecretNetworkPermitReturn => ({
      ...wallet,
      isSecretNetwork: isSecretNetwork(wallet.chain.chain_id),
      dao: daoClient,
      permit,
      getPermit,
    }),
    [wallet, daoClient, permit, getPermit]
  )

  return response
}
