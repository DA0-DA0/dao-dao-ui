import { useState, useEffect } from 'react'
import { useSigningClient } from 'contexts/cosmwasm'
import { BalanceResponse } from '@dao-dao/types/contracts/cw20-gov/balance_response'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov/token_info_response'

// Returns cw20 balance info for the connected wallet
export function useCw20WalletBalance(contractAddress: string) {
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)
  const { walletAddress, signingClient } = useSigningClient()
  const [balance, setBalance] = useState<BalanceResponse | null>(null)
  const [tokenInfo, setTokenInfo] = useState<TokenInfoResponse | null>(null)

  useEffect(() => {
    if (walletAddress.length === 0 || !signingClient) {
      return
    }
    setLoading(true)
    Promise.all([
      signingClient?.queryContractSmart(contractAddress, {
        balance: {
          address: walletAddress,
        },
      }),
      signingClient.queryContractSmart(contractAddress, {
        token_info: {},
      }),
    ])
      .then((values) => {
        const [balance, tokenInfo] = values
        setBalance(balance)
        setTokenInfo(tokenInfo)
        setLoading(false)
      })
      .catch((e) => {
        setError(e.msg)
        setLoading(false)
      })
  }, [contractAddress, signingClient, walletAddress])

  return {
    walletAddress,
    loading,
    error,
    balance,
    tokenInfo,
  }
}
