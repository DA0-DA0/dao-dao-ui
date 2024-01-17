import { DaoMemberCard as StatelessDaoMemberCard } from '@dao-dao/stateless'
import { StatefulDaoMemberCardProps } from '@dao-dao/types/components/DaoMemberCard'

import { useEntity } from '../../hooks'
import { ButtonLink } from '../ButtonLink'

export const DaoMemberCard = (props: StatefulDaoMemberCardProps) => {
  const loadingEntity = useEntity(props.address)

  return (
    <StatelessDaoMemberCard
      {...props}
      ButtonLink={ButtonLink}
      loadingEntity={loadingEntity}
    />
  )
}
