import { ComponentType } from 'react'

import { ActionCategoryMaker, ImplementedAction } from './actions'
import { IVotingModuleBase } from './clients'
import { DaoInfoCard, StakingMode } from './components'
import { DaoTabWithComponent } from './dao'

export interface BaseProfileCardMemberInfoProps {
  maxGovernanceTokenDeposit: string | undefined
  // True if wallet cannot vote on a proposal being shown.
  cantVoteOnProposal?: boolean
}

export interface BaseStakingModalProps {
  visible: boolean
  onClose: () => void
  initialMode?: StakingMode
  maxDeposit?: string
}

export type VotingModuleRelevantAddress = {
  label: string
  address: string
}

export interface IVotingModuleAdapter {
  // Hooks
  hooks: {
    useMainDaoInfoCards: () => DaoInfoCard[]
    useVotingModuleRelevantAddresses: () => VotingModuleRelevantAddress[]
  }

  // Components
  components: {
    extraTabs?: (Omit<DaoTabWithComponent, 'label'> & {
      labelI18nKey: string
    })[]
    ProfileCardMemberInfo: ComponentType<BaseProfileCardMemberInfoProps>
    MainDaoInfoCardsLoader: ComponentType<any>
    StakingModal?: ComponentType<BaseStakingModalProps>
  }

  // Fields
  fields: {
    actions?: {
      actions?: ImplementedAction<any>[]
      categoryMakers: ActionCategoryMaker[]
    }
  }
}

export type VotingModuleAdapter = {
  id: string
  contractNames: string[]

  load: (votingModule: IVotingModuleBase) => IVotingModuleAdapter
}

export type IVotingModuleAdapterContext = {
  id: string
  adapter: IVotingModuleAdapter
  votingModule: IVotingModuleBase
}
