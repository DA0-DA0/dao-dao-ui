import { PeopleAltOutlined, PeopleAltRounded } from '@mui/icons-material'

import { MainDaoInfoCardsTokenLoader } from '@dao-dao/stateless'
import {
  ActionCategoryKey,
  DaoTabId,
  VotingModuleAdapter,
} from '@dao-dao/types'
import {
  DAO_VOTING_TOKEN_STAKED_CONTRACT_NAMES,
  DaoVotingTokenStakedAdapterId,
  isSecretNetwork,
} from '@dao-dao/utils'

import {
  makeMigrateMigalooV4TokenFactoryAction,
  makeMintAction,
  makeUpdateMinterAllowanceAction,
  makeUpdateStakingConfigAction,
} from './actions'
import { MembersTab, ProfileCardMemberInfo, StakingModal } from './components'
import { useCommonGovernanceTokenInfo, useMainDaoInfoCards } from './hooks'

export const DaoVotingTokenStakedAdapter: VotingModuleAdapter = {
  id: DaoVotingTokenStakedAdapterId,
  contractNames: DAO_VOTING_TOKEN_STAKED_CONTRACT_NAMES,

  load: ({ chainId }) => ({
    // Hooks
    hooks: {
      useMainDaoInfoCards,
      useVotingModuleRelevantAddresses: () => [],
      useCommonGovernanceTokenInfo,
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
      actionCategoryMakers: [
        () => ({
          // Add to Commonly Used category.
          key: ActionCategoryKey.CommonlyUsed,
          actionMakers: [makeMigrateMigalooV4TokenFactoryAction],
        }),
        () => ({
          // Add to DAO Governance category.
          key: ActionCategoryKey.DaoGovernance,
          actionMakers: [
            makeMintAction,
            makeUpdateMinterAllowanceAction,
            makeUpdateStakingConfigAction,
            makeMigrateMigalooV4TokenFactoryAction,
          ],
        }),
      ],
    },
  }),
}
