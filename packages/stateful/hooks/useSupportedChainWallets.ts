import { toHex } from '@cosmjs/encoding'
import { ChainContext, WalletAccount } from '@cosmos-kit/core'
import { useChains } from '@cosmos-kit/react-lite'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { getSupportedChains, processError } from '@dao-dao/utils'

import { useWallet } from './useWallet'

export type UseSupportedChainWalletsOptions = {
  /**
   * If true, attempt connection if wallet is connected to a different chain but
   * not the current one.
   */
  attemptConnection?: boolean
}

export type UseSupportedChainWalletsReturn = {
  chainWallet: ChainContext
  // Populated once loaded.
  account?: WalletAccount
  hexPublicKey?: string
}[]

export const useSupportedChainWallets = ({
  attemptConnection = false,
}: UseSupportedChainWalletsOptions = {}): UseSupportedChainWalletsReturn => {
  const mainWallet = useWallet({
    attemptConnection,
  })
  const chainWallets = Object.values(
    useChains(
      getSupportedChains().map(({ chain }) => chain.chain_name),
      false
    )
  )
  const chainWalletsRef = useRef(chainWallets)
  chainWalletsRef.current = chainWallets

  const [accounts, setAccounts] = useState<
    Record<
      string,
      {
        account: WalletAccount
        hexPublicKey: string
      }
    >
  >({})

  const connected = chainWallets.every((w) => w.isWalletConnected)

  // Connect to chains if not connected. Connecting one connects all.
  const attemptedConnection = useRef(false)
  useEffect(() => {
    if (mainWallet.isWalletConnected && !connected) {
      Promise.all(
        chainWalletsRef.current.map((w) =>
          w.walletRepo.wallets.some((w) => w.isWalletConnected)
            ? Promise.resolve()
            : w.walletRepo.connect(mainWallet.wallet?.name)
        )
      ).catch((err) => {
        console.error(err)
        toast.error(
          processError(err, {
            forceCapture: false,
          })
        )
      })
      attemptedConnection.current = true
    }
  }, [
    attemptConnection,
    connected,
    mainWallet.isWalletConnected,
    mainWallet.wallet?.name,
  ])

  useEffect(() => {
    if (!connected) {
      setAccounts({})
      return
    }

    ;(async () => {
      try {
        const connectedChains = chainWalletsRef.current.filter(
          (w) => w.isWalletConnected
        )
        const accounts = await Promise.all(
          connectedChains.map((w) => w.getAccount())
        )
        setAccounts((prev) =>
          connectedChains.reduce(
            (acc, { chain }, index) => ({
              ...acc,
              [chain.chain_id]: {
                account: accounts[index],
                hexPublicKey: toHex(accounts[index].pubkey),
              },
            }),
            prev
          )
        )
      } catch (err) {
        console.error('Supported wallet account loading error', err)
      }
    })()
  }, [connected])

  return chainWallets.map((chainWallet) => ({
    chainWallet,
    ...accounts[chainWallet.chain.chain_id],
  }))
}
