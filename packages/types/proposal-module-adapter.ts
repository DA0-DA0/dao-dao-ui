import { Chain } from '@chain-registry/types'
import { CSSProperties, ComponentType, ReactNode } from 'react'
import { FieldPath, FieldValues } from 'react-hook-form'
import { RecoilValueReadOnly } from 'recoil'

import { ActionCategoryMaker, CategorizedAction } from './actions'
import { LinkWrapperProps, SelfRelayExecuteModalProps } from './components'
import { Expiration } from './contracts'
import { CheckedDepositInfo } from './contracts/common'
import {
  DaoCreationGetInstantiateInfo,
  DaoCreationVotingConfigItem,
  PreProposeModule,
  ProposalDraft,
  ProposalModule,
} from './dao'
import { ContractVersion } from './features'
import { LoadingData } from './misc'
import { ProposalCreatedCardProps } from './proposal'

export interface IProposalModuleAdapterCommon<
  FormData extends FieldValues = any
> {
  // Fields
  fields: {
    // Make this a function so it doesn't return the same instance of the form
    // data each time.
    makeDefaultNewProposalForm: () => FormData
    newProposalFormTitleKey: FieldPath<FormData>
    actionCategoryMakers: ActionCategoryMaker[]
  }

  // Selectors
  selectors: {
    reverseProposalInfos: ReverseProposalInfosSelector
    depositInfo: DepositInfoSelector
  }

  // Hooks
  hooks: {
    useProfileNewProposalCardInfoLines: () => ProfileNewProposalCardInfoLine[]
  }

  // Components
  components: {
    NewProposal: ComponentType<BaseNewProposalProps>
  }
}

export interface IProposalModuleAdapter<Vote extends unknown = any> {
  // Functions
  functions: {
    getProposalInfo: () => Promise<CommonProposalInfo | undefined>
  }

  // Hooks
  hooks: {
    useProposalRefreshers: () => ProposalRefreshers
    useLoadingProposalExecutionTxHash: () => LoadingData<string | undefined>
    useLoadingVoteOptions: () => LoadingData<ProposalVoteOption<Vote>[]>
    // Return when no wallet connected.
    useLoadingWalletVoteInfo: () =>
      | undefined
      | LoadingData<WalletVoteInfo<Vote>>
    useCastVote: (onSuccess?: () => void | Promise<void>) => {
      castVote: (vote: Vote) => Promise<void>
      castingVote: boolean
    }
    useLoadingPreProposeApprovalProposer: () => LoadingData<string | undefined>
  }

  // Components
  components: {
    ProposalStatusAndInfo: ComponentType<BaseProposalStatusAndInfoProps>
    ProposalInnerContentDisplay: ComponentType<BaseProposalInnerContentDisplayProps>
    PreProposeApprovalInnerContentDisplay: ComponentType<BasePreProposeApprovalInnerContentDisplayProps>
    ProposalWalletVote: ComponentType<BaseProposalWalletVoteProps<Vote>>
    ProposalVotes: ComponentType
    ProposalVoteTally: ComponentType
    ProposalLine: ComponentType<BaseProposalLineProps>
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
}

export type IProposalModuleAdapterInitialOptions = Omit<
  IProposalModuleAdapterOptions,
  'proposalModule' | 'proposalId' | 'proposalNumber'
>

export interface IProposalModuleContext {
  id: string
  options: IProposalModuleAdapterOptions
  adapter: IProposalModuleAdapter
  common: IProposalModuleAdapterCommon
}

// Internal Adapter Types

export type FetchPreProposeFunction = (
  chainId: string,
  proposalModuleAddress: string,
  version: ContractVersion | null
) => Promise<PreProposeModule | null>

export type ReverseProposalInfosSelector = (data: {
  startBefore: number | undefined
  limit: number | undefined
}) => RecoilValueReadOnly<CommonProposalListInfo[]>

export type DepositInfoSelector = RecoilValueReadOnly<
  CheckedDepositInfo | undefined
>

export interface CommonProposalListInfo {
  id: string
  proposalNumber: number
  timestamp: Date | undefined
  isOpen: boolean
}

export interface CommonProposalInfo {
  id: string
  title: string
  description: string
  expiration: Expiration
  createdAtEpoch: number | null
  createdByAddress: string
}

export interface BaseProposalStatusAndInfoProps {
  inline?: boolean
  // Open self-relay modal to execute a proposal and relay polytone IBC packets.
  openSelfRelayExecute: (
    props: Pick<
      SelfRelayExecuteModalProps,
      'uniqueId' | 'chainIds' | 'transaction'
    >
  ) => void
  onVoteSuccess: () => void | Promise<void>
  onExecuteSuccess: () => void | Promise<void>
  onCloseSuccess: () => void | Promise<void>
  // Whether or not the user has viewed all action pages. If they haven't, they
  // can't vote.
  seenAllActionPages: boolean
}

export interface BaseProposalInnerContentDisplayProps<
  FormData extends FieldValues = any
> {
  setDuplicateFormData: (data: FormData) => void
  actionsForMatching: CategorizedAction[]
  // Called when the user has viewed all action pages.
  setSeenAllActionPages?: () => void
}

export type BasePreProposeApprovalInnerContentDisplayProps = Omit<
  BaseProposalInnerContentDisplayProps,
  'setDuplicateFormData'
>

export interface BaseProposalWalletVoteProps<T> {
  vote: T | undefined
  fallback: 'pending' | 'hasNoVote'
}

export interface BaseProposalLineProps {
  href: string
  LinkWrapper: ComponentType<LinkWrapperProps>
}

export interface BaseNewProposalProps<FormData extends FieldValues = any> {
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
}

export interface WalletVoteInfo<T> {
  // Present if voted.
  vote: T | undefined
  couldVote: boolean
  canVote: boolean
  votingPowerPercent: number
}

export interface ProposalRefreshers {
  refreshProposal: () => void
  refreshProposalAndAll: () => void
  refreshing: boolean
}

export interface ProposalVoteOption<Vote> {
  Icon: ComponentType<{ className: string; style?: CSSProperties }>
  label: string
  value: Vote
  color?: string
}

export interface ProfileNewProposalCardInfoLine {
  Icon: ComponentType<{ className: string }>
  label: string
  value: string
  valueClassName?: string
}

export type PercentOrMajorityValue = {
  majority: boolean
  // Will be used when `majority` is false.
  value: number
}
