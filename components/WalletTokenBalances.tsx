import { useRecoilValue } from 'recoil'
import { walletTokenBalance } from 'selectors/treasury'
import Cw20TokenBalance from 'components/Cw20TokenBalance'

function WalletTokenBalances({ tokenAddresses }: { tokenAddresses: string[] }) {
  const balances = tokenAddresses.map((address) =>
    useRecoilValue(walletTokenBalance(address))
  )

  return (
    <div className="flex">
      {balances.map((balance) => (
        <Cw20TokenBalance
          key={balance.address}
          tokenAddress={balance.address}
          amount={balance.amount}
        />
      ))}
    </div>
  )
}

export default WalletTokenBalances
