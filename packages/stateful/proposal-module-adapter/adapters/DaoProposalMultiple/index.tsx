import { ProposalModuleAdapter } from '@dao-dao/types'
import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'
import { DaoProposalMultipleAdapterId } from '@dao-dao/utils'

import {
  NewProposal,
  makeActionCategoryMakers,
  makeDepositInfoSelector,
  makeUseProfileNewProposalCardInfoLines,
  makeUsePublishProposal,
  reverseProposalInfosSelector,
} from './common'
import {
  ProposalInnerContentDisplay,
  ProposalLine,
  ProposalStatusAndInfo,
  ProposalVoteTally,
  ProposalVotes,
  ProposalWalletVote,
} from './components'
import { getInstantiateInfo } from './daoCreation'
import { fetchPreProposeAddress, makeGetProposalInfo } from './functions'
import {
  useCastVote,
  useLoadingProposalExecutionTxHash,
  useLoadingVoteOptions,
  useLoadingWalletVoteInfo,
  useProposalRefreshers,
} from './hooks'
import { NewProposalForm } from './types'

export const DaoProposalMultipleAdapter: ProposalModuleAdapter<
  {},
  MultipleChoiceVote,
  NewProposalForm
> = {
  id: DaoProposalMultipleAdapterId,
  contractNames: ['dao-proposal-multiple'],

  loadCommon: (options) => {
    // Make here so we can pass into common hooks and components that need it.
    const depositInfoSelector = makeDepositInfoSelector({
      chainId: options.chain.chain_id,
      proposalModuleAddress: options.proposalModule.address,
      version: options.proposalModule.version,
      preProposeAddress: options.proposalModule.preProposeAddress,
    })

    const usePublishProposal = makeUsePublishProposal({
      options,
      depositInfoSelector,
    })

    return {
      // Fields
      fields: {
        makeDefaultNewProposalForm: () => ({
          title: '',
          description: '',
          choices: [],
        }),
        newProposalFormTitleKey: 'title',
        actionCategoryMakers: makeActionCategoryMakers(options),
      },

      // Selectors
      selectors: {
        reverseProposalInfos: (props) =>
          reverseProposalInfosSelector({
            chainId: options.chain.chain_id,
            proposalModuleAddress: options.proposalModule.address,
            proposalModulePrefix: options.proposalModule.prefix,
            ...props,
          }),
        depositInfo: depositInfoSelector,
      },

      // Hooks
      hooks: {
        useProfileNewProposalCardInfoLines:
          makeUseProfileNewProposalCardInfoLines({
            options,
            depositInfoSelector,
          }),
      },

      // Components
      components: {
        NewProposal: (props) => (
          <NewProposal
            options={options}
            usePublishProposal={usePublishProposal}
            {...props}
          />
        ),
      },
    }
  },

  load: (options) => ({
    // Functions
    functions: {
      getProposalInfo: makeGetProposalInfo(options),
    },

    // Hooks
    hooks: {
      useCastVote,
      useProposalRefreshers,
      useLoadingProposalExecutionTxHash,
      useLoadingVoteOptions,
      useLoadingWalletVoteInfo,
    },

    // Components
    components: {
      ProposalStatusAndInfo,
      ProposalInnerContentDisplay,
      ProposalWalletVote,
      ProposalVotes,
      ProposalVoteTally,
      ProposalLine,
    },
  }),

  queries: {
    proposalCount: {
      indexerFormula: 'daoProposalMultiple/proposalCount',
      cosmWasmQuery: {
        proposal_count: {},
      },
    },
  },

  functions: {
    fetchPreProposeAddress,
  },

  daoCreation: {
    getInstantiateInfo,
  },
}
