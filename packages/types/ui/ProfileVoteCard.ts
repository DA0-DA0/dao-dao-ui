import { ComponentType, ReactNode } from 'react'

export interface ProfileVoteCardOption<T> {
  Icon: ComponentType<{ className: string }>
  label: string
  value: T
}

export interface ProfileVoteCardProps<T> {
  options: ProfileVoteCardOption<T>[]
  // Initial selected vote if present.
  currentVote?: T
  currentVoteDisplay: ReactNode
  loading?: boolean
  votingPower: number
  daoName: string
  walletAddress: string
  walletName: string
  profileImageUrl: string | undefined | null
  onCastVote: (vote: T) => void | Promise<void>
}
