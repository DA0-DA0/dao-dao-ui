import { BaseProfileCardNotMemberInfoProps } from '@dao-dao/tstypes'
import { useDaoInfoContext } from '@dao-dao/ui'

import { ProfileCardNotMemberInfo as StatelessProfileCardNotMemberInfo } from '../ui/ProfileCardNotMemberInfo'

export const ProfileCardNotMemberInfo = (
  props: BaseProfileCardNotMemberInfoProps
) => {
  const { name: name } = useDaoInfoContext()

  return <StatelessProfileCardNotMemberInfo daoName={name} {...props} />
}
