import type { NextPage } from 'next'
import WalletLoader from 'components/WalletLoader'
import { TokenBalance } from 'components/TokenBalances'
import { useDaoConfig } from 'hooks/dao'
import { useStaking } from 'hooks/staking'
import { useDaoCw20BalancesForWallet } from 'hooks/treasury'
import { useRouter } from 'next/router'
import LineAlert from 'components/LineAlert'

const Staking: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const balances = useDaoCw20BalancesForWallet(contractAddress)
  const { config, gov_token } = useDaoConfig(contractAddress)

  const {
    loading: stakingLoading,
    error: stakingError,
    claim,
    delegateVotes,
    stake,
    unstake,
  } = useStaking(gov_token)

  const handleStake = () => {
    stake('1000')
  }

  const handleDelegateVotes = () => {
    delegateVotes('juno1s4ckh9405q0a3jhkwx9wkf9hsjh66nmu769tz5')
  }

  const handleUnstake = () => {
    unstake('1000')
  }

  const handleClaim = () => {
    claim()
  }

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
      <button className="btn btn-base" onClick={handleStake}>
        Stake
      </button>
      <button className="btn btn-base" onClick={handleDelegateVotes}>
        Delegate votes
      </button>
      <button className="btn btn-base" onClick={handleUnstake}>
        Unstake
      </button>
      <button className="btn btn-base" onClick={handleClaim}>
        Claim
      </button>
      {stakingError && (
        <div className="mt-8">
          <LineAlert variant="error" msg={stakingError} />
        </div>
      )}
    </WalletLoader>
  )
}

export default Staking
