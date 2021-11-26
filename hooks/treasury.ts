import { StargateClient, IndexedTx, Coin } from '@cosmjs/stargate'
import { useState, useEffect } from 'react'
import { useSigningClient } from 'contexts/cosmwasm'
import { TokenInfoResponse } from 'types/contracts/dao-contracts'
import { Cw20Coin } from 'types/contracts/dao-contracts'

const CHAIN_RPC_ENDPOINT = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || ''

export function useNativeBalances(contractAddress: string) {
  const [nativeBalances, setNativeBalances] = useState<Coin[]>([])
  const [timestamp, setTimestamp] = useState<Date>(new Date())

  useEffect(() => {
    StargateClient.connect(CHAIN_RPC_ENDPOINT).then((client) => {
      client
        .getAllBalances(contractAddress)
        .then((response) => {
          setNativeBalances(response as Coin[])
        })
        .catch((error) =>
          console.error('StargateClient getAllBalances error: ', error)
        )
    })
  }, [timestamp, contractAddress])

  return { nativeBalances, setTimestamp }
}

export function useCw20Balances(contractAddress: string) {
  const { signingClient } = useSigningClient()
  const [balances, setBalances] = useState<Cw20Coin[]>([])
  const [info, setInfo] = useState<TokenInfoResponse[]>([])

  useEffect(() => {
    if (!signingClient) {
      return
    }
    signingClient
      ?.queryContractSmart(contractAddress, { cw20_balances: {} })
      .then(async (response) => {
        const balances = response.cw20_balances as Cw20Coin[]

        const info = (await Promise.all(
          balances.map(({ address }) =>
            signingClient.queryContractSmart(address, {
              token_info: {},
            })
          )
        ).catch((error) =>
          console.error(`queryContractSmart {token_info: {}} error: `, error)
        )) as TokenInfoResponse[]

        setBalances(balances)
        setInfo(info)
      })
      .catch((error) =>
        console.error('queryContractSmart {cw20_balances: {}} error', error)
      )
  }, [signingClient, contractAddress])
  return { balances, info }
}

export function useTransactions(contractAddress: string) {
  const { signingClient } = useSigningClient()
  const [txs, setTxs] = useState<IndexedTx[]>([])

  useEffect(() => {
    if (!signingClient) {
      return
    }

    signingClient
      ?.searchTx({ sentFromOrTo: contractAddress })
      .then((response) => {
        setTxs(response as IndexedTx[])
      })
      .catch((error) => console.log(error))
  }, [signingClient, contractAddress])
  return { txs }
}
