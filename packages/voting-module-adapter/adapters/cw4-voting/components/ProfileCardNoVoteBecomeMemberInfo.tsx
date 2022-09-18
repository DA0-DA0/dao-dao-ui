import { useDaoInfoContext } from '@dao-dao/common'

import { ProfileCardNoVoteBecomeMemberInfo as StatelessProfileCardNoVoteBecomeMemberInfo } from '../ui/ProfileCardNoVoteBecomeMemberInfo'

export const ProfileCardNoVoteBecomeMemberInfo = () => {
  const { name } = useDaoInfoContext()

  return <StatelessProfileCardNoVoteBecomeMemberInfo daoName={name} />
}
