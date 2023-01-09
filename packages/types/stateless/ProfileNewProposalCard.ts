import { ProfileNewProposalCardInfoLine } from '../proposal-module-adapter'
import { LoadingData } from './common'
import { ProfileCardWrapperProps } from './ProfileCardWrapper'

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
