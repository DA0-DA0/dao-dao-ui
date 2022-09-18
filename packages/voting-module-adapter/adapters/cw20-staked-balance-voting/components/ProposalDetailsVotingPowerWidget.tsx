import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { StakingMode } from '@dao-dao/ui'

import { BaseProposalDetailsVotingPowerWidgetProps } from '../../../types'
import { useGovernanceTokenInfo } from '../hooks'
import { StakingModal } from './StakingModal'

export const ProposalDetailsVotingPowerWidget = ({
  depositInfo,
}: BaseProposalDetailsVotingPowerWidgetProps) => {
  const { t } = useTranslation()
  const [showStaking, setShowStaking] = useState(false)

  const { governanceTokenAddress } = useGovernanceTokenInfo()

  return (
    <>
      <button className="underline" onClick={() => setShowStaking(true)}>
        {t('button.stakeTokensSuggestion')}
      </button>

      {showStaking && (
        <StakingModal
          initialMode={StakingMode.Stake}
          maxDeposit={
            depositInfo?.token === governanceTokenAddress
              ? depositInfo.deposit
              : undefined
          }
          onClose={() => setShowStaking(false)}
        />
      )}
    </>
  )
}
