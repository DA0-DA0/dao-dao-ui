import { useVotingModuleAdapterOptions } from '../../../react/context'
import { ProfileCardNoVoteBecomeMemberInfo as StatelessProfileCardNoVoteBecomeMemberInfo } from '../ui'

export const ProfileCardNoVoteBecomeMemberInfo = () => {
  const {} = useVotingModuleAdapterOptions()

  return <StatelessProfileCardNoVoteBecomeMemberInfo />
}
