import { ComponentType, ReactNode } from 'react'

import { Action } from '@dao-dao/actions'
import { CheckedDepositInfo } from '@dao-dao/state/clients/cw-proposal-single'
import {
  MarketingInfoResponse,
  TokenInfoResponse,
} from '@dao-dao/state/clients/cw20-base'
import { Claim, GetConfigResponse } from '@dao-dao/state/clients/stake-cw20'
import { HeroStatProps, LoaderProps, LogoProps, StakingMode } from '@dao-dao/ui'

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
  additionalStats?: (HeroStatProps & { link?: boolean })[]
}

export interface BaseSdaMembershipPageProps {
  defaultImageUrl: string
  Loader: ComponentType<{ size?: number | string }>
}

export interface BaseProposalDetailsVotingPowerWidgetProps {
  depositInfo?: CheckedDepositInfo
}

export interface BaseStakingModalProps {
  mode: StakingMode
  onClose: () => void
  deposit?: string
}

export interface BaseClaimsPendingListProps {
  fallbackImageUrl: string
  showClaim: () => void
}

export interface UseGovernanceTokenInfoOptions {
  fetchWalletBalance?: boolean
  fetchTreasuryBalance?: boolean
  fetchPriceWithSwapAddress?: string
}

export interface UseGovernanceTokenInfoResponse {
  stakingContractAddress: string
  governanceTokenAddress: string
  governanceTokenInfo: TokenInfoResponse
  governanceTokenMarketingInfo: MarketingInfoResponse
  /// Optional
  // Wallet balance
  walletBalance?: number
  // Treasury balance
  treasuryBalance?: number
  // Price
  price?: number
}

export interface UseStakingInfoOptions {
  fetchClaims?: boolean
  fetchTotalStakedValue?: boolean
  fetchWalletStakedValue?: boolean
}

export interface UseStakingInfoResponse {
  stakingContractAddress: string
  stakingContractConfig: GetConfigResponse
  refreshStakingContractBalances: () => void
  refreshTotals: () => void
  /// Optional
  // Claims
  blockHeight?: number
  refreshClaims?: () => void
  claims?: Claim[]
  claimsPending?: Claim[]
  claimsAvailable?: Claim[]
  sumClaimsAvailable?: number
  // Total staked value
  totalStakedValue?: number
  // Wallet staked value
  walletStakedValue?: number
}

export interface IVotingModuleAdapter {
  // Fields
  fields: {
    membershipPageInfo: MembershipPageInfo
  }

  // Hooks
  hooks: {
    useActions: () => Action[]
    useGovernanceTokenInfo?: (
      options?: UseGovernanceTokenInfoOptions
    ) => UseGovernanceTokenInfoResponse
    useStakingInfo?: (options?: UseStakingInfoOptions) => UseStakingInfoResponse
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
    StakingModal?: ComponentType<BaseStakingModalProps>
    ClaimsPendingList?: ComponentType<BaseClaimsPendingListProps>
  }
}

export type VotingModuleAdapter = {
  id: string
  matcher: (contractName: string) => boolean
  load: (options: IVotingModuleAdapterOptions) => IVotingModuleAdapter
}

export interface IVotingModuleAdapterOptions {
  votingModuleAddress: string
  coreAddress: string
  Logo: ComponentType<LogoProps>
  Loader: ComponentType<LoaderProps>
}

export interface IVotingModuleAdapterContext {
  id: string
  options: IVotingModuleAdapterOptions
  adapter: IVotingModuleAdapter
}
