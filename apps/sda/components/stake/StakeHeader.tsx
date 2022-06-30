/* eslint-disable @next/next/no-img-element */

import { FunctionComponent } from 'react'
import { useRecoilValue } from 'recoil'

import { useTranslation } from '@dao-dao/i18n'
import {
  CwCoreSelectors,
  useGovernanceTokenInfo,
  useStakingInfo,
} from '@dao-dao/state'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { useApr } from '@/hooks'
import { DAO_ADDRESS, DEFAULT_IMAGE_URL, TOKEN_SWAP_ADDRESS } from '@/util'

import { Loader } from '../Loader'

export const StakeHeaderLoader: FunctionComponent = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="absolute top-[0.1rem] h-[1px] w-full bg-primary"></div>
      <div className="absolute top-[0.4rem] h-[1px] w-full bg-primary"></div>

      <div className="absolute -top-16 flex w-full items-center justify-center border-b border-inactive">
        <div className="h-24 w-24 rounded-full border border-default bg-light">
          <Loader size="100%" />
        </div>
      </div>

      <div className="mt-12 h-[4.5rem] w-full border-t border-inactive"></div>

      <div className="flex w-full flex-row items-center justify-around border-t border-inactive p-5 text-center md:justify-center md:gap-12">
        <div className="flex flex-col items-center gap-2 p-2">
          <p className="overflow-hidden text-ellipsis font-mono text-sm text-tertiary">
            {t('title.daoTreasury')}
          </p>

          <div className="h-6 lg:h-7"></div>
        </div>

        <div className="h-6 w-[1px] bg-dark opacity-10"></div>

        <div className="flex flex-col items-center gap-2 p-2">
          <p className="overflow-hidden text-ellipsis font-mono text-sm text-tertiary">
            {t('title.totalStaked')}
          </p>

          <div className="h-6 lg:h-7"></div>
        </div>

        <div className="h-6 w-[1px] bg-dark opacity-10"></div>

        <div className="flex flex-col items-center gap-2 p-2">
          <p className="overflow-hidden text-ellipsis font-mono text-sm text-tertiary">
            {t('title.aprReward')}
          </p>

          <div className="h-6 lg:h-7"></div>
        </div>
      </div>
    </>
  )
}

export const StakeHeader: FunctionComponent = () => {
  const { t } = useTranslation()
  const daoConfig = useRecoilValue(
    CwCoreSelectors.configSelector({ contractAddress: DAO_ADDRESS })
  )
  const {
    governanceTokenInfo,
    treasuryBalance: treasuryBalance,
    price: governanceTokenPrice,
  } = useGovernanceTokenInfo(DAO_ADDRESS, {
    fetchTreasuryBalance: true,
    fetchPriceWithSwapAddress: TOKEN_SWAP_ADDRESS,
  })
  const apr = useApr()
  const { totalStakedValue } = useStakingInfo(DAO_ADDRESS, {
    fetchTotalStakedValue: true,
  })

  if (
    !daoConfig ||
    !governanceTokenInfo ||
    totalStakedValue === undefined ||
    treasuryBalance === undefined ||
    apr === undefined
  ) {
    return <StakeHeaderLoader />
  }

  return (
    <>
      <div className="absolute top-[0.1rem] h-[1px] w-full bg-primary"></div>
      <div className="absolute top-[0.4rem] h-[1px] w-full bg-primary"></div>

      <div className="absolute -top-16 flex w-full items-center justify-center border-b border-inactive">
        <div className="h-24 w-24 rounded-full border border-default bg-light">
          <img
            alt={t('info.logo')}
            className="h-full w-full"
            src={daoConfig.image_url ?? DEFAULT_IMAGE_URL}
          />
        </div>
      </div>

      <p className="mt-12 w-full border-t border-inactive p-5  text-center font-studiofeixen text-2xl">
        1 {governanceTokenInfo.symbol} =
        {governanceTokenPrice
          ? ' $' +
            governanceTokenPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) +
            ' USDC'
          : // eslint-disable-next-line i18next/no-literal-string
            ' $ ??'}
      </p>

      <div className="flex w-full flex-row items-center justify-around border-t border-inactive p-5 text-center md:justify-center md:gap-12">
        <div className="flex flex-col items-center gap-2 p-2">
          <p className="overflow-hidden text-ellipsis font-mono text-sm text-tertiary">
            {t('title.daoTreasury')}
          </p>

          <p className="header-text text-base lg:text-xl">
            {convertMicroDenomToDenomWithDecimals(
              treasuryBalance,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{' '}
            {governanceTokenInfo.name}
          </p>
        </div>

        <div className="h-6 w-[1px] bg-dark opacity-10"></div>

        <div className="flex flex-col items-center gap-2 p-2">
          <p className="overflow-hidden text-ellipsis font-mono text-sm text-tertiary">
            {t('title.totalStaked')}
          </p>

          <p className="header-text text-base lg:text-xl">
            {convertMicroDenomToDenomWithDecimals(
              totalStakedValue,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{' '}
            {governanceTokenInfo.name}
          </p>
        </div>

        <div className="h-6 w-[1px] bg-dark opacity-10"></div>

        <div className="flex flex-col items-center gap-2 p-2">
          <p className="overflow-hidden text-ellipsis font-mono text-sm text-tertiary">
            {t('title.aprReward')}
          </p>

          <p className="header-text text-base lg:text-xl">
            +
            {(apr * 100).toLocaleString(undefined, {
              maximumFractionDigits: 2,
              // eslint-disable-next-line i18next/no-literal-string
            })}
            % APR
          </p>
        </div>
      </div>
    </>
  )
}
