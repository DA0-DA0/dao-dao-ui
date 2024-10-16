import { PeopleAltOutlined, PeopleAltRounded } from '@mui/icons-material'

import { DaoTabId, VotingModuleAdapter } from '@dao-dao/types'
import {
  NEUTRON_VOTING_REGISTRY_CONTRACT_NAMES,
  NeutronVotingRegistryAdapterId,
} from '@dao-dao/utils'

import { MainDaoInfoCardsLoader, ProfileCardMemberInfo } from './components'
import { VaultsTab } from './components/VaultsTab'
import { useMainDaoInfoCards } from './hooks'

export const NeutronVotingRegistryAdapter: VotingModuleAdapter = {
  id: NeutronVotingRegistryAdapterId,
  contractNames: NEUTRON_VOTING_REGISTRY_CONTRACT_NAMES,

  load: () => ({
    // Hooks
    hooks: {
      useMainDaoInfoCards,
      useVotingModuleRelevantAddresses: () => [],
    },

    // Components
    components: {
      extraTabs: [
        {
          id: DaoTabId.Vaults,
          labelI18nKey: 'title.votingVaults',
          Component: VaultsTab,
          Icon: PeopleAltOutlined,
          IconFilled: PeopleAltRounded,
        },
      ],

      MainDaoInfoCardsLoader: MainDaoInfoCardsLoader,
      ProfileCardMemberInfo,
    },

    // Fields
    fields: {},
  }),
}
