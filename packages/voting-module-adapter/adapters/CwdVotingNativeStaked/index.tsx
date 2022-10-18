import { VotingModuleAdapter } from '../../types'
import { ProfileCardMemberInfo } from './components'
import {
  useActions,
  useDaoInfoBarItems,
  useGovernanceTokenInfo,
  useStakingInfo,
} from './hooks'

export const CwdVotingNativeStakedAdapter: VotingModuleAdapter = {
  id: 'CwdVotingNativeStaked',
  contractNames: [
    // V1
    'cw-native-staked-balance-voting',
    // V2
    'cwd-voting-native-staked',
  ],

  load: () => ({
    // Hooks
    hooks: {
      useActions,
      useDaoInfoBarItems,
      useProfileNewProposalCardAddresses: () => [],
      useGovernanceTokenInfo,
      useStakingInfo,
    },

    // Components
    components: {
      ProfileCardMemberInfo,
    },
  }),
}
