import React, { useState } from 'react'
import type { NextPage } from 'next'
import HelpTooltip from 'components/HelpTooltip'
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
  tooltip,
}: {
  amount: string
  symbol?: string
  title: string
  tooltip: string
}) {
  return (
    <div className="card bordered shadow-lg card-side m-2 inline-flex">
      <div className="card-body py-6">
        <h2 className="card-title">
          {title} <HelpTooltip text={tooltip} />
        </h2>
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

  const { daoInfo, loading: daoConfigLoading } = useDaoConfig(contractAddress)

  const {
    loading: cw20Loading,
    error: cw20Error,
    balance,
    tokenInfo,
  } = useCw20WalletBalance(daoInfo?.gov_token as string)

  const {
    loading: stakingLoading,
    error: stakingError,
    stake,
    stakedBalance,
    unstake,
  } = useStaking(daoInfo?.gov_token as string)

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
      {balance && (
        <TokenBalance
          title="DAO token Balance"
          tooltip="Your token balance minus staked tokens. Stake your tokens to gain voting power in the DAO and be eligible for staking rewards. Note, best to leave some unstaked if you wish to create proposals and your DAO requires proposal deposits."
          amount={balance?.balance as string}
          symbol={tokenInfo?.symbol}
        />
      )}
      {stakedBalance && (
        <TokenBalance
          title="Staked DAO Tokens"
          tooltip="Your total staked tokens balance. These count towards your voting power in the DAO."
          amount={stakedBalance?.balance as string}
          symbol={tokenInfo?.symbol}
        />
      )}

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
          <LineAlert variant="error" msg={cw20Error.message} />
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
