/* eslint-disable @next/next/no-img-element */

import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import {
  CwCoreSelectors,
  useGovernanceTokenInfo,
  useStakingInfo,
} from '@dao-dao/state'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../../react/context'
import { BaseSdaMembershipPageProps } from '../../../../types'

interface StakeHeaderProps {
  defaultImageUrl: string
}

export const StakeHeader = ({ defaultImageUrl }: StakeHeaderProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const daoConfig = useRecoilValue(
    CwCoreSelectors.configSelector({ contractAddress: coreAddress })
  )
  const { governanceTokenInfo, treasuryBalance: treasuryBalance } =
    useGovernanceTokenInfo(coreAddress, {
      fetchTreasuryBalance: true,
    })
  const { totalStakedValue } = useStakingInfo(coreAddress, {
    fetchTotalStakedValue: true,
  })

  if (
    !daoConfig ||
    !governanceTokenInfo ||
    totalStakedValue === undefined ||
    treasuryBalance === undefined
  ) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <>
      <div className="absolute top-[0.1rem] w-full h-[1px] bg-primary"></div>
      <div className="absolute top-[0.4rem] w-full h-[1px] bg-primary"></div>

      <div className="flex absolute -top-16 justify-center items-center w-full border-b border-inactive">
        <div className="overflow-hidden w-24 h-24 rounded-full border bg-light border-default">
          <img
            alt={t('info.logo')}
            className="w-full h-full"
            src={daoConfig.image_url ?? defaultImageUrl}
          />
        </div>
      </div>

      <div className="flex flex-row justify-around items-center p-5 mt-8 w-full text-center md:gap-12 md:justify-center">
        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-ellipsis text-tertiary">
            {t('title.daoTreasury')}
          </p>

          <p className="text-base lg:text-xl header-text">
            {convertMicroDenomToDenomWithDecimals(
              treasuryBalance,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{' '}
            ${governanceTokenInfo.symbol}
          </p>
        </div>

        <div className="w-[1px] h-6 opacity-10 bg-dark"></div>

        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-ellipsis text-tertiary">
            {t('title.totalStaked')}
          </p>

          <p className="text-base lg:text-xl header-text">
            {convertMicroDenomToDenomWithDecimals(
              totalStakedValue,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{' '}
            ${governanceTokenInfo.symbol}
          </p>
        </div>
      </div>
    </>
  )
}

type StakeHeaderLoaderProps = Pick<BaseSdaMembershipPageProps, 'Loader'>

export const StakeHeaderLoader = ({ Loader }: StakeHeaderLoaderProps) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="absolute top-[0.1rem] w-full h-[1px] bg-primary"></div>
      <div className="absolute top-[0.4rem] w-full h-[1px] bg-primary"></div>

      <div className="flex absolute -top-16 justify-center items-center w-full border-b border-inactive">
        <div className="w-24 h-24 rounded-full border bg-light border-default">
          <Loader size="100%" />
        </div>
      </div>

      <div className="flex flex-row justify-around items-center p-5 mt-8 w-full text-center md:gap-12 md:justify-center">
        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-ellipsis text-tertiary">
            {t('title.daoTreasury')}
          </p>

          <div className="h-6 lg:h-7"></div>
        </div>

        <div className="w-[1px] h-6 opacity-10 bg-dark"></div>

        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-ellipsis text-tertiary">
            {t('title.totalStaked')}
          </p>

          <div className="h-6 lg:h-7"></div>
        </div>
      </div>
    </>
  )
}
