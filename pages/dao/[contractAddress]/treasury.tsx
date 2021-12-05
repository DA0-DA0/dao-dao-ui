import type { NextPage } from 'next'
<<<<<<< HEAD
=======
import WalletLoader from 'components/WalletLoader'
import Transfers from 'components/Transfers'
import TokenBalances from 'components/TokenBalances'
import {
  useNativeBalances,
  useDaoCw20Balances,
  useTransactions,
  useDaoCw20BalancesForWallet,
} from 'hooks/treasury'
>>>>>>> 6fed6c6 (Add more hooks, clean up and document existing hooks)
import { useRouter } from 'next/router'
import Treasury from 'components/Treasury'

const TreasuryPage: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string
<<<<<<< HEAD
=======
  const walletCw20 = useDaoCw20BalancesForWallet(contractAddress)

  const { nativeBalances } = useNativeBalances(contractAddress)
  const daoCw20 = useDaoCw20Balances(contractAddress)
  const { txs } = useTransactions(contractAddress)
>>>>>>> 6fed6c6 (Add more hooks, clean up and document existing hooks)

  return (
    <div className="my-8 w-full">
      <Treasury contractAddress={contractAddress} />
    </div>
  )
}

export default TreasuryPage
