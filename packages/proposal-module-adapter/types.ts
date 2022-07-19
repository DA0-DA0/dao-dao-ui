import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { ComponentType } from 'react'

import { Action, FormProposalData } from '@dao-dao/actions'
import { LoaderProps, LogoProps } from '@dao-dao/ui'
import { ProcessedThresholdQuorum, ProposalModule } from '@dao-dao/utils'

export interface IProposalModuleAdapterCommon {
  // Hooks
  hooks: {
    useReverseProposalInfos: (
      startBefore: number | undefined,
      limit: number | undefined
    ) => CommonProposalListInfo[]
  }

  // Components
  components: {
    ProposalCreateInfo: ComponentType<BaseProposalCreateInfo>
    CreateProposalForm: ComponentType<BaseCreateProposalFormProps>
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
  }

  // Components
  components: {
    ProposalVotes: ComponentType<BaseProposalVotesProps>
    ProposalVoteDecisionStatus: ComponentType<BaseProposalVoteDecisionStatusProps>
    ProposalInfoCard: ComponentType<BaseProposalInfoCardProps>
    ProposalDetails: ComponentType<BaseProposalDetailsProps>
    ProposalLine: {
      Desktop: ComponentType<BaseProposalLineProps>
      Mobile: ComponentType<BaseProposalLineProps>
    }
  }
}

export type ProposalModuleAdapter = {
  id: string
  matcher: (contractName: string) => boolean

  loadCommon: (
    options: IProposalModuleAdapterCommonOptions
  ) => IProposalModuleAdapterCommon

  load: (
    options: IProposalModuleAdapterOptions
  ) => IProposalModuleAdapter | Promise<IProposalModuleAdapter>
}

export interface IProposalModuleAdapterCommonOptions {
  proposalModule: ProposalModule
  coreAddress: string
  Logo: ComponentType<LogoProps>
  Loader: ComponentType<LoaderProps>
}

export interface IProposalModuleAdapterOptions {
  proposalModuleAddress: string
  proposalId: string
  proposalPrefix: string
  proposalNumber: number
  coreAddress: string
  Logo: ComponentType<LogoProps>
  Loader: ComponentType<LoaderProps>
}

export type IProposalModuleAdapterInitialOptions = Omit<
  IProposalModuleAdapterOptions,
  'proposalModuleAddress' | 'proposalId' | 'proposalPrefix' | 'proposalNumber'
>

export interface IProposalModuleContext {
  id: string
  options: IProposalModuleAdapterOptions
  adapter: IProposalModuleAdapter
}

// Internal Adapter Types

export interface CommonProposalListInfo {
  id: string
  proposalNumber: number
  timestamp: Date | undefined
}

export interface CommonProposalInfo {
  id: number
  title: string
}

export interface BaseProposalVotesProps {
  className?: string
}

export interface BaseProposalVoteDecisionStatusProps {
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
  duplicate: (data: FormProposalData) => void
  walletAddress?: string
  VotingPowerWidget?: ComponentType
}

export interface BaseProposalLineProps {
  className?: string
}

export interface BaseProposalCreateInfo {
  className?: string
}

export interface BaseCreateProposalFormProps {
  connected: boolean
  walletAddress?: string
  onCreateSuccess: (proposalId: string) => void
  ConnectWalletButton: ComponentType
}
