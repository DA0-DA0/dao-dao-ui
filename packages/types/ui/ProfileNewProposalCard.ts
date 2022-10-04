import { ComponentType } from 'react'

import { LoadingData } from './common'

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

export interface ProfileNewProposalCardProps {
  daoName: string
  walletAddress: string
  walletName: string
  profileImageUrl: string | undefined | null
  info: LoadingData<{
    lines: ProfileNewProposalCardInfoLine[]
    addresses: ProfileNewProposalCardAddress[]
  }>
}
