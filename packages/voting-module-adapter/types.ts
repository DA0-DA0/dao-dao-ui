import { ComponentType } from 'react'

import { ActionKey } from '@dao-dao/actions'
import { ProposalDetailsProps } from '@dao-dao/ui'

export interface IVotingModuleAdapter {
  // Initialization
  id: string
  matcher: (contractName: string) => boolean

  // Fields
  fields: {
    disabledActionKeys: ActionKey[]
  }

  // Hooks
  hooks: {
    useVoteConversionDecimals: (coreAddress: string) => number
  }

  // UI
  ui: {
    Membership: {
      Desktop: ComponentType<BaseMembershipProps>
      MobileTab: ComponentType<MembershipMobileTabProps>
      Mobile: ComponentType<BaseMembershipProps>
    }
    DaoHorizontalInfoDisplayInternal: ComponentType<BaseDaoHorizontalInfoDisplayInternalProps>
    ProposalDetails: ComponentType<BaseProposalDetailsProps>
    DaoTreasuryFooter: ComponentType<BaseDaoTreasuryFooterProps>
    DaoContractInfoContent: ComponentType<BaseDaoContractInfoContentProps>
    ProposalCreateAddresses: ComponentType<BaseProposalCreateAddressesProps>
  }
}

export interface MembershipMobileTabProps {
  onClick: () => void
  selected: boolean
}

export interface BaseMembershipProps {
  coreAddress: string
}

export interface BaseDaoHorizontalInfoDisplayInternalProps {
  coreAddress: string
}

export type BaseProposalDetailsProps = Omit<
  ProposalDetailsProps,
  'stakingModal'
>

export interface BaseDaoTreasuryFooterProps {
  coreAddress: string
}

export interface BaseDaoContractInfoContentProps {
  coreAddress: string
}

export interface BaseProposalCreateAddressesProps {
  coreAddress: string
}
