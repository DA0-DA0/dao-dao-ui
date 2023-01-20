import {
  DepositRefundPolicy,
  DurationUnits,
  ProposalModuleAdapter,
} from '@dao-dao/types'
import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'

import { getInstantiateInfo } from '../DaoProposalSingle/daoCreation/getInstantiateInfo'
import {
  NewProposal,
  makeDepositInfoSelector,
  makeUseActions,
  makeUseProfileNewProposalCardInfoLines,
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
import { fetchPreProposeAddress, makeGetProposalInfo } from './functions'
import {
  useCastVote,
  useLoadingProposalExecutionTxHash,
  useLoadingWalletVoteInfo,
  useProposalRefreshers,
  useVoteOptions,
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
            depositInfoSelector={depositInfoSelector}
            options={options}
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
      useVoteOptions,
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
      threshold: {
        majority: true,
        value: 75,
      },
      quorumEnabled: true,
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
        cw20Address: '',
        cw20TokenInfo: undefined,
        refundPolicy: DepositRefundPolicy.OnlyPassed,
      },
      allowRevoting: false,
    },

    // TODO: reconcile daoCreation for both adapters
    votingConfig: {
      items: [],
      advancedItems: [],
      advancedWarningI18nKeys: [],
    },
    getInstantiateInfo,
  },
}
