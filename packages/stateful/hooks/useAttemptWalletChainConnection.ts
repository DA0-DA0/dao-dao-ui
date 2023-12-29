import { useChain, useManager } from '@cosmos-kit/react-lite'
import { useEffect, useRef } from 'react'

import { getChainForChainId } from '@dao-dao/utils'

export type UseAttemptWalletChainConnectionOptions = {
  /**
   * The chain to attempt connection to.
   */
  chainId: string
  /**
   * If true, will not attempt connection at all.
   */
  disabled?: boolean
}

/**
 * This hook attempts to connect to a given chain if a wallet is connected to a
 * different chain.
 */
export const useAttemptWalletChainConnection = ({
  chainId,
  disabled,
}: UseAttemptWalletChainConnectionOptions) => {
  const { walletRepos } = useManager()
  const { walletRepo, isWalletConnected } = useChain(
    getChainForChainId(chainId).chain_name
  )

  // Get currently connected wallet.
  const wallet = walletRepos.find(
    (repo) => repo.current?.isWalletConnected
  )?.current
  const walletIsConnectedSomewhere = !!wallet

  // Only attempt connection once per enable.
  const attemptedConnection = useRef(false)
  // Reset so that we re-attempt connection if this becomes enabled again.
  useEffect(() => {
    if (!disabled) {
      attemptedConnection.current = false
    }
  }, [disabled])

  // Store some variables in references to avoid many connections since the
  // references change on each render.
  const dataRef = useRef({
    wallet,
    walletRepo,
  })
  dataRef.current = {
    wallet,
    walletRepo,
  }

  useEffect(() => {
    if (
      !disabled &&
      !attemptedConnection.current &&
      !isWalletConnected &&
      walletIsConnectedSomewhere &&
      dataRef.current.wallet
    ) {
      attemptedConnection.current = true
      dataRef.current.walletRepo
        .connect(dataRef.current.wallet.walletName)
        .catch(console.error)
    }
  }, [walletIsConnectedSomewhere, disabled, isWalletConnected])
}
