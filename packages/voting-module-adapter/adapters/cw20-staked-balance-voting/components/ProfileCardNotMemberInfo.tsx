import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { useDaoInfoContext } from '@dao-dao/common'
import { poolsListSelector } from '@dao-dao/state'
import {
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
} from '@dao-dao/utils'

import { BaseProfileCardNotMemberInfoProps } from '../../../types'
import { useGovernanceTokenInfo, useStakingInfo } from '../hooks'
import { ProfileCardNotMemberInfo as StatelessProfileCardNotMemberInfo } from '../ui'
import { StakingModal } from './StakingModal'

export const ProfileCardNotMemberInfo = (
  props: BaseProfileCardNotMemberInfoProps
) => {
  const { t } = useTranslation()
  const { name: daoName } = useDaoInfoContext()

  const [showStakingModal, setShowStakingModal] = useState(false)

  const {
    governanceTokenAddress,
    governanceTokenInfo,
    walletBalance: unstakedBalance,
  } = useGovernanceTokenInfo({
    fetchWalletBalance: true,
  })

  // Search for governance token in junoswap pools list.
  const poolsList = useRecoilValue(poolsListSelector)
  const governanceTokenPoolSymbol = poolsList?.pools
    .flatMap(({ pool_assets }) => pool_assets)
    .find(
      ({ token_address }) => governanceTokenAddress === token_address
    )?.symbol

  const { walletStakedValue } = useStakingInfo({
    fetchClaims: true,
    fetchWalletStakedValue: true,
  })

  if (unstakedBalance === undefined || walletStakedValue === undefined) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <>
      {showStakingModal && (
        <StakingModal
          maxDeposit={props.deposit}
          onClose={() => setShowStakingModal(false)}
        />
      )}

      <StatelessProfileCardNotMemberInfo
        daoName={daoName}
        junoswapHref={
          governanceTokenPoolSymbol
            ? `https://junoswap.com/?from=${nativeTokenLabel(
                NATIVE_DENOM
              )}&to=${governanceTokenPoolSymbol}`
            : undefined
        }
        onStake={() => setShowStakingModal(true)}
        stakedTokenBalance={convertMicroDenomToDenomWithDecimals(
          walletStakedValue,
          governanceTokenInfo.decimals
        )}
        tokenDecimals={governanceTokenInfo.decimals}
        tokenSymbol={governanceTokenInfo.symbol}
        unstakedTokenBalance={convertMicroDenomToDenomWithDecimals(
          unstakedBalance,
          governanceTokenInfo.decimals
        )}
        {...props}
      />
    </>
  )
}
