import { useVotingModuleAdapterOptions } from '../../../react/context'
import { ProfileMemberCardMembershipInfo as StatelessProfileMemberCardMembershipInfo } from '../ui'

export const ProfileMemberCardMembershipInfo = () => {
  const {} = useVotingModuleAdapterOptions()

  return <StatelessProfileMemberCardMembershipInfo />
}
