import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { ComponentType } from 'react'
import { FieldValues } from 'react-hook-form'
import { RecoilValueReadOnly } from 'recoil'

import { ProfileNewProposalCardInfoLine } from '@dao-dao/ui'

import { Action } from './actions'
import { Expiration } from './contracts'
import { CheckedDepositInfo } from './contracts/cw-proposal-single'
import {
  DaoCreationGetInstantiateInfo,
  DaoCreationVotingConfigItem,
  ProposalModule,
  ProposalPrefill,
} from './dao'
import { LoaderProps, LogoProps, ProfileVoteCardOption } from './ui'
import { ProcessedThresholdQuorum } from './utils'
import { BaseProposalDetailsVotingPowerWidgetProps } from './voting-module-adapter'

export interface IProposalModuleAdapterCommon {
  // Selectors
  selectors: {
    reverseProposalInfos: ReverseProposalInfosSelector
    depositInfo: DepositInfoSelector
  }

  // Hooks
  hooks: {
    useListAllProposalInfos: (
      startAfter: number | undefined
    ) => CommonProposalListInfo[]
    useProposalCount: () => number
    useActions: () => Action[]
    useProfileNewProposalCardInfoLines: () => ProfileNewProposalCardInfoLine[]
    // Returns `proposalNumber` (ID of this proposal for this module)
    // useCreateProposal: (data: unknown) => number
  }

  // Components
  components: {
    ProposalModuleInfo: ComponentType<BaseProposalModuleInfo>
    NewProposal: ComponentType<BaseNewProposalProps>
    DaoInfoVotingConfiguration: ComponentType
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
    useProposalProcessedTQ: () => ProcessedThresholdQuorum
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
    ProposalInfoCard: ComponentType<BaseProposalInfoCardProps>
    ProposalDetails: ComponentType<BaseProposalDetailsProps>
    ProposalLine: ComponentType<BaseProposalLineProps>
  }
}

export type ProposalModuleAdapter<
  DaoCreationConfig extends FieldValues = any,
  Vote extends unknown = any
> = {
  id: string
  contractNames: string[]

  loadCommon: (
    options: IProposalModuleAdapterCommonOptions
  ) => IProposalModuleAdapterCommon

  load: (options: IProposalModuleAdapterOptions) => IProposalModuleAdapter<Vote>

  queries: {
    proposalCount: Record<string, unknown>
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
  coreAddress: string
  Logo: ComponentType<LogoProps>
  Loader: ComponentType<LoaderProps>
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
  creationHeight: number
  votingOpen: boolean
  expiration: Expiration
  createdAtEpoch: number | null
  createdByAddress: string
}

export interface BaseProposalStatusAndInfoProps {
  inline?: boolean
}

export interface BaseProposalActionDisplayProps<D extends any = any> {
  onDuplicate: (data: ProposalPrefill<D>) => void
  availableActions: Action[]
  onCloseSuccess: () => void | Promise<void>
  onExecuteSuccess: () => void | Promise<void>
}

export interface BaseProposalWalletVoteProps<T> {
  vote: T | undefined
  fallback: 'pending' | 'none'
}

export interface BaseProposalInfoCardProps {
  connected: boolean
  walletAddress?: string
}

export interface BaseProposalDetailsProps {
  actions: Action[]
  onExecuteSuccess: () => void
  onCloseSuccess: () => void
  onVoteSuccess: () => void
  connected: boolean
  ConnectWalletButton: ComponentType
  duplicate: (data: any) => void
  walletAddress?: string
  VotingPowerWidget?: ComponentType<BaseProposalDetailsVotingPowerWidgetProps>
}

export interface BaseProposalLineProps {
  href: string
}

export interface BaseProposalModuleInfo {
  className?: string
}

export interface BaseNewProposalProps {
  onCreateSuccess: (proposalId: string) => void
  prefill: any
}

export interface WalletVoteInfo<T> {
  // Present if voted.
  vote: T | undefined
  couldVote: boolean
  canVote: boolean
  votingPowerPercent: number
}
