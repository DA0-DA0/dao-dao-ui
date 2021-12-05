import type { NextPage } from 'next'
import WalletLoader from 'components/WalletLoader'
import { TokenBalance } from 'components/TokenBalances'
import { useDaoConfig } from 'hooks/dao'
import { useDaoCw20BalancesForWallet } from 'hooks/treasury'
import { useRouter } from 'next/router'

const Staking: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const balances = useDaoCw20BalancesForWallet(contractAddress)

  console.log(balances)

  return (
    <WalletLoader>
      {balances?.balances.length > 0
        ? balances.balances.map((balance, index) => (
            <TokenBalance
              key={balance.address}
              amount={balance.amount}
              denom={balances.info[index]?.name}
              symbol={balances.info[index]?.symbol}
            />
          ))
        : null}
      <button>Stake</button>
      <button>Unstake</button>
      <button>Claim</button>
    </WalletLoader>
  )
}

export default Staking
