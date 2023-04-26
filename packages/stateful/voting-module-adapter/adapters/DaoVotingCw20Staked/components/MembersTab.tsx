import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { DaoVotingCw20StakedSelectors } from '@dao-dao/state/recoil'
import { MembersTab as StatelessMembersTab, useChain } from '@dao-dao/stateless'
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
  const { chain_id: chainId } = useChain()
  const { votingModuleAddress } = useVotingModuleAdapterOptions()
  const { token } = useGovernanceTokenInfo()

  const topStakers = useRecoilValue(
    DaoVotingCw20StakedSelectors.topStakersSelector({
      chainId,
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
