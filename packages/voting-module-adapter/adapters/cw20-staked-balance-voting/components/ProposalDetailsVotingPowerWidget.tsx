import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ConnectWalletButton, StakingModal } from '@dao-dao/common'
import { StakingMode } from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { BaseProposalDetailsVotingPowerWidgetProps } from '../../../types'

export const ProposalDetailsVotingPowerWidget = ({
  depositInfo,
}: BaseProposalDetailsVotingPowerWidgetProps) => {
  const { t } = useTranslation()
  const { coreAddress, Loader } = useVotingModuleAdapterOptions()
  const [showStaking, setShowStaking] = useState(false)

  return (
    <>
      <button className="underline" onClick={() => setShowStaking(true)}>
        {t('button.stakeTokensSuggestion')}
      </button>

      {showStaking && (
        <StakingModal
          connectWalletButton={<ConnectWalletButton />}
          coreAddress={coreAddress}
          deposit={depositInfo?.deposit}
          loader={<Loader />}
          mode={StakingMode.Stake}
          onClose={() => setShowStaking(false)}
        />
      )}
    </>
  )
}
