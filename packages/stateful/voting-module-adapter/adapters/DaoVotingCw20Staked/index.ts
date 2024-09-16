import { PeopleAltOutlined, PeopleAltRounded } from '@mui/icons-material'

import { MainDaoInfoCardsTokenLoader } from '@dao-dao/stateless'
import {
  ActionCategoryKey,
  ActionKey,
  DaoTabId,
  VotingModuleAdapter,
} from '@dao-dao/types'
import {
  DAO_VOTING_CW20_STAKED_CONTRACT_NAMES,
  DaoVotingCw20StakedAdapterId,
  isSecretNetwork,
} from '@dao-dao/utils'

import { MintAction, UpdateStakingConfigAction } from './actions'
import { MembersTab, ProfileCardMemberInfo, StakingModal } from './components'
import { useMainDaoInfoCards, useVotingModuleRelevantAddresses } from './hooks'

export const DaoVotingCw20StakedAdapter: VotingModuleAdapter = {
  id: DaoVotingCw20StakedAdapterId,
  contractNames: DAO_VOTING_CW20_STAKED_CONTRACT_NAMES,

  load: ({ chainId }) => ({
    // Hooks
    hooks: {
      useMainDaoInfoCards,
      useVotingModuleRelevantAddresses,
    },

    // Components
    components: {
      MainDaoInfoCardsLoader: MainDaoInfoCardsTokenLoader,
      ProfileCardMemberInfo,
      StakingModal,

      // Can't view members on Secret Network.
      extraTabs: isSecretNetwork(chainId)
        ? undefined
        : [
            {
              id: DaoTabId.Members,
              labelI18nKey: 'title.members',
              Component: MembersTab,
              Icon: PeopleAltOutlined,
              IconFilled: PeopleAltRounded,
            },
          ],
    },

    // Functions
    fields: {
      actions: {
        actions: [MintAction, UpdateStakingConfigAction],
        categoryMakers: [
          // Add to DAO Governance category.
          () => ({
            key: ActionCategoryKey.DaoGovernance,
            actionKeys: [ActionKey.Mint, ActionKey.UpdateStakingConfig],
          }),
        ],
      },
    },
  }),
}
