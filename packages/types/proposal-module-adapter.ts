import { Chain } from '@chain-registry/types'
import { CSSProperties, ComponentType, ReactNode } from 'react'
import { FieldPath, FieldValues } from 'react-hook-form'
import { RecoilValueReadOnly } from 'recoil'

import { Action, ActionCategoryMaker, ActionMaker } from './actions'
import {
  DaoInfoCard,
  LinkWrapperProps,
  ProposalVoterProps,
  SelfRelayExecuteModalProps,
} from './components'
import { Expiration } from './contracts'
import {
  CheckedDepositInfo,
  Duration,
  ProposalStatus,
} from './contracts/common'
import { Proposal as DaoPreProposeApprovalProposal } from './contracts/DaoPreProposeApprovalSingle'
import { VetoConfig } from './contracts/DaoProposalSingle.v2'
import {
  DaoCreationGetInstantiateInfo,
  DaoCreationVotingConfigItem,
  PreProposeModule,
  ProposalDraft,
  ProposalModule,
} from './dao'
import { ContractVersion } from './features'
import { ProposalTimestampInfo } from './gov'
import { LoadingData } from './misc'
import { ProposalCreatedCardProps } from './proposal'

export type IProposalModuleAdapterCommon<FormData extends FieldValues = any> = {
  // Fields
  fields: {
    // Make this a function so it doesn't return the same instance of the form
    // data each time.
    makeDefaultNewProposalForm: () => FormData
    newProposalFormTitleKey: FieldPath<FormData>

    updateConfigActionMaker: ActionMaker
    updatePreProposeConfigActionMaker?: ActionMaker
    // Any extra actions added by the proposal module.
    actionCategoryMakers?: ActionCategoryMaker[]
  }

  // Selectors
  selectors: {
    proposalCount: ProposalCountSelector
    reverseProposalInfos: ReverseProposalInfosSelector
    reversePreProposePendingProposalInfos?: ReversePreProposePendingProposalInfosSelector
    reversePreProposeCompletedProposalInfos?: ReversePreProposeCompletedProposalInfosSelector
    depositInfo: DepositInfoSelector
    maxVotingPeriod: MaxVotingPeriodSelector
  }

  // Hooks
  hooks: {
    useProposalDaoInfoCards: () => DaoInfoCard[]
  }

  // Components
  components: {
    NewProposal: ComponentType<BaseNewProposalProps>
  }
}

export type IProposalModuleAdapter<Vote extends unknown = any> = {
  // Functions
  functions: {
    getProposalInfo: () => Promise<CommonProposalInfo | undefined>
  }

  // Hooks
  hooks: {
    useProposalRefreshers: () => ProposalRefreshers
    useLoadingProposalExecutionTxHash: () => LoadingData<string | undefined>
    useLoadingProposalStatus: () => LoadingData<ProposalStatus>
    useLoadingVoteOptions: () => LoadingData<ProposalVoteOption<Vote>[]>
    // Return when no wallet connected.
    useLoadingWalletVoteInfo: () =>
      | undefined
      | LoadingData<WalletVoteInfo<Vote>>
    useCastVote: (onSuccess?: () => void | Promise<void>) => {
      castVote: (vote: Vote) => Promise<void>
      castingVote: boolean
    }

    useLoadingPreProposeApprovalProposal: () => LoadingData<
      PreProposeApprovalProposalWithMeteadata | undefined
    >
  }

  // Components
  components: {
    ProposalStatusAndInfo: ComponentType<BaseProposalStatusAndInfoProps>
    ProposalVoter: ComponentType<BaseProposalVoterProps>
    ProposalInnerContentDisplay: ComponentType<BaseProposalInnerContentDisplayProps>
    ProposalWalletVote: ComponentType<BaseProposalWalletVoteProps<Vote>>
    ProposalVotes: ComponentType
    ProposalVoteTally: ComponentType
    ProposalLine: ComponentType<BaseProposalLineProps>

    PreProposeApprovalProposalStatusAndInfo?: ComponentType<BasePreProposeProposalStatusAndInfoProps>
    PreProposeApprovalInnerContentDisplay?: ComponentType<BasePreProposeApprovalInnerContentDisplayProps>
    PreProposeApprovalProposalLine?: ComponentType<BaseProposalLineProps>
  }
}

