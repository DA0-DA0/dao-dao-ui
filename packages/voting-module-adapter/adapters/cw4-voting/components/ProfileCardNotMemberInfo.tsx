import { useDaoInfoContext } from '@dao-dao/common'
import { BaseProfileCardNotMemberInfoProps } from '@dao-dao/tstypes'

import { ProfileCardNotMemberInfo as StatelessProfileCardNotMemberInfo } from '../ui/ProfileCardNotMemberInfo'

export const ProfileCardNotMemberInfo = (
  props: BaseProfileCardNotMemberInfoProps
) => {
  const { name } = useDaoInfoContext()

  return <StatelessProfileCardNotMemberInfo daoName={name} {...props} />
}
