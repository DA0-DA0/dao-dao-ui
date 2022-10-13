/* eslint-disable @next/next/no-img-element */

import { useTranslation } from 'react-i18next'

import { useDaoInfoContext } from '@dao-dao/ui'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { BaseSdaMembershipPageProps } from '../../../../types'
import { useGovernanceTokenInfo, useStakingInfo } from '../../hooks'

interface StakeHeaderProps {
  defaultImageUrl: string
}

export const StakeHeader = ({ defaultImageUrl }: StakeHeaderProps) => {
  const { t } = useTranslation()
  const { imageUrl } = useDaoInfoContext()
  const { governanceTokenInfo, treasuryBalance: treasuryBalance } =
    useGovernanceTokenInfo({
      fetchTreasuryBalance: true,
    })
  const { totalStakedValue } = useStakingInfo({
    fetchTotalStakedValue: true,
  })

  if (totalStakedValue === undefined || treasuryBalance === undefined) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <>
      <div className="bg-primary absolute top-[0.1rem] h-[1px] w-full"></div>
      <div className="bg-primary absolute top-[0.4rem] h-[1px] w-full"></div>

      <div className="border-inactive absolute -top-16 flex w-full items-center justify-center border-b">
        <div className="bg-light border-default h-24 w-24 overflow-hidden rounded-full border">
          <img
            alt={t('info.logo')}
            className="h-full w-full"
            src={imageUrl ?? defaultImageUrl}
          />
        </div>
      </div>

      <div className="mt-8 flex w-full flex-row items-center justify-around p-5 text-center md:justify-center md:gap-12">
        <div className="flex flex-col items-center gap-2 p-2">
          <p className="text-tertiary overflow-hidden text-ellipsis font-mono text-sm">
            {t('title.daoTreasury')}
          </p>

          <p className="header-text text-base lg:text-xl">
            {convertMicroDenomToDenomWithDecimals(
              treasuryBalance,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{' '}
            ${governanceTokenInfo.symbol}
          </p>
        </div>

        <div className="bg-dark h-6 w-[1px] opacity-10"></div>

        <div className="flex flex-col items-center gap-2 p-2">
          <p className="text-tertiary overflow-hidden text-ellipsis font-mono text-sm">
            {t('title.totalStaked')}
          </p>

          <p className="header-text text-base lg:text-xl">
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
      <div className="bg-primary absolute top-[0.1rem] h-[1px] w-full"></div>
      <div className="bg-primary absolute top-[0.4rem] h-[1px] w-full"></div>

      <div className="border-inactive absolute -top-16 flex w-full items-center justify-center border-b">
        <div className="bg-light border-default h-24 w-24 rounded-full border">
          <Loader size="100%" />
        </div>
      </div>

      <div className="mt-8 flex w-full flex-row items-center justify-around p-5 text-center md:justify-center md:gap-12">
        <div className="flex flex-col items-center gap-2 p-2">
          <p className="text-tertiary overflow-hidden text-ellipsis font-mono text-sm">
            {t('title.daoTreasury')}
          </p>

          <div className="h-6 lg:h-7"></div>
        </div>

        <div className="bg-dark h-6 w-[1px] opacity-10"></div>

        <div className="flex flex-col items-center gap-2 p-2">
          <p className="text-tertiary overflow-hidden text-ellipsis font-mono text-sm">
            {t('title.totalStaked')}
          </p>

          <div className="h-6 lg:h-7"></div>
        </div>
      </div>
    </>
  )
}
