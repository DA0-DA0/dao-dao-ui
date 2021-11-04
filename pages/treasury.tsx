import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import { StargateClient, IndexedTx, Coin } from '@cosmjs/stargate'
import Transfers from 'components/Transfers'
import TokenBalances from 'components/TokenBalances'
import { Cw20Balance } from 'types/cw-dao'
import { TokenInfo } from 'types/cw20'

const DAO_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS || ''
const CHAIN_RPC_ENDPOINT = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || ''

const Home: NextPage = () => {
  const { signingClient } = useSigningClient()
  const [nativeBalances, setNativeBalances] = useState<Coin[]>([])
  const [cw20balances, setCw20Balances] = useState<Cw20Balance[]>([])
  const [cw20info, setCw20Info] = useState<TokenInfo[]>([])
  const [txs, setTxs] = useState<IndexedTx[]>([])

  useEffect(() => {
    StargateClient.connect(CHAIN_RPC_ENDPOINT).then((client) => {
      client
        .getAllBalances(DAO_CONTRACT_ADDRESS)
        .then((response) => {
          setNativeBalances(response as Coin[])
        })
        .catch((error) =>
          console.error('StargateClient getAllBalances error: ', error)
        )
    })
  }, [])

  useEffect(() => {
    if (!signingClient) {
      return
    }
    signingClient
      ?.queryContractSmart(DAO_CONTRACT_ADDRESS, { cw20_balances: {} })
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

        setCw20Balances(balances)
        setCw20Info(info)
      })
      .catch((error) =>
        console.error('queryContractSmart {cw20_balances: {}} error', error)
      )

    signingClient
      ?.searchTx({ sentFromOrTo: DAO_CONTRACT_ADDRESS })
      .then((response) => {
        setTxs(response as IndexedTx[])
      })
      .catch((error) => console.log(error))
  }, [signingClient])

  return (
    <WalletLoader>
      <div className="text-left my-8 w-full">
        <TokenBalances
          native={nativeBalances}
          cw20={cw20balances}
          cw20info={cw20info}
        />
      </div>
      <div className="text-left w-full">
        <Transfers txs={txs} />
      </div>
    </WalletLoader>
  )
}

export default Home
