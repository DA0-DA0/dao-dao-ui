import { useTranslation } from 'react-i18next'

import { useVotingModule } from '@dao-dao/state'
import { useDaoInfoContext } from '@dao-dao/stateless'
import { BaseProfileCardMemberInfoProps } from '@dao-dao/types'

import { useVotingModuleAdapterOptions } from '../../../react/context'
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

  if (totalVotingWeight === undefined) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <StatelessProfileCardMemberInfo
      {...props}
      daoName={daoName}
      votingPower={
        walletVotingWeight === undefined
          ? { loading: true }
          : {
              loading: false,
              data: (walletVotingWeight / totalVotingWeight) * 100,
            }
      }
    />
  )
}
