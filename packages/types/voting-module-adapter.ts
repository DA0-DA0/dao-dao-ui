import { ComponentType } from 'react'
import { FieldValues } from 'react-hook-form'

import { ActionCategoryMaker } from './actions'
import {
  DaoCreationGetInstantiateInfo,
  DaoCreationGovernanceConfigInputProps,
  DaoCreationGovernanceConfigReviewProps,
  DaoCreationVotingConfigItem,
  DaoTabWithComponent,
} from './dao'
import { DaoInfoBarItem, StakingMode } from './stateless'
import { ProfileNewProposalCardAddress } from './stateless/ProfileNewProposalCard'
import { GenericToken } from './token'

export interface BaseProfileCardMemberInfoProps {
  maxGovernanceTokenDeposit: string | undefined
  // True if wallet cannot vote on a proposal being shown.
  cantVoteOnProposal?: boolean
}

export interface BaseStakingModalProps {
  initialMode?: StakingMode
  onClose: () => void
  maxDeposit?: string
}

export interface IVotingModuleAdapter {
  // Hooks
  hooks: {
    useDaoInfoBarItems: () => DaoInfoBarItem[]
    useProfileNewProposalCardAddresses: () => ProfileNewProposalCardAddress[]
    useCommonGovernanceTokenInfo?: () => GenericToken
  }

  // Components
  components: {
    extraTabs?: (Omit<DaoTabWithComponent, 'label'> & {
      labelI18nKey: string
    })[]
    ProfileCardMemberInfo: ComponentType<BaseProfileCardMemberInfoProps>
    StakingModal?: ComponentType<BaseStakingModalProps>
  }

  // Fields
  fields: {
    actionCategoryMakers: ActionCategoryMaker[]
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
