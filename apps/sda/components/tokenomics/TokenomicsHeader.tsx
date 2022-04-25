import { FunctionComponent } from 'react'

import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { Loader } from '../Loader'
import { Logo } from '../Logo'
import { useGovernanceTokenInfo, useStakingInfo } from '@/hooks'

export const TokenomicsHeaderLoader: FunctionComponent = () => (
  <>
    <div className="absolute -top-8 bg-light rounded-full border border-default">
      <Loader size={60} />
    </div>

    <div className="mt-16 mb-10 h-[4.25rem]"></div>

    <div className="flex flex-row justify-around items-center mb-6 w-full text-center md:gap-12 md:justify-center">
      <div className="flex flex-col gap-2 items-center p-2">
        <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
          DAO Treasury
        </p>

        <div className="h-6 lg:h-7"></div>
      </div>

      <div className="w-[1px] h-6 bg-dark opacity-10"></div>

      <div className="flex flex-col gap-2 items-center p-2">
        <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
          Total staked
        </p>

        <div className="h-6 lg:h-7"></div>
      </div>

      <div className="w-[1px] h-6 bg-dark opacity-10"></div>

      <div className="flex flex-col gap-2 items-center p-2">
        <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
          APR Reward
        </p>

        <div className="h-6 lg:h-7"></div>
      </div>
    </div>
  </>
)

export const TokenomicsHeader: FunctionComponent = () => {
  const {
    governanceTokenInfo,
    treasuryBalance: _treasuryBalance,
    walletBalance: _unstakedBalance,
    price: governanceTokenPrice,
    apr,
  } = useGovernanceTokenInfo({
    fetchTreasuryBalance: true,
    fetchWalletBalance: true,
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
    _treasuryBalance === undefined ||
    _unstakedBalance === undefined ||
    _stakedBalance === undefined ||
    governanceTokenPrice === undefined ||
    apr === undefined
  ) {
    return null
  }

  const totalStakedBalance = convertMicroDenomToDenomWithDecimals(
    _totalStakedBalance,
    governanceTokenInfo.decimals
  )
  const treasuryBalance = convertMicroDenomToDenomWithDecimals(
    _treasuryBalance,
    governanceTokenInfo.decimals
  )

  return (
    <>
      <div className="absolute -top-8 bg-light rounded-full border border-default">
        <Logo height={60} width={60} />
      </div>

      <p className="p-4 mt-16 mb-10 font-studiofeixen text-3xl text-center">
        1 {governanceTokenInfo.symbol} = $
        {governanceTokenPrice.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{' '}
        USD
      </p>

      <div className="flex flex-row justify-around items-center mb-6 w-full text-center md:gap-12 md:justify-center">
        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            DAO Treasury
          </p>

          <p className="text-base lg:text-xl">
            {treasuryBalance.toLocaleString(undefined, {
              maximumFractionDigits: governanceTokenInfo.decimals,
            })}{' '}
            {governanceTokenInfo.name}
          </p>
        </div>

        <div className="w-[1px] h-6 bg-dark opacity-10"></div>

        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            Total staked
          </p>

          <p className="text-base lg:text-xl">
            {totalStakedBalance.toLocaleString(undefined, {
              maximumFractionDigits: governanceTokenInfo.decimals,
            })}{' '}
            {governanceTokenInfo.name}
          </p>
        </div>

        <div className="w-[1px] h-6 bg-dark opacity-10"></div>

        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            APR Reward
          </p>

          <p className="text-base lg:text-xl">
            +
            {apr.toLocaleString(undefined, {
              maximumFractionDigits: 4,
            })}
            % APR
          </p>
        </div>
      </div>
    </>
  )
}
