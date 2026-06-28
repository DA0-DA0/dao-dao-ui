import { VotingModuleAdapter } from '@dao-dao/types'
import { DAO_VOTING_CW721_ROLES_CONTRACT_NAMES } from '@dao-dao/utils'

const Placeholder = () => null

export const DaoVotingCw721RolesAdapter: VotingModuleAdapter = {
  id: 'DaoVotingCw721Roles',
  contractNames: DAO_VOTING_CW721_ROLES_CONTRACT_NAMES,

  load: () => ({
    // Hooks
    hooks: {
      useMainDaoInfoCards: () => [],
      useVotingModuleRelevantAddresses: () => [],
    },

    // Components
    components: {
      // TODO(cw721-roles): add role-aware Members and NFT Collection tabs once
      // generated dao-voting-cw721-roles query bindings exist.
      MainDaoInfoCardsLoader: Placeholder,
      ProfileCardMemberInfo: Placeholder,
    },

    // Functions
    fields: {},
  }),
}
