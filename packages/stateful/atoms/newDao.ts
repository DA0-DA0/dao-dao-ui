import { atom, atomFamily } from 'recoil'

import { localStorageEffectJSON } from '@dao-dao/state/recoil/effects'
import { DaoCreatedCardProps, NewDao } from '@dao-dao/types'

import { CwdProposalSingleAdapter } from '../proposal-module-adapter/adapters/CwdProposalSingle'
import { CwdVotingCw4Adapter } from '../voting-module-adapter'

export const DefaultNewDao: NewDao = {
  name: '',
  description: '',
  imageUrl: undefined,
  votingModuleAdapter: {
    id: CwdVotingCw4Adapter.id,
    data: CwdVotingCw4Adapter.daoCreation!.defaultConfig,
  },
  // Default to single choice proposal configuration.
  proposalModuleAdapters: [
    {
      id: CwdProposalSingleAdapter.id,
      data: CwdProposalSingleAdapter.daoCreation.defaultConfig,
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

// When set, shows DAO created modal with these props for the DaoCard shown.
export const daoCreatedCardPropsAtom = atom<DaoCreatedCardProps | undefined>({
  key: 'daoCreatedCardProps',
  default: undefined,
})
