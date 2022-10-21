import { useTranslation } from 'react-i18next'

import { useVotingModule } from '@dao-dao/state'
import { useDaoInfoContext } from '@dao-dao/stateless'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { BaseProfileCardMemberInfoProps } from '../../../types'
import { ProfileCardMemberInfo as StatelessProfileCardMemberInfo } from '../ui/ProfileCardMemberInfo'

export const ProfileCardMemberInfo = ({
  deposit: _deposit,
  ...props
}: BaseProfileCardMemberInfoProps) => {
  const { t } = useTranslation()
  const { name: daoName } = useDaoInfoContext()
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
    <StatelessProfileCardMemberInfo
      daoName={daoName}
      votingPower={(walletVotingWeight / totalVotingWeight) * 100}
      {...props}
    />
  )
}
