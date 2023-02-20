import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { DaoVotingCw20StakedSelectors } from '@dao-dao/state/recoil'
import { MembersTab as StatelessMembersTab } from '@dao-dao/stateless'
import { StatefulDaoMemberCardProps } from '@dao-dao/types'

import {
  ButtonLink,
  DaoMemberCard,
  EntityDisplay,
} from '../../../../components'
import { useVotingModuleAdapterOptions } from '../../../react/context'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const topStakers =
    useRecoilValue(
      DaoVotingCw20StakedSelectors.topStakersSelector({
        contractAddress: votingModuleAddress,
      })
    ) ?? []

  const memberCards: StatefulDaoMemberCardProps[] = topStakers.map(
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
      topVoters={{
        title: t('title.topStakers'),
        otherTitle: t('title.otherStakers'),
        EntityDisplay,
      }}
    />
  )
}
