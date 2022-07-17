import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { ComponentType } from 'react'

import { LoaderProps, LogoProps } from '@dao-dao/ui'

export interface CommonProposalInfo {
  id: number
  title: string
}

export interface IProposalModuleAdapter {
  // Functions
  functions: {
    getProposalInfo: (
      cosmWasmClient: CosmWasmClient
    ) => Promise<CommonProposalInfo | undefined>
  }

  // Hooks
  hooks: {}

  // UI
  ui: {}
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
  proposalNumber: number
  coreAddress: string
  Logo: ComponentType<LogoProps>
  Loader: ComponentType<LoaderProps>
}

export type IProposalModuleAdapterInitialOptions = Omit<
  IProposalModuleAdapterOptions,
  'proposalModuleAddress' | 'proposalId' | 'proposalNumber'
>

export interface IProposalModuleAdapterAdapterWithOptions {
  options: IProposalModuleAdapterOptions
  adapter: IProposalModuleAdapter
}
