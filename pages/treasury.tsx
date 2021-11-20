import type { NextPage } from 'next'
import WalletLoader from 'components/WalletLoader'
import Transfers from 'components/Transfers'
import TokenBalances from 'components/TokenBalances'
import {
  useNativeBalances,
  useCw20Balances,
  useTransactions,
} from 'hooks/treasury'

const DAO_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS || ''

const Home: NextPage = () => {
  const { nativeBalances } = useNativeBalances(DAO_CONTRACT_ADDRESS)
  const cw20 = useCw20Balances(DAO_CONTRACT_ADDRESS)
  const { txs } = useTransactions(DAO_CONTRACT_ADDRESS)

  return (
    <WalletLoader>
      <div className="text-left my-8 w-full">
        <TokenBalances
          native={nativeBalances}
          cw20={cw20.balances}
          cw20info={cw20.info}
        />
      </div>
      <div className="text-left w-full">
        <Transfers txs={txs} />
      </div>
    </WalletLoader>
  )
}

export default Home
