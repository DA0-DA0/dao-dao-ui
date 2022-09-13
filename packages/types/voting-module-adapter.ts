import { TFunction } from 'next-i18next'
import { ComponentType, ReactNode } from 'react'
import { FieldValues } from 'react-hook-form'

import { Action } from './actions'
import { Duration } from './contracts/common'
import { CheckedDepositInfo } from './contracts/cw-proposal-single'
import { MarketingInfoResponse, TokenInfoResponse } from './contracts/cw20-base'
import { Claim } from './contracts/stake-cw20'
import {
  DaoCreationGetInstantiateInfo,
  DaoCreationGovernanceConfigInputProps,
  DaoCreationGovernanceConfigReviewProps,
  DaoCreationVotingConfigItem,
} from './dao'
import {
  DaoInfoBarItem,
  HeroStatProps,
  LoaderProps,
  LogoProps,
  StakingMode,
} from './ui'

export interface MembershipPageInfo {
  renderIcon: (mobile: boolean) => ReactNode
  label: string
}

export interface BaseMembershipProps {
  proposalModuleDepositInfos: CheckedDepositInfo[]
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

export interface BaseSdaMembershipPageProps extends BaseMembershipProps {
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
  fetchUSDCPrice?: boolean
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
  unstakingDuration?: Duration
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
    useDaoInfoBarItems: () => DaoInfoBarItem[]
    useGovernanceTokenInfo?: (
      options?: UseGovernanceTokenInfoOptions
    ) => UseGovernanceTokenInfoResponse
    useStakingInfo?: (options?: UseStakingInfoOptions) => UseStakingInfoResponse
  }

  // Components
  components: {
    Membership: {
      Desktop: ComponentType<BaseMembershipProps>
      MobileTab: ComponentType<MembershipMobileTabProps>
      Mobile: ComponentType<BaseMembershipProps>
    }
    DaoThinInfoContent: ComponentType<BaseDaoThinInfoContentProps>
    DaoTreasuryFooter: ComponentType
    DaoInfoAdditionalAddresses: ComponentType
    DaoInfoVotingConfiguration: ComponentType
    ProposalCreationAdditionalAddresses: ComponentType
    VoteHeroStats: ComponentType<BaseVoteHeroStatsProps>
    SdaMembershipPage: ComponentType<BaseSdaMembershipPageProps>
    ProfileMemberCardMembershipInfo: ComponentType
    ProfileCardNoVoteBecomeMemberInfo: ComponentType

    ProposalDetailsVotingPowerWidget?: ComponentType<BaseProposalDetailsVotingPowerWidgetProps>
    StakingModal?: ComponentType<BaseStakingModalProps>
    ClaimsPendingList?: ComponentType<BaseClaimsPendingListProps>
  }
}

export type VotingModuleAdapter<DaoCreationConfig extends FieldValues = any> = {
  id: string
  matcher: (contractName: string) => boolean
  load: (options: IVotingModuleAdapterOptions) => IVotingModuleAdapter

  // Filling out these fields will add a structure preset to the DAO creation
  // flow.
  daoCreation?: {
    displayInfo: {
      Icon: ComponentType
      nameI18nKey: string
      descriptionI18nKey: string
      suppliesI18nKey: string
      membershipI18nKey: string
    }
    defaultConfig: DaoCreationConfig

    governanceConfig: {
      Input: ComponentType<DaoCreationGovernanceConfigInputProps>
      Review: ComponentType<DaoCreationGovernanceConfigReviewProps>
    }
    votingConfig: {
      items: DaoCreationVotingConfigItem[]
      advancedItems?: DaoCreationVotingConfigItem[]
      advancedWarningI18nKeys?: string[]
    }

    getInstantiateInfo: DaoCreationGetInstantiateInfo<DaoCreationConfig>
  }
}

export interface IVotingModuleAdapterOptions {
  votingModuleAddress: string
  coreAddress: string
  Logo: ComponentType<LogoProps>
  Loader: ComponentType<LoaderProps>
  t: TFunction
}

export interface IVotingModuleAdapterContext {
  id: string
  options: IVotingModuleAdapterOptions
  adapter: IVotingModuleAdapter
}
