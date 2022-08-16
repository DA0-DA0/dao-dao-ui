import { useWalletManager } from '@noahsaso/cosmodal'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { Trans } from '@dao-dao/common'
import {
  convertMicroDenomToDenomWithDecimals,
  formatPercentOf100,
} from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { Button } from '../Button'
import { Loader } from '../Loader'
import { Logo } from '../Logo'

interface CardProps {
  setShowStakingMode: () => void
}

export const UnstakedBalanceCard: FunctionComponent<CardProps> = ({
  setShowStakingMode,
}) => {
  const { t } = useTranslation()
  const {
    hooks: { useGovernanceTokenInfo },
  } = useVotingModuleAdapter()
  const { connected } = useWalletManager()
  const {
    governanceTokenInfo,
    walletBalance: _unstakedBalance,
    price,
  } = useGovernanceTokenInfo?.({
    fetchWalletBalance: true,
    fetchUSDCPrice: true,
  }) ?? {}

  if (!governanceTokenInfo || (connected && _unstakedBalance === undefined)) {
    return <BalanceCardLoader />
  }

  const unstakedBalance = convertMicroDenomToDenomWithDecimals(
    _unstakedBalance ?? 0,
    governanceTokenInfo.decimals
  )

  return (
    <>
      <div className="flex flex-row gap-2 items-center mb-4">
        <Logo size={20} />
        <p className="text-base">
          {unstakedBalance.toLocaleString(undefined, {
            maximumFractionDigits: governanceTokenInfo.decimals,
          })}{' '}
          {governanceTokenInfo.name}
        </p>
      </div>

      <div className="flex flex-row flex-wrap justify-between items-center">
        {price && (
          <p className="text-lg font-medium">
            ${' '}
            {(unstakedBalance * price).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{' '}
            USD
          </p>
        )}

        <Button
          className="text-base"
          disabled={!connected}
          onClick={setShowStakingMode}
          variant="secondary"
        >
          {t('button.manage')}
        </Button>
      </div>
    </>
  )
}

export const StakedBalanceCard: FunctionComponent<CardProps> = ({
  setShowStakingMode,
}) => {
  const { t } = useTranslation()
  const {
    hooks: { useGovernanceTokenInfo, useStakingInfo },
  } = useVotingModuleAdapter()
  const { connected } = useWalletManager()
  const { governanceTokenInfo, price } =
    useGovernanceTokenInfo?.({
      fetchUSDCPrice: true,
    }) ?? {}
  const { totalStakedValue, walletStakedValue } =
    useStakingInfo?.({
      fetchTotalStakedValue: true,
      fetchWalletStakedValue: true,
    }) ?? {}

  if (
    !governanceTokenInfo ||
    totalStakedValue === undefined ||
    (connected && walletStakedValue === undefined)
  ) {
    return <BalanceCardLoader />
  }

  const stakedValue = convertMicroDenomToDenomWithDecimals(
    walletStakedValue ?? 0,
    governanceTokenInfo.decimals
  )

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex flex-row gap-2 items-center">
          <Logo size={20} />
          <p className="text-base">
            {stakedValue.toLocaleString(undefined, {
              maximumFractionDigits: governanceTokenInfo.decimals,
            })}{' '}
            {governanceTokenInfo.name}
          </p>
        </div>

        <p className="text-base text-secondary">
          <Trans Loader={Loader} i18nKey="info.percentOfAllVotingPower">
            {{
              percent: formatPercentOf100(
                totalStakedValue === 0
                  ? 0
                  : ((walletStakedValue ?? 0) / totalStakedValue) * 100
              ),
            }}{' '}
            <span className="text-xs text-tertiary">of all voting power</span>
          </Trans>
        </p>
      </div>

      <div className="flex flex-row flex-wrap justify-between items-center">
        {price && (
          <p className="text-lg font-medium">
            ${' '}
            {(stakedValue * price).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{' '}
            USD
          </p>
        )}

        <Button
          className="text-base"
          disabled={!connected}
          onClick={setShowStakingMode}
          variant="secondary"
        >
          {t('button.manage')}
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
