import type { NextPage } from 'next'
import WalletLoader from 'components/WalletLoader'
import Transfers from 'components/Transfers'
import TokenBalances from 'components/TokenBalances'
import {
  useNativeBalances,
  useCw20Balances,
  useTransactions,
  useDaoCw20BalancesForWallet,
} from 'hooks/treasury'
import { useRouter } from 'next/router'

const Treasury: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string
  const walletCw20 = useDaoCw20BalancesForWallet(contractAddress)

  const { nativeBalances } = useNativeBalances(contractAddress)
  const daoCw20 = useCw20Balances(contractAddress)
  const { txs } = useTransactions(contractAddress)

  return (
    <WalletLoader>
      <div className="text-left my-8 w-full">
        <TokenBalances
          native={nativeBalances}
          cw20={daoCw20.balances}
          cw20Wallet={walletCw20.balances}
          cw20info={daoCw20.info}
        />
      </div>
      <div className="text-left w-full">
        <Transfers txs={txs} contract_address={contractAddress} />
      </div>
    </WalletLoader>
  )
}

export default Treasury
