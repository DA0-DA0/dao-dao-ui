import { FunctionComponent } from 'react'

import { Button } from '@dao-dao/ui'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { Loader } from '../Loader'
import { Logo } from '../Logo'
import { useGovernanceTokenInfo, useStakingInfo } from '@/hooks'

interface CardProps {
  connected: boolean
  setShowStakingMode: () => void
}

export const UnstakedBalanceCard: FunctionComponent<CardProps> = ({
  connected,
  setShowStakingMode,
}) => {
  const {
    governanceTokenInfo,
    walletBalance: _unstakedBalance,
    price,
  } = useGovernanceTokenInfo({
    fetchWalletBalance: true,
    fetchPriceInfo: true,
  })

  if (
    !governanceTokenInfo ||
    _unstakedBalance === undefined ||
    price === undefined
  ) {
    return null
  }

  const unstakedBalance = convertMicroDenomToDenomWithDecimals(
    _unstakedBalance,
    governanceTokenInfo.decimals
  )

  return (
    <>
      <div className="flex flex-row gap-2 items-center mb-4">
        <Logo height={20} width={20} />
        <p className="text-base">
          {unstakedBalance.toLocaleString(undefined, {
            maximumFractionDigits: governanceTokenInfo.decimals,
          })}{' '}
          {governanceTokenInfo.name}
        </p>
      </div>

      <div className="flex flex-row justify-between items-center">
        <p className="text-lg font-medium">
          ${' '}
          {(unstakedBalance * price).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{' '}
          USD
        </p>

        <Button
          className="text-base"
          disabled={!connected}
          onClick={setShowStakingMode}
          variant="secondary"
        >
          Manage
        </Button>
      </div>
    </>
  )
}

export const StakedBalanceCard: FunctionComponent<CardProps> = ({
  connected,
  setShowStakingMode,
}) => {
  const { governanceTokenInfo, price } = useGovernanceTokenInfo({
    fetchPriceInfo: true,
  })
  const { totalStaked: _totalStakedBalance, walletBalance: _stakedBalance } =
    useStakingInfo({
      fetchTotalStaked: true,
      fetchWalletBalance: true,
    })

  if (
    !governanceTokenInfo ||
    _totalStakedBalance === undefined ||
    _stakedBalance === undefined ||
    price === undefined
  ) {
    return null
  }

  const votingPower =
    _totalStakedBalance === 0 ? 0 : (_stakedBalance / _totalStakedBalance) * 100

  const stakedBalance = convertMicroDenomToDenomWithDecimals(
    _stakedBalance,
    governanceTokenInfo.decimals
  )

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex flex-row gap-2 items-center">
          <Logo height={20} width={20} />
          <p className="text-base">
            {stakedBalance.toLocaleString(undefined, {
              maximumFractionDigits: governanceTokenInfo.decimals,
            })}{' '}
            {governanceTokenInfo.name}
          </p>
        </div>

        <p className="text-base text-secondary">
          {votingPower.toLocaleString(undefined, {
            maximumFractionDigits: 4,
          })}
          % <span className="text-xs text-tertiary">of all voting power</span>
        </p>
      </div>

      <div className="flex flex-row justify-between items-center">
        <p className="text-lg font-medium">
          ${' '}
          {(stakedBalance * price).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{' '}
          USD
        </p>

        <Button
          className="text-base"
          disabled={!connected}
          onClick={setShowStakingMode}
          variant="secondary"
        >
          Manage
        </Button>
      </div>
    </>
  )
}

export const BalanceCardLoader = () => (
  <div className="h-[5.25rem]">
    <Loader />
  </div>
)
