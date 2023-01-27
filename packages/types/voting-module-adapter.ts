import { ComponentType } from 'react'
import { FieldValues } from 'react-hook-form'

import { Action } from './actions'
import { TokenInfoResponse } from './contracts/Cw20Base'
import {
  DaoCreationGetInstantiateInfo,
  DaoCreationGovernanceConfigInputProps,
  DaoCreationGovernanceConfigReviewProps,
  DaoCreationVotingConfigItem,
  DaoTabWithComponent,
} from './dao'
import { AmountWithTimestampAndDenom } from './state'
import { DaoInfoBarItem, LoadingData, StakingMode } from './stateless'
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

export interface IVotingModuleAdapter {
  // Hooks
  hooks: {
    useActions: () => Action[]
    useDaoInfoBarItems: () => DaoInfoBarItem[]
    useProfileNewProposalCardAddresses: () => ProfileNewProposalCardAddress[]
    useGovernanceTokenInfo?: (
      options?: UseGovernanceTokenInfoOptions
    ) => UseGovernanceTokenInfoResponse
  }

  // Components
  components: {
    extraTabs?: (Omit<DaoTabWithComponent, 'label'> & {
      labelI18nKey: string
    })[]
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
