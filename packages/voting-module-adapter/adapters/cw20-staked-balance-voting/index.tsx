import { Pie } from '@dao-dao/icons'
import { DurationUnits } from '@dao-dao/tstypes'
import { CW20STAKEDBALANCEVOTING_CONTRACT_NAME } from '@dao-dao/utils'

import { VotingModuleAdapter } from '../../types'
import {
  ClaimsPendingList,
  DaoInfoAdditionalAddresses,
  DaoInfoVotingConfiguration,
  DaoTreasuryFooter,
  Membership,
  MembershipMobileTab,
  ProfileCardNotMemberInfo,
  ProfileMemberCardMembershipInfo,
  ProposalCreationAdditionalAddresses,
  ProposalDetailsVotingPowerWidget,
  SdaMembershipPage,
  StakingModal,
  VoteHeroStats,
} from './components'
import {
  DisplayInfoIcon,
  GovernanceConfigurationInput,
  GovernanceConfigurationReview,
  UnstakingDurationVotingConfigItem,
  getInstantiateInfo,
} from './daoCreation'
import {
  useActions,
  useDaoInfoBarItems,
  useGovernanceTokenInfo,
  useStakingInfo,
} from './hooks'
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
        useDaoInfoBarItems,
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
        DaoTreasuryFooter,
        DaoInfoAdditionalAddresses,
        DaoInfoVotingConfiguration,
        ProposalCreationAdditionalAddresses,
        VoteHeroStats,
        SdaMembershipPage,
        ProfileMemberCardMembershipInfo,
        ProfileCardNotMemberInfo,

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
        tiers: [
          {
            name: '',
            weight: 10,
            members: [
              {
                address: '',
              },
            ],
          },
        ],
        tokenType: GovernanceTokenType.New,
        newInfo: {
          initialSupply: 10000000,
          initialTreasuryPercent: 90,
          symbol: '',
          name: '',
        },
        existingGovernanceTokenAddress: '',
        unstakingDuration: {
          value: 2,
          units: DurationUnits.Weeks,
        },
      },
      governanceConfig: {
        Input: GovernanceConfigurationInput,
        Review: GovernanceConfigurationReview,
      },
      votingConfig: {
        items: [UnstakingDurationVotingConfigItem],
      },
      getInstantiateInfo,
    },
  }
