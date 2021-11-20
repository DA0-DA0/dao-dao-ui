import { StargateClient, IndexedTx, Coin } from '@cosmjs/stargate'
import { useState, useEffect } from 'react'
import { useSigningClient } from 'contexts/cosmwasm'
import { TokenInfo } from 'types/cw20'
import { Cw20Balance } from 'types/cw-dao'

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
  }, [timestamp])

  return { nativeBalances, setTimestamp }
}

export function useCw20Balances(contractAddress: string) {
  const { signingClient } = useSigningClient()
  const [balances, setBalances] = useState<Cw20Balance[]>([])
  const [info, setInfo] = useState<TokenInfo[]>([])

  useEffect(() => {
    if (!signingClient) {
      return
    }
    signingClient
      ?.queryContractSmart(contractAddress, { cw20_balances: {} })
      .then(async (response) => {
        const balances = response.cw20_balances as Cw20Balance[]

        const info = (await Promise.all(
          balances.map(({ address }) =>
            signingClient.queryContractSmart(address, {
              token_info: {},
            })
          )
        ).catch((error) =>
          console.error(`queryContractSmart {token_info: {}} error: `, error)
        )) as TokenInfo[]

        setBalances(balances)
        setInfo(info)
      })
      .catch((error) =>
        console.error('queryContractSmart {cw20_balances: {}} error', error)
      )
  }, [signingClient])
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
  }, [signingClient])
  return { txs }
}
