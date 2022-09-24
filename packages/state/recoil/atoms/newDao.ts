import { atomFamily } from 'recoil'

import { CwProposalSingleAdapter } from '@dao-dao/proposal-module-adapter/adapters/cw-proposal-single'
import { NewDao } from '@dao-dao/tstypes'
import { Cw4VotingAdapter } from '@dao-dao/voting-module-adapter'

import { localStorageEffectJSON } from '../effects'

export const DefaultNewDao: NewDao = {
  name: '',
  description: '',
  imageUrl: undefined,
  votingModuleAdapter: {
    id: Cw4VotingAdapter.id,
    data: Cw4VotingAdapter.daoCreation!.defaultConfig,
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

// Store each subDAO creation state separately. Main DAO creation state uses an
// empty string.
export const newDaoAtom = atomFamily<NewDao, string>({
  key: 'newDao',
  default: DefaultNewDao,
  effects: [localStorageEffectJSON],
})
