import { atom, atomFamily } from 'recoil'

import { CwdProposalSingleAdapter } from '@dao-dao/proposal-module-adapter/adapters/CwdProposalSingle'
import { DaoCardProps, NewDao } from '@dao-dao/tstypes'
import { CwdVotingCw4Adapter } from '@dao-dao/voting-module-adapter'

import { localStorageEffectJSON } from '../effects'

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
export const createdDaoCardPropsAtom = atom<
  Omit<DaoCardProps, 'pinned' | 'onPin'> | undefined
>({
  key: 'createdDaoCardProps',
  default: undefined,
})
