import { CSSProperties, ComponentType } from 'react'
import { FieldPath, FieldValues } from 'react-hook-form'
import { RecoilValueReadOnly } from 'recoil'

import { Action, ActionOptions } from './actions'
import { ContractVersion } from './chain'
import { Expiration } from './contracts'
import { CheckedDepositInfo, CosmosMsgFor_Empty } from './contracts/common'
import {
  DaoCreationGetInstantiateInfo,
  DaoCreationVotingConfigItem,
  ProposalDraft,
  ProposalModule,
  ProposalPrefill,
} from './dao'
import { ProposalCreatedCardProps } from './proposal'
import { LinkWrapperProps, LoadingData } from './stateless'

export interface IProposalModuleAdapterCommon<
  FormData extends FieldValues = any
> {
  // Fields
  fields: {
    // Make this a function so it doesn't return the same instance of the form
    // data each time.
    makeDefaultNewProposalForm: () => FormData
    newProposalFormTitleKey: FieldPath<FormData>
  }

  // Selectors
  selectors: {
    reverseProposalInfos: ReverseProposalInfosSelector
    depositInfo: DepositInfoSelector
  }

  // Hooks
  hooks: {
    useActions: (options: ActionOptions) => Action[]
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
    useVoteOptions: (proposal?: any) => ProposalVoteOption<Vote>[]
    // Return when no wallet connected.
    useLoadingWalletVoteInfo: () =>
      | undefined
      | LoadingData<WalletVoteInfo<Vote>>
    useCastVote: (onSuccess?: () => void | Promise<void>) => {
      castVote: (vote: Vote) => Promise<void>
      castingVote: boolean
    }
  }

  // Components
  components: {
    ProposalStatusAndInfo: ComponentType<BaseProposalStatusAndInfoProps>
    ProposalInnerContentDisplay: ComponentType<BaseProposalInnerContentDisplayProps>
    ProposalWalletVote: ComponentType<BaseProposalWalletVoteProps<Vote>>
    ProposalVotes: ComponentType
    ProposalVoteTally: ComponentType
    ProposalLine: ComponentType<BaseProposalLineProps>
  }
}

export type ProposalModuleAdapter<
  DaoCreationConfig extends FieldValues = any,
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
    fetchPreProposeAddress?: FetchPreProposeAddressFunction
  }

  daoCreation: {
    defaultConfig: DaoCreationConfig

    votingConfig: {
      items: DaoCreationVotingConfigItem[]
      advancedItems?: DaoCreationVotingConfigItem[]
      advancedWarningI18nKeys?: string[]
    }

    getInstantiateInfo: DaoCreationGetInstantiateInfo<DaoCreationConfig>
  }
}

export interface IProposalModuleAdapterInitialOptions {
  chainId: string
  coreAddress: string
}

export interface IProposalModuleAdapterCommonOptions
  extends IProposalModuleAdapterInitialOptions {
  proposalModule: ProposalModule
}

export interface IProposalModuleAdapterOptions
  extends IProposalModuleAdapterInitialOptions {
  proposalModule: ProposalModule
  proposalId: string
  proposalNumber: number
}

export interface IProposalModuleContext {
  id: string
  options: IProposalModuleAdapterOptions
  adapter: IProposalModuleAdapter
  common: IProposalModuleAdapterCommon
}

// Internal Adapter Types

export type FetchPreProposeAddressFunction = (
  chainId: string,
  proposalModuleAddress: string,
  version: ContractVersion | null
) => Promise<string | null>

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
  onVoteSuccess: () => void | Promise<void>
  onExecuteSuccess: () => void | Promise<void>
  onCloseSuccess: () => void | Promise<void>
}

export interface BaseProposalInnerContentDisplayProps<D extends any = any> {
  onDuplicate: (data: ProposalPrefill<D>) => void
  duplicateLoading: boolean
  availableActions: Action[]
}

// Represents one instance of {title; description; actions[]} (multiple choice will have an array of these, single choice will have one.)
export interface ProposalInnerContent {
  title: string
  description: string
  actions: Action[]
}

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
  simulateMsgs?: (msgs: CosmosMsgFor_Empty[]) => Promise<void>
  draft?: ProposalDraft<FormData>
  saveDraft: () => void
  drafts: ProposalDraft[]
  loadDraft: (index: number) => void
  unloadDraft: () => void
  draftSaving: boolean
  deleteDraft: (index: number) => void
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
