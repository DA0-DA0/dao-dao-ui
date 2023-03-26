import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { DaoVotingNativeStakedSelectors } from '@dao-dao/state/recoil'
import { MembersTab as StatelessMembersTab } from '@dao-dao/stateless'
import { StatefulDaoMemberCardProps } from '@dao-dao/types'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import {
  ButtonLink,
  DaoMemberCard,
  EntityDisplay,
} from '../../../../components'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useGovernanceTokenInfo } from '../hooks/useGovernanceTokenInfo'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { votingModuleAddress } = useVotingModuleAdapterOptions()
  const { token } = useGovernanceTokenInfo()

  const topStakers = useRecoilValue(
    DaoVotingNativeStakedSelectors.topStakersSelector({
      contractAddress: votingModuleAddress,
    })
  )

  const memberCards: StatefulDaoMemberCardProps[] = (topStakers ?? []).map(
    ({ address, balance, votingPowerPercent }) => ({
      address,
      balance: {
        label: t('title.staked'),
        unit: '$' + token.symbol,
        value: {
          loading: false,
          data: convertMicroDenomToDenomWithDecimals(
            balance,
            token.decimals
          ).toLocaleString(undefined, {
            maximumFractionDigits: token.decimals,
          }),
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
