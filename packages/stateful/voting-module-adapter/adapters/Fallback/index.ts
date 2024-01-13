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
      useDaoInfoBarItems: () => [],
      useProfileNewProposalCardAddresses: () => [],
    },

    // Components
    components: {
      ProfileCardMemberInfo: Placeholder,
      DaoInfoBarLoader: Loader,
    },

    // Functions
    fields: {
      actionCategoryMakers: [],
    },
  }),
}
