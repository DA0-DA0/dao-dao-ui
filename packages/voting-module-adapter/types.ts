import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { ComponentType } from 'react'

import { ActionKey } from '@dao-dao/actions'

export interface IVotingModuleAdapter {
  // Initialization
  id: string
  matcher: VotingModuleAdapterMatcher

  // Fields
  disabledActionKeys: ActionKey[]

  // Functions
  getStaticProps: VotingModuleStaticPropsGetter

  // UI
  ui: {
    membership: {
      desktop: ComponentType<BaseMembershipProps>
      mobileTab: ComponentType<MembershipMobileTabProps>
      mobile: ComponentType<BaseMembershipProps>
    }
  }
}

export type VotingModuleAdapterMatcher = (contractName: string) => boolean
export type VotingModuleStaticPropsGetter = (
  cosmWasmClient: CosmWasmClient,
  votingModuleAddress: string
) => Promise<{
  cw4GroupAddress?: string
  governanceTokenAddress?: string
  stakingContractAddress?: string
}>

export interface MembershipMobileTabProps {
  onClick: () => void
  selected: boolean
}

export interface BaseMembershipProps {
  Loader: ComponentType<{ className?: string }>
  coreAddress: string
}
