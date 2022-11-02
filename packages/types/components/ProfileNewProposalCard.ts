import { ComponentType } from 'react'

import { LoadingData } from './common'
import { ProfileCardWrapperProps } from './ProfileCardWrapper'

export interface ProfileNewProposalCardInfoLine {
  Icon: ComponentType<{ className: string }>
  label: string
  value: string
  valueClassName?: string
}

export interface ProfileNewProposalCardAddress {
  label: string
  address: string
}

export interface ProfileNewProposalCardProps
  extends Omit<
    ProfileCardWrapperProps,
    | 'children'
    | 'underHeaderComponent'
    | 'childContainerClassName'
    | 'established'
    | 'compact'
  > {
  daoName: string
  info: LoadingData<{
    lines: ProfileNewProposalCardInfoLine[]
    addresses: ProfileNewProposalCardAddress[]
  }>
}
