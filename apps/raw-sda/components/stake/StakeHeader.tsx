import { useTranslation } from 'react-i18next'

import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { useApr } from '@/hooks'

import { Loader } from '../Loader'
import { Logo } from '../Logo'

export const StakeHeader = () => {
  const { t } = useTranslation()
  const {
    hooks: { useGovernanceTokenInfo, useStakingInfo },
  } = useVotingModuleAdapter()

  const {
    governanceTokenInfo,
    treasuryBalance: treasuryBalance,
    price: governanceTokenPrice,
  } = useGovernanceTokenInfo?.({
    fetchTreasuryBalance: true,
    fetchUSDCPrice: true,
  }) ?? {}

  const { totalStakedValue } =
    useStakingInfo?.({
      fetchTotalStakedValue: true,
    }) ?? {}

  const apr = useApr()

  if (
    !governanceTokenInfo ||
    totalStakedValue === undefined ||
    treasuryBalance === undefined ||
    apr === undefined
  ) {
    return <StakeHeaderLoader />
  }

  return (
    <>
      <div className="absolute top-[0.1rem] w-full h-[1px] bg-primary"></div>
      <div className="absolute top-[0.4rem] w-full h-[1px] bg-primary"></div>

      <div className="flex absolute -top-16 justify-center items-center w-full border-b border-inactive">
        <div className="w-24 h-24 bg-light rounded-full border border-default">
          <Logo className="w-full h-full" />
        </div>
      </div>

      <p className="p-5 mt-12 w-full font-studiofeixen text-2xl  text-center border-t border-inactive">
        1 {governanceTokenInfo.symbol} =
        {governanceTokenPrice !== undefined
          ? ' $' +
            convertMicroDenomToDenomWithDecimals(governanceTokenPrice, governanceTokenInfo.decimals).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) +
            ' USDC'
          : // eslint-disable-next-line i18next/no-literal-string
            ' $ ??'}
      </p>

      <div className="flex flex-row justify-around items-center p-5 w-full text-center border-t border-inactive md:gap-12 md:justify-center">
        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            {t('title.daoTreasury')}
          </p>

          <p className="text-base lg:text-xl header-text">
            {convertMicroDenomToDenomWithDecimals(
              treasuryBalance,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{' '}
            {governanceTokenInfo.name}
          </p>
        </div>

        <div className="w-[1px] h-6 bg-dark opacity-10"></div>

        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            {t('title.totalStaked')}
          </p>

          <p className="text-base lg:text-xl header-text">
            {convertMicroDenomToDenomWithDecimals(
              totalStakedValue,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{' '}
            {governanceTokenInfo.name}
          </p>
        </div>

        <div className="w-[1px] h-6 bg-dark opacity-10"></div>

        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            {t('title.aprReward')}
          </p>

          <p className="text-base lg:text-xl header-text">
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

export const StakeHeaderLoader = () => {
  const { t } = useTranslation()

  return (
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
            {t('title.daoTreasury')}
          </p>

          <div className="h-6 lg:h-7"></div>
        </div>

        <div className="w-[1px] h-6 bg-dark opacity-10"></div>

        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            {t('title.totalStaked')}
          </p>

          <div className="h-6 lg:h-7"></div>
        </div>

        <div className="w-[1px] h-6 bg-dark opacity-10"></div>

        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            {t('title.aprReward')}
          </p>

          <div className="h-6 lg:h-7"></div>
        </div>
      </div>
    </>
  )
}
