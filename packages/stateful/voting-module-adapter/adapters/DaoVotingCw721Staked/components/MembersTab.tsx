import { useRecoilValue } from 'recoil'

import { DaoVotingCw721StakedSelectors } from '@dao-dao/state/recoil'
import { MembersTab as StatelessMembersTab } from '@dao-dao/stateless'
import { StatefulDaoMemberCardProps } from '@dao-dao/types'

import {
  ButtonLink,
  DaoMemberCard,
  EntityDisplay,
} from '../../../../components'
import { useVotingModuleAdapterOptions } from '../../../react/context'

export const MembersTab = () => {
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const topStakers = useRecoilValue(
    DaoVotingCw721StakedSelectors.topStakersSelector({
      contractAddress: votingModuleAddress,
    })
  )

  const memberCards: StatefulDaoMemberCardProps[] = (topStakers ?? []).map(
    ({ address, votingPowerPercent }) => ({
      address,
      votingPowerPercent: { loading: false, data: votingPowerPercent },
    })
  )

  return (
    <StatelessMembersTab
      ButtonLink={ButtonLink}
      DaoMemberCard={DaoMemberCard}
      isMember={false}
      members={memberCards}
      membersFailedToLoad={!topStakers}
      topVoters={{
        show: true,
        EntityDisplay,
      }}
    />
  )
}
