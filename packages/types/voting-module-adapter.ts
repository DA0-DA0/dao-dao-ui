import { TFunction } from 'next-i18next'
import { ComponentType, ReactNode } from 'react'
import { FieldValues } from 'react-hook-form'

import { Action } from './actions'
import { CheckedDepositInfo, Duration } from './contracts/common'
import { MarketingInfoResponse, TokenInfoResponse } from './contracts/Cw20Base'
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
import { ProfileNewProposalCardAddress } from './ui/ProfileNewProposalCard'

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

export interface BaseVoteHeroStatsProps {
  loader?: boolean
  additionalStats?: (HeroStatProps & { link?: boolean })[]
}

export interface BaseSdaMembershipPageProps extends BaseMembershipProps {
  defaultImageUrl: string
  Loader: ComponentType<{ size?: number | string }>
}

export interface BaseProfileMemberCardMembershipInfoProps {
  deposit: string | undefined
}

export interface BaseProfileCardNotMemberInfoProps {
  deposit: string | undefined
  // If this is being displayed in the context of a proposal.
  proposalContext: boolean
}

export interface BaseStakingModalProps {
  initialMode?: StakingMode
  onClose: () => void
  maxDeposit?: string
}

export interface BaseClaimsPendingListProps {
  fallbackImageUrl: string
  showClaim: () => void
}

export interface UseGovernanceTokenInfoOptions {
  fetchWalletBalance?: boolean
  fetchTreasuryBalance?: boolean
  fetchUsdcPrice?: boolean
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
    useProfileNewProposalCardAddresses: () => ProfileNewProposalCardAddress[]
    useGovernanceTokenInfo?: (
      options?: UseGovernanceTokenInfoOptions
    ) => UseGovernanceTokenInfoResponse
    useStakingInfo?: (options?: UseStakingInfoOptions) => UseStakingInfoResponse
  }

  // Components
  components: {
    MembersTab?: ComponentType
    Membership: {
      Desktop: ComponentType<BaseMembershipProps>
      MobileTab: ComponentType<MembershipMobileTabProps>
      Mobile: ComponentType<BaseMembershipProps>
    }
    DaoTreasuryFooter: ComponentType
    DaoInfoAdditionalAddresses: ComponentType
    VoteHeroStats: ComponentType<BaseVoteHeroStatsProps>
    SdaMembershipPage: ComponentType<BaseSdaMembershipPageProps>
    ProfileMemberCardMembershipInfo: ComponentType<BaseProfileMemberCardMembershipInfoProps>
    ProfileCardNotMemberInfo: ComponentType<BaseProfileCardNotMemberInfoProps>

    StakingModal?: ComponentType<BaseStakingModalProps>
    ClaimsPendingList?: ComponentType<BaseClaimsPendingListProps>
  }
}

export type VotingModuleAdapter<DaoCreationConfig extends FieldValues = any> = {
  id: string
  contractNames: string[]

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
