import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { ComponentType } from 'react'
import { FieldPath, FieldValues } from 'react-hook-form'
import { RecoilValueReadOnly } from 'recoil'

import { Action } from './actions'
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
import {
  LinkWrapperProps,
  ProfileNewProposalCardInfoLine,
  ProfileVoteCardOption,
} from './stateless'

export interface IProposalModuleAdapterCommon<
  FormData extends FieldValues = any
> {
  // Fields
  fields: {
    defaultNewProposalForm: FormData
    newProposalFormTitleKey: FieldPath<FormData>
  }

  // Selectors
  selectors: {
    reverseProposalInfos: ReverseProposalInfosSelector
    depositInfo: DepositInfoSelector
  }

  // Hooks
  hooks: {
    useActions: () => Action[]
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
    getProposalInfo: (
      cosmWasmClient: CosmWasmClient
    ) => Promise<CommonProposalInfo | undefined>
  }

  // Hooks
  hooks: {
    useProposalRefreshers: () => {
      refreshProposal: () => void
      refreshProposalAndAll: () => void
    }
    useProposalExecutionTxHash: () => string | undefined
    useProfileVoteCardOptions: () => ProfileVoteCardOption<Vote>[]
    useWalletVoteInfo: () => WalletVoteInfo<Vote>
    useCastVote: (onSuccess?: () => void | Promise<void>) => {
      castVote: (vote: Vote) => Promise<void>
      castingVote: boolean
    }
  }

  // Components
  components: {
    ProposalStatusAndInfo: ComponentType<BaseProposalStatusAndInfoProps>
    ProposalActionDisplay: ComponentType<BaseProposalActionDisplayProps>
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
    proposalCount: Record<string, unknown>
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
  cosmWasmClient: CosmWasmClient,
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
  votingOpen: boolean
  expiration: Expiration
  createdAtEpoch: number | null
  createdByAddress: string
}

export interface BaseProposalStatusAndInfoProps {
  inline?: boolean
  onExecuteSuccess: () => void | Promise<void>
  onCloseSuccess: () => void | Promise<void>
}

export interface BaseProposalActionDisplayProps<D extends any = any> {
  onDuplicate: (data: ProposalPrefill<D>) => void
  availableActions: Action[]
}

export interface BaseProposalWalletVoteProps<T> {
  vote: T | undefined
  fallback: 'pending' | 'none'
}

export interface BaseProposalLineProps {
  href: string
  LinkWrapper: ComponentType<LinkWrapperProps>
}

export interface BaseNewProposalProps<FormData extends FieldValues = any> {
  onCreateSuccess: (props: ProposalCreatedCardProps) => void
  simulateMsgs: (msgs: CosmosMsgFor_Empty[]) => Promise<void>
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
