import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useDaoInfoContext } from '@dao-dao/ui'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

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

  const { governanceTokenInfo, walletBalance: unstakedBalance } =
    useGovernanceTokenInfo({
      fetchWalletBalance: true,
    })

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
