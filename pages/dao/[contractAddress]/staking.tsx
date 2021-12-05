import React, { useState } from 'react'
import type { NextPage } from 'next'
import WalletLoader from 'components/WalletLoader'
import { useDaoConfig } from 'hooks/dao'
import { useCw20WalletBalance } from 'hooks/cw20'
import { useStaking } from 'hooks/staking'
import { useRouter } from 'next/router'
import LineAlert from 'components/LineAlert'
import {
  convertMicroDenomToDenom,
  convertDenomToMicroDenom,
} from 'util/conversion'

export function TokenBalance({
  amount,
  symbol,
  title,
}: {
  amount: string
  symbol?: string
  title: string
}) {
  return (
    <div className="card bordered shadow-lg card-side m-2 inline-flex">
      <div className="card-body py-6">
        <h2 className="card-title">{title}</h2>
        <p>
          {convertMicroDenomToDenom(amount)} {symbol}
        </p>
      </div>
    </div>
  )
}

const Staking: NextPage = () => {
  const [amount, setAmount] = useState('')

  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const {
    gov_token,
    loading: daoConfigLoading,
    error: daoConfigError,
  } = useDaoConfig(contractAddress)

  const {
    loading: cw20Loading,
    error: cw20Error,
    balance,
    tokenInfo,
  } = useCw20WalletBalance(gov_token)

  const {
    loading: stakingLoading,
    error: stakingError,
    stake,
    stakedBalance,
    unstake,
  } = useStaking(gov_token)

  const handleStake = async () => {
    await stake(convertDenomToMicroDenom(amount))
    setAmount('')
  }

  const handleUnstake = async () => {
    await unstake(convertDenomToMicroDenom(amount))
    setAmount('')
  }

  return (
    <WalletLoader loading={stakingLoading || daoConfigLoading || cw20Loading}>
      <TokenBalance
        title="DAO token Balance"
        amount={balance?.balance}
        symbol={tokenInfo?.symbol}
      />
      <TokenBalance
        title="Staked DAO Tokens"
        amount={stakedBalance?.balance}
        symbol={tokenInfo?.symbol}
      />

      <div className="form-control my-8">
        <label className="label">
          <span className="label-text">Amount</span>
        </label>
        <input
          type="text"
          placeholder="Amount to Stake / Unstake"
          className="input input-bordered"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div>
        <button className="btn btn-base inline-flex mx-2" onClick={handleStake}>
          Stake
        </button>
        <button
          className="btn btn-base inline-flex mx-2"
          onClick={handleUnstake}
        >
          Unstake
        </button>
      </div>
      {cw20Error && (
        <div className="mt-8">
          <LineAlert variant="error" msg={cw20Error} />
        </div>
      )}
      {daoConfigError && (
        <div className="mt-8">
          <LineAlert variant="error" msg={daoConfigError} />
        </div>
      )}
      {stakingError && (
        <div className="mt-8">
          <LineAlert variant="error" msg={stakingError} />
        </div>
      )}
    </WalletLoader>
  )
}

export default Staking
