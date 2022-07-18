import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { ComponentType } from 'react'

import { Action, FormProposalData } from '@dao-dao/actions'
import { LoaderProps, LogoProps } from '@dao-dao/ui'

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
  }

  // Components
  components: {
    ProposalVotes: ComponentType<BaseProposalVotesProps>
    ProposalVoteDecisionStatus: ComponentType<BaseProposalVoteDecisionStatusProps>
    ProposalInfoCard: ComponentType<BaseProposalInfoCardProps>
    ProposalDetails: ComponentType<BaseProposalDetailsProps>
  }
}

export type ProposalModuleAdapter = {
  id: string
  matcher: (contractName: string) => boolean
  load: (
    options: IProposalModuleAdapterOptions
  ) => IProposalModuleAdapter | Promise<IProposalModuleAdapter>
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

export interface IProposalModuleAdapterAdapterWithOptions {
  options: IProposalModuleAdapterOptions
  adapter: IProposalModuleAdapter
}

// Internal Adapter Types

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
