import { useRecoilValue, waitForAll } from 'recoil'
import {
  walletStakedTokenBalance,
  walletTokenBalance,
} from 'selectors/treasury'
import Cw20TokenBalance from './Cw20TokenBalance'
import StakedTokenBalance from './StakedTokenBalance'

export default function StakedUnstakedTokenBalances({
  tokenAddresses,
}: {
  tokenAddresses: string[]
}) {
  const unstaked = useRecoilValue(
    waitForAll(tokenAddresses.map((address) => walletTokenBalance(address)))
  )
  const staked = useRecoilValue(
    waitForAll(
      tokenAddresses.map((address) => walletStakedTokenBalance(address))
    )
  )
  return (
    <div className="flex">
      {staked.map((balance) => (
        <StakedTokenBalance
          key={balance.address}
          tokenAddress={balance.address}
          amount={balance.amount}
        />
      ))}
      {unstaked.map((balance) => (
        <Cw20TokenBalance
          key={balance.address}
          tokenAddress={balance.address}
          amount={balance.amount}
        />
      ))}
    </div>
  )
}
