import { useState, useEffect } from 'react'
import { useSigningClient } from 'contexts/cosmwasm'
import { defaultExecuteFee } from 'util/fee'

export function useStaking(contractAddress: string) {
  const { walletAddress, signingClient } = useSigningClient()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (walletAddress.length === 0 || !signingClient) {
      return
    }
    setLoading(true)
    signingClient
      ?.queryContractSmart(contractAddress, {
        staked_balance_at_height: {
          address: walletAddress,
        },
      })
      .then(console.log)
      .catch((e) => setError(e.msg))
    setLoading(false)
  }, [contractAddress, signingClient, walletAddress])

  const claim = async () => {
    setError('')
    signingClient
      ?.execute(
        walletAddress,
        contractAddress,
        {
          claim: {},
        },
        defaultExecuteFee
      )
      .then((response) => {
        console.log(response)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setError(err.message)
      })
  }

  const delegateVotes = async (recipient: string) => {
    setError('')
    signingClient
      ?.execute(
        walletAddress,
        contractAddress,
        {
          delegate_votes: {
            recipient,
          },
        },
        defaultExecuteFee
      )
      .then((response) => {
        console.log(response)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setError(err.message)
      })
  }

  const stake = async (amount: string) => {
    setError('')
    signingClient
      ?.execute(
        walletAddress,
        contractAddress,
        {
          stake: {
            amount,
          },
        },
        defaultExecuteFee
      )
      .then((response) => {
        console.log(response)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setError(err.message)
      })
  }

  const unstake = async (amount: string) => {
    setError('')
    signingClient
      ?.execute(
        walletAddress,
        contractAddress,
        {
          unstake: {
            amount,
          },
        },
        defaultExecuteFee
      )
      .then((response) => {
        console.log(response)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setError(err.message)
      })
  }

  return {
    walletAddress,
    loading,
    error,
    claim,
    delegateVotes,
    stake,
    unstake,
  }
}
