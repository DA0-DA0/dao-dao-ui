import { ComponentType } from 'react'
import { FieldValues } from 'react-hook-form'

import { Action } from './actions'
import { Duration } from './contracts/common'
import { TokenInfoResponse } from './contracts/Cw20Base'
import { NftClaim } from './contracts/DaoVotingCw721Staked'
import { Claim } from './contracts/stake-cw20'
import {
  DaoCreationGetInstantiateInfo,
  DaoCreationGovernanceConfigInputProps,
  DaoCreationGovernanceConfigReviewProps,
  DaoCreationVotingConfigItem,
  NftCardInfo,
} from './dao'
import { AmountWithTimestampAndDenom } from './state'
import {
  DaoHomeTab,
  DaoInfoBarItem,
  LoadingData,
  LoadingDataWithError,
  StakingMode,
} from './stateless'
import { ProfileNewProposalCardAddress } from './stateless/ProfileNewProposalCard'

export interface BaseProfileCardMemberInfoProps {
  deposit: string | undefined
  // True if wallet cannot vote on a proposal being shown.
  cantVoteOnProposal?: boolean
}

export interface BaseStakingModalProps {
  initialMode?: StakingMode
  onClose: () => void
  maxDeposit?: string
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
  /// Optional
  // Wallet balance
  loadingWalletBalance?: LoadingData<number>
  // Treasury balance
  loadingTreasuryBalance?: LoadingData<number>
  // Price
  loadingPrice?: LoadingData<AmountWithTimestampAndDenom>
}

export interface UseStakingInfoOptions {
  fetchClaims?: boolean
  fetchTotalStakedValue?: boolean
  fetchWalletStakedValue?: boolean
  fetchWalletUnstakedValue?: boolean
}

export interface UseStakingInfoResponse {
  stakingContractAddress: string
  unstakingDuration?: Duration
  refreshTotals: () => void
  /// Optional
  // Claims
  blockHeight?: number
  refreshClaims?: () => void
  claims?: Claim[] | NftClaim[]
  claimsPending?: Claim[] | NftClaim[]
  claimsAvailable?: Claim[] | NftClaim[]
  sumClaimsAvailable?: number
  // Total staked value
  loadingTotalStakedValue?: LoadingData<number>
  // Wallet staked value
  loadingWalletStakedValue?: LoadingData<number>
  loadingWalletStakedNfts?: LoadingDataWithError<NftCardInfo[]>
  loadingWalletUnstakedNfts?: LoadingDataWithError<NftCardInfo[]>
}

export interface IVotingModuleAdapter {
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
    extraTabs?: (Omit<DaoHomeTab, 'label'> & { labelI18nKey: string })[]
    ProfileCardMemberInfo: ComponentType<BaseProfileCardMemberInfoProps>
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
  coreAddress: string
  votingModuleAddress: string
}

export interface IVotingModuleAdapterContext {
  id: string
  options: IVotingModuleAdapterOptions
  adapter: IVotingModuleAdapter
}
