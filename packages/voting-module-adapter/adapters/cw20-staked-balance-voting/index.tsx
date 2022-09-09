import { Pie } from '@dao-dao/icons'
import { DurationUnits } from '@dao-dao/tstypes'
import { CW20STAKEDBALANCEVOTING_CONTRACT_NAME } from '@dao-dao/utils'

import { VotingModuleAdapter } from '../../types'
import {
  ClaimsPendingList,
  DaoInfoAdditionalAddresses,
  DaoInfoVotingConfiguration,
  DaoThinInfoContent,
  DaoTreasuryFooter,
  Membership,
  MembershipMobileTab,
  ProfileCardNoVoteBecomeMemberInfo,
  ProfileMemberCardMembershipInfo,
  ProposalCreationAdditionalAddresses,
  ProposalDetailsVotingPowerWidget,
  SdaMembershipPage,
  StakingModal,
  VoteHeroStats,
} from './components'
import {
  DisplayInfoIcon,
  UnstakingDurationVotingConfigurationItem,
} from './daoCreation'
import { useActions, useGovernanceTokenInfo, useStakingInfo } from './hooks'
import { DaoCreationConfig, GovernanceTokenType } from './types'

export const Cw20StakedBalanceVotingAdapter: VotingModuleAdapter<DaoCreationConfig> =
  {
    id: CW20STAKEDBALANCEVOTING_CONTRACT_NAME,
    matcher: (contractName: string) =>
      contractName.includes(CW20STAKEDBALANCEVOTING_CONTRACT_NAME),

    load: ({ t }) => ({
      // Fields
      fields: {
        membershipPageInfo: {
          renderIcon: (mobile) => (
            <Pie height={mobile ? 16 : 14} width={mobile ? 16 : 14} />
          ),
          label: t('title.stake'),
        },
      },

      // Hooks
      hooks: {
        useActions,
        useGovernanceTokenInfo,
        useStakingInfo,
      },

      // Components
      components: {
        Membership: {
          Desktop: (props) => <Membership {...props} />,
          MobileTab: MembershipMobileTab,
          Mobile: (props) => <Membership {...props} primaryText />,
        },
        DaoThinInfoContent,
        DaoTreasuryFooter,
        DaoInfoAdditionalAddresses,
        DaoInfoVotingConfiguration,
        ProposalCreationAdditionalAddresses,
        VoteHeroStats,
        SdaMembershipPage,
        ProfileMemberCardMembershipInfo,
        ProfileCardNoVoteBecomeMemberInfo,

        ProposalDetailsVotingPowerWidget,
        StakingModal,
        ClaimsPendingList,
      },
    }),

    daoCreation: {
      displayInfo: {
        Icon: DisplayInfoIcon,
        nameI18nKey: 'daoCreationAdapter.cw20-staked-balance-voting.name',
        descriptionI18nKey:
          'daoCreationAdapter.cw20-staked-balance-voting.description',
        suppliesI18nKey:
          'daoCreationAdapter.cw20-staked-balance-voting.supplies',
        membershipI18nKey:
          'daoCreationAdapter.cw20-staked-balance-voting.membership',
      },
      defaultConfig: {
        type: GovernanceTokenType.New,
        newInfo: {
          initialSupply: 10000000,
          initialTreasuryPercent: 90,
          symbol: '',
          name: '',
        },
        unstakingDuration: {
          value: 2,
          units: DurationUnits.Weeks,
        },
      },
      GovernanceConfiguration: () => null,
      votingConfigurationItems: [UnstakingDurationVotingConfigurationItem],
    },
  }
