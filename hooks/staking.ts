import { useState, useEffect } from 'react'
import { useSigningClient } from 'contexts/cosmwasm'
import { defaultExecuteFee } from 'util/fee'

// Returns staking info and methods for a cw20-stakable contract
export function useStaking(contractAddress: string) {
  const { walletAddress, signingClient } = useSigningClient()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [stakedBalance, setStakedBalance] = useState({ balance: '0' })
  const [claims, setClaims] = useState()
  const [delegation, setDelegation] = useState()
  const [totalStaked, setTotalStaked] = useState({ total: '0' })

  useEffect(() => {
    if (walletAddress.length === 0 || !signingClient) {
      return
    }
    setLoading(true)
    Promise.all([
      signingClient?.queryContractSmart(contractAddress, {
        staked_balance_at_height: {
          address: walletAddress,
        },
      }),
      signingClient?.queryContractSmart(contractAddress, {
        claims: {
          address: walletAddress,
        },
      }),
      signingClient?.queryContractSmart(contractAddress, {
        delegation: {
          address: walletAddress,
        },
      }),
      signingClient?.queryContractSmart(contractAddress, {
        total_staked_at_height: {},
      }),
    ])
      .then((values) => {
        const [stakedBalance, claims, delegation, totalStaked] = values
        setStakedBalance(stakedBalance)
        setClaims(claims)
        setTotalStaked(totalStaked)
        setDelegation(delegation)
        setLoading(false)
      })
      .catch((e) => {
        setError(e.msg)
        setLoading(false)
      })
  }, [contractAddress, signingClient, walletAddress])

  const claim = async () => {
    setError('')
    await signingClient
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
    await signingClient
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
    await signingClient
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
    await signingClient
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
    claims,
    delegateVotes,
    delegation,
    stake,
    stakedBalance,
    totalStaked,
    unstake,
  }
}
