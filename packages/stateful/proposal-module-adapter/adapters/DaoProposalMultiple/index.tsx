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
import { CONTRACT_NAMES } from './constants'
import { getInstantiateInfo } from './daoCreation'
import { fetchPrePropose, makeGetProposalInfo } from './functions'
import {
  useCastVote,
  useLoadingProposalExecutionTxHash,
  useLoadingVoteOptions,
  useLoadingWalletVoteInfo,
  useProposalRefreshers,
} from './hooks'
import { DaoCreationExtraVotingConfig, NewProposalForm } from './types'

export const DaoProposalMultipleAdapter: ProposalModuleAdapter<
  DaoCreationExtraVotingConfig,
  MultipleChoiceVote,
  NewProposalForm
> = {
  id: DaoProposalMultipleAdapterId,
  contractNames: CONTRACT_NAMES,

  loadCommon: (options) => {
    // Make here so we can pass into common hooks and components that need it.
    const depositInfoSelector = makeDepositInfoSelector({
      chainId: options.chain.chain_id,
      proposalModuleAddress: options.proposalModule.address,
      version: options.proposalModule.version,
      preProposeAddress: options.proposalModule.prePropose?.address ?? null,
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
      // No multiple choice approval flow yet.
      useLoadingPreProposeApprovalProposer: () => ({
        loading: false,
        data: undefined,
      }),
    },

    // Components
    components: {
      ProposalStatusAndInfo,
      ProposalInnerContentDisplay,
      // No multiple choice approval flow yet.
      PreProposeApprovalInnerContentDisplay: () => null,
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
    fetchPrePropose,
  },

  daoCreation: {
    getInstantiateInfo,
  },
}
