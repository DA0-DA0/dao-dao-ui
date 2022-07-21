import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { StakingMode } from '@dao-dao/ui'

import { BaseProposalDetailsVotingPowerWidgetProps } from '../../../types'
import { StakingModal } from './StakingModal'

export const ProposalDetailsVotingPowerWidget = ({
  depositInfo,
}: BaseProposalDetailsVotingPowerWidgetProps) => {
  const { t } = useTranslation()
  const [showStaking, setShowStaking] = useState(false)

  return (
    <>
      <button className="underline" onClick={() => setShowStaking(true)}>
        {t('button.stakeTokensSuggestion')}
      </button>

      {showStaking && (
        <StakingModal
          deposit={depositInfo?.deposit}
          mode={StakingMode.Stake}
          onClose={() => setShowStaking(false)}
        />
      )}
    </>
  )
}
