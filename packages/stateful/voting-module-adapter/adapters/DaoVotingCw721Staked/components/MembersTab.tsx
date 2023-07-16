import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { DaoVotingCw721StakedSelectors } from '@dao-dao/state/recoil'
import { MembersTab as StatelessMembersTab, useChain } from '@dao-dao/stateless'
import { StatefulDaoMemberCardProps } from '@dao-dao/types'

import {
  ButtonLink,
  DaoMemberCard,
  EntityDisplay,
} from '../../../../components'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useGovernanceCollectionInfo } from '../hooks'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const { votingModuleAddress } = useVotingModuleAdapterOptions()
  const { collectionInfo } = useGovernanceCollectionInfo()

  const topStakers = useRecoilValue(
    DaoVotingCw721StakedSelectors.topStakersSelector({
      chainId,
      contractAddress: votingModuleAddress,
    })
  )

  const memberCards: StatefulDaoMemberCardProps[] = (topStakers ?? []).map(
    ({ address, count, votingPowerPercent }) => ({
      address,
      balance: {
        label: t('title.staked'),
        unit: '$' + collectionInfo.symbol,
        value: {
          loading: false,
          data: count.toLocaleString(),
        },
      },
      votingPowerPercent: {
        loading: false,
        data: votingPowerPercent,
      },
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
