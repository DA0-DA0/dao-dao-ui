import { ComponentType } from 'react'

import { LoaderProps, LogoProps } from '@dao-dao/ui'

export interface IProposalModuleAdapter {
  // Hooks
  hooks: {}

  // UI
  ui: {}
}

export type ProposalModuleAdapter = {
  id: string
  matcher: (contractName: string) => boolean
  load: () => IProposalModuleAdapter | Promise<IProposalModuleAdapter>
}

export interface IProposalModuleAdapterOptions {
  proposalModuleAddress: string
  proposalId: string
  proposalNumber: number
  coreAddress: string
  Logo: ComponentType<LogoProps>
  Loader: ComponentType<LoaderProps>
}

export interface IProposalModuleAdapterContext {
  options: IProposalModuleAdapterOptions
  adapter: IProposalModuleAdapter
}
