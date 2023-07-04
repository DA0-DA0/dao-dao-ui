import { toHex } from '@cosmjs/encoding'
import { ChainContext, WalletAccount } from '@cosmos-kit/core'
import { useChain as useWalletChain } from '@cosmos-kit/react-lite'
import { useEffect, useMemo, useState } from 'react'

import { useChain } from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'
import { getChainForChainId } from '@dao-dao/utils'

export type UseWalletReturn = ChainContext & {
  account: WalletAccount | undefined
  hexPublicKey: LoadingData<string>
}

export const useWallet = (chainId?: string): UseWalletReturn => {
  const { chain_name: currentChainName } = useChain()
  const walletChain = useWalletChain(
    chainId ? getChainForChainId(chainId).chain_name : currentChainName
  )

  const [account, setAccount] = useState<WalletAccount>()
  const [hexPublicKeyData, setHexPublicKeyData] = useState<string>()
  useEffect(() => {
    if (!walletChain.isWalletConnected) {
      setAccount(undefined)
      setHexPublicKeyData(undefined)
      return
    }

    // If connected, set state.
    ;(async () => {
      const account = await walletChain.getAccount()
      setAccount(account)
      setHexPublicKeyData(toHex(account.pubkey))
    })()
  }, [walletChain])

  const hexPublicKey: LoadingData<string> = useMemo(
    () =>
      !hexPublicKeyData
        ? { loading: true }
        : { loading: false, data: hexPublicKeyData },
    [hexPublicKeyData]
  )

  return {
    ...walletChain,
    account,
    hexPublicKey,
  }
}
