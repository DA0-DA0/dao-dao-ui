import { Coin } from '@cosmjs/stargate'
import { Cw20CoinVerified } from '@dao-dao/types/contracts/cw3-dao'
import TokenBalance from 'components/TokenBalance'
import Cw20TokenBalance from 'components/Cw20TokenBalance'

function TokenBalances({
  native,
  cw20Balances,
}: {
  native: Coin[]
  cw20Balances: Cw20CoinVerified[]
}) {
  return (
    <div className="flex">
      {native.map((coin) => (
        <TokenBalance
          key={coin.denom}
          amount={coin.amount}
          denom={coin.denom}
        />
      ))}
      {cw20Balances.map(({ address, amount }) => (
        <Cw20TokenBalance
          key={address}
          amount={amount}
          tokenAddress={address}
        />
      ))}
    </div>
  )
}

export default TokenBalances