export type ProposalModuleAdapter<
  DaoCreationExtraVotingConfig extends FieldValues = any,
  Vote extends unknown = any,
  FormData extends FieldValues = any
> = {
  id: string
  contractNames: string[]

  loadCommon: (
    options: IProposalModuleAdapterCommonOptions
  ) => IProposalModuleAdapterCommon<FormData>

  load: (options: IProposalModuleAdapterOptions) => IProposalModuleAdapter<Vote>

  queries: {
    proposalCount: {
      indexerFormula?: string
      cosmWasmQuery: Record<string, unknown>
    }
  }

  functions: {
    fetchPrePropose?: FetchPreProposeFunction
    fetchVetoConfig?: FetchVetoConfig
  }

  daoCreation: {
    // Voting config added to the common voting config.
    extraVotingConfig?: {
      default: DaoCreationExtraVotingConfig
      items?: DaoCreationVotingConfigItem[]
      advancedItems?: DaoCreationVotingConfigItem[]
      advancedWarningI18nKeys?: string[]
    }

    getInstantiateInfo: DaoCreationGetInstantiateInfo<DaoCreationExtraVotingConfig>
  }
}

export type IProposalModuleAdapterCommonOptions = {
  chain: Chain
  coreAddress: string
  proposalModule: ProposalModule
}

export type IProposalModuleAdapterCommonInitialOptions = Omit<
  IProposalModuleAdapterCommonOptions,
  'proposalModule'
>

export type IProposalModuleAdapterOptions = {
  chain: Chain
  coreAddress: string
  proposalModule: ProposalModule
  proposalId: string
  proposalNumber: number
  // Whether or not this refers to a pre-propose-approval proposal. If this is
  // true, the proposal ID should contain an asterisk (*) between the proposal
  // module prefix and proposal number.
  isPreProposeApprovalProposal: boolean
}

export type IProposalModuleAdapterInitialOptions = Omit<
  IProposalModuleAdapterOptions,
  | 'proposalModule'
  | 'proposalId'
  | 'proposalNumber'
  | 'isPreProposeApprovalProposal'
>

/**
 * Proposal module adapter context. This is specific to a single proposal in a
 * single proposal module.
 */
export type IProposalModuleContext = {
  id: string
  options: IProposalModuleAdapterOptions
  adapter: IProposalModuleAdapter
  common: IProposalModuleAdapterCommon
}

/**
 * Common proposal module adapter context. This is not specific to any single
 * proposal, but is specific to a single proposal module. This could be used to
 * retrieve the current proposal module's config for example.
 */
export type IProposalModuleCommonContext = {
  id: string
  options: IProposalModuleAdapterCommonOptions
  common: IProposalModuleAdapterCommon
}

// Internal Adapter Types

export type FetchPreProposeFunction = (
  chainId: string,
  proposalModuleAddress: string,
  version: ContractVersion | null
) => Promise<PreProposeModule | null>

export type FetchVetoConfig = (
  chainId: string,
  proposalModuleAddress: string,
  version: ContractVersion | null
) => Promise<VetoConfig | null>

export type ReverseProposalInfosSelector = (data: {
  startBefore: number | undefined
  limit: number | undefined
}) => RecoilValueReadOnly<CommonProposalListInfo[]>

export type ProposalCountSelector = RecoilValueReadOnly<number>

export type ReversePreProposePendingProposalInfosSelector = (data: {
  startBefore: number | undefined
  limit: number | undefined
}) => RecoilValueReadOnly<CommonProposalListInfo[]>

export type ReversePreProposeCompletedProposalInfosSelector = (data: {
  startBefore: number | undefined
  limit: number | undefined
}) => RecoilValueReadOnly<CommonProposalListInfo[]>

export type DepositInfoSelector = RecoilValueReadOnly<
  CheckedDepositInfo | undefined
