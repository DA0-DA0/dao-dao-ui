import type { NextPage } from 'next'
import WalletLoader from 'components/WalletLoader'
import Transfers from 'components/Transfers'
import TokenBalances from 'components/TokenBalances'
import {
  useNativeBalances,
  useCw20Balances,
  useTransactions,
} from 'hooks/treasury'
import { useRouter } from 'next/router'

const Treasury: NextPage = () => {
  let router = useRouter()
  let { contractAddress } = router.query

  const { nativeBalances } = useNativeBalances(contractAddress as string)
  const cw20 = useCw20Balances(contractAddress as string)
  const { txs } = useTransactions(contractAddress as string)

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

export default Treasury
