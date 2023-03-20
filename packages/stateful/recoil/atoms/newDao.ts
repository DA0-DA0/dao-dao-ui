import { atom, atomFamily } from 'recoil'

import { localStorageEffectJSON } from '@dao-dao/state/recoil/effects'
import { DaoCreatedCardProps, NewDao } from '@dao-dao/types'

import {
  DaoProposalMultipleAdapter,
  DaoProposalSingleAdapter,
} from '../../proposal-module-adapter'
import { DaoVotingCw4Adapter } from '../../voting-module-adapter'

// Avoid cyclic dependencies issues with the adapter modules by using a lazy
// maker function.
export const makeDefaultNewDao = (): NewDao => ({
  name: '',
  description: '',
  imageUrl: undefined,
  votingModuleAdapter: {
    id: DaoVotingCw4Adapter.id,
    data: DaoVotingCw4Adapter.daoCreation!.defaultConfig,
  },
  // Default to single and multiple choice proposal configuration.
  proposalModuleAdapters: [
    {
      id: DaoProposalSingleAdapter.id,
      data: DaoProposalSingleAdapter.daoCreation.defaultConfig,
    },
    {
      id: DaoProposalMultipleAdapter.id,
      data: DaoProposalMultipleAdapter.daoCreation.defaultConfig,
    },
  ],
  advancedVotingConfigEnabled: false,
})

// Store each subDAO creation state separately. Main DAO creation state uses an
// empty string.
export const newDaoAtom = atomFamily<NewDao, string>({
  key: 'newDao',
  default: makeDefaultNewDao,
  effects: [localStorageEffectJSON],
})

// When set, shows DAO created modal with these props for the DaoCard shown.
export const daoCreatedCardPropsAtom = atom<DaoCreatedCardProps | undefined>({
  key: 'daoCreatedCardProps',
  default: undefined,
})
