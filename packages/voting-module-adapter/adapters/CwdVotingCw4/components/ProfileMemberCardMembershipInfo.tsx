import { useTranslation } from 'react-i18next'

import { useVotingModule } from '@dao-dao/state'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { ProfileMemberCardMembershipInfo as StatelessProfileMemberCardMembershipInfo } from '../ui/ProfileMemberCardMembershipInfo'

export const ProfileMemberCardMembershipInfo = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()

  const { walletVotingWeight, totalVotingWeight } = useVotingModule(
    coreAddress,
    {
      fetchMembership: true,
    }
  )

  if (walletVotingWeight === undefined || totalVotingWeight === undefined) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <StatelessProfileMemberCardMembershipInfo
      votingPower={(walletVotingWeight / totalVotingWeight) * 100}
    />
  )
}