>

export type MaxVotingPeriodSelector = RecoilValueReadOnly<Duration>

export type CommonProposalListInfo = {
  id: string
  proposalNumber: number
  timestamp: Date | undefined
  isOpen: boolean
  // If true, will be not be shown in the proposal list. This is used for
  // example to hide completed pre-propose proposals that were approved, since
  // those show up as normal proposals. No need to double count.
  hideFromList?: boolean
}

export type CommonProposalInfo = {
  id: string
  title: string
  description: string
  expiration: Expiration | null
  createdAtEpoch: number | null
  createdByAddress: string
}

export type BaseProposalStatusAndInfoProps = {
  inline?: boolean
  // Open self-relay modal to execute a proposal and relay polytone IBC packets.
  openSelfRelayExecute: (
    props: Pick<
      SelfRelayExecuteModalProps,
      'uniqueId' | 'chainIds' | 'transaction'
    >
  ) => void
  onExecuteSuccess: () => void | Promise<void>
  onCloseSuccess: () => void | Promise<void>
  onVetoSuccess: () => void | Promise<void>
} & {
  voter: BaseProposalVoterProps
}

export type BaseProposalVoterProps = {
  onVoteSuccess: () => void | Promise<void>
} & Pick<ProposalVoterProps, 'seenAllActionPages'>

export type BasePreProposeProposalStatusAndInfoProps = Pick<
  BaseProposalStatusAndInfoProps,
  'inline'
>

export type BaseProposalInnerContentDisplayProps<
  FormData extends FieldValues = any
> = {
  // Once proposal messages are loaded, the inner component is responsible for
  // setting the duplicate form data for the duplicate button in the header.
  setDuplicateFormData?: (data: FormData) => void
  actionsForMatching: Action[]
  // Called when the user has viewed all action pages.
  setSeenAllActionPages?: () => void
}

export type BasePreProposeApprovalInnerContentDisplayProps =
  BaseProposalInnerContentDisplayProps

export type BaseProposalWalletVoteProps<T> = {
  vote: T | undefined
  fallback: 'pending' | 'hasNoVote'
}

export type BaseProposalLineProps = {
  href: string
  LinkWrapper: ComponentType<LinkWrapperProps>
}

export type BaseNewProposalProps<FormData extends FieldValues = any> = {
  onCreateSuccess: (props: ProposalCreatedCardProps) => void
  draft?: ProposalDraft<FormData>
  saveDraft: () => void
  drafts: ProposalDraft[]
  loadDraft?: (index: number) => void
  unloadDraft: () => void
  draftSaving: boolean
  deleteDraft: (index: number) => void
  proposalModuleSelector: ReactNode
  // If true, will display actions as read only. This is useful when prompting a
  // proposal to be created from preset actions. Default: false.
  actionsReadOnlyMode?: boolean
  /**
   * The ProposalDaoInfoCards stateful component that renders the proposal
   * module's config cards.
   */
  ProposalDaoInfoCards: ComponentType
}

export type WalletVoteInfo<T> = {
  // Present if voted.
  vote: T | undefined
  couldVote: boolean
  canVote: boolean
  votingPowerPercent: number
}

export type ProposalRefreshers = {
  refreshProposal: () => void
  refreshProposalAndAll: () => void
  refreshing: boolean
}

export type ProposalVoteOption<Vote> = {
  Icon: ComponentType<{ className: string; style?: CSSProperties }>
  label: string
  value: Vote
  color?: string
}

export type PercentOrMajorityValue = {
  /**
   * Whether or not to use majority instead of percent.
   */
  majority: boolean
  /**
   * The percent to use when `majority` is false.
   */
  value: number
}

export type PreProposeApprovalProposalWithMeteadata =
  DaoPreProposeApprovalProposal & {
    timestampDisplay: ProposalTimestampInfo['display']
    // If this pre-propose-approval proposal is being approved by a
    // pre-propose-approver proposal in another DAO, this is the approval
    // proposal ID.
    approverProposalId?: string
  }
