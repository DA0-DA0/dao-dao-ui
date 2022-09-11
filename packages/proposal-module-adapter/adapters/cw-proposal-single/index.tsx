import { DurationUnits } from '@dao-dao/tstypes'
import { CWPROPOSALSINGLE_CONTRACT_NAME } from '@dao-dao/utils'

import { ProposalModuleAdapter } from '../../types'
import {
  DaoInfoVotingConfiguration,
  NewProposal,
  ProposalModuleInfo,
  makeUseActions,
  makeUseDepositInfo,
  makeUseListAllProposalInfos,
  makeUseProposalCount,
  makeUseReverseProposalInfos,
} from './common'
import {
  PinnedProposalLineDesktop,
  PinnedProposalLineMobile,
  ProposalDetails,
  ProposalInfoCard,
  ProposalLine,
  ProposalVoteDecisionStatus,
  ProposalVotes,
} from './components'
import {
  AllowRevotingVotingConfigItem,
  ProposalDepositVotingConfigItem,
  QuorumVotingConfigItem,
  ThresholdVotingConfigItem,
  VotingDurationVotingConfigItem,
} from './daoCreation'
import { makeGetProposalInfo } from './functions'
import {
  useProfileVoteCardOptions,
  useProposalExecutionTxHash,
  useProposalExpirationString,
  useProposalProcessedTQ,
  useProposalRefreshers,
} from './hooks'
import { DaoCreationConfig } from './types'

export const CwProposalSingleAdapter: ProposalModuleAdapter<DaoCreationConfig> =
  {
    id: CWPROPOSALSINGLE_CONTRACT_NAME,
    matcher: (contractName: string) =>
      contractName.includes(CWPROPOSALSINGLE_CONTRACT_NAME),

    loadCommon: (options) => ({
      // Hooks
      hooks: {
        useReverseProposalInfos: makeUseReverseProposalInfos(
          options.proposalModule
        ),
        useListAllProposalInfos: makeUseListAllProposalInfos(
          options.proposalModule
        ),
        useProposalCount: makeUseProposalCount(options.proposalModule),
        useActions: makeUseActions(options.proposalModule),
        useDepositInfo: makeUseDepositInfo(options.proposalModule),
      },

      // Components
      components: {
        ProposalModuleInfo: (props) => (
          <ProposalModuleInfo
            proposalModuleAddress={options.proposalModule.address}
            {...props}
          />
        ),
        NewProposal: (props) => <NewProposal options={options} {...props} />,
        DaoInfoVotingConfiguration: (props) => (
          <DaoInfoVotingConfiguration
            proposalModule={options.proposalModule}
            {...props}
          />
        ),
      },
    }),

    load: (options) => ({
      // Functions
      functions: {
        getProposalInfo: makeGetProposalInfo(options),
      },

      // Hooks
      hooks: {
        useProposalRefreshers,
        useProposalExecutionTxHash,
        useProposalProcessedTQ,
        useProposalExpirationString,
        useProfileVoteCardOptions,
      },

      // Components
      components: {
        ProposalVotes,
        ProposalVoteDecisionStatus,
        ProposalInfoCard,
        ProposalDetails,
        ProposalLine,
        PinnedProposalLine: {
          Desktop: PinnedProposalLineDesktop,
          Mobile: PinnedProposalLineMobile,
        },
      },
    }),

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
          amount: 0,
          refundFailed: false,
        },
        allowRevoting: false,
      },

      votingConfig: {
        items: [
          VotingDurationVotingConfigItem,
          ProposalDepositVotingConfigItem,
        ],
        advancedItems: [
          AllowRevotingVotingConfigItem,
          ThresholdVotingConfigItem,
          QuorumVotingConfigItem,
        ],
        advancedWarningI18nKeys: [
          'daoCreationAdapter.cw-proposal-single.advancedWarning',
        ],
      },
    },
  }
