import { ComponentType } from 'react'

export interface ProfileVoteCardOption<T> {
  Icon: ComponentType<{ className: string }>
  label: string
  value: T
}

export interface ProfileVoteCardProps<T> {
  options: ProfileVoteCardOption<T>[]
  selected?: T
  loading?: boolean
  votingPower: number
  daoName: string
  walletName: string
  profileImgUrl: string
}
