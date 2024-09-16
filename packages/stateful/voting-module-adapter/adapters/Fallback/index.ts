import { Loader } from '@dao-dao/stateless'
import { VotingModuleAdapter } from '@dao-dao/types'

import { Placeholder } from './Placeholder'

// Used in case no voting module adapter applies so that it still loads.
export const FallbackAdapter: VotingModuleAdapter = {
  id: 'Fallback',
  // Fallback logic manually configured in core.ts
  contractNames: [],

  load: () => ({
    // Hooks
    hooks: {
      useMainDaoInfoCards: () => [],
      useVotingModuleRelevantAddresses: () => [],
    },

    // Components
    components: {
      ProfileCardMemberInfo: Placeholder,
      MainDaoInfoCardsLoader: Loader,
    },

    // Functions
    fields: {},
  }),
}
