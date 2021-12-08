import { useRecoilValue } from 'recoil'
import { nativeBalance, cw20Balances, cw20TokenInfo } from 'selectors/treasury'

import TokenBalance from 'components/TokenBalance'

function Cw20TokenBalance({
  tokenAddress,
  amount,
}: {
  tokenAddress: string
  amount: string
}) {
  const tokenInfo = useRecoilValue(cw20TokenInfo(tokenAddress))

  return (
    <TokenBalance
      amount={amount}
      denom={tokenInfo.name}
      symbol={tokenInfo.symbol}
    />
  )
}

export default Cw20TokenBalance
