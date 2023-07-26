import { Chain } from '@chain-registry/types'
import { toHex } from '@cosmjs/encoding'
import { ChainContext, WalletAccount } from '@cosmos-kit/core'
import { useChain as useWalletChain } from '@cosmos-kit/react-lite'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { walletChainIdAtom } from '@dao-dao/state/recoil'
import { useChainContextIfAvailable } from '@dao-dao/stateless'
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
  const { chain } = useChainContextIfAvailable() ?? {}

  // If chainId passed, use that. Otherwise, use current chain context. If not
  // in a chain context, fallback to global wallet chain setting.
  const walletChain = useWalletChain(
    chainId
      ? getChainForChainId(chainId).chain_name
      : chain
      ? chain.chain_name
      : getChainForChainId(walletChainId).chain_name
  )

  const [account, setAccount] = useState<WalletAccount>()
  const [hexPublicKeyData, setHexPublicKeyData] = useState<string>()

  const { isWalletConnected, address, getAccount } = walletChain
  useEffect(() => {
    if (!loadAccount) {
      return
    }

    if (!isWalletConnected) {
      setAccount(undefined)
      setHexPublicKeyData(undefined)
      return
    }

    // If connected and account not loaded, set state.
    if (account?.address !== address) {
      ;(async () => {
        const account = await getAccount()
        setAccount(account)
        setHexPublicKeyData(toHex(account.pubkey))
      })()
    }
  }, [account?.address, isWalletConnected, address, getAccount, loadAccount])

  const response = useMemo(
    (): UseWalletReturn => ({
      ...walletChain,
      // Use chain from our version of the chain-registry.
      chain: getChainForChainId(walletChain.chain.chain_id),
      account,
      hexPublicKey: !hexPublicKeyData
        ? { loading: true }
        : { loading: false, data: hexPublicKeyData },
    }),
    [walletChain, account, hexPublicKeyData]
  )

  return response
}
