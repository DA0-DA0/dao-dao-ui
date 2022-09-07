import { atom } from 'recoil'

import { CwProposalSingleAdapter } from '@dao-dao/proposal-module-adapter'
import { NewDao } from '@dao-dao/tstypes'
import { Cw4VotingAdapter } from '@dao-dao/voting-module-adapter'

export const DefaultNewDao: NewDao = {
  name: '',
  description: '',
  imageUrl: undefined,
  // Default to membership-based DAO.
  votingModuleAdapter: {
    id: Cw4VotingAdapter.id,
    data: Cw4VotingAdapter.daoCreation.defaultConfig,
  },
  // Default to single choice proposal configuration.
  proposalModuleAdapters: [
    {
      id: CwProposalSingleAdapter.id,
      data: CwProposalSingleAdapter.daoCreation.defaultConfig,
    },
  ],
  advancedVotingConfigEnabled: false,
}

export const newDaoAtom = atom<NewDao>({
  key: 'newDao',
  default: DefaultNewDao,
})
