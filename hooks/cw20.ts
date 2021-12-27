import React, { useState, useEffect } from 'react'
import { useSigningClient } from 'contexts/cosmwasm'
import { BalanceResponse } from '@dao-dao/types/contracts/cw20-gov/balance_response'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov/token_info_response'

import { defaultExecuteFee } from 'util/fee'

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

export function useCw20Allowance(tokenAddress: string, spenderAddress: string) {
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)
  const { walletAddress, signingClient } = useSigningClient()

  useEffect(() => {
    if (walletAddress.length === 0 || !signingClient) {
      return
    }
    setLoading(true)
    signingClient
      ?.queryContractSmart(tokenAddress, {
        allowance: {
          owner: walletAddress,
          spender: spenderAddress,
        },
      })
      .then((data) => {
        console.log(data)
        setLoading(false)
      })
      .catch((e) => {
        setError(e.msg)
        setLoading(false)
      })
  }, [tokenAddress, spenderAddress, walletAddress, signingClient])

  return {
    walletAddress,
    loading,
    error,
  }
}

export function useCw20IncreaseAllowance() {
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)
  const { walletAddress, signingClient } = useSigningClient()

  const execute = async (
    tokenAddress: string,
    amount: string,
    spender: string
  ) => {
    setLoading(true)
    try {
      const response = await signingClient?.execute(
        walletAddress,
        tokenAddress,
        { increase_allowance: { amount, spender } },
        defaultExecuteFee
      )
      console.log(response)
      setLoading(false)
    } catch (e: any) {
      console.error(e.message)
      setLoading(false)
      setError(e)
    }
  }

  return { walletAddress, loading, error, execute }
}
