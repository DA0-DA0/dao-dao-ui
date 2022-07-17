import { ComponentType, ReactNode } from 'react'

import { ActionKey } from '@dao-dao/actions'
import { LoaderProps, LogoProps, ProposalDetailsProps } from '@dao-dao/ui'

export interface SdaMembershipPageNavInfo {
  renderIcon: (color: string, mobile: boolean) => ReactNode
  label: string
}

export interface MembershipMobileTabProps {
  onClick: () => void
  selected: boolean
}

export type BaseProposalDetailsProps = Omit<
  ProposalDetailsProps,
  'stakingModal' | 'coreAddress'
>

export interface BaseVoteHeroStatsProps {
  loader?: boolean
}

export interface BaseSdaMembershipPageProps {
  defaultImageUrl: string
  Loader: ComponentType<{ size?: number | string }>
}

export interface IVotingModuleAdapter {
  // Fields
  fields: {
    disabledActionKeys: ActionKey[]
    sdaMembershipPageNavInfo: SdaMembershipPageNavInfo
  }

  // Hooks
  hooks: {
    useVoteConversionDecimals: () => number
  }

  // Components
  components: {
    Membership: {
      Desktop: ComponentType
      MobileTab: ComponentType<MembershipMobileTabProps>
      Mobile: ComponentType
    }
    DaoHorizontalInfoDisplayInternal: ComponentType
    ProposalDetails: ComponentType<BaseProposalDetailsProps>
    DaoTreasuryFooter: ComponentType
    DaoContractInfoContent: ComponentType
    ProposalCreateAddresses: ComponentType
    VoteHeroStats: ComponentType<BaseVoteHeroStatsProps>
    SdaMembershipPage: ComponentType<BaseSdaMembershipPageProps>
  }
}

export type VotingModuleAdapter = {
  id: string
  matcher: (contractName: string) => boolean
  load: (
    options: IVotingModuleAdapterOptions
  ) => IVotingModuleAdapter | Promise<IVotingModuleAdapter>
}

export interface IVotingModuleAdapterOptions {
  votingModuleAddress: string
  coreAddress: string
  Logo: ComponentType<LogoProps>
  Loader: ComponentType<LoaderProps>
}

export interface IVotingModuleAdapterContext {
  options: IVotingModuleAdapterOptions
  adapter: IVotingModuleAdapter
}
