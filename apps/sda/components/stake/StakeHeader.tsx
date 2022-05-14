/* eslint-disable @next/next/no-img-element */

import { FunctionComponent } from 'react'
import { useRecoilValue } from 'recoil'

import { useGovernanceTokenInfo, useStakingInfo } from '@dao-dao/state'
import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { Loader } from '../Loader'
import { useApr } from '@/hooks'
import { DAO_ADDRESS, DEFAULT_IMAGE_URL, TOKEN_SWAP_ADDRESS } from '@/util'

export const StakeHeaderLoader: FunctionComponent = () => (
  <>
    <div className="absolute top-[0.1rem] w-full h-[1px] bg-primary"></div>
    <div className="absolute top-[0.4rem] w-full h-[1px] bg-primary"></div>

    <div className="flex absolute -top-16 justify-center items-center w-full border-b border-inactive">
      <div className="w-24 h-24 bg-light rounded-full border border-default">
        <Loader size="100%" />
      </div>
    </div>

    <div className="mt-12 w-full h-[4.5rem] border-t border-inactive"></div>

    <div className="flex flex-row justify-around items-center p-5 w-full text-center border-t border-inactive md:gap-12 md:justify-center">
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

export const StakeHeader: FunctionComponent = () => {
  const daoConfig = useRecoilValue(
    configSelector({ contractAddress: DAO_ADDRESS })
  )
  const {
    governanceTokenInfo,
    treasuryBalance: _treasuryBalance,
    walletBalance: _unstakedBalance,
    price: governanceTokenPrice,
  } = useGovernanceTokenInfo(DAO_ADDRESS, {
    fetchTreasuryBalance: true,
    fetchWalletBalance: true,
    fetchPriceWithSwapAddress: TOKEN_SWAP_ADDRESS,
  })
  const apr = useApr()
  const { totalStakedValue: totalStakedValue } = useStakingInfo(DAO_ADDRESS, {
    fetchTotalStakedValue: true,
  })

  if (
    !daoConfig ||
    !governanceTokenInfo ||
    totalStakedValue === undefined ||
    _treasuryBalance === undefined ||
    apr === undefined
  ) {
    return <StakeHeaderLoader />
  }

  const totalStakedBalance = convertMicroDenomToDenomWithDecimals(
    totalStakedValue,
    governanceTokenInfo.decimals
  )
  const treasuryBalance = convertMicroDenomToDenomWithDecimals(
    _treasuryBalance,
    governanceTokenInfo.decimals
  )

  return (
    <>
      <div className="absolute top-[0.1rem] w-full h-[1px] bg-primary"></div>
      <div className="absolute top-[0.4rem] w-full h-[1px] bg-primary"></div>

      <div className="flex absolute -top-16 justify-center items-center w-full border-b border-inactive">
        <div className="w-24 h-24 bg-light rounded-full border border-default">
          <img
            alt="logo"
            className="w-full h-full"
            src={daoConfig.image_url ?? DEFAULT_IMAGE_URL}
          />
        </div>
      </div>

      <p className="p-5 mt-12 w-full font-studiofeixen text-2xl  text-center border-t border-inactive">
        1 {governanceTokenInfo.symbol} =
        {governanceTokenPrice
          ? ' $' +
            governanceTokenPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) +
            ' USD'
          : ' $ ??'}
      </p>

      <div className="flex flex-row justify-around items-center p-5 w-full text-center border-t border-inactive md:gap-12 md:justify-center">
        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            DAO Treasury
          </p>

          <p className="text-base lg:text-xl header-text">
            {treasuryBalance.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{' '}
            {governanceTokenInfo.name}
          </p>
        </div>

        <div className="w-[1px] h-6 bg-dark opacity-10"></div>

        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            Total staked
          </p>

          <p className="text-base lg:text-xl header-text">
            {totalStakedBalance.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{' '}
            {governanceTokenInfo.name}
          </p>
        </div>

        <div className="w-[1px] h-6 bg-dark opacity-10"></div>

        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            APR Reward
          </p>

          <p className="text-base lg:text-xl header-text">
            +
            {(apr * 100).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
            % APR
          </p>
        </div>
      </div>
    </>
  )
}
