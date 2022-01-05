import { useState, useEffect } from 'react'
import { useSigningClient } from 'contexts/cosmwasm'
import { defaultExecuteFee } from 'util/fee'

// Returns staking info and methods for a cw20-stakable contract
export function useStaking(govTokenAddress: string, stakingAddress: string) {
  const { walletAddress, signingClient } = useSigningClient()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [stakedBalance, setStakedBalance] = useState({ balance: '0' })
  const [claims, setClaims] = useState()
  const [totalStaked, setTotalStaked] = useState({ total: '0' })

  useEffect(() => {
    if (walletAddress.length === 0 || !signingClient) {
      return
    }
    setLoading(true)
    Promise.all([
      signingClient?.queryContractSmart(stakingAddress, {
        staked_balance_at_height: {
          address: walletAddress,
        },
      }),
      signingClient?.queryContractSmart(stakingAddress, {
        claims: {
          address: walletAddress,
        },
      }),
      signingClient?.queryContractSmart(stakingAddress, {
        total_staked_at_height: {},
      }),
    ])
      .then((values) => {
        const [stakedBalance, claims, totalStaked] = values
        setStakedBalance(stakedBalance)
        setClaims(claims)
        setTotalStaked(totalStaked)
        setLoading(false)
      })
      .catch((e) => {
        setError(e.msg)
        setLoading(false)
      })
  }, [stakingAddress, signingClient, walletAddress])

  const claim = async () => {
    setError('')
    await signingClient
      ?.execute(
        walletAddress,
        govTokenAddress,
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

  const stake = async (amount: string) => {
    setError('')
    await signingClient
      ?.execute(
        walletAddress,
        govTokenAddress,
        {
          send: {
            owner: walletAddress,
            contract: stakingAddress,
            amount: amount,
            msg: btoa('{"stake": {}}'),
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
        stakingAddress,
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
    stake,
    stakedBalance,
    totalStaked,
    unstake,
  }
}
