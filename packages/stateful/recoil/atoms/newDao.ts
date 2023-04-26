import { atom, atomFamily } from 'recoil'

import { localStorageEffectJSON } from '@dao-dao/state/recoil/effects'
import {
  DaoCreatedCardProps,
  DepositRefundPolicy,
  DurationUnits,
  NewDao,
} from '@dao-dao/types'
import {
  CHAIN_ID,
  DaoProposalMultipleAdapterId,
  DaoProposalSingleAdapterId,
  DaoVotingCw4AdapterId,
  getNativeTokenForChainId,
} from '@dao-dao/utils'

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
    id: DaoVotingCw4AdapterId,
    data: DaoVotingCw4Adapter.daoCreation!.defaultConfig,
  },
  // Default to single and multiple choice proposal configuration.
  proposalModuleAdapters: [
    {
      id: DaoProposalSingleAdapterId,
      data:
        DaoProposalSingleAdapter.daoCreation.extraVotingConfig?.default ?? {},
    },
    {
      id: DaoProposalMultipleAdapterId,
      data:
        DaoProposalMultipleAdapter.daoCreation.extraVotingConfig?.default ?? {},
    },
  ],
  votingConfig: {
    quorum: {
      majority: false,
      value: 20,
    },
    votingDuration: {
      value: 1,
      units: DurationUnits.Weeks,
    },
    proposalDeposit: {
      enabled: false,
      amount: 10,
      type: 'native',
      denomOrAddress: getNativeTokenForChainId(CHAIN_ID).denomOrAddress,
      token: undefined,
      refundPolicy: DepositRefundPolicy.OnlyPassed,
    },
    anyoneCanPropose: false,
    allowRevoting: false,
    enableMultipleChoice: false,
  },
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
