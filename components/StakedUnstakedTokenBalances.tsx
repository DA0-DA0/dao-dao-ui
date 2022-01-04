import { useRecoilValue, waitForAll } from 'recoil'
import {
  walletStakedTokenBalance,
  walletTokenBalance,
} from 'selectors/treasury'
import Cw20TokenBalance from './Cw20TokenBalance'
import StakedTokenBalance from './StakedTokenBalance'

export default function StakedUnstakedTokenBalances({
  tokenAddresses,
  govTokenStakingAddress,
  govTokenAddress,
}: {
  tokenAddresses: string[]
  govTokenStakingAddress: string
  govTokenAddress: string
}) {
  const unstaked = useRecoilValue(
    waitForAll(tokenAddresses.map((address) => walletTokenBalance(address)))
  )

  // An astute reader may wonder, Zeke, why do we put our token
  // address in a list and then map over it in this horrible way
  // instead of just using an if statement? The reason is in two
  // parts. First, if we only `useRecoilValue` if the staking
  // address is a non-empty string React will error and inform us
  // that a different number of hooks have been called per
  // render. Second, a possible alternative to that would be to move
  // the complexity of doing nothing for empty strings down into the
  // `walletStakedTokenBalance` function. I don't much care for this
  // though as it adds a special case to a lower down abstraction
  // which would result in that function not behaving the same was
  // `walletTokenBalance`. This seems liable to be strange to future
  // users of that function and in all fairness asking for the token
  // balance of an address that is an empty string seems like it
  // ought to be an error.
  const staked = useRecoilValue(
    waitForAll(
      (govTokenStakingAddress ? [govTokenStakingAddress] : []).map((address) =>
        walletStakedTokenBalance(address)
      )
    )
  )
  const stakedComponent = staked.length ? (
    <StakedTokenBalance
      tokenAddress={govTokenAddress}
      amount={staked[0].amount}
    />
  ) : null

  return (
    <div className="flex">
      {stakedComponent}
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
