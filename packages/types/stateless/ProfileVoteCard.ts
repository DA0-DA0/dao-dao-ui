import { ComponentType, ReactNode } from 'react'

import { ProfileCardWrapperProps } from './ProfileCardWrapper'

export interface ProfileVoteCardOption<T> {
  Icon: ComponentType<{ className: string }>
  label: string
  value: T
}

export interface ProfileVoteCardProps<T>
  extends Omit<
    ProfileCardWrapperProps,
    | 'children'
    | 'underHeaderComponent'
    | 'childContainerClassName'
    | 'established'
    | 'compact'
  > {
  options: ProfileVoteCardOption<T>[]
  // Initial selected vote if present.
  currentVote?: T
  currentVoteDisplay: ReactNode
  loading?: boolean
  votingPower: number
  daoName: string
  onCastVote: (vote: T) => void | Promise<void>
}
