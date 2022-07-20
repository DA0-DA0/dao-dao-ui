import { ComponentType, ReactNode } from 'react'

import { ActionKey } from '@dao-dao/actions'
import { CheckedDepositInfo } from '@dao-dao/state/clients/cw-proposal-single'
import { LoaderProps, LogoProps } from '@dao-dao/ui'

export interface MembershipPageInfo {
  renderIcon: (color: string, mobile: boolean) => ReactNode
  label: string
}

export interface MembershipMobileTabProps {
  onClick: () => void
  selected: boolean
}

export interface BaseDaoThinInfoContentProps {
  proposalCount: number
}

export interface BaseVoteHeroStatsProps {
  loader?: boolean
}

export interface BaseSdaMembershipPageProps {
  defaultImageUrl: string
  Loader: ComponentType<{ size?: number | string }>
}

export interface BaseProposalDetailsVotingPowerWidgetProps {
  depositInfo?: CheckedDepositInfo
}

export interface IVotingModuleAdapter {
  // Fields
  fields: {
    disabledActionKeys: ActionKey[]
    membershipPageInfo: MembershipPageInfo
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
    DaoThinInfoContent: ComponentType<BaseDaoThinInfoContentProps>
    DaoTreasuryFooter: ComponentType
    DaoInfoAdditionalAddresses: ComponentType
    DaoInfoVotingConfiguration: ComponentType
    ProposalModuleAddresses: ComponentType
    VoteHeroStats: ComponentType<BaseVoteHeroStatsProps>
    SdaMembershipPage: ComponentType<BaseSdaMembershipPageProps>
    ProposalDetailsVotingPowerWidget?: ComponentType<BaseProposalDetailsVotingPowerWidgetProps>
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
