import {
  DepositRefundPolicy,
  DurationUnits,
  ProposalModuleAdapter,
} from '@dao-dao/types'
import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'
import { NATIVE_TOKEN } from '@dao-dao/utils'

import {
  AllowRevotingVotingConfigItem,
  ProposalDepositVotingConfigItem,
  ProposalSubmissionPolicyVotingConfigItem,
  VotingDurationVotingConfigItem,
  makeQuorumVotingConfigItem,
} from '../common'
import {
  NewProposal,
  makeDepositInfoSelector,
  makeUseActions,
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
import { DaoCreationConfig, NewProposalForm } from './types'

export const DaoProposalMultipleAdapter: ProposalModuleAdapter<
  DaoCreationConfig,
  MultipleChoiceVote,
  NewProposalForm
> = {
  id: 'DaoProposalMultiple',
  contractNames: ['dao-proposal-multiple'],

  // TODO: Make common accessible somehow inside components and hooks via hooks?
  // Make react provider for this common object?
  loadCommon: (options) => {
    // Make here so we can pass into common hooks and components that need it.
    const depositInfoSelector = makeDepositInfoSelector({
      chainId: options.chainId,
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
      },

      // Selectors
      selectors: {
        reverseProposalInfos: (props) =>
          reverseProposalInfosSelector({
            chainId: options.chainId,
            proposalModuleAddress: options.proposalModule.address,
            proposalModulePrefix: options.proposalModule.prefix,
            ...props,
          }),
        depositInfo: depositInfoSelector,
      },

      // Hooks
      hooks: {
        useActions: makeUseActions(options),
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
    defaultConfig: {
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
        denomOrAddress: NATIVE_TOKEN.denomOrAddress,
        token: undefined,
        refundPolicy: DepositRefundPolicy.OnlyPassed,
      },
      anyoneCanPropose: false,
      allowRevoting: false,
    },

    votingConfig: {
      items: [VotingDurationVotingConfigItem, ProposalDepositVotingConfigItem],
      advancedItems: [
        AllowRevotingVotingConfigItem,
        makeQuorumVotingConfigItem({
          canBeDisabled: false,
        }),
        ProposalSubmissionPolicyVotingConfigItem,
      ],
      advancedWarningI18nKeys: [
        'daoCreationAdapter.DaoProposalMultiple.advancedWarning',
      ],
    },

    getInstantiateInfo,
  },
}
