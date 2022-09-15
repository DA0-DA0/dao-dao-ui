import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { ComponentType } from 'react'
import { FieldValues } from 'react-hook-form'

import { Action } from './actions'
import { CheckedDepositInfo } from './contracts/cw-proposal-single'
import {
  DaoCreationGetInstantiateInfo,
  DaoCreationVotingConfigItem,
  ProposalModule,
} from './dao'
import { LoaderProps, LogoProps, ProfileVoteCardOption } from './ui'
import { ProcessedThresholdQuorum } from './utils'
import { BaseProposalDetailsVotingPowerWidgetProps } from './voting-module-adapter'

export interface IProposalModuleAdapterCommon {
  // Hooks
  hooks: {
    useReverseProposalInfos: (
      startBefore: number | undefined,
      limit: number | undefined
    ) => CommonProposalListInfo[]
    useListAllProposalInfos: (
      startAfter: number | undefined
    ) => CommonProposalListInfo[]
    useProposalCount: () => number
    useActions: () => Action[]
    useDepositInfo?: () => CheckedDepositInfo | undefined
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

export interface IProposalModuleAdapter {
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
    useProposalExpirationString: () => string | undefined
    useProfileVoteCardOptions: () => ProfileVoteCardOption<unknown>[]
  }

  // Components
  components: {
    ProposalVotes: ComponentType<BaseProposalVotesProps>
    ProposalVoteTally: ComponentType<BaseProposalVoteTallyProps>
    ProposalInfoCard: ComponentType<BaseProposalInfoCardProps>
    ProposalDetails: ComponentType<BaseProposalDetailsProps>
    ProposalLine: ComponentType<BaseProposalLineProps>
    PinnedProposalLine: {
      Desktop: ComponentType<BasePinnedProposalLineProps>
      Mobile: ComponentType<BasePinnedProposalLineProps>
    }
  }
}

export type ProposalModuleAdapter<DaoCreationConfig extends FieldValues = any> =
  {
    id: string
    matcher: (contractName: string) => boolean

    loadCommon: (
      options: IProposalModuleAdapterCommonOptions
    ) => IProposalModuleAdapterCommon

    load: (options: IProposalModuleAdapterOptions) => IProposalModuleAdapter

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

export interface CommonProposalListInfo {
  id: string
  proposalNumber: number
  timestamp: Date | undefined
  isOpen: boolean
}

export interface CommonProposalInfo {
  id: number
  title: string
  description: string
}

export interface BaseProposalVotesProps {
  className?: string
}

export interface BaseProposalVoteTallyProps {
  voteConversionDecimals: number
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
  walletAddress?: string
}

export interface BaseProposalModuleInfo {
  className?: string
}

export interface BaseNewProposalProps {
  onCreateSuccess: (proposalId: string) => void
}

export interface BasePinnedProposalLineProps {
  className?: string
}
