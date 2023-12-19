import { ComponentType } from 'react'

import { ActionCategoryMaker } from './actions'
import { DaoInfoBarItem, StakingMode } from './components'
import { ProfileNewProposalCardAddress } from './components/ProfileNewProposalCard'
import { DaoTabWithComponent } from './dao'
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

export type VotingModuleAdapter = {
  id: string
  contractNames: string[]

  load: (options: IVotingModuleAdapterOptions) => IVotingModuleAdapter
}

export interface IVotingModuleAdapterOptions {
  chainId: string
  coreAddress: string
  votingModuleAddress: string
}

export interface IVotingModuleAdapterContext {
  id: string
  options: IVotingModuleAdapterOptions
  adapter: IVotingModuleAdapter
}
